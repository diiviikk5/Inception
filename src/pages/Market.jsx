import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { 
  ShoppingCart, Search, Coins, Package, Gift,
  Heart, Check, Loader, Sparkles, Star, Sword, Shield, Zap,
  TrendingUp, Filter, DollarSign, Clock
} from 'lucide-react';
import { GAME_CHARACTERS } from '../data/characters';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';
import { CHARACTERS_ABI } from '../contracts/abis';
import { getMarketplaceListings } from '../utils/marketplaceUtils';
import ListNFTModal from '../components/ListNFTModal';
import PurchaseModal from '../components/PurchaseModal';

const STORAGE_KEY = 'inception_starter_claimed';
const VIRTUAL_NFTS_KEY = 'inception_virtual_nfts';

// 3 Starter Character Options
const STARTER_CHARACTERS = [
  {
    id: 'starter-warrior',
    name: "Shadow Apprentice",
    description: "Balanced warrior with strong offensive capabilities",
    image: "/characters/shadow-knight.jpg",
    rarity: "Starter",
    stats: { attack: 80, defense: 60, speed: 65 },
    class: "Warrior",
    element: "Dark",
    icon: Sword,
    color: "#ef4444"
  },
  {
    id: 'starter-mage',
    name: "Arcane Initiate",
    description: "High damage magic user with devastating spells",
    image: "/characters/flame-knight.jpg",
    rarity: "Starter",
    stats: { attack: 90, defense: 50, speed: 70 },
    class: "Mage",
    element: "Arcane",
    icon: Sparkles,
    color: "#8b5cf6"
  },
  {
    id: 'starter-tank',
    name: "Holy Guardian",
    description: "Defensive tank with incredible durability",
    image: "/characters/holy-paladin.jpg",
    rarity: "Starter",
    stats: { attack: 60, defense: 90, speed: 55 },
    class: "Tank",
    element: "Light",
    icon: Shield,
    color: "#10b981"
  }
];

const DarkGlassCard = ({ children, className = "", glow = false, glowColor = "#00ffff", ...props }) => (
  <motion.div
    className={`relative bg-black/70 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden ${className}`}
    style={{
      boxShadow: glow 
        ? `0 0 40px ${glowColor}40, inset 0 0 30px rgba(0, 0, 0, 0.8)`
        : '0 20px 60px rgba(0, 0, 0, 0.8)',
    }}
    whileHover={glow ? { 
      borderColor: `${glowColor}60`,
      boxShadow: `0 0 60px ${glowColor}60, inset 0 0 30px rgba(0, 0, 0, 0.8)`,
      y: -3
    } : { y: -2 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Starter Character Selection Card
const StarterCard = ({ character, isSelected, onSelect }) => {
  const Icon = character.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(character)}
      className={`relative cursor-pointer ${
        isSelected 
          ? 'border-4' 
          : 'border-2'
      }`}
      style={{
        borderColor: isSelected ? character.color : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? `0 0 40px ${character.color}60` : 'none'
      }}
    >
      <DarkGlassCard glow={isSelected} glowColor={character.color}>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ 
              background: character.color,
              boxShadow: `0 0 20px ${character.color}`
            }}
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
        )}

        <div className="relative h-64 overflow-hidden rounded-t-xl">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle, ${character.color}40, transparent 70%)`
            }}
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${character.color}20`, border: `2px solid ${character.color}` }}
            >
              <Icon className="w-6 h-6" style={{ color: character.color }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{character.name}</h3>
              <p className="text-sm" style={{ color: character.color }}>{character.class}</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-4">{character.description}</p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'ATK', value: character.stats.attack, color: '#ef4444' },
              { label: 'DEF', value: character.stats.defense, color: '#10b981' },
              { label: 'SPD', value: character.stats.speed, color: '#06b6d4' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </DarkGlassCard>
    </motion.div>
  );
};

