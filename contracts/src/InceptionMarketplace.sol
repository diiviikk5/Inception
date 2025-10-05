// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";  // ✅ CHANGED
import "@openzeppelin/contracts/access/Ownable.sol";

contract InceptionMarketplace is ReentrancyGuard, Ownable {
    uint256 public platformFee = 500; // 5% = 500 basis points
    uint256 private _listingIdCounter;
    
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
        uint256 listedAt;
    }
    
    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(uint256 => uint256)) public nftToListing;
    
    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    
    event NFTSold(
        uint256 indexed listingId,
        address indexed seller,
        address indexed buyer,
        uint256 price,
        uint256 platformFee
    );
    
    event ListingCancelled(uint256 indexed listingId);
    
    constructor() Ownable(msg.sender) {}
    
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "Not the owner"
        );
        require(
            IERC721(nftContract).isApprovedForAll(msg.sender, address(this)) ||
            IERC721(nftContract).getApproved(tokenId) == address(this),
            "Marketplace not approved"
        );
        
        _listingIdCounter++;
        uint256 listingId = _listingIdCounter;
        
        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            isActive: true,
            listedAt: block.timestamp
        });
        
        nftToListing[nftContract][tokenId] = listingId;
        
        emit NFTListed(listingId, msg.sender, nftContract, tokenId, price);
        
        return listingId;
    }
    
    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Cannot buy own NFT");
        
        listing.isActive = false;
        
        uint256 fee = (listing.price * platformFee) / 10000;
        uint256 sellerAmount = listing.price - fee;
        
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );
        
        payable(listing.seller).transfer(sellerAmount);
        
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
        
        emit NFTSold(listingId, listing.seller, msg.sender, listing.price, fee);
    }
    
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");
        
        listing.isActive = false;
        
        emit ListingCancelled(listingId);
    }
    
    function updatePrice(uint256 listingId, uint256 newPrice) external {
        Listing storage listing = listings[listingId];
        
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");
        require(newPrice > 0, "Invalid price");
        
        listing.price = newPrice;
    }
    
    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function getActiveListing(address nftContract, uint256 tokenId) 
        external 
        view 
        returns (Listing memory) 
    {
        uint256 listingId = nftToListing[nftContract][tokenId];
        return listings[listingId];
    }
}
