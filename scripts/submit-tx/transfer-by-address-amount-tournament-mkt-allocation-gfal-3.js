// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const {ethers} = require("hardhat");

const GFALTokenArtifact = require('../../artifacts/contracts/_mock/GFALToken.sol/GFALToken.json')
// Constants
const TRANSFERS_PAYLOAD = {
  address: [
    "0x167c80e76f233ac17c3e9fd261f47529a0ed276e",
    "0xfd933382f87c97fa4a9e3a68f89502a9a032e242",
    "0xfe7c818317527e74c27c41951627bb4716827ff0",
    "0xcf22939b02d5f9616f9f654e23bc34ffeb868c6c",
    "0x1927a78e02446b3ff2ca285c709fc08fa7a49339",
    "0xbc0467687fd27cfd7e2c104413d29bddd2c4710f",
    "0x217fdac17587cd84b58ae9351a454ecaf55e5200",
    "0x1665c419923308c2a5a5a132ca3b471edae36160",
    "0xa7a0ad164796fa951fba2f6e2c2396700810658c",
    "0x6d13cbe430d5d148f73cda19a2b95205f6385f68",
    "0xcda9f88e83b8504383ee6217434a9acdf04a6646",
    "0x8457467729ecb3445b91c91f4965c83502eeed14",
    "0xbf4a7c2cd6f41ac13c3187eab1bae867633c8aa4",
    "0xd4f7aa336487467c3c93b6f32229efb9b6e5d0c5",
    "0x05296ff1d70122836beb6baa797183a943c7a887",
    "0x5d9f5819ca0b455c9c0d30c5ffef941653c67d8c",
    "0xec43bde154626e55f3ef5fbd7c1b95577e80d235",
    "0xe8f5a36e2d0139c94d46021f5429ccf0507de705",
    "0xdcce58ad38bc970a5d708f77858d3c1342d4052c",
    "0x0d3fd7df9792c6138fa4071b26b43b461da1ac72",
    "0x7087b67143bb8aa7a2cefdc17ddc68bd2c28fd2e",
    "0xfa10e5f5ac8dcc86dfc92b23df28c29465a6a6c2",
    "0xe3adf3aeebcc8ae2557bdff3677b7ce7fda36d48",
    "0x526e322f34516eff5de75f0d6ab45287e7e31f98",
    "0x87b0a3fdba498e5707c2dfeb91668d7e03451b19",
    "0x57ed01ee255bfb0e2cc113c0f9c620213c3aec82",
    "0x04faa4954d71e0b3b877334063082886f16eddbd",
    "0x2deaf248841f56ba01da9b7b5b39651ba85d57d1",
    "0x797f4f8fe959def7d6a9409be1b7a43f4b6c6b95",
    "0x6244dc482b2d09569cd66a0c669d20a7739d3cc7",
    "0x14b853752b39926fd51dbadfbafe596edf0ca50c",
    "0x0b616b642fce27f37202213d34eac1c0ca176328",
    "0xdebb3909d18f48b3da75579340b5e63b2e109083",
    "0x62f8f304b9792ab5ddbc5e862eb3e90a436408b0",
    "0xf837d3c578de0e33254a1211be5a649080cf477f",
    "0xb26d2ddd630980bf4b454b933964a825052549a3",
    "0xeb2bf32f1fe8a15f4ea5061158929b2eb1f40087",
    "0x35652f6e6c1b0c88a6c0a57984e49393d5b63ba9",
    "0x8c66bd3ecc22e47e61e12e361ec163a6583232d6",
    "0x3fe145b75ee47beb08978b14e250a6c69fa7629f",
    "0x551c59c34866052fe49bf00840db97c8ef3c0f1b",
    "0x2f149976c69c5323fd70e5b57d1b469e2082de8f",
    "0x90184e31b7eeff228eda42b1c5dc553e83b19240",
    "0x64f65dd52a5cd4c6905dd58b75afd71e74cec404",
    "0x0617852dcfcf8913d2d26515656072bca66b6fe4",
    "0x57c86d3c0a3533b1fef6a5a7a8de859070536d0c",
    "0xfd3c7f914e8d6d27d04198983dcf4d65a220eb98",
    "0x291f795e1a57d8fd47a530281d08fc89cb342fdc",
    "0xb29adc8f48df76c62bde679ce125cc33cd9796f9",
    "0x7ea15c7b3fdca75d3db88aa7fe60003cb916d52a",
    "0xe9aadf346d7b93bce906c7323e60ee42363ca7f2",
    "0x24e8e9529181055e454553924223604d67edb219",
    "0xf08875a3b18b3aba80e8d895a7a51cc9bb9a8dd1",
    "0x3cdd2f07e768dd5f6bd439ffc4add880f5fde81f",
    "0x2d516369a362e1e168eda0a717f01515c65ed1a1",
    "0x5471e5aff26fa6e526dfed7fbd4afdde92ec2332",
    "0x0f0015f3624e7c1169281982355c83e5bd0fa01a",
    "0xc4f8bef139f2dab1a792325f7721824512ae87a8",
    "0x1a59a2172fcc938621b969cf47a6070f06f118eb",
    "0x279ca92ad7f85005761ea0e320425ffac2ba800f",
    "0x034f75d6b161826408c24a5cb34b3aacc86a105c",
    "0x1a9081dfac01c1d90d022b523e9fa568226d6645",
    "0x7ac6a4b80128d3e38d25fbb2999b6455eb180f52",
    "0x7106ac547429925ab84d43dd1b3f50b427a34d7e",
    "0x7fb8f17d32e90c64da3c8e4f30950d59a031447b",
    "0x8c8973379ebbdd07fe5c9abe9a427e8af022600a",
    "0x0f5055dc1c7fd1c320f7466aadef8dcbccb2b86c",
    "0x5e297548a9e6cc7f7cb651a403e68ac20fe37642",
    "0x5cddda52def0cf0ccdf3aed5e7db94784a7848fb",
    "0x974198b0e78ecdbabcb22d4d30c325c316ae8af7",
    "0xe372db2e3ff3ae40a0b208408ab91fc2c63c7669",
    "0xb45aa3d15ac10cc3aa633c5b2dcff8540d93d796",
    "0x432bbfcda7c71a409d96202ccd795b4727307d9e",
    "0xf8db751947f646e36099069f1ef8389471bef910",
    "0x9dd6b396441fcc152bb1745ecb4e35effe68c890",
    "0x9ec3fc680dbf527c9cb3196dca27a8845d9c76ef",
    "0x4c097f21ccecfdf1601306424dcd1f7ead0850c3",
    "0x94c6de5477ef4dbceb6bdaf4641c334259298f22",
    "0xc2c43893bdc421914c45a3bf671a00fb608eb3f1",
    "0x51c1adc1791a667fae7819d2c47ecfb8a8330b15",
    "0x9e3e442dd99472aa98137f40609591a02cb75f59",
    "0xd7c00a03f2df7b17f016302b73e14352e71eb668",
    "0x4f2a0c99ca1cbf21f13885b4f9c159057204ac7a",
    "0x7f1286bd981e6d872daa25b5e862d29a5d8e9282",
    "0x92ef16a1a6dc81562aadbfa2dc968b900697d823",
    "0x6266b15ac785dec49ddb4f60b561f611cf8a0dba",
    "0x3b8e63f3210c20472e058aac87e3dc2ed80d12a6",
    "0x3288b7439c2f0a19444e0774eced0f31111f72df",
    "0x7b34d301bc6b46916ab34dd962a5b9f01d2b17dd",
    "0xf191063211fe5c5f4ecdb0605f7e763b27c5e2b4",
    "0x34c88e70fe5885032c2e2caa03067c6dbafc2e33",
    "0x610015095acf1655bb2a343be02e2de3c2d0e2bb",
    "0xb29399c7ee440de5e8d50501f883fbb57489eb6b",
    "0x170488e9948f1838582f0e745191d84a34b31422",
    "0x2b7c57f9b416c502ffdf75c209dcda61fdbb503c",
    "0x60c50d964b7c1f7b5a0946cede0bfcaf7c69b13c",
    "0x65786ec99be46207b1b6679384f405c2002a73d5",
    "0x75012e51f7ba907a401570b54a290039c2f7edae",
    "0x59e6900e6a4dece2aad07e609ce99626f66f101e",
    "0x01893c620de4668f0edcd1670db8924454bbde52",
    "0x58ba74e221e20a9d5be09743caacc23ce70d2e48",
    "0xfd8960df9ffd83e8bd2207c8ea5a008b5ccf4808",
    "0xb02b0ba2e68fb279e72e396826fefec361080b7a",
    "0x810b063d8254f7423518a1dc8ed3e00fccdc6a6a",
    "0xc966e9bf5e305a222d1a88396ac487c669bd78be",
    "0x8ca91c9fa1a848441e35b825f1f04b84ef2fcb9a",
    "0xe0bc0c74f1c98da0b5efedee5949061c392b74c7",
    "0x65099faca5b8c12ac20f80b66f90a026a4017099",
    "0x53781c20c40d38f8f6278bc41dd54a2a7e72b370",
    "0xb3edd52cc8e28fb4691604e3d1fcc8a37698b453",
    "0xe81cdf78c533aae073dac199b93752316ed5b8cc",
    "0x7c5b4c14a18c21a0919e502f2709e32104896abc",
    "0x81d524de67d0df0a5c99d9e2d1366d17932d97c4",
    "0xd8318d32cd482d4f97b41d2dfdf4e7f5fe512f7e",
    "0x451bb6064a219697816e103d7802c4e8f674bc7d",
    "0x47c6780576cc13ac271ef634f4ce04dd46377959",
    "0x6e3fa68084bc8fc79df5589a0de96986f072e6c6",
    "0x976bd94199c0d5d2acf5e2725fd1084c729d945a",
    "0x40dd2922f97ba1683905d201a121f367e34c3d69",
    "0xe24b3b23811f810f252fe76739b38fd4a258962f",
    "0x8c026b285f40de15211933fd88ad4929d820cc2f",
    "0xad08b6f5d4f30f48bccb3526e95265638dc12a73",
    "0x3fd84e716b23834c503b35029e6b27a66c5a7ba2",
    "0xc4679771f092e4721a4f9361a833ba7a3c695ed5",
    "0x7bb76364a7767f292f84e334d4ee672394c59386",
    "0x972dd456d81e0adf0226aff1689a1460b856321a",
    "0x74bd1c8e3eca3f06d29945a5a7566191e5a05014",
    "0x6544f1534b620011fd112cf0cd401d36de4d044d",
    "0x9939300addd8fc3c69933d94929d43a9738885a5",
    "0xd5149376dfb8ad614272f831bb9aa3e9b72d60da",
    "0xd5f9be6b614e6fc4d5f07744c55e72641cf4da02",
    "0x594ec3c23dee9480e25e8f3eee3d4e52a5f5f5bc",
    "0x7f4e4320cdab3cb20c24a1e3f1e38efc8940869e",
    "0xb8d0946b28e3166acb7beb6810568d0d29785b3e",
    "0x287948ff17c5eff790f5684174cddad3cebbd964",
    "0x051eabbbfe77557f60b7768c35d024416c03744f",
    "0x04639843e7007c653419945dab2f7b8b01f78a7f",
    "0x274bc1379b01ae8bb9d202f41664acf9c3c8e3bd",
    "0x7de71b574b0d3516db730b9dfb95dc77569ae480",
    "0x4110e0dca8ccfb7e3f0155ff9261645064553ccf",
    "0xb6ed164c116ea169d4b552d6298145843057a6ef",
    "0xf3e0cd953a0ad64035848658aea33ae81e846136",
    "0xde7e9e3bc49368a75236d890b8e69a1d365b1c7b",
    "0x92c52ac5b92421a0eadd4f3e2a3deaa169cb4154",
    "0x7dcf578f16daf1051847041442c6c1afec63e0d1",
    "0x406f25b20ed2dfd6bec1ca3a9c6f37556e462f2c",
    "0xc00959586b43a5a3f11c98ffa1e20e5d3e6f20ea",
    "0xe29673212b777d42eccea3a03aea6c93b8f03f2f",
    "0x2299023d351d64bd98dc335b294ef59107e14176",
    "0xc35142e9b4140ac9033ce09bf49bf0bb6e26a5a5",
    "0xe5176580dea4948c04e8f52e5cba17e5e88c44a3",
    "0x5f74a41d6725cf4a71bd124b7e41b1945d532e8c",
    "0x0eade7e3fc6fb8e7591e01327285090bb5b9c097",
    "0xdb657aedb8315dd8704ebb22caf5642e3710af79",
    "0xcc50a65434762649c0fb0a680b14dba74f36cafc",
    "0xef110ef7e090f074d1741f0d55c8eec4b7cbab9d",
    "0x67da52983528cdbeba6b6cf87efd65c15a26b185",
    "0xcc3fbee9073f09be83b37148cb1eed68964cd92b",
    "0x62202c747a1cf39dce3fdc988fdf3dcf6e014c38",
    "0x6fbf835e6b0c3d4523d2cef45dc0077d78caedc5",
    "0xc74252f5fbf78a5b30e5a9c6d46cf5d8aa9951ce",
    "0x7b6e42d638a4849705467ff02dfd9e5584f836c4",
    "0x9cd69279c0066b98c12dc9a5ac9465ed4e7cd600",
    "0x437c776d3ba37a0592feacaf45eb04ecc33fa7da",
    "0xaa31092ce673e40e99bce0f23b70ca2d9199d2d2",
    "0x9bbed68d7b000df714874b6039294a23591c4d46",
    "0x134a40ac521161fbb4b4f3a100ba9bbc030f0759",
    "0x1c24aa689fe84cb60adea9706cca6c623c3024c9",
    "0xaa88ad21193a97f61cf563c883b5236f269d68e2",
    "0x4fdee3974c25f0dd95eee581abf4458fac3573da",
    "0xe50ed50a62d2f318368c6f39dfe6078cc38ad0e8",
    "0x9409fa2ed37e814489b41c24aff6968458f6b930",
    "0x64cf870f96003d6c8480650ddd1cec5a9c88f7bd",
    "0x401c6f1859a65de1cf910e72b900dcdacd86d396",
    "0xe918c3e358a01ae3e8a64c42c135d359bdcb42cf",
    "0x12dc3f8b3a3a2ca4afe6f7831086cb295c3cd08b",
    "0x24986d2044402562267b943444abbee69a2ce27b",
    "0x0d4973eb46a5d15c97c1a46f5b0bf6e2bfeb54dc",
    "0x4420d4a194a6217197bd98b6eb8ba450dfa8e2d4",
    "0x067ab41baff09bd8004a1709679d73df9169226c",
    "0x9aa1816e400fe3f9c9735e377be58fed8f57052e",
    "0xc23a43d37fedce52eb89aea5d4e848c3bdb8d28e",
    "0xc8c9ec096ddeefb8fd6b725929d57d4371239e37",
    "0x697a68b8292b85a5b881a2f6beb3cfb5a6766795",
    "0x97cffca76bd389c490a0d3b94060e3a35b4db688",
    "0x46a4f4f66e1e81250f313b4fb3f63edf1edfe14d",
    "0xda06faaad961260ece47eb87180faa2889028c5b",
    "0x523fa6d75216fd72ac6026044a90cf7503bd2f9c",
  ],
  amount: [
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(630)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(500)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
    ethers.utils.parseEther(String(420)),
  ]
}

