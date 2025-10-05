import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import {
  Layers, Plus, Trash2, Star, Zap, Shield, Sword, Heart,
  Sparkles, Flame, Crown, Trophy, Target, Gift, Package, ShoppingCart,
  Coins, Gem, Clock, CheckCircle, X, TrendingUp, Award, Settings,
  Shuffle, Save, Filter, Search, Grid, List, Palette, Eye, Lock
} from 'lucide-react';

// ==================== CONSTANTS ====================
const ARENA_TOKENS_KEY = 'inception_arena_tokens';
const GEMS_KEY = 'inception_gems';
const DAILY_REWARD_KEY = 'inception_daily_reward';
const COSMETICS_KEY = 'inception_cosmetics';
const UPGRADES_KEY = 'inception_upgrades';
const VIRTUAL_NFTS_KEY = 'inception_virtual_nfts';
const BATTLE_HISTORY_KEY = 'inception_battle_history';

const RARITIES = {
  common: { name: 'Common', color: '#9ca3af', chance: 50 },
  uncommon: { name: 'Uncommon', color: '#10b981', chance: 30 },
  rare: { name: 'Rare', color: '#3b82f6', chance: 12 },
  epic: { name: 'Epic', color: '#a855f7', chance: 6 },
  legendary: { name: 'Legendary', color: '#f59e0b', chance: 1.5 },
  mythic: { name: 'Mythic', color: '#ec4899', chance: 0.5 }
};

const COSMETIC_ITEMS = [
  {
    id: 'cardback_1',
    name: 'Cyber Grid',
    type: 'cardback',
    rarity: 'common',
    price: 500,
    gemPrice: 50,
    preview: '🎴',
    description: 'Futuristic grid pattern'
  },
  {
    id: 'cardback_2',
    name: 'Dragon Scales',
    type: 'cardback',
    rarity: 'rare',
    price: 2000,
    gemPrice: 200,
    preview: '🐉',
    description: 'Legendary dragon scales'
  },
  {
    id: 'effect_1',
    name: 'Lightning Strike',
    type: 'effect',
    rarity: 'epic',
    price: 3000,
    gemPrice: 300,
    preview: '⚡',
    description: 'Electric battle effect'
  },
  {
    id: 'effect_2',
    name: 'Flame Burst',
    type: 'effect',
    rarity: 'legendary',
    price: 5000,
    gemPrice: 500,
    preview: '🔥',
    description: 'Explosive fire effect'
  },
  {
    id: 'frame_1',
    name: 'Gold Frame',
    type: 'frame',
    rarity: 'epic',
    price: 4000,
    gemPrice: 400,
    preview: '👑',
    description: 'Premium gold border'
  }
];

const UPGRADE_TYPES = [
  {
    id: 'stat_boost_attack',
    name: 'Attack Boost +1',
    cost: 500,
    stat: 'attack',
    value: 1,
    icon: Sword,
    color: '#ef4444'
  },
  {
    id: 'stat_boost_defense',
    name: 'Defense Boost +1',
    cost: 500,
    stat: 'defense',
    value: 1,
    icon: Shield,
    color: '#10b981'
  },
  {
    id: 'stat_boost_speed',
    name: 'Speed Boost +1',
    cost: 500,
    stat: 'speed',
    value: 1,
    icon: Zap,
    color: '#06b6d4'
  }
];

// ==================== UTILITY FUNCTIONS ====================
const getStoredValue = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStoredValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ==================== COMPONENTS ====================

// Premium Card
const PremiumCard = ({ children, className = "", glow = false, glowColor = "#00ffff" }) => (
  <motion.div
    className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl ${className}`}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    style={{ boxShadow: glow ? `0 0 40px ${glowColor}40` : undefined }}
  >
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </motion.div>
);

// NFT Card Component
// NFT Card Component (FIXED)
const NFTCard = ({ nft, onClick, isSelected, showUpgrade = false, onUpgrade }) => {
  // Default to 'common' if rarity doesn't exist
  const rarityKey = nft.rarity || 'common';
  const rarity = RARITIES[rarityKey] || RARITIES.common;
  
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer group ${isSelected ? 'ring-4 ring-cyan-400' : ''}`}
    >
      <div 
        className="relative bg-black/60 backdrop-blur-xl border-2 rounded-2xl p-4 overflow-hidden"
        style={{ borderColor: rarity.color, boxShadow: `0 10px 40px ${rarity.color}60` }}
      >
        {/* Level Badge */}
        <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-bold bg-black/80 text-cyan-400 border border-cyan-400/50">
          Lv.{nft.level || 1}
        </div>

        {/* Rarity Badge */}
        <div className="absolute top-2 right-2 z-10">
          <div 
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: `${rarity.color}40`, border: `1px solid ${rarity.color}`, color: rarity.color }}
          >
            {rarity.name}
          </div>
        </div>

        {/* Image */}
        <div 
          className="w-full h-48 rounded-xl flex items-center justify-center text-7xl mb-4 overflow-hidden"
          style={{ background: `radial-gradient(circle, ${rarity.color}40 0%, transparent 70%)` }}
        >
          <img src={nft.image} alt={nft.name} className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{nft.name}</h3>
          <div className="text-sm text-gray-400">{nft.class}</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'ATK', value: nft.stats?.attack || 0, icon: Sword, color: '#ef4444' },
            { label: 'DEF', value: nft.stats?.defense || 0, icon: Shield, color: '#10b981' },
            { label: 'SPD', value: nft.stats?.speed || 0, icon: Zap, color: '#3b82f6' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: stat.color }} />
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Upgrade Button */}
        {showUpgrade && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onUpgrade && onUpgrade(nft);
            }}
            className="w-full py-2 rounded-lg bg-cyan-500 text-white font-bold text-sm"
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Upgrade
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};


