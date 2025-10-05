// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InceptionCharacters is ERC721, Ownable {
    struct Stats {
        uint16 atk;
        uint16 def;
        uint16 spd;
        uint16 level;
    }

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => Stats) public stats;
    address public battleContract;
    uint256 public nextId;

    constructor() ERC721("Inception Characters", "INCPT") Ownable(msg.sender) {}

    function setBattleContract(address _battle) external onlyOwner {
        battleContract = _battle;
    }

    function mintCharacter(
        address to,
        uint16 atk,
        uint16 def,
        uint16 spd,
        string memory uri
    ) external onlyOwner returns (uint256) {
        uint256 id = ++nextId;
        _mint(to, id);
        _tokenURIs[id] = uri;
        stats[id] = Stats(atk, def, spd, 1);
        return id;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _tokenURIs[tokenId];
    }

    function setTokenURI(uint256 tokenId, string memory newURI) external {
        require(msg.sender == battleContract, "Only battle contract");
        _tokenURIs[tokenId] = newURI;
    }

    function bumpLevel(uint256 tokenId) external {
        require(msg.sender == battleContract, "Only battle contract");
        stats[tokenId].level += 1;
    }
}
