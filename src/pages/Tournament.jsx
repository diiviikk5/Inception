import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import {
  Trophy, Coins, Users, Clock, Award, Crown, Flame,
  Zap, Shield, Sword, Star, TrendingUp, Lock, Unlock,
  ChevronRight, CheckCircle, X, AlertCircle, Sparkles,
  Target, Medal, Gift, DollarSign, Calendar, Play,
  Eye, BarChart3, Settings, Info, Activity, Radio
} from 'lucide-react';

const VIRTUAL_NFTS_KEY = 'inception_virtual_nfts';
const TOURNAMENT_DATA_KEY = 'inception_tournaments';
const TOURNAMENT_HISTORY_KEY = 'inception_tournament_history';
const USER_BALANCE_KEY = 'inception_user_balance';

// TOURNAMENT TIERS - REVENUE MODEL
const TOURNAMENT_TIERS = {
  bronze: {
    name: 'Bronze Arena',
    tier: 'Bronze',
    color: 'from-orange-600 to-yellow-700',
    borderColor: 'border-orange-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    textColor: 'text-orange-400',
    entryFee: 10,
    prizePool: 80,
    maxPlayers: 8,
    duration: '2 hours',
    minLevel: 1,
    rewards: { first: 50, second: 20, third: 10 },
    icon: Medal
  },
  silver: {
    name: 'Silver Championship',
    tier: 'Silver',
    color: 'from-gray-400 to-slate-500',
    borderColor: 'border-gray-400',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    textColor: 'text-gray-300',
    entryFee: 25,
    prizePool: 200,
    maxPlayers: 16,
    duration: '4 hours',
    minLevel: 5,
    rewards: { first: 120, second: 50, third: 30 },
    icon: Award
  },
  gold: {
    name: 'Gold Masters',
    tier: 'Gold',
    color: 'from-yellow-400 to-orange-500',
    borderColor: 'border-yellow-400',
    glowColor: 'rgba(250, 204, 21, 0.5)',
    textColor: 'text-yellow-400',
    entryFee: 50,
    prizePool: 400,
    maxPlayers: 32,
    duration: '6 hours',
    minLevel: 10,
    rewards: { first: 250, second: 100, third: 50 },
    icon: Trophy
  },
  platinum: {
    name: 'Platinum Elite',
    tier: 'Platinum',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    textColor: 'text-cyan-400',
    entryFee: 100,
    prizePool: 800,
    maxPlayers: 64,
    duration: '12 hours',
    minLevel: 20,
    rewards: { first: 500, second: 200, third: 100 },
    icon: Sparkles
  },
  legendary: {
    name: 'Legendary Grand Prix',
    tier: 'Legendary',
    color: 'from-purple-500 via-pink-500 to-red-500',
    borderColor: 'border-purple-500',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    textColor: 'text-purple-400',
    entryFee: 250,
    prizePool: 2000,
    maxPlayers: 128,
    duration: '24 hours',
    minLevel: 50,
    rewards: { first: 1200, second: 500, third: 300 },
    icon: Crown
  }
};

// GLASS CARD COMPONENT
const GlassCard = ({ children, className = '', glow = false, glowColor = 'rgba(0,255,255,0.3)' }) => (
  <motion.div
    className={`relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden ${className}`}
    style={{
      boxShadow: glow 
        ? `0 0 40px ${glowColor}, inset 0 0 20px rgba(0,0,0,0.5)`
        : '0 10px 40px rgba(0,0,0,0.5)'
    }}
    whileHover={glow ? { 
      borderColor: glowColor,
      boxShadow: `0 0 60px ${glowColor}, inset 0 0 20px rgba(0,0,0,0.5)` 
    } : {}}
  >
    {children}
  </motion.div>
);

