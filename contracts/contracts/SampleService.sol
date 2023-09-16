// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DataNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct DataInfo {
        string data;
        uint256 next;  // Changed from address to uint256
    }

    mapping(uint256 => DataInfo) public dataMapping;

    constructor() ERC721("DataNFT", "DNFT") {}

    function mintNFT(address recipient, string memory data, uint256 next) public returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(recipient, tokenId);
        DataInfo memory newData = DataInfo(data, next);
        dataMapping[tokenId] = newData;

        return tokenId;
    }

    function collectData(uint256 startTokenId) public view returns (string memory) {
        string memory result = "";
        uint256 currentTokenId = startTokenId;
        
        while (currentTokenId != 0) {
            DataInfo memory currentData = dataMapping[currentTokenId];
            result = string(abi.encodePacked(result, currentData.data));
            currentTokenId = uint256(uint160(currentData.next));
        }
        
        return result;
    }

    function updateNextForToken(uint256 tokenId, uint256 nextTokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(_exists(nextTokenId), "Next token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the owner");

        DataInfo storage dataInfo = dataMapping[tokenId];
        dataInfo.next = nextTokenId;  // Changed from address to uint256
    }
}

