const MARKETPLACE_KEY = 'inception_marketplace_listings';

export const getMarketplaceListings = () => {
  const stored = localStorage.getItem(MARKETPLACE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addListing = (listing) => {
  const listings = getMarketplaceListings();
  const newListing = {
    ...listing,
    id: Date.now(),
    listedAt: Date.now(),
    isActive: true,
  };
  listings.push(newListing);
  localStorage.setItem(MARKETPLACE_KEY, JSON.stringify(listings));
  return newListing;
};

export const removeListing = (listingId) => {
  const listings = getMarketplaceListings();
  const updated = listings.filter(l => l.id !== listingId);
  localStorage.setItem(MARKETPLACE_KEY, JSON.stringify(updated));
};

export const purchaseListing = (listingId, buyer) => {
  const listings = getMarketplaceListings();
  const listingIndex = listings.findIndex(l => l.id === listingId);
  
  if (listingIndex === -1) return null;
  
  const listing = listings[listingIndex];
  listing.isActive = false;
  listing.soldTo = buyer;
  listing.soldAt = Date.now();
  
  // Update NFT owner
  const nfts = JSON.parse(localStorage.getItem('inception_virtual_nfts') || '[]');
  const nftIndex = nfts.findIndex(n => n.id === listing.nftId);
  if (nftIndex !== -1) {
    nfts[nftIndex].owner = buyer;
    localStorage.setItem('inception_virtual_nfts', JSON.stringify(nfts));
  }
  
  localStorage.setItem(MARKETPLACE_KEY, JSON.stringify(listings));
  return listing;
};

export const calculateFees = (price) => {
  const platformFee = price * 0.05; // 5%
  const sellerReceives = price - platformFee;
  return { platformFee, sellerReceives, total: price };
};
