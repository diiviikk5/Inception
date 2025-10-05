import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Camera, Edit3, Share2, Copy, Check, Trophy, Target, Zap,
  Sword, Shield, Heart, Star, Crown, Award, TrendingUp, Calendar,
  Users, MessageSquare, Link as LinkIcon, Github, Twitter, Instagram,
  Mail, Globe, MapPin, Briefcase, Gift, Coins, Gem, Package, Activity,
  BarChart3, PieChart, Clock, Flame, Sparkles, Eye, EyeOff, Save, X,
  Upload, Download, RefreshCw, SettingsIcon, LogOut, ChevronRight, ChevronDown,
  Layers, ShoppingCart, Gamepad2, Medal, Flag, Hash, AtSign
} from 'lucide-react';

// Glass Card Component
const GlassCard = ({ children, className = "", glow = false, glowColor = "#00ffff" }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl ${className}`}
    style={{
      boxShadow: glow ? `0 0 40px ${glowColor}40` : '0 20px 60px rgba(0, 0, 0, 0.5)'
    }}
  >
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </motion.div>
);

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, trend, color, subtitle }) => (
  <GlassCard className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20`, border: `2px solid ${color}40` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-bold ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      )}
    </div>
    <div className="text-3xl font-orbitron font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
    {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
  </GlassCard>
);

