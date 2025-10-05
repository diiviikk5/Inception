import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sword, Shield, Zap, Heart, Target, Clock, 
  Flame, Droplet, Wind, Skull, ChevronRight,
  Info, AlertCircle, BookOpen, Sparkles, Award
} from 'lucide-react';
import { MOVE_TYPES } from '../utils/battleEngine';

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

// Move Type Icon
const getMoveIcon = (type) => {
  const icons = {
    physical: Sword,
    special: Zap,
    ultimate: Flame,
    defensive: Shield,
    support: Heart
  };
  return icons[type] || Sword;
};

// Move Card Component
const MoveCard = ({ move, onClick }) => {
  const Icon = getMoveIcon(move.type);
  const isUltimate = move.type === 'ultimate';

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={() => onClick(move)}
      className={`relative p-5 rounded-xl border-2 cursor-pointer group transition-all ${
        isUltimate
          ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]'
          : 'bg-gradient-to-br from-white/5 to-black/50 border-white/20 hover:border-white/50'
      }`}
      style={{ borderColor: move.color }}
    >
      {/* Move Icon */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="p-3 rounded-xl border-2"
          style={{ 
            borderColor: move.color,
            backgroundColor: `${move.color}20`
          }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8" style={{ color: move.color }} />
        </motion.div>
        
        {/* Type Badge */}
        <div 
          className="px-3 py-1 rounded-full text-xs font-bold border-2"
          style={{ 
            borderColor: move.color, 
            backgroundColor: `${move.color}30`,
            color: move.color
          }}
        >
          {move.type.toUpperCase()}
        </div>
      </div>

      {/* Move Name */}
      <h3 className="text-xl font-bold text-white mb-2">{move.name}</h3>
      
      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 min-h-[40px]">{move.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-gray-400">Energy:</span>
          <span className="font-bold text-yellow-400">{move.energy}</span>
        </div>
        {move.damage > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <Sword className="w-4 h-4 text-red-400" />
            <span className="text-gray-400">Damage:</span>
            <span className="font-bold text-red-400">{(move.damage * 100).toFixed(0)}%</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs">
          <Target className="w-4 h-4 text-cyan-400" />
          <span className="text-gray-400">Accuracy:</span>
          <span className="font-bold text-cyan-400">{move.accuracy}%</span>
        </div>
        {move.cooldown > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400">Cooldown:</span>
            <span className="font-bold text-purple-400">{move.cooldown}</span>
          </div>
        )}
      </div>

      {/* Timing Badge */}
      {move.timing?.enabled && (
        <div 
          className="flex items-center justify-center gap-2 py-2 rounded-lg border"
          style={{ 
            backgroundColor: `${move.color}20`,
            borderColor: `${move.color}50`
          }}
        >
          <Clock className="w-4 h-4" style={{ color: move.color }} />
          <span className="text-xs font-bold" style={{ color: move.color }}>
            {move.timing.difficulty.toUpperCase()} TIMING
          </span>
        </div>
      )}

      {/* View Details Arrow */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-5 h-5 text-white" />
      </div>

      {/* Glow Effect */}
      {isUltimate && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.4)' }}
        />
      )}
    </motion.div>
  );
};

