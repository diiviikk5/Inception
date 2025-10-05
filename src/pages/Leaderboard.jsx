import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { 
  Trophy, Crown, Medal, Flame, Swords, Target, 
  TrendingUp, Award, Star, Shield, Zap, Users,
  ChevronUp, ChevronDown, Activity, Clock
} from 'lucide-react';

const BATTLE_HISTORY_KEY = 'inception_battle_history';
const VIRTUAL_NFTS_KEY = 'inception_virtual_nfts';

// Premium Card Component
const PremiumCard = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-black/50 border-white/10",
    glow: "bg-black/50 border-cyan-400/30 shadow-[0_0_40px_rgba(0,255,255,0.15)]",
    premium: "bg-gradient-to-br from-purple-900/20 via-black/50 to-pink-900/20 border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    gold: "bg-gradient-to-br from-yellow-900/30 via-black/50 to-orange-900/30 border-yellow-500/50 shadow-[0_0_50px_rgba(251,191,36,0.3)]"
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

// Rank Badge Component
const RankBadge = ({ rank }) => {
  const badges = {
    1: { icon: Crown, color: '#fbbf24', glow: 'shadow-[0_0_30px_rgba(251,191,36,0.6)]', bg: 'from-yellow-600/30 to-orange-600/30', border: 'border-yellow-500' },
    2: { icon: Medal, color: '#e5e7eb', glow: 'shadow-[0_0_25px_rgba(229,231,235,0.5)]', bg: 'from-gray-400/30 to-gray-500/30', border: 'border-gray-400' },
    3: { icon: Award, color: '#cd7f32', glow: 'shadow-[0_0_20px_rgba(205,127,50,0.5)]', bg: 'from-orange-700/30 to-amber-800/30', border: 'border-orange-600' }
  };

  const badge = badges[rank];
  if (!badge) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-2 border-gray-600 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-400">#{rank}</span>
      </div>
    );
  }

  const Icon = badge.icon;

  return (
    <motion.div
      className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.bg} border-3 ${badge.border} flex items-center justify-center ${badge.glow}`}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Icon className="w-7 h-7" style={{ color: badge.color }} />
    </motion.div>
  );
};

// Leaderboard Row Component
const LeaderboardRow = ({ player, index, isCurrentUser }) => {
  const rank = index + 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative p-4 rounded-xl border-2 group transition-all ${
        isCurrentUser 
          ? 'bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]'
          : rank <= 3
            ? 'bg-gradient-to-r from-yellow-900/20 to-black/50 border-yellow-500/30 hover:border-yellow-500/60'
            : 'bg-gradient-to-r from-white/5 to-black/50 border-white/10 hover:border-white/30'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Rank Badge */}
        <div className="flex-shrink-0">
          <RankBadge rank={rank} />
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-white truncate">{player.name}</span>
            {isCurrentUser && (
              <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500 rounded-full text-xs font-bold text-cyan-400">
                YOU
              </span>
            )}
            {player.streak >= 3 && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-500/20 border border-orange-500 rounded-full">
                <Flame className="w-3 h-3 text-orange-400" />
                <span className="text-xs font-bold text-orange-400">{player.streak}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {player.wins} wins
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {player.totalBattles} battles
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {player.winRate}% win rate
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          {[
            { label: 'ATK', value: player.stats?.attack || 0, color: '#ef4444' },
            { label: 'DEF', value: player.stats?.defense || 0, color: '#10b981' },
            { label: 'SPD', value: player.stats?.speed || 0, color: '#06b6d4' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Total Power */}
        <div className="flex-shrink-0 text-center">
          <div className="text-xs text-gray-500 mb-1">POWER</div>
          <div className="text-2xl font-black text-yellow-400">
            {player.totalPower}
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      {rank <= 3 && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}
        />
      )}
    </motion.div>
  );
};

// Stats Card
const StatsCard = ({ icon: Icon, label, value, color, trend }) => (
  <PremiumCard>
    <div className="flex items-center gap-4">
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20`, border: `2px solid ${color}40` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-400 mb-1">{label}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          <span className="text-sm font-bold">{Math.abs(trend)}</span>
        </div>
      )}
    </div>
  </PremiumCard>
);