// Daily Rewards Component  
const DailyRewards = ({ onClaim, tokens, gems }) => {
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [canClaim, setCanClaim] = useState(true);
  const [claimedDay, setClaimedDay] = useState(0);

  useEffect(() => {
    const dailyData = getStoredValue(DAILY_REWARD_KEY, { lastClaim: 0, day: 0 });
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    if (now - dailyData.lastClaim < dayInMs) {
      setCanClaim(false);
      setClaimedDay(dailyData.day);
    } else {
      setClaimedDay(dailyData.day);
      setCanClaim(true);
    }

    // Update countdown
    const interval = setInterval(() => {
      if (dailyData.lastClaim === 0) {
        setTimeUntilReset('Available');
        return;
      }
      
      const nextReset = dailyData.lastClaim + dayInMs;
      const remaining = nextReset - Date.now();
      
      if (remaining <= 0) {
        setTimeUntilReset('Available');
        setCanClaim(true);
      } else {
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        const secs = Math.floor((remaining % (60 * 1000)) / 1000);
        setTimeUntilReset(`${hours}h ${mins}m ${secs}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rewards = [
    { day: 1, type: 'tokens', amount: 100, icon: Coins, color: '#fbbf24' },
    { day: 2, type: 'tokens', amount: 200, icon: Coins, color: '#fbbf24' },
    { day: 3, type: 'gems', amount: 25, icon: Gem, color: '#ec4899' },
    { day: 4, type: 'tokens', amount: 300, icon: Coins, color: '#fbbf24' },
    { day: 5, type: 'gems', amount: 50, icon: Gem, color: '#ec4899' },
    { day: 6, type: 'tokens', amount: 500, icon: Coins, color: '#fbbf24' },
    { day: 7, type: 'gems', amount: 100, icon: Gem, color: '#ec4899' }
  ];

  const handleClaim = () => {
    if (!canClaim) return;
    
    const nextDay = (claimedDay % 7) + 1;
    const reward = rewards[nextDay - 1];
    
    if (reward.type === 'tokens') {
      onClaim({ tokens: reward.amount, gems: 0 });
    } else {
      onClaim({ tokens: 0, gems: reward.amount });
    }
    
    setStoredValue(DAILY_REWARD_KEY, {
      lastClaim: Date.now(),
      day: nextDay
    });
    
    setCanClaim(false);
    setClaimedDay(nextDay);
  };

  return (
    <PremiumCard glow glowColor="#fbbf24" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Gift className="w-7 h-7 text-yellow-400" />
          Daily Rewards
        </h3>
        <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500 text-yellow-400 font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {timeUntilReset}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-6">
        {rewards.map((reward, idx) => {
          const Icon = reward.icon;
          const isClaimed = idx < claimedDay;
          const isToday = idx === claimedDay && canClaim;
          
          return (
            <motion.div
              key={reward.day}
              whileHover={isToday ? { scale: 1.05, y: -5 } : {}}
              className={`relative p-6 rounded-2xl text-center ${
                isClaimed ? 'bg-gray-900/50 border-2 border-gray-700' :
                isToday ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500 animate-pulse' :
                'bg-black/40 border-2 border-white/10'
              }`}
            >
              {isClaimed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
              )}
              
              <div className="text-sm text-gray-400 mb-2">Day {reward.day}</div>
              <Icon className="w-12 h-12 mx-auto mb-2" style={{ color: reward.color }} />
              <div className="font-bold text-white">{reward.amount}</div>
              <div className="text-xs text-gray-400 capitalize">{reward.type}</div>
            </motion.div>
          );
        })}
      </div>

      {canClaim && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClaim}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 font-bold text-white text-lg"
        >
          Claim Day {(claimedDay % 7) + 1} Reward!
        </motion.button>
      )}
    </PremiumCard>
  );
};

// Cosmetics Shop Component
const CosmeticsShop = ({ tokens, gems, onPurchase }) => {
  const [ownedCosmetics, setOwnedCosmetics] = useState([]);

  useEffect(() => {
    setOwnedCosmetics(getStoredValue(COSMETICS_KEY, []));
  }, []);

  const handlePurchase = (item, useGems = false) => {
    const cost = useGems ? item.gemPrice : item.price;
    const currency = useGems ? 'gems' : 'tokens';
    
    if ((useGems && gems < cost) || (!useGems && tokens < cost)) {
      alert('Not enough currency!');
      return;
    }
    
    const newOwned = [...ownedCosmetics, item.id];
    setOwnedCosmetics(newOwned);
    setStoredValue(COSMETICS_KEY, newOwned);
    
    onPurchase({ tokens: useGems ? 0 : -cost, gems: useGems ? -cost : 0 });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Cosmetics Store</h2>
      <div className="grid grid-cols-4 gap-6">
        {COSMETIC_ITEMS.map((item) => {
          const rarity = RARITIES[item.rarity];
          const owned = ownedCosmetics.includes(item.id);
          
          return (
            <PremiumCard key={item.id} glow glowColor={rarity.color} className="p-6">
              <div className="text-center mb-4">
                <div className="text-7xl mb-3">{item.preview}</div>
                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${rarity.color}30`, color: rarity.color }}
                >
                  {rarity.name}
                </span>
              </div>

              {owned ? (
                <div className="py-3 rounded-xl bg-green-500/20 border-2 border-green-500 text-green-400 font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Owned
                </div>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePurchase(item, false)}
                    className="flex-1 py-3 rounded-xl bg-yellow-500 text-black font-bold flex items-center justify-center gap-2"
                  >
                    <Coins className="w-4 h-4" />
                    {item.price}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePurchase(item, true)}
                    className="flex-1 py-3 rounded-xl bg-pink-500 text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Gem className="w-4 h-4" />
                    {item.gemPrice}
                  </motion.button>
                </div>
              )}
            </PremiumCard>
          );
        })}
      </div>
    </div>
  );
};