const GFAL_TOKEN = process.env.GFAL_TOKEN_MAINNET

async function main() {
  // Create a new provider
  let provider = new ethers.providers.JsonRpcProvider(process.env.WEB3_HTTP_PROVIDER_MAIN);

  // Create a new instance of the contract using the provider
  const gfalToken = new ethers.Contract(GFAL_TOKEN, GFALTokenArtifact.abi, provider);

  // Validate correct length of arrays
  if (TRANSFERS_PAYLOAD.address.length !== TRANSFERS_PAYLOAD.amount.length) {
    throw Error('Array lengths mismatch')
  }

  // Sender from private key
  const signer = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY)
  const nonce = await provider.getTransactionCount(signer.address);
  const balanceBeforeTransfer = await gfalToken.balanceOf(signer.address);
  
  console.log(
    "-Sender G4AL balance Before:",
    ethers.utils.formatEther(balanceBeforeTransfer.toString())
  );

  // Executing transactions and saving results
  let results = []
  for (let i = 0; i < TRANSFERS_PAYLOAD.address.length; i++) {
    const gasPrice = await provider.getGasPrice();
    const gasLimit = await gfalToken.estimateGas.transfer(TRANSFERS_PAYLOAD.address[i], TRANSFERS_PAYLOAD.amount[i], {from: signer.address});

    // Construct the transaction
    const tx = {
      from: signer.address, // specify the sender
      to: gfalToken.address,
      gasLimit,
      gasPrice,
      nonce: nonce + i,
      data: gfalToken.interface.encodeFunctionData('transfer', [TRANSFERS_PAYLOAD.address[i], TRANSFERS_PAYLOAD.amount[i]]),
    };
    const signedTx = await signer.signTransaction(tx);
    const transactionResponse = await provider.sendTransaction(signedTx);
    // results.push(transactionResponse)
    console.log(`Transferred to:${TRANSFERS_PAYLOAD.address[i]}`);
    console.log(`Amount:${TRANSFERS_PAYLOAD.amount[i]}`);
  }

//   console.log(
//     `TransferByAddressAmountMarketplace script executed:`,
//     results
//   )

  const balanceAfterTransfer = await gfalToken.balanceOf(signer.address);

  console.log(
    `\n- Sender balance After: 
    ${ethers.utils.formatEther(balanceAfterTransfer.toString())} G4AL`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
