import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, Crown, Award, Medal, Target, Zap, Flame, Sparkles,
  Sword, Shield, Heart, Users, TrendingUp, Package, Coins, Gem,
  Flag, Gift, Clock, Activity, Layers, ShoppingCart, MessageSquare,
  Eye, Lock, Unlock, CheckCircle, ChevronRight, Filter, Search,
  BarChart3, PieChart, Calendar, Ghost, Wind, Droplet,
  Mountain, Skull, Rocket, Gamepad2, Diamond, Hexagon, Crosshair,
  Swords, Loader, Share2, Download, X, Plus, Minus, Info, AlertCircle
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

// Rarity Colors
const RARITY_CONFIG = {
  common: { color: '#9ca3af', glow: '#6b7280', name: 'Common', points: 10 },
  uncommon: { color: '#10b981', glow: '#059669', name: 'Uncommon', points: 25 },
  rare: { color: '#3b82f6', glow: '#2563eb', name: 'Rare', points: 50 },
  epic: { color: '#a855f7', glow: '#9333ea', name: 'Epic', points: 100 },
  legendary: { color: '#f59e0b', glow: '#d97706', name: 'Legendary', points: 250 },
  mythic: { color: '#ec4899', glow: '#db2777', name: 'Mythic', points: 500 }
};

