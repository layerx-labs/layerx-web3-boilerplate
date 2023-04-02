import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const PolyChain = await ethers.getContractFactory("PolyContract");
  const polyChain = await PolyChain.deploy(
    "0x7ca7215c6B8013f249A195cc107F97c4e623e5F5", 
    "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", 
    "0x6265623332336430386535363430386138633835323731623264623466313936");

  await polyChain.deployed();
  console.log("Polygon Contract address:", polyChain.address);




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