// TOURNAMENT CARD
const TournamentCard = ({ tierKey, tier, onJoin, userBalance, userLevel }) => {
  const [participants, setParticipants] = useState(Math.floor(Math.random() * tier.maxPlayers * 0.6));
  const [isExpanded, setIsExpanded] = useState(false);
  const canAfford = userBalance >= tier.entryFee;
  const meetsLevel = userLevel >= tier.minLevel;
  const spotsLeft = tier.maxPlayers - participants;
  const fillPercentage = (participants / tier.maxPlayers) * 100;
  const Icon = tier.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard glow glowColor={tier.glowColor} className="p-6">
        {/* Premium Badge for Legendary */}
        {tierKey === 'legendary' && (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-xl font-bold text-xs shadow-lg border border-purple-400 z-10"
          >
            <div className="flex items-center gap-1">
              <Crown className="w-4 h-4" />
              PREMIUM
            </div>
          </motion.div>
        )}

        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${tier.color} shadow-lg`}>
            <Icon className="w-12 h-12 text-white" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: tier.glowColor }}
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className={`text-2xl font-bold ${tier.textColor} mb-1`}>
              {tier.name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {participants}/{tier.maxPlayers}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {tier.duration}
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Lvl {tier.minLevel}+
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Filling Fast</span>
            <span className={spotsLeft < 5 ? 'text-red-400 font-bold' : ''}>{spotsLeft} spots left</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${tier.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${fillPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Entry Fee & Prize Pool */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-black/40 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-400">Entry Fee</span>
            </div>
            <div className="text-2xl font-bold text-white">${tier.entryFee}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Prize Pool</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">${tier.prizePool}</div>
          </div>
        </div>

        {/* Rewards Breakdown */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/30">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">1st Place</span>
              </div>
              <span className="font-bold text-yellow-400">${tier.rewards.first}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-500/10 rounded-lg p-2 border border-gray-500/30">
              <div className="flex items-center gap-2">
                <Medal className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">2nd Place</span>
              </div>
              <span className="font-bold text-gray-300">${tier.rewards.second}</span>
            </div>
            <div className="flex justify-between items-center bg-orange-500/10 rounded-lg p-2 border border-orange-500/30">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">3rd Place</span>
              </div>
              <span className="font-bold text-orange-400">${tier.rewards.third}</span>
            </div>
          </div>
        </motion.div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-4 py-2 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" />
          {isExpanded ? 'Hide Details' : 'Show Prize Breakdown'}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Join Button */}
        <motion.button
          whileHover={{ scale: canAfford && meetsLevel ? 1.02 : 1 }}
          whileTap={{ scale: canAfford && meetsLevel ? 0.98 : 1 }}
          onClick={() => canAfford && meetsLevel && onJoin(tierKey)}
          disabled={!canAfford || !meetsLevel}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
            canAfford && meetsLevel
              ? `bg-gradient-to-r ${tier.color} shadow-[0_0_30px_${tier.glowColor}] cursor-pointer`
              : 'bg-gray-700 cursor-not-allowed opacity-50'
          }`}
        >
          {!meetsLevel ? (
            <>
              <Lock className="w-5 h-5" />
              Requires Level {tier.minLevel}
            </>
          ) : !canAfford ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Insufficient Balance
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Join Tournament
            </>
          )}
        </motion.button>
      </GlassCard>
    </motion.div>
  );
};

