// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../../utils/OracleConsumer.sol";
import "../../utils/G4ALProxy.sol";

contract GFALMarketplace is ReentrancyGuard {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // Proxy to store variables as addresses from contracts and from wallets
    G4ALProxy public g4alProxy;

    mapping(address => Whitelist) public whitelistNFTs;

    // Marketplace
    mapping(address => mapping(uint256 => mapping(address => Sale)))
        public tokensForSale; // collectionAddress => (tokenId => (sellerAddress => Sale))
    address[] public sellersList; // to allow iterating in order to get on sale tokens for contractAddress and sellerAddress
    mapping(address => bool) public knownSellers; // to avoid repeated sellersList.push(sellerAddress)
    uint256 public volume; // $GFAL all-time-volume
    uint256 public royaltiesInBasisPoints;
    bool public isActive; // It will allow user to trade NFTs. They will always will be able to unlist them.

    modifier onlyOwner() {
        require(msg.sender == g4alProxy.owner(), "Not owner");
        _;
    }

    constructor(uint256 _royaltiesInBasisPoints, address _g4alProxy) {
        royaltiesInBasisPoints = _royaltiesInBasisPoints;
        g4alProxy = G4ALProxy(_g4alProxy);
        isActive = true;
    }

    // Structures
    struct Sale {
        uint256 price;
        bool isDollar;
        bool isForSale; // Price = 1:1 price x amount
        uint256 amount;
    }

    struct Whitelist {
        bool allowed;
        TokenStandard tokenStandard;
    }
    enum TokenStandard {
        ERC721,
        ERC1155
    }

    // Events
    event SellToken(
        address collection,
        uint256 tokenId,
        uint256 amount,
        uint256 price,
        bool isDollar,
        address seller
    );
    event BuyToken(
        address collection,
        uint tokenId,
        uint256 amount,
        uint price,
        uint sellerRevenue,
        uint royalties,
        address seller,
        address buyer
    );
    event RemoveToken(address collection, uint256 tokenId, address seller);
    event ContractStatusUpdated(bool isActive);

    // Modifiers

    modifier onlyTradableToken(
        address contractAddress,
        address from,
        uint256 tokenId
    ) {
        Whitelist memory collection = whitelistNFTs[contractAddress];
        require(
            collection.allowed == true,
            "You can sell only tokens about whitelisted collections."
        );
        // Ownership check for ERC721 and ERC1155 based on whitelisted information
        if (collection.tokenStandard == TokenStandard.ERC721) {
            require(
                IERC721Enumerable(contractAddress).ownerOf(tokenId) == from,
                "Token does not belong to user or not existing 721."
            );
        } else {
            require(
                IERC1155(contractAddress).balanceOf(msg.sender, tokenId) != 0,
                "Token does not belong to user or not existing 1155."
            );
        }
        _;
    }

    // -- Marketplace Methods

    function sellToken(
        address contractAddress,
        uint256 tokenId,
        uint256 amount,
        uint256 price,
        bool isDollar
    ) external onlyTradableToken(contractAddress, msg.sender, tokenId) {
        require(amount > 0, "Amount cannot be 0");
        require(isActive, "SC Under maintenance");
        require(
            whitelistNFTs[contractAddress].allowed,
            "Not allowed NFT collection"
        );
        require(price != 0, "Cannot put zero as a price");

        // If the seller is unknown, push it to the sellersList array
        if (knownSellers[msg.sender] == false) {
            knownSellers[msg.sender] = true;
            sellersList.push(msg.sender);
        }

        // Check on TokenStandard.ERC721 or ERC1155 in order to look for specific approval
        if (
            whitelistNFTs[contractAddress].tokenStandard == TokenStandard.ERC721
        ) {
            require(amount == 1, "Amount needs to be 1");
            require(
                IERC721Enumerable(contractAddress).getApproved(tokenId) ==
                    address(this),
                "NFT has not been approved for spending 721."
            );
        } else {
            require(
                IERC1155(contractAddress).isApprovedForAll(
                    msg.sender,
                    address(this)
                ) == true,
                "NFT has not been approved for spending 1155."
            );
        }

        tokensForSale[contractAddress][tokenId][msg.sender] = Sale(
            price,
            isDollar,
            true,
            amount
        );

        emit SellToken(
            contractAddress,
            tokenId,
            amount,
            price,
            isDollar,
            msg.sender
        );
    }

    // If you purchase an ERC1155 you will purchase the whole sale amount. Example: Seller lists NFTID 152, 5 copies (ERC1155). Buyer will buy the 5 copies for the listed price.
    function buyToken(
        address contractAddress,
        uint256 tokenId,
        address seller
    ) external nonReentrant {
        require(isActive, "SC Under maintenance");
        require(
            whitelistNFTs[contractAddress].allowed,
            "Not allowed NFT collection"
        );

        Sale memory sale = tokensForSale[contractAddress][tokenId][seller];
        require(sale.isForSale, "Token is not for sale.");

        // Calculating royalties and wanted price
        uint256 price = sale.isDollar == true // if isDollar expressed listing
            ? OracleConsumer(g4alProxy.oracleConsumer()).getConversionRate(
                sale.price
            ) // convert from USD to GFAL
            : sale.price;
        // otherwise already in GFAL
        (
            uint256 amountAfterRoyalties,
            uint256 royaltiesAmount
        ) = _calculateMarketplaceRoyalties(price);

        // Check ERC20 allowance for buyer
        require(
            IERC20(g4alProxy.gfalToken()).allowance(
                msg.sender,
                address(this)
            ) >= price,
            "GFAL has not been approved for spending."
        );

        // Check NFT type and transfer it accordingly
        if (
            whitelistNFTs[contractAddress].tokenStandard == TokenStandard.ERC721
        ) {
            IERC721Enumerable(contractAddress).safeTransferFrom(
                seller,
                msg.sender,
                tokenId
            );
        } else {
            IERC1155(contractAddress).safeTransferFrom(
                seller,
                msg.sender,
                tokenId,
                sale.amount,
                ""
            );
        }

        // Transferring NFT, sending funds to seller, and sending fees to marketplaceRoyalties
        IERC20(g4alProxy.gfalToken()).safeTransferFrom(
            msg.sender,
            seller,
            amountAfterRoyalties
        );
        IERC20(g4alProxy.gfalToken()).safeTransferFrom(
            msg.sender,
            g4alProxy.royaltiesCollector(),
            royaltiesAmount
        );

        // Increasing marketplace volume
        volume += price;

        // Setting token as not for sell
        tokensForSale[contractAddress][tokenId][seller] = Sale(
            0,
            false,
            false,
            0
        );

        emit BuyToken(
            contractAddress,
            tokenId,
            sale.amount,
            price,
            amountAfterRoyalties,
            royaltiesAmount,
            seller,
            msg.sender
        );
    }

    function removeToken(address contractAddress, uint256 tokenId) external {
        // Ownership check for ERC721 and ERC1155 based on whitelisted information
        if (
            whitelistNFTs[contractAddress].tokenStandard == TokenStandard.ERC721
        ) {
            require(
                IERC721Enumerable(contractAddress).ownerOf(tokenId) ==
                    msg.sender,
                "Token does not belong to user or not existing 721."
            );
        } else {
            require(
                IERC1155(contractAddress).balanceOf(msg.sender, tokenId) != 0,
                "Token does not belong to user or not existing 1155."
            );
        }

        tokensForSale[contractAddress][tokenId][msg.sender] = Sale(
            0,
            false,
            false,
            0
        );
        emit RemoveToken(contractAddress, tokenId, msg.sender);
    }

    // Private marketplace methods

    function _calculateMarketplaceRoyalties(
        uint256 amount
    )
        internal
        view
        returns (uint256 amountAfterRoyalties, uint256 royaltiesAmount)
    {
        royaltiesAmount = amount.mul(royaltiesInBasisPoints).div(10000);
        amountAfterRoyalties = amount.sub(royaltiesAmount);
    }

    // Getters

    function getSellersList() external view returns (address[] memory) {
        return sellersList;
    }

    function getOnSaleTokenIds(
        address contractAddress,
        address seller,
        uint256 start,
        uint256 end
    )
        external
        view
        returns (
            uint256[] memory tokenIds,
            address[] memory sellers,
            uint256[] memory prices
        )
    {
        require(end > start, "End must be higher than start");

        uint256[] memory _tokenIds = new uint256[](end - start);
        address[] memory _sellers = new address[](end - start);
        uint256[] memory _prices = new uint256[](end - start);

        uint256 counter = 0;
        for (uint256 i = start; i <= end; i++) {
            Sale memory currentSale = tokensForSale[contractAddress][i][seller];
            if (currentSale.isForSale) {
                _tokenIds[counter] = i;
                _sellers[counter] = seller;
                _prices[counter] = currentSale.isDollar
                    ? OracleConsumer(g4alProxy.oracleConsumer())
                        .getConversionRate(currentSale.price) // if isDollar we convert it to GFAL
                    : currentSale.price;
                counter++;
            }
        }
        return (_tokenIds, _sellers, _prices);
    }

    // Owner functions

    function updateContractStatus(bool _isActive) external onlyOwner {
        isActive = _isActive;
        emit ContractStatusUpdated(_isActive);
    }

    function updateCollection(
        address _collectionAddress,
        TokenStandard _tokenStandard,
        bool _allowed
    ) external onlyOwner {
        whitelistNFTs[_collectionAddress] = Whitelist(_allowed, _tokenStandard);
    }

    function updateRoyaltiesInBasisPoints(
        uint256 _royaltiesInBasisPoints
    ) external onlyOwner {
        royaltiesInBasisPoints = _royaltiesInBasisPoints;
    }
}