// Upgrade System Component
const UpgradeSystem = ({ virtualNFTs, tokens, onUpgrade }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);

  const handleUpgrade = () => {
    if (!selectedNFT || !selectedUpgrade) return;
    
    if (tokens < selectedUpgrade.cost) {
      alert('Not enough tokens!');
      return;
    }
    
    onUpgrade({
      nftId: selectedNFT.id,
      upgrade: selectedUpgrade,
      cost: selectedUpgrade.cost
    });
    
    setSelectedNFT(null);
    setSelectedUpgrade(null);
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Select NFT */}
      <PremiumCard className="p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Select Character</h3>
        <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
          {virtualNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedNFT(nft)}
              className={`p-4 rounded-xl cursor-pointer border-2 ${
                selectedNFT?.id === nft.id ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 bg-black/40'
              }`}
            >
              <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              <div className="text-white font-bold text-center">{nft.name}</div>
              <div className="text-xs text-gray-400 text-center">Lv.{nft.level || 1}</div>
            </motion.div>
          ))}
        </div>
      </PremiumCard>

      {/* Select Upgrade */}
      <PremiumCard className="p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Choose Upgrade</h3>
        
        {selectedNFT ? (
          <div>
            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-3">Current Stats</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'ATK', value: selectedNFT.stats.attack, color: '#ef4444' },
                  { label: 'DEF', value: selectedNFT.stats.defense, color: '#10b981' },
                  { label: 'SPD', value: selectedNFT.stats.speed, color: '#06b6d4' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-black/40">
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {UPGRADE_TYPES.map((upgrade) => {
                const Icon = upgrade.icon;
                const isSelected = selectedUpgrade?.id === upgrade.id;
                
                return (
                  <motion.button
                    key={upgrade.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedUpgrade(upgrade)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 ${
                      isSelected ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 bg-black/40'
                    }`}
                  >
                    <Icon className="w-8 h-8" style={{ color: upgrade.color }} />
                    <div className="flex-1 text-left">
                      <div className="font-bold text-white">{upgrade.name}</div>
                      <div className="text-sm text-gray-400">+{upgrade.value} {upgrade.stat}</div>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400 font-bold">
                      <Coins className="w-5 h-5" />
                      {upgrade.cost}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedUpgrade && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpgrade}
                className="w-full mt-6 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-white text-lg"
              >
                Upgrade for {selectedUpgrade.cost} Tokens
              </motion.button>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Select a character to upgrade
          </div>
        )}
      </PremiumCard>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function DeckBuilder() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('collection');
  const [tokens, setTokens] = useState(0);
  const [gems, setGems] = useState(0);
  const [virtualNFTs, setVirtualNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);

  // Load data
  useEffect(() => {
    if (!address) return;
    
    setTokens(getStoredValue(ARENA_TOKENS_KEY, 1000));
    setGems(getStoredValue(GEMS_KEY, 100));
    
    const allNFTs = getStoredValue(VIRTUAL_NFTS_KEY, []);
    setVirtualNFTs(allNFTs.filter(nft => nft.owner === address));
  }, [address]);

  // Handle daily reward claim
  const handleDailyClaim = ({ tokens: t, gems: g }) => {
    const newTokens = tokens + t;
    const newGems = gems + g;
    
    setTokens(newTokens);
    setGems(newGems);
    
    setStoredValue(ARENA_TOKENS_KEY, newTokens);
    setStoredValue(GEMS_KEY, newGems);
  };

  // Handle cosmetic purchase
  const handleCosmeticPurchase = ({ tokens: t, gems: g }) => {
    const newTokens = tokens + t;
    const newGems = gems + g;
    
    setTokens(newTokens);
    setGems(newGems);
    
    setStoredValue(ARENA_TOKENS_KEY, newTokens);
    setStoredValue(GEMS_KEY, newGems);
  };

  // Handle NFT upgrade
  const handleUpgrade = ({ nftId, upgrade, cost }) => {
    const allNFTs = getStoredValue(VIRTUAL_NFTS_KEY, []);
    const nftIndex = allNFTs.findIndex(n => n.id === nftId);
    
    if (nftIndex !== -1) {
      allNFTs[nftIndex].stats[upgrade.stat] += upgrade.value;
      setStoredValue(VIRTUAL_NFTS_KEY, allNFTs);
      setVirtualNFTs(allNFTs.filter(nft => nft.owner === address));
    }
    
    const newTokens = tokens - cost;
    setTokens(newTokens);
    setStoredValue(ARENA_TOKENS_KEY, newTokens);
  };

  const tabs = [
    { id: 'collection', label: 'Collection', icon: Layers },
    { id: 'upgrades', label: 'Upgrades', icon: TrendingUp },
    { id: 'cosmetics', label: 'Cosmetics', icon: Palette },
    { id: 'store', label: 'Token Store', icon: ShoppingCart }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <div className="relative z-10 p-8 max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 
              className="text-5xl font-bold mb-2"
              style={{
                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              DECK BUILDER
            </h1>
            <p className="text-gray-400 text-lg">Customize & upgrade your champions</p>
          </div>

          {/* Currency Display */}
          <div className="flex gap-4">
            <PremiumCard className="px-6 py-3 flex items-center gap-3">
              <Coins className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{tokens.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Arena Tokens</div>
              </div>
            </PremiumCard>
            <PremiumCard className="px-6 py-3 flex items-center gap-3">
              <Gem className="w-6 h-6 text-pink-400" />
              <div>
                <div className="text-2xl font-bold text-white">{gems}</div>
                <div className="text-xs text-gray-400">Gems</div>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-xl font-bold flex items-center gap-3 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Daily Rewards */}
        <div className="mb-8">
          <DailyRewards onClaim={handleDailyClaim} tokens={tokens} gems={gems} />
        </div>

        {/* Content */}
        {activeTab === 'collection' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Your Collection ({virtualNFTs.length})</h2>
            <div className="grid grid-cols-5 gap-6">
              {virtualNFTs.map((nft) => (
                <NFTCard 
                  key={nft.id} 
                  nft={nft} 
                  onClick={() => setSelectedNFT(nft)}
                  isSelected={selectedNFT?.id === nft.id}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upgrades' && (
          <UpgradeSystem 
            virtualNFTs={virtualNFTs} 
            tokens={tokens} 
            onUpgrade={handleUpgrade}
          />
        )}

        {activeTab === 'cosmetics' && (
          <CosmeticsShop 
            tokens={tokens} 
            gems={gems} 
            onPurchase={handleCosmeticPurchase}
          />
        )}

        {activeTab === 'store' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Token Store</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { name: '1,000 Tokens', emoji: '💰', price: '$4.99', tokens: 1000, color: '#fbbf24' },
                { name: '5,000 Tokens', emoji: '💎', price: '$19.99', tokens: 5000, color: '#8b5cf6' },
                { name: '100 Gems', emoji: '💠', price: '$9.99', gems: 100, color: '#ec4899' }
              ].map((bundle, idx) => (
                <PremiumCard key={idx} glow glowColor={bundle.color} className="p-8 text-center">
                  <div className="text-7xl mb-4">{bundle.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-4 rounded-xl font-bold text-xl"
                    style={{ background: bundle.color }}
                  >
                    Buy {bundle.price}
                  </motion.button>
                </PremiumCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