// Badge Component
const Badge = ({ icon: Icon, name, rarity, unlocked, onClick }) => {
  const rarityColors = {
    common: '#9ca3af',
    rare: '#3b82f6',
    epic: '#a855f7',
    legendary: '#f59e0b',
    mythic: '#ec4899'
  };
  
  const color = rarityColors[rarity] || '#9ca3af';
  
  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.05 : 1, y: unlocked ? -5 : 0 }}
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 text-center cursor-pointer ${
        unlocked ? 'bg-black/40' : 'bg-black/20 grayscale opacity-50'
      }`}
      style={{ borderColor: unlocked ? color : '#374151' }}
    >
      {unlocked && rarity !== 'common' && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: `radial-gradient(circle, ${color}40, transparent 70%)` }}
        />
      )}
      
      <Icon 
        className="w-12 h-12 mx-auto mb-2 relative z-10" 
        style={{ color: unlocked ? color : '#6b7280' }}
      />
      <div className="text-sm font-bold text-white relative z-10">{name}</div>
      <div className="text-xs capitalize mt-1 relative z-10" style={{ color: unlocked ? color : '#6b7280' }}>
        {rarity}
      </div>
      
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
          <EyeOff className="w-6 h-6 text-gray-600" />
        </div>
      )}
    </motion.div>
  );
};

// Main Profile Component
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, stats, inventory, history
  const [isCopied, setIsCopied] = useState(false);
  const [showBannerUpload, setShowBannerUpload] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    username: 'CYBER_WARRIOR',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j',
    tagline: 'Dominating the Omnichain Arena',
    bio: 'Legendary player since 2024. Top 100 globally. Specializing in Shadow-element decks and aggressive playstyles.',
    level: 42,
    experience: 15750,
    nextLevelXP: 18000,
    rank: 'Diamond III',
    rankIcon: '💎',
    joinDate: 'January 2024',
    location: 'San Francisco, CA',
    twitter: '@cyberwarrior',
    discord: 'CyberWarrior#1234',
    website: 'cyberwarrior.gg',
    
    // Stats
    totalBattles: 847,
    wins: 635,
    losses: 212,
    winRate: 75,
    highestStreak: 23,
    currentStreak: 8,
    totalDamage: 1250000,
    perfectWins: 89,
    
    // Inventory
    totalNFTs: 156,
    legendaryNFTs: 12,
    totalCoins: 45680,
    totalGems: 1250,
    packsOpened: 234,
    cardsCollected: 421,
    
    // Rankings
    globalRank: 87,
    seasonRank: 45,
    guildRank: 3,
    
    // Social
    friends: 48,
    following: 92,
    followers: 234,
    
    // Achievements
    achievementsUnlocked: 47,
    totalAchievements: 120,
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'history', label: 'Battle History', icon: Activity }
  ];

  const recentBattles = [
    { id: 1, opponent: 'SHADOW_HUNTER', result: 'win', damage: 1850, duration: '4:32', time: '2h ago' },
    { id: 2, opponent: 'NEON_ASSASSIN', result: 'win', damage: 1650, duration: '3:45', time: '5h ago' },
    { id: 3, opponent: 'CYBER_GHOST', result: 'loss', damage: 1200, duration: '6:12', time: '8h ago' },
    { id: 4, opponent: 'TITAN_SLAYER', result: 'win', damage: 2100, duration: '5:20', time: '1d ago' },
    { id: 5, opponent: 'FROST_MAGE', result: 'win', damage: 1780, duration: '4:15', time: '1d ago' },
  ];

  const achievements = [
    { icon: Trophy, name: 'First Victory', rarity: 'common', unlocked: true },
    { icon: Flame, name: '100 Wins', rarity: 'rare', unlocked: true },
    { icon: Crown, name: 'Reach Diamond', rarity: 'epic', unlocked: true },
    { icon: Star, name: 'Perfect Game', rarity: 'epic', unlocked: true },
    { icon: Zap, name: '10 Win Streak', rarity: 'rare', unlocked: true },
    { icon: Sword, name: '1M Damage', rarity: 'legendary', unlocked: true },
    { icon: Shield, name: 'Tank Master', rarity: 'rare', unlocked: true },
    { icon: Sparkles, name: 'Legendary Collector', rarity: 'legendary', unlocked: true },
    { icon: Target, name: 'Sharpshooter', rarity: 'epic', unlocked: false },
    { icon: Medal, name: 'Top 10 Global', rarity: 'mythic', unlocked: false },
    { icon: Gift, name: 'Generous Trader', rarity: 'rare', unlocked: false },
    { icon: Flag, name: 'Guild Leader', rarity: 'epic', unlocked: false },
  ];

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(profileData.walletAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle banner upload
      console.log('Banner uploaded:', file);
      setShowBannerUpload(false);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle avatar upload
      console.log('Avatar uploaded:', file);
      setShowAvatarUpload(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />
      <div 
        className="fixed inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #00ffff22 0 2px, transparent 2px 40px), repeating-linear-gradient(0deg, #ff00ff22 0 2px, transparent 2px 40px)',
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 rounded-full -z-10"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            background: ['#00ffff', '#ff00ff', '#39ff14'][i % 3]
          }}
          animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto">
        {/* Profile Header - Banner */}
        <div className="relative mb-8">
          <div 
            className="h-80 rounded-3xl overflow-hidden relative group"
            onMouseEnter={() => setShowBannerUpload(true)}
            onMouseLeave={() => setShowBannerUpload(false)}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                opacity: 0.8
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.03) 10px, rgba(255,255,255,.03) 20px)',
              }}
            />
            
            {/* Banner Upload Button */}
            <AnimatePresence>
              {showBannerUpload && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => bannerInputRef.current?.click()}
                  className="absolute top-4 right-4 px-6 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 flex items-center gap-2 hover:bg-black/90 transition-all"
                >
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-white">Change Banner</span>
                </motion.button>
              )}
            </AnimatePresence>
            <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
          </div>

          {/* Profile Picture & Basic Info */}
          <div className="absolute bottom-0 left-8 translate-y-1/2">
            <div 
              className="relative group"
              onMouseEnter={() => setShowAvatarUpload(true)}
              onMouseLeave={() => setShowAvatarUpload(false)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-1"
                style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.4)' }}
              >
                <div className="w-full h-full rounded-3xl bg-black flex items-center justify-center text-6xl">
                  🎮
                </div>
              </motion.div>
              
              {/* Avatar Upload Button */}
              <AnimatePresence>
                {showAvatarUpload && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </motion.button>
                )}
              </AnimatePresence>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              
              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold">LVL</div>
                  <div className="text-xl font-black">{profileData.level}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold flex items-center gap-2"
            >
              {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border-2 border-purple-500 text-purple-400 font-bold flex items-center gap-2 hover:bg-purple-500/10"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Left Column - Main Info */}
          <div className="col-span-8">
            <GlassCard className="p-8">
              {/* Username & Rank */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-5xl font-orbitron font-black text-white mb-2">
                    {profileData.username}
                  </h1>
                  <p className="text-xl text-gray-400 italic mb-4">{profileData.tagline}</p>
                  
                  {/* Wallet Address */}
                  <motion.button
                    onClick={copyWalletAddress}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all"
                  >
                    <Hash className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-sm text-gray-300">{profileData.walletAddress}</span>
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </motion.button>
                </div>

                {/* Rank Badge */}
                <div className="text-center">
                  <div className="text-6xl mb-2">{profileData.rankIcon}</div>
                  <div className="text-2xl font-bold text-white">{profileData.rank}</div>
                  <div className="text-sm text-gray-400">Current Rank</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 mb-2">BIO</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white resize-none focus:border-cyan-500/50 focus:outline-none"
                    rows="3"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              {/* XP Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Experience</span>
                  <span className="text-sm font-bold text-cyan-400">
                    {profileData.experience.toLocaleString()} / {profileData.nextLevelXP.toLocaleString()} XP
                  </span>
                </div>
                <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${(profileData.experience / profileData.nextLevelXP) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {profileData.nextLevelXP - profileData.experience} XP to Level {profileData.level + 1}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-1">{profileData.totalBattles}</div>
                  <div className="text-xs text-gray-400">Total Battles</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                  <div className="text-3xl font-bold text-green-400 mb-1">{profileData.wins}</div>
                  <div className="text-xs text-gray-400">Victories</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <div className="text-3xl font-bold text-red-400 mb-1">{profileData.losses}</div>
                  <div className="text-xs text-gray-400">Defeats</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{profileData.winRate}%</div>
                  <div className="text-xs text-gray-400">Win Rate</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Twitter, label: 'Twitter', value: profileData.twitter, color: '#1DA1F2' },
                  { icon: MessageSquare, label: 'Discord', value: profileData.discord, color: '#5865F2' },
                  { icon: Globe, label: 'Website', value: profileData.website, color: '#10b981' },
                  { icon: MapPin, label: 'Location', value: profileData.location, color: '#ef4444' },
                ].map((social, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    <div className="flex-1">
                      <div className="text-xs text-gray-400">{social.label}</div>
                      <div className="text-sm font-bold text-white">{social.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="col-span-4 space-y-6">
            <StatCard
              icon={Trophy}
              label="Global Rank"
              value={`#${profileData.globalRank}`}
              trend="+5"
              color="#f59e0b"
              subtitle="Top 0.1%"
            />
            <StatCard
              icon={Flame}
              label="Current Streak"
              value={profileData.currentStreak}
              trend="+2"
              color="#ef4444"
              subtitle={`Best: ${profileData.highestStreak}`}
            />
            <StatCard
              icon={Layers}
              label="NFT Collection"
              value={profileData.totalNFTs}
              color="#8b5cf6"
              subtitle={`${profileData.legendaryNFTs} Legendary`}
            />
            <StatCard
              icon={Users}
              label="Friends"
              value={profileData.friends}
              color="#06b6d4"
              subtitle={`${profileData.followers} followers`}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Achievements Section */}
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-400" />
                Achievements ({profileData.achievementsUnlocked}/{profileData.totalAchievements})
              </h2>
              
              <div className="grid grid-cols-6 gap-4 mb-8">
                {achievements.map((achievement, idx) => (
                  <Badge key={idx} {...achievement} />
                ))}
              </div>

              {/* Recent Activity */}
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                <Activity className="w-8 h-8 text-cyan-400" />
                Recent Battles
              </h2>
              
              <GlassCard className="p-6">
                <div className="space-y-3">
                  {recentBattles.map((battle) => (
                    <motion.div
                      key={battle.id}
                      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/0 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${battle.result === 'win' ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div>
                          <div className="font-bold text-white">vs {battle.opponent}</div>
                          <div className="text-sm text-gray-400">{battle.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1">Damage</div>
                          <div className="font-bold text-white">{battle.damage}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1">Duration</div>
                          <div className="font-bold text-white">{battle.duration}</div>
                        </div>
                        <div className={`px-4 py-2 rounded-lg font-bold ${
                          battle.result === 'win' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
                        }`}>
                          {battle.result.toUpperCase()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-4 gap-6 mb-8">
                <StatCard icon={Sword} label="Total Damage" value="1.25M" color="#ef4444" trend="+15%" />
                <StatCard icon={Shield} label="Damage Blocked" value="850K" color="#10b981" trend="+12%" />
                <StatCard icon={Target} label="Perfect Wins" value={profileData.perfectWins} color="#3b82f6" trend="+8" />
                <StatCard icon={Clock} label="Avg. Battle Time" value="4:45" color="#fbbf24" />
              </div>

              {/* More detailed stats */}
              <div className="grid grid-cols-2 gap-8">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Critical Hit Rate', value: 34, color: '#ef4444' },
                      { label: 'Defense Success', value: 68, color: '#10b981' },
                      { label: 'Special Move Usage', value: 45, color: '#a855f7' },
                      { label: 'First Blood Rate', value: 72, color: '#f59e0b' },
                    ].map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">{metric.label}</span>
                          <span className="font-bold" style={{ color: metric.color }}>{metric.value}%</span>
                        </div>
                        <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${metric.value}%`, background: metric.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <PieChart className="w-6 h-6 text-purple-400" />
                    Battle Distribution
                  </h3>
                  <div className="space-y-4">
                    {[
                      { mode: 'Ranked', games: 423, percentage: 50, color: '#00ffff' },
                      { mode: 'Casual', games: 245, percentage: 29, color: '#8b5cf6' },
                      { mode: 'Tournament', games: 134, percentage: 16, color: '#f59e0b' },
                      { mode: 'Practice', games: 45, percentage: 5, color: '#10b981' },
                    ].map((mode, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: mode.color }} />
                          <span className="text-white font-bold">{mode.mode}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">{mode.games}</div>
                          <div className="text-xs text-gray-400">{mode.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-4 gap-6 mb-8">
                <StatCard icon={Coins} label="Total Coins" value={profileData.totalCoins.toLocaleString()} color="#fbbf24" />
                <StatCard icon={Gem} label="Total Gems" value={profileData.totalGems} color="#ec4899" />
                <StatCard icon={Package} label="Packs Opened" value={profileData.packsOpened} color="#8b5cf6" />
                <StatCard icon={Layers} label="Cards Collected" value={profileData.cardsCollected} color="#06b6d4" />
              </div>

              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Collection Overview</h3>
                <div className="grid grid-cols-6 gap-4">
                  {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'].map((rarity, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        {Math.floor(Math.random() * 50) + 10}
                      </div>
                      <div className="text-xs text-gray-400">{rarity}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Complete Battle History</h3>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:border-cyan-500/50 focus:outline-none">
                      <option>All Battles</option>
                      <option>Wins Only</option>
                      <option>Losses Only</option>
                      <option>Ranked</option>
                      <option>Tournament</option>
                    </select>
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
                      <Download className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {Array.from({ length: 20 }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${Math.random() > 0.3 ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div className="w-12 text-center font-mono text-sm text-gray-400">#{847 - idx}</div>
                        <div>
                          <div className="font-bold text-white">OPPONENT_{idx + 1}</div>
                          <div className="text-xs text-gray-400">{Math.floor(Math.random() * 24)}h ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-sm">
                        <div className="text-gray-400">{Math.floor(Math.random() * 8)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</div>
                        <div className="font-bold text-yellow-400">{Math.floor(Math.random() * 1000) + 1000} DMG</div>
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
