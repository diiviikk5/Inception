import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import { 
  Sword, Shield, Zap, Trophy, Users, Target, 
  Activity, Coins, Package, Loader, ArrowUpRight, 
  ArrowDownRight, Star, Gift, Sparkles, TrendingUp,
  Clock, Award, Flame, ChevronRight
} from 'lucide-react';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';
import { CHARACTERS_ABI } from '../contracts/abis';
import ClaimModal from '../components/ClaimModal';

const VIRTUAL_NFTS_KEY = 'inception_virtual_nfts';
const BATTLE_HISTORY_KEY = 'inception_battle_history';

// Premium Card Component
const PremiumCard = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-black/50 border-white/10",
    glow: "bg-black/50 border-cyan-400/30 shadow-[0_0_40px_rgba(0,255,255,0.15)]",
    premium: "bg-gradient-to-br from-purple-900/20 via-black/50 to-pink-900/20 border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
  };

  return (
    <motion.div
      className={`relative backdrop-blur-2xl border rounded-2xl p-6 ${variants[variant]} ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
    </motion.div>
  );
};

// Virtual NFT Card (UPDATED with Claim Modal)
const VirtualNFTCard = ({ nft, onViewDetails, onClaimSuccess }) => {
  const [statChanges, setStatChanges] = useState({ attack: 0, defense: 0, speed: 0 });
  const [showClaimModal, setShowClaimModal] = useState(false);

  useEffect(() => {
    const baseStats = { attack: 80, defense: 70, speed: 75 };
    setStatChanges({
      attack: nft.stats.attack - baseStats.attack,
      defense: nft.stats.defense - baseStats.defense,
      speed: nft.stats.speed - baseStats.speed
    });
  }, [nft]);

  const isOnChain = nft.onChain === true;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative bg-gradient-to-br from-green-900/20 to-black/50 border-2 border-green-500/50 rounded-xl p-4 cursor-pointer group"
        style={{ boxShadow: isOnChain ? '0 0 20px rgba(6, 182, 212, 0.5)' : '0 0 20px rgba(16, 185, 129, 0.3)' }}
        onClick={() => onViewDetails && onViewDetails(nft)}
      >
        {/* Badge */}
        <div className="absolute top-2 right-2 z-10">
          <div 
            className={`px-2 py-1 border rounded-full text-xs font-bold flex items-center gap-1 ${
              isOnChain 
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                : 'bg-green-500/20 border-green-500 text-green-400'
            }`}
          >
            {isOnChain ? <Sparkles className="w-3 h-3" /> : <Gift className="w-3 h-3" />}
            {isOnChain ? 'ON-CHAIN' : 'STARTER'}
          </div>
        </div>

        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
        />
        <div className="text-center">
          <div className="font-bold text-white mb-1">{nft.name}</div>
          <div className="text-xs text-green-400 mb-2">{nft.class} • {isOnChain ? nft.blockchain?.toUpperCase() : 'Virtual NFT'}</div>
          <div className="grid grid-cols-3 gap-1 text-xs">
            {[
              { label: 'ATK', value: nft.stats.attack, change: statChanges.attack, color: '#ef4444' },
              { label: 'DEF', value: nft.stats.defense, change: statChanges.defense, color: '#10b981' },
              { label: 'SPD', value: nft.stats.speed, change: statChanges.speed, color: '#06b6d4' }
            ].map((stat, i) => (
              <div key={i} className="relative rounded px-1 py-0.5" style={{ background: `${stat.color}20` }}>
                <div className="font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
                {stat.change > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] font-black text-black">
                    +{stat.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {!isOnChain ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-3 py-2 rounded-lg bg-green-600/20 border border-green-500 text-green-400 text-xs font-bold hover:bg-green-600/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowClaimModal(true);
            }}
          >
            Claim on Blockchain
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-3 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500 text-cyan-400 text-xs font-bold hover:bg-cyan-600/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = '/market';
            }}
          >
            List on Marketplace
          </motion.button>
        )}
      </motion.div>

      {/* Claim Modal */}
      <AnimatePresence>
        {showClaimModal && (
          <ClaimModal 
            nft={nft} 
            onClose={() => setShowClaimModal(false)}
            onSuccess={() => {
              setShowClaimModal(false);
              onClaimSuccess && onClaimSuccess();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Blockchain NFT Card
const NFTCard = ({ tokenId }) => {
  const { data: stats } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'stats',
    args: [tokenId],
  });

  const { data: uri } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  let metadata = null;
  if (uri) {
    try {
      metadata = JSON.parse(uri);
    } catch (e) {
      console.error('Failed to parse metadata', e);
    }
  }

  const attack = stats ? Number(stats[0]) : 0;
  const defense = stats ? Number(stats[1]) : 0;
  const speed = stats ? Number(stats[2]) : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative bg-gradient-to-br from-purple-900/20 to-black/50 border border-purple-500/30 rounded-xl p-4"
    >
      {/* ON-CHAIN Badge */}
      <div className="absolute top-2 right-2 z-10">
        <div className="px-2 py-1 bg-purple-500/20 border border-purple-500 rounded-full text-xs font-bold text-purple-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          ON-CHAIN
        </div>
      </div>

      {metadata?.image && (
        <img 
          src={metadata.image} 
          alt={metadata.name || `NFT #${tokenId}`}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}
      <div className="text-center">
        <div className="font-bold text-white mb-1">#{tokenId}</div>
        <div className="text-xs text-purple-400 mb-2">{metadata?.name || 'Character'}</div>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="bg-red-500/20 rounded px-1 py-0.5">
            <div className="text-red-400">{attack}</div>
            <div className="text-gray-500">ATK</div>
          </div>
          <div className="bg-green-500/20 rounded px-1 py-0.5">
            <div className="text-green-400">{defense}</div>
            <div className="text-gray-500">DEF</div>
          </div>
          <div className="bg-blue-500/20 rounded px-1 py-0.5">
            <div className="text-blue-400">{speed}</div>
            <div className="text-gray-500">SPD</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// NFT Collection Display (UPDATED with refresh on claim)
const NFTCollection = ({ address, refreshTrigger }) => {
  const [virtualNFTs, setVirtualNFTs] = useState([]);

  const { data: balance, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  const nftCount = balance ? Number(balance) : 0;

  const tokenCalls = Array.from({ length: nftCount }, (_, i) => ({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, i],
  }));

  const { data: tokenIds } = useReadContracts({
    contracts: tokenCalls,
  });

  const loadVirtualNFTs = () => {
    const stored = localStorage.getItem(VIRTUAL_NFTS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVirtualNFTs(parsed.filter(nft => nft.owner === address));
      } catch (e) {
        console.error('Failed to parse virtual NFTs', e);
      }
    }
  };

  useEffect(() => {
    loadVirtualNFTs();
    const interval = setInterval(loadVirtualNFTs, 1000);
    return () => clearInterval(interval);
  }, [address, refreshTrigger]);

  const totalNFTs = nftCount + virtualNFTs.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (totalNFTs === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">No NFTs Yet</h3>
        <p className="text-gray-400 mb-6">Get started by claiming your FREE starter character!</p>
        
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/market'}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-bold text-white text-lg flex items-center gap-3 mx-auto"
          style={{ boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)' }}
        >
          <Gift className="w-6 h-6" />
          Claim FREE Starter
          <Sparkles className="w-6 h-6" />
        </motion.button>
        
        <p className="text-sm text-gray-500 mt-4">
          ✨ Instant access • No wallet needed • Explore full game features
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Your NFT Collection ({totalNFTs})</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Virtual ({virtualNFTs.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-400">On-Chain ({nftCount})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {virtualNFTs.map((nft, idx) => (
          <VirtualNFTCard 
            key={`virtual-${nft.id || idx}`} 
            nft={nft} 
            onClaimSuccess={loadVirtualNFTs}
          />
        ))}

        {tokenIds?.map((result, idx) => {
          const tokenId = result.result ? Number(result.result) : null;
          return tokenId !== null ? (
            <NFTCard key={`chain-${idx}`} tokenId={tokenId} />
          ) : null;
        })}
      </div>

      {virtualNFTs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
        >
          <Gift className="w-5 h-5 text-green-400" />
          <div className="flex-1">
            <p className="text-sm text-green-400 font-bold">Virtual NFTs are ready to use!</p>
            <p className="text-xs text-gray-400">Battle, trade, and explore. Claim on blockchain anytime to make them permanent.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Battle History Component
const BattleHistory = ({ address }) => {
  const [battleHistory, setBattleHistory] = useState([]);

  useEffect(() => {
    const loadBattleHistory = () => {
      const stored = localStorage.getItem(BATTLE_HISTORY_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const sorted = parsed.sort((a, b) => b.date - a.date);
          setBattleHistory(sorted.slice(0, 5));
        } catch (e) {
          console.error('Failed to parse battle history', e);
        }
      }
    };

    loadBattleHistory();
    const interval = setInterval(loadBattleHistory, 1000);
    return () => clearInterval(interval);
  }, [address]);

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (battleHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Battles Yet</h3>
        <p className="text-gray-400 mb-6">Enter the arena and start your legend!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/arena'}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white flex items-center gap-2 mx-auto"
        >
          <Sword className="w-5 h-5" />
          Enter Arena
        </motion.button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {battleHistory.map((battle, idx) => (
        <motion.div
          key={battle.date + idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative p-3 rounded-xl bg-gradient-to-r from-green-900/20 to-black/50 border border-green-500/30 group hover:border-green-500/50 transition-colors overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{battle.winner}</div>
              <div className="text-xs text-gray-500 truncate">vs {battle.loser}</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{formatTimeAgo(battle.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { label: 'A', value: battle.rewards?.attack, color: '#ef4444' },
                { label: 'D', value: battle.rewards?.defense, color: '#10b981' },
                { label: 'S', value: battle.rewards?.speed, color: '#06b6d4' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-1" style={{ color: stat.color }}>
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-bold text-xs">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
          />
        </motion.div>
      ))}

      {battleHistory.length >= 5 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => window.location.href = '/arena'}
          className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold hover:bg-white/10 transition-colors text-sm"
        >
          View All Battles
        </motion.button>
      )}
    </div>
  );
};

// Stat Card
const StatCard = ({ icon: Icon, label, value, trend, color, isLoading }) => (
  <motion.div whileHover={{ y: -4, scale: 1.02 }}>
    <PremiumCard>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}40` }}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" style={{ color }} />
            ) : (
              <Icon className="w-6 h-6" style={{ color }} />
            )}
          </div>
          <div>
            <div className="text-sm text-gray-400">{label}</div>
            <div className="text-2xl font-bold text-white">
              {isLoading ? '...' : value}
            </div>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="text-sm font-bold">{trend}</span>
          </div>
        )}
      </div>
    </PremiumCard>
  </motion.div>
);

// Main Dashboard
export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [virtualNFTCount, setVirtualNFTCount] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: nftBalance, isLoading: isLoadingBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: totalSupply, isLoading: isLoadingSupply } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'totalSupply',
  });

  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(VIRTUAL_NFTS_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const userVirtual = parsed.filter(nft => nft.owner === address);
          setVirtualNFTCount(userVirtual.length);
        } catch (e) {
          console.error('Failed to parse virtual NFTs', e);
        }
      }

      const battleHistory = localStorage.getItem(BATTLE_HISTORY_KEY);
      if (battleHistory) {
        try {
          const parsed = JSON.parse(battleHistory);
          setTotalWins(parsed.length);
        } catch (e) {
          console.error('Failed to parse battle history', e);
        }
      }
    }
  }, [address, refreshTrigger]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view your dashboard</p>
        </div>
      </div>
    );
  }

  const blockchainNFTs = nftBalance ? Number(nftBalance) : 0;
  const totalNFTs = blockchainNFTs + virtualNFTCount;

  const stats = [
    { 
      icon: Package, 
      label: 'Your NFTs', 
      value: totalNFTs, 
      trend: virtualNFTCount > 0 ? `+${virtualNFTCount} virtual` : null,
      color: '#8b5cf6',
      isLoading: isLoadingBalance
    },
    { 
      icon: Users, 
      label: 'Total Minted', 
      value: totalSupply ? Number(totalSupply) : 0, 
      color: '#10b981',
      isLoading: isLoadingSupply
    },
    { 
      icon: Trophy, 
      label: 'Battle Wins', 
      value: totalWins, 
      trend: totalWins > 0 ? `+${totalWins} victories` : null,
      color: '#ef4444',
      isLoading: false
    },
    { 
      icon: Flame, 
      label: 'Win Streak', 
      value: totalWins >= 3 ? `${Math.min(totalWins, 10)} 🔥` : totalWins, 
      color: '#fbbf24',
      isLoading: false
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">
                Welcome back, <span className="text-cyan-400 font-bold">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'WARRIOR'}</span>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/arena'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white flex items-center gap-2"
              style={{ boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
            >
              <Sword className="w-5 h-5" />
              Enter Arena
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* NFT Collection - 2 columns */}
          <div className="col-span-2">
            <PremiumCard>
              <NFTCollection address={address} refreshTrigger={refreshTrigger} />
            </PremiumCard>
          </div>

          {/* Battle History - 1 column */}
          <div className="col-span-1">
            <PremiumCard>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Recent Battles
              </h3>
              <BattleHistory address={address} />
            </PremiumCard>
          </div>
        </div>

        {/* Quick Actions */}
        <PremiumCard>
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => window.location.href = '/arena'}
              className="p-6 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-500/30 text-center group"
            >
              <Sword className="w-12 h-12 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white mb-1">Battle Arena</div>
              <div className="text-xs text-gray-400">Fight AI opponents</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => window.location.href = '/market'}
              className="p-6 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 text-center group"
            >
              <Package className="w-12 h-12 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white mb-1">Marketplace</div>
              <div className="text-xs text-gray-400">Mint new characters</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => window.location.href = '/leaderboard'}
              className="p-6 rounded-xl bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 text-center group"
            >
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white mb-1">Leaderboard</div>
              <div className="text-xs text-gray-400">View rankings</div>
            </motion.button>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
