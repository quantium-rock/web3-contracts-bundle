// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const {ethers} = require("hardhat");

// Constants
const VESTER_ROLE = "0x64ed6499e2f5a7ea55dfd56da361bf9d48064843bb3891c36f1dabd9ba246135"
const UNLOCK_TIME = 1681394400
const VESTING_SCHEDULE = {
  when: [
    1681394400, //04/13/2023 14:00:00 UTC
    1683986400, //05/13/2023 14:00:00 UTC
    1686664800, //06/13/2023 14:00:00 UTC
    1689256800, //07/13/2023 14:00:00 UTC
    1691935200, //08/13/2023 14:00:00 UTC
    1694613600, //09/13/2023 14:00:00 UTC
    1697205600, //10/13/2023 14:00:00 UTC
    1699884000, //11/13/2023 14:00:00 UTC
    1702476000, //12/13/2023 14:00:00 UTC
    1705154400, //01/13/2024 14:00:00 UTC
    1707832800, //02/13/2024 14:00:00 UTC
    1710338400, //03/13/2024 14:00:00 UTC
    1713016800, //04/13/2024 14:00:00 UTC
    1715608800, //05/13/2024 14:00:00 UTC
    1718287200, //06/13/2024 14:00:00 UTC
    1720879200, //07/13/2024 14:00:00 UTC
    1723557600, //08/13/2024 14:00:00 UTC
    1726236000, //09/13/2024 14:00:00 UTC
    1728828000, //10/13/2024 14:00:00 UTC
    1731506400, //11/13/2024 14:00:00 UTC
    1734098400, //12/13/2024 14:00:00 UTC
    1736776800, //01/13/2025 14:00:00 UTC
    1739455200, //02/13/2025 14:00:00 UTC
    1741874400, //03/13/2025 14:00:00 UTC
    1744552800, //04/13/2025 14:00:00 UTC
    1747144800, //05/13/2025 14:00:00 UTC
    1749823200, //06/13/2025 14:00:00 UTC
    1752415200, //07/13/2025 14:00:00 UTC
    1755093600, //08/13/2025 14:00:00 UTC
    1757772000, //09/13/2025 14:00:00 UTC
    1760364000, //10/13/2025 14:00:00 UTC
    1763042400, //11/13/2025 14:00:00 UTC
    1765634400, //12/13/2025 14:00:00 UTC
    1768312800, //01/13/2026 14:00:00 UTC
    1770991200, //02/13/2026 14:00:00 UTC
    1773410400, //03/13/2026 14:00:00 UTC
    1776088800, //04/13/2026 14:00:00 UTC
    1778680800, //05/13/2026 14:00:00 UTC
    1781359200, //06/13/2026 14:00:00 UTC
    1783951200, //07/13/2026 14:00:00 UTC
    1786629600, //08/13/2026 14:00:00 UTC
    1789308000, //09/13/2026 14:00:00 UTC
    1791900000, //10/13/2026 14:00:00 UTC
    1794578400, //11/13/2026 14:00:00 UTC
    1797170400, //12/13/2026 14:00:00 UTC
    1799848800, //01/13/2027 14:00:00 UTC
    1802527200, //02/13/2027 14:00:00 UTC
    1804946400, //03/13/2027 14:00:00 UTC
    1807624800, //04/13/2027 14:00:00 UTC
    1810216800, //05/13/2027 14:00:00 UTC
    1812895200, //06/13/2027 14:00:00 UTC
    1815487200, //07/13/2027 14:00:00 UTC
    1818165600, //08/13/2027 14:00:00 UTC
    1820844000, //09/13/2027 14:00:00 UTC
    1823436000, //10/13/2027 14:00:00 UTC
    1826114400, //11/13/2027 14:00:00 UTC
    1828706400, //12/13/2027 14:00:00 UTC
    1831384800, //01/13/2028 14:00:00 UTC
    1834063200, //02/13/2028 14:00:00 UTC
    1836568800, //03/13/2028 14:00:00 UTC
  ],
  amount: [
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
    ethers.utils.parseEther(String(24250000)),
  ]
}

const GFAL_TOKEN = process.env.GFAL_TOKEN_MAINNET

async function main() {
  const vester = new ethers.Wallet(process.env.VESTER_PRIVATE_KEY_MAINNET)

  const VestingBasic = await hre.ethers.getContractFactory("VestingBasic")
  const vestingBasic = await VestingBasic.deploy(GFAL_TOKEN, "0x0", UNLOCK_TIME)

  await vestingBasic.deployed()

  // Executing functions

  let totalVestingAmount = ethers.utils.parseEther(String(0))
  for (let i = 0; i < VESTING_SCHEDULE.amount.length; i++) {
    totalVestingAmount = totalVestingAmount.add(VESTING_SCHEDULE.amount[i])
  }

  await vestingBasic.grantRole(VESTER_ROLE, vester.address)
  await vestingBasic.setVestingSchedule(VESTING_SCHEDULE.when, VESTING_SCHEDULE.amount)

  console.log(
    `VestingBasic "Game" allocation deployed to ${vestingBasic.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})