// Main Leaderboard
export default function Leaderboard() {
  const { address, isConnected } = useAccount();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [filter, setFilter] = useState('all'); // all, weekly, monthly

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(loadLeaderboard, 5000);
    return () => clearInterval(interval);
  }, [address]);

  const loadLeaderboard = () => {
    try {
      // Load all virtual NFTs
      const virtualNFTsData = localStorage.getItem(VIRTUAL_NFTS_KEY);
      const virtualNFTs = virtualNFTsData ? JSON.parse(virtualNFTsData) : [];

      // Load battle history
      const battleHistoryData = localStorage.getItem(BATTLE_HISTORY_KEY);
      const battleHistory = battleHistoryData ? JSON.parse(battleHistoryData) : [];

      // Group NFTs by owner
      const playerMap = new Map();

      virtualNFTs.forEach(nft => {
        if (!playerMap.has(nft.owner)) {
          playerMap.set(nft.owner, {
            address: nft.owner,
            name: nft.name || `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`,
            wins: 0,
            losses: 0,
            totalBattles: 0,
            streak: 0,
            stats: { attack: nft.stats.attack, defense: nft.stats.defense, speed: nft.stats.speed },
            totalPower: nft.stats.attack + nft.stats.defense + nft.stats.speed,
            lastBattle: null
          });
        } else {
          // Update with highest stats
          const player = playerMap.get(nft.owner);
          const newPower = nft.stats.attack + nft.stats.defense + nft.stats.speed;
          if (newPower > player.totalPower) {
            player.stats = { attack: nft.stats.attack, defense: nft.stats.defense, speed: nft.stats.speed };
            player.totalPower = newPower;
          }
        }
      });

      // Count wins from battle history
      battleHistory.forEach(battle => {
        // Assume winner is the first virtual NFT owner
        const winner = virtualNFTs[0]?.owner;
        if (winner && playerMap.has(winner)) {
          const player = playerMap.get(winner);
          player.wins++;
          player.totalBattles++;
          player.streak++;
          player.lastBattle = battle.date;
        }
      });

      // Calculate win rates
      playerMap.forEach(player => {
        player.winRate = player.totalBattles > 0 
          ? Math.round((player.wins / player.totalBattles) * 100) 
          : 0;
      });

      // Convert to array and sort
      const leaderboardArray = Array.from(playerMap.values())
        .filter(player => player.totalBattles > 0) // Only show players with battles
        .sort((a, b) => {
          // Sort by total power first
          if (b.totalPower !== a.totalPower) {
            return b.totalPower - a.totalPower;
          }
          // Then by wins
          if (b.wins !== a.wins) {
            return b.wins - a.wins;
          }
          // Then by win rate
          return b.winRate - a.winRate;
        });

      setLeaderboard(leaderboardArray);

      // Find user rank
      if (address) {
        const rank = leaderboardArray.findIndex(p => p.address.toLowerCase() === address.toLowerCase());
        setUserRank(rank !== -1 ? rank + 1 : null);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  const globalStats = {
    totalPlayers: leaderboard.length,
    totalBattles: leaderboard.reduce((sum, p) => sum + p.totalBattles, 0),
    avgWinRate: leaderboard.length > 0 
      ? Math.round(leaderboard.reduce((sum, p) => sum + p.winRate, 0) / leaderboard.length)
      : 0,
    topPower: leaderboard[0]?.totalPower || 0
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #fbbf24)' }} />
          </motion.div>
          <h1 className="text-6xl font-bold mb-3" style={{ 
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            LEADERBOARD
          </h1>
          <p className="text-xl text-gray-400">Compete for glory and climb the ranks!</p>
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Total Warriors', value: globalStats.totalPlayers, color: '#8b5cf6' },
            { icon: Swords, label: 'Total Battles', value: globalStats.totalBattles, color: '#ef4444' },
            { icon: Target, label: 'Avg Win Rate', value: `${globalStats.avgWinRate}%`, color: '#10b981' },
            { icon: Zap, label: 'Highest Power', value: globalStats.topPower, color: '#fbbf24' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Your Rank Card */}
        {isConnected && userRank && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <PremiumCard variant="glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600/30 to-purple-600/30 border-3 border-cyan-400 flex items-center justify-center">
                    <Star className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Your Current Rank</div>
                    <div className="text-4xl font-black text-white">#{userRank}</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/arena'}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white flex items-center gap-2"
                  style={{ boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
                >
                  <Swords className="w-5 h-5" />
                  Battle Now
                </motion.button>
              </div>
            </PremiumCard>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <PremiumCard className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-7 h-7 text-yellow-400" />
              Top Warriors
            </h3>
            <div className="flex items-center gap-2">
              {['All Time', 'This Week', 'This Month'].map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => setFilter(['all', 'weekly', 'monthly'][idx])}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    filter === ['all', 'weekly', 'monthly'][idx]
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {leaderboard.length === 0 ? (
              <div className="text-center py-20">
                <Trophy className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Rankings Yet</h3>
                <p className="text-gray-400 mb-6">Be the first to enter the arena and claim victory!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/arena'}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white flex items-center gap-2 mx-auto"
                >
                  <Swords className="w-5 h-5" />
                  Enter Arena
                </motion.button>
              </div>
            ) : (
              leaderboard.map((player, index) => (
                <LeaderboardRow
                  key={player.address}
                  player={player}
                  index={index}
                  isCurrentUser={address && player.address.toLowerCase() === address.toLowerCase()}
                />
              ))
            )}
          </div>
        </PremiumCard>

        {/* Call to Action */}
        <PremiumCard variant="premium">
          <div className="text-center py-8">
            <h3 className="text-3xl font-bold text-white mb-3">Ready to Climb the Ranks?</h3>
            <p className="text-gray-400 mb-6">Battle AI opponents, earn rewards, and prove your worth!</p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/arena'}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white text-lg flex items-center gap-2"
                style={{ boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
              >
                <Swords className="w-6 h-6" />
                Enter Battle Arena
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/market'}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-bold text-white text-lg flex items-center gap-2"
              >
                <Star className="w-6 h-6" />
                Get Characters
              </motion.button>
            </div>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
