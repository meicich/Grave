import { ethers } from "hardhat";

async function main() {
  const recieverAddress = '0x5Ad0fFAF8C3605aa36ee4869d639fab23B1EeEA5'

  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  
  console.log("Deploying MyContract...");
  await myContract.deployed();
  console.log(`Deployed MyContract at ${myContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