// ACTIVE TOURNAMENT BRACKET
const TournamentBracket = ({ tournament, onClose }) => {
  const rounds = Math.ceil(Math.log2(tournament.maxPlayers));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="relative w-full max-w-7xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard glow glowColor={tournament.glowColor} className="p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className={`text-4xl font-bold ${tournament.textColor} mb-2`}>
              {tournament.name}
            </h2>
            <p className="text-gray-400">Tournament Bracket - Round of {tournament.maxPlayers}</p>
          </div>

          {/* Bracket Visualization */}
          <div className="space-y-8">
            {Array.from({ length: rounds }).map((_, roundIndex) => {
              const matchesInRound = tournament.maxPlayers / Math.pow(2, roundIndex + 1);
              return (
                <div key={roundIndex}>
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-300">
                    {roundIndex === rounds - 1 ? 'Finals' : `Round ${roundIndex + 1}`}
                  </h3>
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(matchesInRound, 4)}, 1fr)` }}>
                    {Array.from({ length: matchesInRound }).map((_, matchIndex) => (
                      <div key={matchIndex} className="bg-black/40 rounded-xl p-4 border border-white/10">
                        <div className="text-xs text-gray-500 mb-2">Match {matchIndex + 1}</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                            <span className="text-sm text-white font-bold">Player {matchIndex * 2 + 1}</span>
                            <span className="text-cyan-400 font-bold">TBD</span>
                          </div>
                          <div className="text-center text-xs text-gray-500">VS</div>
                          <div className="flex items-center justify-between p-2 bg-red-500/10 rounded-lg border border-red-500/30">
                            <span className="text-sm text-white font-bold">Player {matchIndex * 2 + 2}</span>
                            <span className="text-red-400 font-bold">TBD</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Championship */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-[0_0_40px_rgba(250,204,21,0.5)]">
              <Trophy className="w-16 h-16 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Champion</div>
              <div className="text-yellow-900 font-bold">${tournament.rewards.first} Prize</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// LEADERBOARD
const Leaderboard = () => {
  const topPlayers = [
    { rank: 1, name: 'ShadowKnight99', wins: 47, earnings: 12500, icon: Crown, color: 'text-yellow-400' },
    { rank: 2, name: 'MysticMage', wins: 42, earnings: 9800, icon: Star, color: 'text-gray-300' },
    { rank: 3, name: 'FireWarrior', wins: 38, earnings: 7200, icon: Medal, color: 'text-orange-400' },
    { rank: 4, name: 'IceQueen', wins: 35, earnings: 6100, icon: Sparkles, color: 'text-cyan-400' },
    { rank: 5, name: 'DragonSlayer', wins: 32, earnings: 5400, icon: Sword, color: 'text-red-400' }
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-purple-400" />
        <h3 className="text-2xl font-bold text-white">Top Players</h3>
      </div>

      <div className="space-y-3">
        {topPlayers.map((player, index) => {
          const Icon = player.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl ${
                index === 0 ? 'bg-yellow-500/10 border-2 border-yellow-500/30' :
                index === 1 ? 'bg-gray-500/10 border-2 border-gray-500/30' :
                index === 2 ? 'bg-orange-500/10 border-2 border-orange-500/30' :
                'bg-black/40 border border-white/10'
              }`}
            >
              <div className={`text-3xl font-bold ${player.color}`}>
                #{player.rank}
              </div>
              <Icon className={`w-6 h-6 ${player.color}`} />
              <div className="flex-1">
                <div className="font-bold text-white">{player.name}</div>
                <div className="text-sm text-gray-400">{player.wins} Tournament Wins</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">${player.earnings.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Total Earnings</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
};

// MAIN TOURNAMENT COMPONENT
export default function Tournament() {
  const { address, isConnected } = useAccount();
  const [userBalance, setUserBalance] = useState(500);
  const [userLevel, setUserLevel] = useState(1);
  const [activeTournament, setActiveTournament] = useState(null);
  const [showBracket, setShowBracket] = useState(false);
  const [selectedTab, setSelectedTab] = useState('tournaments');

  useEffect(() => {
    if (isConnected && address) {
      const stored = localStorage.getItem(USER_BALANCE_KEY);
      if (stored) {
        setUserBalance(JSON.parse(stored));
      }

      const nfts = JSON.parse(localStorage.getItem(VIRTUAL_NFTS_KEY) || '[]');
      const userNFTs = nfts.filter(n => n.owner === address);
      const avgLevel = Math.floor(userNFTs.reduce((acc, nft) => acc + (nft.level || 1), 0) / (userNFTs.length || 1));
      setUserLevel(avgLevel);
    }
  }, [address, isConnected]);

  const handleJoinTournament = (tierKey) => {
    const tier = TOURNAMENT_TIERS[tierKey];
    
    if (userBalance < tier.entryFee) {
      alert('Insufficient balance!');
      return;
    }

    const newBalance = userBalance - tier.entryFee;
    setUserBalance(newBalance);
    localStorage.setItem(USER_BALANCE_KEY, JSON.stringify(newBalance));

    setActiveTournament(tier);
    setShowBracket(true);

    alert(`Successfully joined ${tier.name}! Good luck! 🎮`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 -z-10" />
      
      {/* Animated Background Elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            TOURNAMENT MODE
          </h1>
          <p className="text-xl text-gray-400">Compete for glory and massive prizes</p>
        </motion.div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassCard glow glowColor="rgba(16, 185, 129, 0.3)" className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">${userBalance}</div>
                <div className="text-sm text-gray-400">Available Balance</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard glow glowColor="rgba(59, 130, 246, 0.3)" className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">Level {userLevel}</div>
                <div className="text-sm text-gray-400">Player Level</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard glow glowColor="rgba(168, 85, 247, 0.3)" className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">0</div>
                <div className="text-sm text-gray-400">Tournaments Won</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('tournaments')}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              selectedTab === 'tournaments'
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Trophy className="w-5 h-5" />
            Active Tournaments
          </button>
          <button
            onClick={() => setSelectedTab('leaderboard')}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              selectedTab === 'leaderboard'
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Leaderboard
          </button>
        </div>

        {/* Content */}
        {selectedTab === 'tournaments' ? (
          <>
            {!isConnected ? (
              <GlassCard className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Connect Wallet</h2>
                <p className="text-gray-400 text-lg">Connect your wallet to join tournaments</p>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(TOURNAMENT_TIERS).map(([key, tier]) => (
                  <TournamentCard
                    key={key}
                    tierKey={key}
                    tier={tier}
                    onJoin={handleJoinTournament}
                    userBalance={userBalance}
                    userLevel={userLevel}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <Leaderboard />
        )}
      </div>

      {/* Tournament Bracket Modal */}
      <AnimatePresence>
        {showBracket && activeTournament && (
          <TournamentBracket
            tournament={activeTournament}
            onClose={() => setShowBracket(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
