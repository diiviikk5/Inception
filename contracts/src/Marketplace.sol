// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    IERC721 public nft;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed tokenId, uint256 price);
    event Bought(uint256 indexed tokenId, address buyer, uint256 price);
    event Cancelled(uint256 indexed tokenId);

    constructor(address nftAddress) {
        nft = IERC721(nftAddress);
    }

    function list(uint256 tokenId, uint256 price) external {
        require(nft.ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Price must be greater than 0");
        
        nft.approve(address(this), tokenId);
        listings[tokenId] = Listing(msg.sender, price);
        emit Listed(tokenId, price);
    }

    function cancel(uint256 tokenId) external {
        Listing memory l = listings[tokenId];
        require(l.seller == msg.sender, "Not seller");
        delete listings[tokenId];
        emit Cancelled(tokenId);
    }

    function buy(uint256 tokenId) external payable nonReentrant {
        Listing memory l = listings[tokenId];
        require(l.price > 0, "Not listed");
        require(msg.value == l.price, "Wrong price");

        delete listings[tokenId];
        payable(l.seller).transfer(msg.value);
        nft.safeTransferFrom(l.seller, msg.sender, tokenId);

        emit Bought(tokenId, msg.sender, l.price);
    }
}
