export const MARKETPLACE_ABI = [
  {
    "inputs": [{"internalType": "address","name": "nftContract","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "uint256","name": "price","type": "uint256"}],
    "name": "listNFT",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "listingId","type": "uint256"}],
    "name": "buyNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "listingId","type": "uint256"}],
    "name": "cancelListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "name": "listings",
    "outputs": [
      {"internalType": "uint256","name": "listingId","type": "uint256"},
      {"internalType": "address","name": "seller","type": "address"},
      {"internalType": "address","name": "nftContract","type": "address"},
      {"internalType": "uint256","name": "tokenId","type": "uint256"},
      {"internalType": "uint256","name": "price","type": "uint256"},
      {"internalType": "bool","name": "isActive","type": "bool"},
      {"internalType": "uint256","name": "listedAt","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "platformFee",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];