// Claim Starter Modal
const ClaimStarterModal = ({ onClaim, isOpen }) => {
  const [selectedStarter, setSelectedStarter] = useState(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative max-w-6xl w-full my-8"
        >
          <DarkGlassCard glow glowColor="#10b981" className="p-8">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}

            <div className="text-center relative z-10 mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                🎁
              </motion.div>

              <h2 className="text-5xl font-bold text-white mb-4">
                Choose Your Starter!
              </h2>
              
              <p className="text-xl text-gray-300 mb-2">
                Select your <span className="text-green-400 font-bold">FREE</span> character to begin your journey
              </p>
              <p className="text-sm text-gray-500">
                ✨ Instant access • No wallet needed • Change anytime
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {STARTER_CHARACTERS.map((character) => (
                <StarterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedStarter?.id === character.id}
                  onSelect={setSelectedStarter}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectedStarter && onClaim(selectedStarter)}
              disabled={!selectedStarter}
              className={`w-full max-w-md mx-auto py-4 rounded-xl font-bold text-white text-xl flex items-center justify-center gap-3 ${
                selectedStarter
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 cursor-pointer'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
              style={{ 
                boxShadow: selectedStarter ? '0 10px 40px rgba(16, 185, 129, 0.5)' : 'none',
                display: 'flex'
              }}
            >
              <Gift className="w-6 h-6" />
              {selectedStarter ? `Claim ${selectedStarter.name}` : 'Select a Character'}
              <Sparkles className="w-6 h-6" />
            </motion.button>
          </DarkGlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// NFT Market Item Card
const MarketItemCard = ({ item, index, onMint }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const rarityColors = {
    'Legendary': { gradient: 'from-yellow-500 via-orange-500 to-red-500', glow: '#fbbf24' },
    'Mythic': { gradient: 'from-red-500 via-pink-500 to-purple-500', glow: '#ec4899' },
    'Epic': { gradient: 'from-purple-500 via-blue-500 to-cyan-500', glow: '#8b5cf6' },
    'Rare': { gradient: 'from-blue-500 via-cyan-500 to-teal-500', glow: '#06b6d4' },
  };

  const rarity = rarityColors[item.rarity] || rarityColors['Rare'];

  const handleMint = async () => {
    setIsMinting(true);
    await onMint(item);
    setIsMinting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <DarkGlassCard glow={isHovered} glowColor={rarity.glow} className="h-full">
        <div className="relative h-72 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ 
              filter: isHovered ? 'brightness(1.1)' : 'brightness(0.95)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)'
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen"
            style={{
              background: `radial-gradient(circle, ${rarity.glow}30, transparent 70%)`
            }}
          />

          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
            <motion.div
              className={`px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-xl bg-gradient-to-r ${rarity.gradient}`}
              animate={{ boxShadow: [`0 0 15px ${rarity.glow}60`, `0 0 25px ${rarity.glow}90`, `0 0 15px ${rarity.glow}60`] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.rarity}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
              className="p-2 rounded-lg backdrop-blur-xl bg-black/50 border border-white/10"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
            </motion.button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 backdrop-blur-xl bg-black/70 p-3 rounded-xl border border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-xs text-gray-400">Price</div>
                <div className="text-lg font-bold">{item.price} POL</div>
              </div>
            </div>
            <div className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-lg">
              {item.class}
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-xl font-bold mb-1">{item.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'ATK', value: item.stats.attack, color: '#ef4444' },
              { label: 'DEF', value: item.stats.defense, color: '#10b981' },
              { label: 'SPD', value: item.stats.speed, color: '#06b6d4' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-2 bg-white/5 rounded-lg border border-white/10">
                <div className="text-xs text-gray-400">{stat.label}</div>
                <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMint}
            disabled={isMinting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)' }}
          >
            {isMinting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Minting...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Mint NFT
              </>
            )}
          </motion.button>
        </div>
      </DarkGlassCard>
    </motion.div>
  );
};

// Marketplace Listing Card
const MarketplaceListingCard = ({ listing, onBuy, isOwner }) => {
  const nft = listing.nft;
  const timeSinceListed = Math.floor((Date.now() - listing.listedAt) / 1000 / 60);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <DarkGlassCard glow glowColor="#8b5cf6" className="h-full">
        <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeSinceListed}m ago
        </div>

        <div className="relative h-48 overflow-hidden">
          <img 
            src={nft.image} 
            alt={nft.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-white mb-1 text-lg">{nft.name}</h3>
          <div className="text-xs text-purple-400 mb-3">{nft.class}</div>

          <div className="grid grid-cols-3 gap-1 text-xs mb-3">
            {[
              { label: 'ATK', value: nft.stats.attack, color: '#ef4444' },
              { label: 'DEF', value: nft.stats.defense, color: '#10b981' },
              { label: 'SPD', value: nft.stats.speed, color: '#06b6d4' }
            ].map((stat, i) => (
              <div key={i} className="rounded px-1 py-0.5" style={{ background: `${stat.color}20` }}>
                <div className="font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-500 text-[10px]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Price</span>
            <span className="text-2xl font-bold text-purple-400">${listing.price.toFixed(2)}</span>
          </div>

          {isOwner ? (
            <div className="w-full py-2 rounded-lg bg-gray-700 text-gray-400 text-center text-sm font-bold cursor-not-allowed">
              Your Listing
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBuy}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </motion.button>
          )}
        </div>
      </DarkGlassCard>
    </motion.div>
  );
};

// User NFT Card (for listing)
const UserNFTCard = ({ nft, onList }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <DarkGlassCard glow glowColor="#00ffff" className="h-full">
        <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-cyan-500/20 border border-cyan-500 rounded-full text-xs text-cyan-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          OWNED
        </div>

        <div className="relative h-48 overflow-hidden">
          <img 
            src={nft.image} 
            alt={nft.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-white mb-1 text-lg">{nft.name}</h3>
          <div className="text-xs text-cyan-400 mb-3">{nft.class}</div>

          <div className="grid grid-cols-3 gap-1 text-xs mb-3">
            {[
              { label: 'ATK', value: nft.stats.attack, color: '#ef4444' },
              { label: 'DEF', value: nft.stats.defense, color: '#10b981' },
              { label: 'SPD', value: nft.stats.speed, color: '#06b6d4' }
            ].map((stat, i) => (
              <div key={i} className="rounded px-1 py-0.5" style={{ background: `${stat.color}20` }}>
                <div className="font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-500 text-[10px]">{stat.label}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onList}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            List for Sale
          </motion.button>
        </div>
      </DarkGlassCard>
    </motion.div>
  );
};

// Main Market Component
export default function Market() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [activeTab, setActiveTab] = useState('mint'); // mint, marketplace, myNFTs
  const [sortBy, setSortBy] = useState('newest');
  
  // Trading states
  const [listings, setListings] = useState([]);
  const [userNFTs, setUserNFTs] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [nftToList, setNftToList] = useState(null);
  
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    const hasClaimed = localStorage.getItem(STORAGE_KEY);
    if (!hasClaimed && isConnected) {
      setTimeout(() => setShowClaimModal(true), 1000);
    }
  }, [isConnected]);

  useEffect(() => {
    loadMarketData();
    const interval = setInterval(loadMarketData, 2000);
    return () => clearInterval(interval);
  }, [address]);

  const loadMarketData = () => {
    // Load marketplace listings
    const allListings = getMarketplaceListings().filter(l => l.isActive);
    setListings(allListings);

    // Load user's NFTs
    if (address) {
      const stored = localStorage.getItem(VIRTUAL_NFTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const userOwned = parsed.filter(nft => nft.owner === address);
        setUserNFTs(userOwned);
      }
    }
  };

  const handleClaimStarter = (starter) => {
    const virtualNFTs = JSON.parse(localStorage.getItem(VIRTUAL_NFTS_KEY) || '[]');
    virtualNFTs.push({
      ...starter,
      claimedAt: Date.now(),
      owner: address,
      isStarter: true
    });
    localStorage.setItem(VIRTUAL_NFTS_KEY, JSON.stringify(virtualNFTs));
    localStorage.setItem(STORAGE_KEY, 'true');
    
    setShowClaimModal(false);
    loadMarketData();
    alert(`🎉 ${starter.name} claimed! Check My NFTs tab!`);
  };

  const handleMint = async (character) => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      const metadata = JSON.stringify({
        name: character.name,
        description: character.description,
        image: character.image,
        attributes: [
          { trait_type: "Attack", value: character.stats.attack },
          { trait_type: "Defense", value: character.stats.defense },
          { trait_type: "Speed", value: character.stats.speed },
          { trait_type: "Rarity", value: character.rarity },
          { trait_type: "Class", value: character.class },
          { trait_type: "Element", value: character.element }
        ]
      });

      await writeContract({
        address: CONTRACT_ADDRESSES.InceptionCharacters,
        abi: CHARACTERS_ABI,
        functionName: 'mintCharacter',
        args: [
          address,
          character.stats.attack,
          character.stats.defense,
          character.stats.speed,
          metadata
        ],
        value: parseEther(character.price)
      });
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed! Check console for details.');
    }
  };

  const handleListNFT = (nft) => {
    setNftToList(nft);
    setShowListModal(true);
  };

  const handleBuyNFT = (listing) => {
    setSelectedListing(listing);
    setShowPurchaseModal(true);
  };

  const getFilteredListings = () => {
    let filtered = [...listings];

    if (searchTerm) {
      filtered = filtered.filter(l => 
        l.nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.nft.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.listedAt - a.listedAt);
    }

    return filtered;
  };

  const filteredItems = GAME_CHARACTERS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === 'All' || item.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const filteredListings = getFilteredListings();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <ClaimStarterModal isOpen={showClaimModal} onClaim={handleClaimStarter} />

      <div className="relative z-10 p-6 max-w-[2000px] mx-auto">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
          <motion.h1 
            className="text-5xl font-bold mb-2 flex items-center gap-4"
            style={{
              background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            <ShoppingCart className="w-12 h-12 text-cyan-400" />
            NFT MARKETPLACE
          </motion.h1>
          <p className="text-gray-400 text-lg">Mint, buy, and sell legendary NFT characters</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('mint')}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'mint'
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Package className="w-5 h-5" />
            Mint New NFTs
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'marketplace'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Browse Marketplace ({filteredListings.length})
          </button>

          <button
            onClick={() => setActiveTab('myNFTs')}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'myNFTs'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Gift className="w-5 h-5" />
            My NFTs ({userNFTs.length})
          </button>
        </div>

        {/* Search & Filters */}
        <DarkGlassCard className="p-4 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search characters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none"
              />
            </div>

            {activeTab === 'mint' && (
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none"
              >
                {['All', 'Mythic', 'Legendary', 'Epic', 'Rare'].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            )}

            {activeTab === 'marketplace' && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            )}
          </div>
        </DarkGlassCard>

        {/* Transaction Status */}
        {(isPending || isConfirming || isSuccess) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/50 rounded-xl flex items-center gap-3"
          >
            {isSuccess ? (
              <>
                <Check className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-bold">NFT Minted Successfully! 🎉</span>
              </>
            ) : (
              <>
                <Loader className="w-6 h-6 text-cyan-400 animate-spin" />
                <span className="text-cyan-400 font-bold">
                  {isPending ? 'Confirm transaction in wallet...' : 'Minting NFT on blockchain...'}
                </span>
              </>
            )}
          </motion.div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'mint' && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <MarketItemCard 
                key={item.id} 
                item={item} 
                index={index} 
                onMint={handleMint}
              />
            ))}
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div>
            {filteredListings.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Listings Found</h3>
                <p className="text-gray-400 mb-6">Be the first to list an NFT!</p>
                <button
                  onClick={() => setActiveTab('myNFTs')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold"
                >
                  List Your NFTs
                </button>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {filteredListings.map((listing) => (
                  <MarketplaceListingCard
                    key={listing.id}
                    listing={listing}
                    onBuy={() => handleBuyNFT(listing)}
                    isOwner={address && listing.seller.toLowerCase() === address.toLowerCase()}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'myNFTs' && (
          <div>
            {!isConnected ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Connect Wallet</h3>
                <p className="text-gray-400">Please connect your wallet to view your NFTs</p>
              </div>
            ) : userNFTs.length === 0 ? (
              <div className="text-center py-20">
                <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No NFTs Yet</h3>
                <p className="text-gray-400 mb-6">Claim your FREE starter character or mint a new one!</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowClaimModal(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold flex items-center gap-2"
                  >
                    <Gift className="w-5 h-5" />
                    Claim Free NFT
                  </button>
                  <button
                    onClick={() => setActiveTab('mint')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold flex items-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Mint NFT
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {userNFTs.map((nft) => (
                  <UserNFTCard
                    key={nft.id}
                    nft={nft}
                    onList={() => handleListNFT(nft)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showPurchaseModal && selectedListing && (
          <PurchaseModal
            listing={selectedListing}
            onClose={() => {
              setShowPurchaseModal(false);
              setSelectedListing(null);
            }}
            onSuccess={() => {
              loadMarketData();
            }}
          />
        )}

        {showListModal && nftToList && (
          <ListNFTModal
            nft={nftToList}
            onClose={() => {
              setShowListModal(false);
              setNftToList(null);
            }}
            onSuccess={() => {
              loadMarketData();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
