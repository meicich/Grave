import { expect } from "chai";
import { ethers } from "hardhat";

describe("DataNFT", function() {
  let DataNFT, dataNFT, dev, owner, addr1, addr2;

  beforeEach(async () => {
    [dev, owner, addr1, addr2] = await ethers.getSigners();
    DataNFT = await ethers.getContractFactory("DataNFT");
    dataNFT = await DataNFT.connect(dev).deploy();
    await dataNFT.deployed();
  });

  describe("Minting NFT", function() {
    it("Should mint NFT with data", async function() {
      await dataNFT.connect(dev).mintNFT(addr1.address, "data1", ethers.constants.AddressZero);
      const tokenData = await dataNFT.dataMapping(1);

      expect(tokenData.data).to.equal("data1");
      expect(tokenData.next).to.equal(ethers.constants.AddressZero);
    });
  });

  describe("Collect Data", function() {
    it("Should collect data from multiple NFTs", async function() {
      await dataNFT.connect(dev).mintNFT(addr1.address, "data1", ethers.constants.AddressZero);
      const tx = await dataNFT.connect(dev).mintNFT(addr1.address, "data2", dataNFT.address);
      const receipt = await tx.wait();
      const tokenId2 = receipt.events?.[0].args?.tokenId;

      // Assume there's a function to update 'next'
      await dataNFT.connect(dev).mintNFT(dev.address, "data1", ethers.constants.AddressZero);

      const collectedData = await dataNFT.collectData(tokenId2);
      expect(collectedData).to.equal("data2");
    });
  });
});