// Achievement Card Component
const AchievementCard = ({ achievement, onClick }) => {
  const rarity = RARITY_CONFIG[achievement.rarity];
  const Icon = achievement.icon;
  const progress = achievement.unlocked ? 100 : (achievement.progress / achievement.requirement) * 100;

  return (
    <motion.div
      whileHover={{ scale: achievement.unlocked ? 1.03 : 1, y: achievement.unlocked ? -8 : 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer group ${!achievement.unlocked ? 'opacity-60' : ''}`}
    >
      <div 
        className={`relative bg-black/60 backdrop-blur-xl border-2 rounded-2xl p-6 overflow-hidden ${
          achievement.unlocked ? '' : 'grayscale'
        }`}
        style={{ 
          borderColor: achievement.unlocked ? rarity.color : '#374151',
          boxShadow: achievement.unlocked ? `0 10px 40px ${rarity.glow}40` : 'none'
        }}
      >
        {/* Glow effect for unlocked achievements */}
        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ background: `radial-gradient(circle at 50% 50%, ${rarity.glow}40, transparent 70%)` }}
          />
        )}

        {/* Lock Icon for locked achievements */}
        {!achievement.unlocked && (
          <div className="absolute top-4 right-4 z-10">
            <Lock className="w-6 h-6 text-gray-600" />
          </div>
        )}

        {/* Rarity Badge */}
        {achievement.unlocked && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl"
              style={{ background: `${rarity.color}40`, border: `1px solid ${rarity.color}`, color: rarity.color }}
            >
              {rarity.name.toUpperCase()}
            </motion.div>
          </div>
        )}

        {/* Icon */}
        <div className="relative z-10 mb-4">
          <div 
            className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ 
              background: achievement.unlocked 
                ? `radial-gradient(circle, ${rarity.glow}60, transparent)` 
                : 'rgba(55, 65, 81, 0.3)',
              border: `2px solid ${achievement.unlocked ? rarity.color : '#4b5563'}`
            }}
          >
            <Icon 
              className="w-12 h-12" 
              style={{ color: achievement.unlocked ? rarity.color : '#6b7280' }}
            />
            
            {/* Particles for legendary+ */}
            {achievement.unlocked && (achievement.rarity === 'legendary' || achievement.rarity === 'mythic') && (
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: rarity.color }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-bold text-white mb-2">{achievement.name}</h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{achievement.description}</p>

          {/* Progress Bar */}
          {!achievement.unlocked && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-400 font-bold">
                  {achievement.progress} / {achievement.requirement}
                </span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          )}

          {/* Rewards */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-white">{rarity.points} pts</span>
            </div>
            {achievement.reward && (
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-white">{achievement.reward}</span>
              </div>
            )}
          </div>

          {/* Unlock Date */}
          {achievement.unlocked && achievement.unlockedDate && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <CheckCircle className="w-4 h-4" />
                Unlocked {achievement.unlockedDate}
              </div>
            </div>
          )}
        </div>

        {/* Shine effect on hover for unlocked */}
        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Achievement Detail Modal
const AchievementModal = ({ achievement, onClose }) => {
  if (!achievement) return null;
  
  const rarity = RARITY_CONFIG[achievement.rarity];
  const Icon = achievement.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full"
      >
        <GlassCard 
          glow 
          glowColor={rarity.color} 
          className="p-12 text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>

          {/* Large Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-40 h-40 mx-auto rounded-3xl flex items-center justify-center mb-8 relative"
            style={{ 
              background: `radial-gradient(circle, ${rarity.glow}60, transparent)`,
              border: `4px solid ${rarity.color}`,
              boxShadow: `0 0 60px ${rarity.glow}80`
            }}
          >
            <Icon className="w-20 h-20" style={{ color: rarity.color }} />
            
            {/* Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{ background: rarity.color }}
                animate={{
                  x: [0, Math.cos(i * 30 * Math.PI / 180) * 80],
                  y: [0, Math.sin(i * 30 * Math.PI / 180) * 80],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-4 py-2 rounded-full inline-block mb-4"
            style={{ background: `${rarity.color}20`, border: `2px solid ${rarity.color}` }}
          >
            <span className="font-bold text-lg" style={{ color: rarity.color }}>
              {rarity.name.toUpperCase()} ACHIEVEMENT
            </span>
          </motion.div>

          <h2 className="text-5xl font-orbitron font-black text-white mb-4">
            {achievement.name}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {achievement.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-3xl font-bold text-white mb-1">{rarity.points}</div>
              <div className="text-sm text-gray-400">Achievement Points</div>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-3xl font-bold text-white mb-1">{achievement.reward || 0}</div>
              <div className="text-sm text-gray-400">Coin Reward</div>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <Users className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-3xl font-bold text-white mb-1">{achievement.unlockedBy || '???'}</div>
              <div className="text-sm text-gray-400">Players Unlocked</div>
            </div>
          </div>

          {achievement.unlocked ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-400 text-lg font-bold">
                <CheckCircle className="w-6 h-6" />
                Unlocked on {achievement.unlockedDate}
              </div>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Achievement
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <div className="font-bold text-yellow-400 mb-2">How to Unlock:</div>
                  <p className="text-gray-300">{achievement.hint || 'Keep playing to unlock this achievement!'}</p>
                  {achievement.progress !== undefined && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Your Progress</span>
                        <span className="text-white font-bold">
                          {achievement.progress} / {achievement.requirement}
                        </span>
                      </div>
                      <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// Main Achievements Component
export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [sortBy, setSortBy] = useState('rarity'); // rarity, progress, recent

  const [achievements] = useState([
    // Combat Achievements
    { id: 1, name: 'First Blood', description: 'Win your first battle', category: 'combat', rarity: 'common', icon: Sword, unlocked: true, unlockedDate: 'Jan 15, 2024', reward: 100, progress: 1, requirement: 1, unlockedBy: '95.2%', hint: 'Win any battle' },
    { id: 2, name: 'Warrior', description: 'Win 100 battles', category: 'combat', rarity: 'rare', icon: Sword, unlocked: true, unlockedDate: 'Feb 3, 2024', reward: 500, progress: 100, requirement: 100, unlockedBy: '45.8%' },
    { id: 3, name: 'Champion', description: 'Win 500 battles', category: 'combat', rarity: 'epic', icon: Trophy, unlocked: true, unlockedDate: 'Mar 12, 2024', reward: 2000, progress: 500, requirement: 500, unlockedBy: '12.3%' },
    { id: 4, name: 'Legendary Warrior', description: 'Win 1000 battles', category: 'combat', rarity: 'legendary', icon: Crown, unlocked: false, reward: 5000, progress: 635, requirement: 1000, unlockedBy: '3.7%', hint: 'Win a total of 1000 battles' },
    
    // Streak Achievements
    { id: 5, name: 'Hot Streak', description: 'Win 5 battles in a row', category: 'streak', rarity: 'uncommon', icon: Flame, unlocked: true, unlockedDate: 'Jan 20, 2024', reward: 250, progress: 5, requirement: 5, unlockedBy: '67.4%' },
    { id: 6, name: 'Unstoppable', description: 'Win 10 battles in a row', category: 'streak', rarity: 'rare', icon: Flame, unlocked: true, unlockedDate: 'Feb 8, 2024', reward: 750, progress: 10, requirement: 10, unlockedBy: '28.9%' },
    { id: 7, name: 'Domination', description: 'Win 25 battles in a row', category: 'streak', rarity: 'epic', icon: Flame, unlocked: false, reward: 3000, progress: 8, requirement: 25, unlockedBy: '5.2%', hint: 'Win 25 consecutive battles without losing' },
    
    // Collection Achievements
    { id: 8, name: 'Collector', description: 'Own 50 NFTs', category: 'collection', rarity: 'uncommon', icon: Package, unlocked: true, unlockedDate: 'Jan 25, 2024', reward: 300, progress: 50, requirement: 50, unlockedBy: '56.1%' },
    { id: 9, name: 'Hoarder', description: 'Own 100 NFTs', category: 'collection', rarity: 'rare', icon: Layers, unlocked: true, unlockedDate: 'Mar 5, 2024', reward: 800, progress: 100, requirement: 100, unlockedBy: '34.7%' },
    { id: 10, name: 'Master Collector', description: 'Own 250 NFTs', category: 'collection', rarity: 'epic', icon: Diamond, unlocked: false, reward: 2500, progress: 156, requirement: 250, unlockedBy: '8.9%', hint: 'Collect 250 unique NFTs' },
    
    // Rarity Achievements
    { id: 11, name: 'Legendary Hunter', description: 'Own 10 Legendary NFTs', category: 'collection', rarity: 'legendary', icon: Crown, unlocked: true, unlockedDate: 'Mar 18, 2024', reward: 4000, progress: 10, requirement: 10, unlockedBy: '15.6%' },
    { id: 12, name: 'Mythic Seeker', description: 'Own 5 Mythic NFTs', category: 'collection', rarity: 'mythic', icon: Sparkles, unlocked: false, reward: 10000, progress: 2, requirement: 5, unlockedBy: '2.1%', hint: 'Collect 5 Mythic rarity NFTs' },
    
    // Special Achievements
    { id: 13, name: 'Perfect Victory', description: 'Win a battle without taking damage', category: 'special', rarity: 'epic', icon: Shield, unlocked: true, unlockedDate: 'Feb 15, 2024', reward: 1500, progress: 1, requirement: 1, unlockedBy: '18.4%' },
    { id: 14, name: 'Speed Demon', description: 'Win a battle in under 2 minutes', category: 'special', rarity: 'rare', icon: Zap, unlocked: true, unlockedDate: 'Feb 22, 2024', reward: 600, progress: 1, requirement: 1, unlockedBy: '41.2%' },
    { id: 15, name: 'One Shot', description: 'Defeat an enemy with a single attack', category: 'special', rarity: 'epic', icon: Target, unlocked: false, reward: 2000, progress: 0, requirement: 1, unlockedBy: '9.7%', hint: 'Deal enough damage to eliminate an opponent in one hit' },
    
    // Trading Achievements
    { id: 16, name: 'Trader', description: 'Complete 10 trades', category: 'trading', rarity: 'uncommon', icon: ShoppingCart, unlocked: true, unlockedDate: 'Feb 1, 2024', reward: 200, progress: 10, requirement: 10, unlockedBy: '52.3%' },
    { id: 17, name: 'Merchant', description: 'Complete 50 trades', category: 'trading', rarity: 'rare', icon: Coins, unlocked: false, reward: 1000, progress: 27, requirement: 50, unlockedBy: '19.8%', hint: 'Successfully complete 50 marketplace trades' },
    
    // Social Achievements
    { id: 18, name: 'Social Butterfly', description: 'Add 25 friends', category: 'social', rarity: 'uncommon', icon: Users, unlocked: true, unlockedDate: 'Jan 30, 2024', reward: 250, progress: 25, requirement: 25, unlockedBy: '48.9%' },
    { id: 19, name: 'Popular', description: 'Have 100 followers', category: 'social', rarity: 'rare', icon: Star, unlocked: false, reward: 1200, progress: 48, requirement: 100, unlockedBy: '11.4%', hint: 'Gain 100 followers on your profile' },
    
    // Milestones
    { id: 20, name: 'Million Damage', description: 'Deal 1,000,000 total damage', category: 'milestone', rarity: 'legendary', icon: Sword, unlocked: true, unlockedDate: 'Mar 20, 2024', reward: 5000, progress: 1000000, requirement: 1000000, unlockedBy: '7.2%' },
    { id: 21, name: 'Platinum Player', description: 'Reach Platinum rank', category: 'milestone', rarity: 'epic', icon: Medal, unlocked: true, unlockedDate: 'Mar 1, 2024', reward: 2000, progress: 1, requirement: 1, unlockedBy: '22.5%' },
    { id: 22, name: 'Diamond Elite', description: 'Reach Diamond rank', category: 'milestone', rarity: 'legendary', icon: Diamond, unlocked: true, unlockedDate: 'Mar 15, 2024', reward: 4000, progress: 1, requirement: 1, unlockedBy: '8.9%' },
    { id: 23, name: 'Top 100', description: 'Reach top 100 global ranking', category: 'milestone', rarity: 'mythic', icon: Trophy, unlocked: true, unlockedDate: 'Mar 25, 2024', reward: 10000, progress: 1, requirement: 1, unlockedBy: '0.8%' },
    
    // Hidden Achievements
    { id: 24, name: '???', description: 'Hidden achievement - Keep playing to discover!', category: 'hidden', rarity: 'mythic', icon: Eye, unlocked: false, reward: 15000, progress: 0, requirement: 1, unlockedBy: '0.1%', hint: '???' },
  ]);

  const categories = [
    { id: 'all', label: 'All', icon: Trophy },
    { id: 'combat', label: 'Combat', icon: Sword },
    { id: 'streak', label: 'Streaks', icon: Flame },
    { id: 'collection', label: 'Collection', icon: Package },
    { id: 'special', label: 'Special', icon: Sparkles },
    { id: 'trading', label: 'Trading', icon: ShoppingCart },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'milestone', label: 'Milestones', icon: Flag },
    { id: 'hidden', label: 'Hidden', icon: Eye },
  ];

  // Filter achievements
  const filteredAchievements = achievements
    .filter(achievement => {
      const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
      const matchesRarity = selectedRarity === 'all' || achievement.rarity === selectedRarity;
      const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUnlocked = !showUnlockedOnly || achievement.unlocked;
      return matchesCategory && matchesRarity && matchesSearch && matchesUnlocked;
    })
    .sort((a, b) => {
      if (sortBy === 'rarity') {
        const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
        return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
      } else if (sortBy === 'progress') {
        return (b.progress / b.requirement) - (a.progress / a.requirement);
      } else if (sortBy === 'recent') {
        return (a.unlocked && b.unlocked) ? (b.id - a.id) : (b.unlocked ? 1 : -1);
      }
      return 0;
    });

  const stats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.unlocked).length,
    points: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + RARITY_CONFIG[a.rarity].points, 0),
    completion: Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)
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

      <div className="relative z-10 p-8 max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px #fbbf24)' }} />
          </motion.div>
          <h1 
            className="text-6xl font-orbitron font-black mb-4"
            style={{
              background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ACHIEVEMENTS
          </h1>
          <p className="text-xl text-gray-400">Unlock legendary rewards and showcase your skills</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6 text-center" glow glowColor="#00ffff">
            <div className="text-5xl font-bold text-white mb-2">{stats.unlocked}/{stats.total}</div>
            <div className="text-gray-400">Unlocked</div>
          </GlassCard>
          <GlassCard className="p-6 text-center" glow glowColor="#fbbf24">
            <div className="text-5xl font-bold text-yellow-400 mb-2">{stats.points.toLocaleString()}</div>
            <div className="text-gray-400">Achievement Points</div>
          </GlassCard>
          <GlassCard className="p-6 text-center" glow glowColor="#8b5cf6">
            <div className="text-5xl font-bold text-purple-400 mb-2">{stats.completion}%</div>
            <div className="text-gray-400">Completion</div>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="mb-2 text-sm text-gray-400">Overall Progress</div>
            <div className="h-4 bg-black/50 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.completion}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
            <div className="text-xs text-gray-500">{achievements.length - stats.unlocked} remaining</div>
          </GlassCard>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <GlassCard className="p-6">
            {/* Search and Sort */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              <div className="col-span-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search achievements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none"
                >
                  <option value="all">All Rarities</option>
                  {Object.keys(RARITY_CONFIG).map(rarity => (
                    <option key={rarity} value={rarity}>{RARITY_CONFIG[rarity].name}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none"
                >
                  <option value="rarity">Sort by Rarity</option>
                  <option value="progress">Sort by Progress</option>
                  <option value="recent">Recently Unlocked</option>
                </select>
              </div>

              <div className="col-span-3">
                <button
                  onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
                  className={`w-full px-4 py-3 rounded-xl font-bold transition-all ${
                    showUnlockedOnly 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {showUnlockedOnly ? 'Showing Unlocked Only' : 'Show All Achievements'}
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  {category.label}
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-black/40">
                    {achievements.filter(a => category.id === 'all' || a.category === category.id).length}
                  </span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {filteredAchievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <AchievementCard 
                  achievement={achievement}
                  onClick={() => setSelectedAchievement(achievement)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No achievements found matching your filters</p>
          </GlassCard>
        )}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