// Move Details Modal
const MoveDetailsModal = ({ move, onClose }) => {
  if (!move) return null;

  const Icon = getMoveIcon(move.type);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-2xl w-full bg-gradient-to-br from-black via-gray-900 to-black border-2 rounded-2xl p-8"
        style={{ borderColor: move.color, boxShadow: `0 0 50px ${move.color}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition-colors"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="p-4 rounded-2xl border-3"
            style={{ 
              borderColor: move.color,
              backgroundColor: `${move.color}30`
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Icon className="w-12 h-12" style={{ color: move.color }} />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-4xl font-black text-white mb-2">{move.name}</h2>
            <div 
              className="inline-block px-3 py-1 rounded-full text-sm font-bold"
              style={{ 
                backgroundColor: `${move.color}30`,
                color: move.color
              }}
            >
              {move.type.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-400" />
            Description
          </h3>
          <p className="text-gray-400 text-lg">{move.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: Zap, label: 'Energy Cost', value: move.energy, color: '#fbbf24' },
            { icon: Sword, label: 'Base Damage', value: move.damage > 0 ? `${(move.damage * 100).toFixed(0)}%` : 'N/A', color: '#ef4444' },
            { icon: Target, label: 'Accuracy', value: `${move.accuracy}%`, color: '#06b6d4' },
            { icon: Clock, label: 'Cooldown', value: move.cooldown > 0 ? `${move.cooldown} turns` : 'None', color: '#a855f7' }
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <StatIcon className="w-5 h-5" style={{ color: stat.color }} />
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Timing Info */}
        {move.timing?.enabled && (
          <div className="p-4 rounded-xl border-2 mb-6" style={{ backgroundColor: `${move.color}10`, borderColor: `${move.color}40` }}>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: move.color }} />
              Timing Challenge
            </h3>
            <p className="text-gray-400 mb-3">
              This move requires precise timing! Hit the perfect window to deal bonus damage.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-yellow-500/20 border border-yellow-500">
                <div className="text-2xl font-bold text-yellow-400">2.5x</div>
                <div className="text-xs text-gray-400">Perfect</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-500/20 border border-green-500">
                <div className="text-2xl font-bold text-green-400">1.8x</div>
                <div className="text-xs text-gray-400">Great</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-cyan-500/20 border border-cyan-500">
                <div className="text-2xl font-bold text-cyan-400">1.3x</div>
                <div className="text-xs text-gray-400">Good</div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm font-bold" style={{ color: move.color }}>
                Difficulty: {move.timing.difficulty.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Special Effects */}
        {move.effects && move.effects.length > 0 && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Special Effects
            </h3>
            <div className="flex flex-wrap gap-2">
              {move.effects.map((effect, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500 text-purple-400 text-sm font-bold"
                >
                  {effect.replace('_', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Main Moves Page
export default function Moves() {
  const [selectedMove, setSelectedMove] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = {
    all: { name: 'All Moves', icon: BookOpen, color: '#8b5cf6' },
    physical: { name: 'Physical', icon: Sword, color: '#ef4444' },
    special: { name: 'Special', icon: Zap, color: '#a855f7' },
    ultimate: { name: 'Ultimate', icon: Flame, color: '#fbbf24' },
    defensive: { name: 'Defensive', icon: Shield, color: '#06b6d4' },
    support: { name: 'Support', icon: Heart, color: '#10b981' }
  };

  const filteredMoves = filter === 'all' 
    ? Object.values(MOVE_TYPES)
    : Object.values(MOVE_TYPES).filter(move => move.type === filter);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <div className="relative z-10 p-8 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <BookOpen className="w-20 h-20 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }} />
          </motion.div>
          <h1 className="text-6xl font-bold mb-3" style={{ 
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            MOVES & ABILITIES
          </h1>
          <p className="text-xl text-gray-400">Master the art of combat with strategic moves</p>
        </motion.div>

        {/* Game Rules Section */}
        <PremiumCard variant="glow" className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Info className="w-8 h-8 text-cyan-400" />
            Game Rules
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Energy System',
                description: 'Start with 120 energy. Each move costs energy. Regenerate 25 energy per turn.',
                color: '#fbbf24'
              },
              {
                icon: Clock,
                title: 'Timing Mechanics',
                description: 'Some moves require precise timing. Hit the perfect window for bonus damage multipliers!',
                color: '#a855f7'
              },
              {
                icon: Shield,
                title: 'Defensive Actions',
                description: 'React to enemy attacks with Block (reduce damage) or Parry (counter attack).',
                color: '#06b6d4'
              }
            ].map((rule, i) => {
              const RuleIcon = rule.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${rule.color}20`, border: `2px solid ${rule.color}` }}
                  >
                    <RuleIcon className="w-6 h-6" style={{ color: rule.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{rule.title}</h3>
                  <p className="text-sm text-gray-400">{rule.description}</p>
                </motion.div>
              );
            })}
          </div>
        </PremiumCard>

        {/* Combat Tips */}
        <PremiumCard className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-yellow-400" />
            Combat Tips
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Chain low-cost moves to maintain pressure on your opponent',
              'Save ultimate abilities for critical moments or finishing blows',
              'Balance offensive and defensive moves to outlast your enemy',
              'Perfect timing on attacks can turn the tide of battle',
              'Monitor your energy carefully - don\'t overspend early',
              'Learn enemy patterns and react with defensive abilities'
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
              >
                <Award className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{tip}</span>
              </motion.div>
            ))}
          </div>
        </PremiumCard>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          {Object.entries(categories).map(([key, cat]) => {
            const CatIcon = cat.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                  filter === key
                    ? 'bg-gradient-to-r text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                style={filter === key ? { 
                  backgroundImage: `linear-gradient(to right, ${cat.color}80, ${cat.color}40)`,
                  borderColor: cat.color,
                  border: '2px solid'
                } : {}}
              >
                <CatIcon className="w-5 h-5" />
                {cat.name}
                {filter === key && (
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {filteredMoves.length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Moves Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredMoves.map((move, i) => (
            <motion.div
              key={move.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MoveCard move={move} onClick={setSelectedMove} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <PremiumCard variant="premium">
            <div className="text-center py-8">
              <h3 className="text-3xl font-bold text-white mb-3">Ready to Test Your Skills?</h3>
              <p className="text-gray-400 mb-6">Master these moves in the Battle Arena!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/arena'}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-white text-lg flex items-center gap-2 mx-auto"
                style={{ boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
              >
                <Sword className="w-6 h-6" />
                Enter Battle Arena
              </motion.button>
            </div>
          </PremiumCard>
        </motion.div>
      </div>

      {/* Move Details Modal */}
      <AnimatePresence>
        {selectedMove && (
          <MoveDetailsModal move={selectedMove} onClose={() => setSelectedMove(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
