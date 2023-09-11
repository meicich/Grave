import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyContract", function () {
  it("Should set the new value of x", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();
    await myContract.deployed();

    await myContract.setX(5);
    expect(await myContract.x()).to.equal(5);
  });
});
