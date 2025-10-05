import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import {
  Sword, Shield, Zap, Heart, Activity, AlertCircle, ArrowRight, 
  RotateCcw, X, Clock, Target, Crosshair, Flame, Droplet, Wind, Skull, HelpCircle
} from 'lucide-react';
import { 
  MOVE_TYPES, calculateAdvancedDamage, generateSmartAI, 
  generateAIOpponent, calculateBattleRewards
} from '../utils/battleEngine';
import { getRandomOpponent } from '../data/aiOpponents';

const VIRTUAL_NFTS_KEY = 'inception_virtual_nfts';
const BATTLE_HISTORY_KEY = 'inception_battle_history';
const TUTORIAL_COMPLETED_KEY = 'inception_tutorial_completed';
const TUTORIAL_ENABLED_KEY = 'inception_tutorial_enabled'; // 🔥 NEW

// ==================== MOVE ICON MAPPING ====================
const getMoveIcon = (move) => {
  const iconMap = {
    'physical': { icon: Sword, bg: 'from-red-600/20 to-orange-600/20', border: 'border-red-500' },
    'special': { icon: Zap, bg: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-500' },
    'ultimate': { icon: Flame, bg: 'from-yellow-600/20 to-orange-600/20', border: 'border-yellow-500' },
    'defensive': { icon: Shield, bg: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500' },
    'support': { icon: Heart, bg: 'from-green-600/20 to-emerald-600/20', border: 'border-green-500' }
  };
  return iconMap[move.type] || iconMap['physical'];
};

// ==================== IMPROVED TIMING QTE ====================
const TimingQTE = ({ move, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [result, setResult] = useState(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const startTimeRef = useRef(Date.now());
  const animationRef = useRef(null);

  const difficulty = move.timing?.difficulty || 'easy';
  const speeds = {
    easy: 2200,
    medium: 2000,
    hard: 1800,
    extreme: 1600
  };
  
  const totalDuration = speeds[difficulty];
  
  const zones = {
    easy: { perfect: [45, 55], good: [35, 65], ok: [20, 80] },
    medium: { perfect: [45, 55], good: [35, 65], ok: [25, 75] },
    hard: { perfect: [46, 54], good: [38, 62], ok: [28, 72] },
    extreme: { perfect: [47, 53], good: [40, 60], ok: [30, 70] }
  };

  const zone = zones[difficulty];

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = (elapsed / totalDuration) * 100;
      
      const cycle = (elapsed % (totalDuration * 2)) / totalDuration;
      const indicatorPos = cycle <= 1 ? cycle * 100 : (2 - cycle) * 100;
      setIndicatorPosition(indicatorPos);
      
      if (newProgress >= 100) {
        setProgress(100);
        setIsActive(false);
        handleClick(indicatorPos);
        return;
      }
      
      setProgress(newProgress);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [totalDuration]);

  const handleClick = (currentPos) => {
    if (!isActive && result) return;
    
    setIsActive(false);
    
    let resultType = 'MISSED';
    let resultColor = '#ef4444';
    let bonus = 0.5;
    
    if (currentPos >= zone.perfect[0] && currentPos <= zone.perfect[1]) {
      resultType = 'PERFECT!';
      resultColor = '#fbbf24';
      bonus = 2.5;
    } else if (currentPos >= zone.good[0] && currentPos <= zone.good[1]) {
      resultType = 'GREAT!';
      resultColor = '#10b981';
      bonus = 1.8;
    } else if (currentPos >= zone.ok[0] && currentPos <= zone.ok[1]) {
      resultType = 'GOOD';
      resultColor = '#06b6d4';
      bonus = 1.3;
    }
    
    setResult({ type: resultType, color: resultColor });
    
    setTimeout(() => {
      onComplete({ bonus, rating: resultType, reactionTime: Date.now() - startTimeRef.current });
    }, 800);
  };

  const iconInfo = getMoveIcon(move);
  const IconComponent = iconInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={() => isActive && handleClick(indicatorPosition)}
    >
      <div className="relative w-full max-w-5xl px-8">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block p-6 rounded-3xl bg-gradient-to-br border-4 mb-6"
            style={{ 
              backgroundImage: `linear-gradient(to bottom right, ${move.color}40, ${move.color}20)`,
              borderColor: move.color
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <IconComponent className="w-24 h-24" style={{ color: move.color }} />
          </motion.div>
          <h2 className="text-7xl font-bold mb-4" style={{ color: move.color, textShadow: `0 0 30px ${move.color}` }}>
            {move.name}
          </h2>
          <p className="text-3xl text-gray-300 mb-2">{difficulty.toUpperCase()} TIMING</p>
          <motion.p
            className="text-2xl font-bold text-yellow-400"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            CLICK WHEN THE BAR IS YELLOW!
          </motion.p>
        </motion.div>

        <div className="relative h-40 bg-gradient-to-b from-black to-gray-900 border-4 border-white/30 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0 flex">
            <div style={{ width: `${zone.ok[0]}%` }} className="bg-red-600/40 border-r-2 border-red-800" />
            <div style={{ width: `${zone.good[0] - zone.ok[0]}%` }} className="bg-blue-500/30 border-r-2 border-blue-700" />
            <div style={{ width: `${zone.perfect[0] - zone.good[0]}%` }} className="bg-green-500/40 border-r-2 border-green-700" />
            
            <div style={{ width: `${zone.perfect[1] - zone.perfect[0]}%` }} className="bg-gradient-to-r from-yellow-400/60 via-yellow-300/70 to-yellow-400/60 relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black text-yellow-900 drop-shadow-lg">PERFECT!</span>
              </div>
            </div>
            
            <div style={{ width: `${zone.good[1] - zone.perfect[1]}%` }} className="bg-green-500/40 border-l-2 border-green-700" />
            <div style={{ width: `${zone.ok[1] - zone.good[1]}%` }} className="bg-blue-500/30 border-l-2 border-blue-700" />
            <div style={{ width: `${100 - zone.ok[1]}%` }} className="bg-red-600/40 border-l-2 border-red-800" />
          </div>

          <motion.div
            className="absolute top-0 bottom-0 w-2 z-20"
            style={{ left: `${indicatorPosition}%` }}
          >
            <div className="h-full w-full bg-white shadow-[0_0_30px_#fff]" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-white absolute -top-10 left-1/2 -translate-x-1/2" />
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-white absolute -bottom-10 left-1/2 -translate-x-1/2" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="text-center mb-6">
          <motion.div
            className="inline-block px-8 py-3 bg-black/80 border-2 border-cyan-400 rounded-2xl"
            animate={{ borderColor: ['#06b6d4', '#8b5cf6', '#06b6d4'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-6 h-6 inline-block mr-2 text-cyan-400" />
            <span className="text-2xl font-bold text-white">
              {((totalDuration * 2 - (Date.now() - startTimeRef.current)) / 1000).toFixed(1)}s
            </span>
          </motion.div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center"
            >
              <motion.div
                className="text-[150px] font-black leading-none"
                style={{ 
                  color: result.color,
                  textShadow: `0 0 60px ${result.color}, 0 0 120px ${result.color}`
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
              >
                {result.type}
              </motion.div>
              {result.type === 'PERFECT!' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-4xl text-yellow-400 font-bold mt-4"
                >
                  🔥 2.5x DAMAGE! 🔥
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!result && (
          <motion.div
            className="text-center text-gray-400 text-xl flex items-center justify-center gap-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Target className="w-8 h-8" />
            <span>Click when the white bar is in the yellow zone!</span>
            <Target className="w-8 h-8" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ==================== DEFENSIVE QTE ====================
const DefensiveQTE = ({ incomingDamage, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [result, setResult] = useState(null);
  const [actionType, setActionType] = useState(null);
  const startTimeRef = useRef(Date.now());
  const animationRef = useRef(null);

  const totalDuration = 2500;
  const perfectWindow = 800;
  const goodWindow = 1500;

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = (elapsed / totalDuration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        setIsActive(false);
        if (!result) {
          handleFailed();
        }
        return;
      }
      
      setProgress(newProgress);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [result]);

  const handleAction = (type) => {
    if (!isActive || result) return;
    
    const reactionTime = Date.now() - startTimeRef.current;
    setActionType(type);
    
    let rating = 'BLOCKED';
    let damageReduction = 0.3;
    let counterDamage = 0;
    let color = '#06b6d4';
    
    if (reactionTime <= perfectWindow) {
      rating = type === 'BLOCK' ? 'PERFECT BLOCK!' : 'PERFECT PARRY!';
      damageReduction = type === 'BLOCK' ? 0.8 : 0.9;
      counterDamage = type === 'PARRY' ? 0.6 : 0;
      color = '#fbbf24';
    } else if (reactionTime <= goodWindow) {
      rating = type === 'BLOCK' ? 'GOOD BLOCK' : 'GOOD PARRY';
      damageReduction = type === 'BLOCK' ? 0.5 : 0.6;
      counterDamage = type === 'PARRY' ? 0.3 : 0;
      color = '#10b981';
    } else {
      rating = type === 'BLOCK' ? 'LATE BLOCK' : 'LATE PARRY';
      damageReduction = 0.2;
      counterDamage = 0;
      color = '#06b6d4';
    }
    
    setResult({ rating, damageReduction, counterDamage, color });
    setIsActive(false);
    
    setTimeout(() => {
      onComplete({ damageReduction, counterDamage, rating, color, actionType: type });
    }, 1200);
  };

  const handleFailed = () => {
    setResult({ rating: 'TOO SLOW!', damageReduction: 0, color: '#ef4444' });
    setTimeout(() => {
      onComplete({ damageReduction: 0, counterDamage: 0, rating: 'FAILED', color: '#ef4444' });
    }, 1000);
  };

  const timeRemaining = ((totalDuration - progress * totalDuration / 100) / 1000).toFixed(1);
  const isPerfectWindow = progress * totalDuration / 100 <= perfectWindow;
  const isGoodWindow = progress * totalDuration / 100 <= goodWindow;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-md"
    >
      <div className="relative w-full max-w-6xl px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <AlertCircle className="w-32 h-32 text-red-500 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 20px #ef4444)' }} />
          </motion.div>
          <h2 className="text-8xl font-black text-red-500 mb-4" style={{ textShadow: '0 0 40px #ef4444' }}>
            INCOMING!
          </h2>
          <p className="text-5xl font-bold text-yellow-400">{incomingDamage} DAMAGE</p>
        </motion.div>

        <div className="relative h-32 bg-black border-4 border-white/30 rounded-3xl overflow-hidden mb-10 shadow-2xl">
          <div className="absolute inset-0 flex">
            <div style={{ width: `${(perfectWindow / totalDuration) * 100}%` }} className="bg-gradient-to-r from-yellow-500/50 to-yellow-400/50">
              <div className="h-full flex items-center justify-center text-2xl font-black text-yellow-900">PERFECT</div>
            </div>
            <div style={{ width: `${((goodWindow - perfectWindow) / totalDuration) * 100}%` }} className="bg-gradient-to-r from-green-500/40 to-green-400/40">
              <div className="h-full flex items-center justify-center text-2xl font-black text-green-900">GOOD</div>
            </div>
            <div style={{ width: `${((totalDuration - goodWindow) / totalDuration) * 100}%` }} className="bg-gradient-to-r from-blue-500/30 to-blue-400/30">
              <div className="h-full flex items-center justify-center text-2xl font-black text-blue-900">OK</div>
            </div>
          </div>

          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-700"
            style={{ width: `${progress}%` }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
              {timeRemaining}s
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <motion.div
            className="inline-block px-12 py-4 rounded-2xl border-4 font-black text-3xl"
            style={{
              backgroundColor: isPerfectWindow ? '#fbbf2440' : isGoodWindow ? '#10b98140' : '#06b6d440',
              borderColor: isPerfectWindow ? '#fbbf24' : isGoodWindow ? '#10b981' : '#06b6d4',
              color: isPerfectWindow ? '#fbbf24' : isGoodWindow ? '#10b981' : '#06b6d4',
              boxShadow: isPerfectWindow ? '0 0 40px #fbbf24' : isGoodWindow ? '0 0 30px #10b981' : '0 0 20px #06b6d4'
            }}
            animate={{ scale: isPerfectWindow ? [1, 1.1, 1] : [1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            {isPerfectWindow ? '⚡ PERFECT WINDOW!' : isGoodWindow ? '✓ GOOD WINDOW' : '⏰ REACT NOW'}
          </motion.div>
        </div>

        {!result && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-2 gap-12"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction('BLOCK')}
              className="relative p-16 rounded-3xl bg-gradient-to-br from-blue-600/40 to-cyan-600/40 border-4 border-blue-500 text-center group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Shield className="w-32 h-32 text-blue-400 mx-auto mb-6 relative z-10 group-hover:scale-125 transition-transform" style={{ filter: 'drop-shadow(0 0 20px #3b82f6)' }} />
              <div className="text-6xl font-black text-white mb-3 relative z-10">BLOCK</div>
              <div className="text-2xl text-blue-300 relative z-10">Reduce damage up to 80%</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction('PARRY')}
              className="relative p-16 rounded-3xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 border-4 border-green-500 text-center group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Sword className="w-32 h-32 text-green-400 mx-auto mb-6 relative z-10 group-hover:scale-125 transition-transform" style={{ filter: 'drop-shadow(0 0 20px #10b981)' }} />
              <div className="text-6xl font-black text-white mb-3 relative z-10">PARRY</div>
              <div className="text-2xl text-green-300 relative z-10">Block 90% + Counter 60%!</div>
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center"
            >
              <motion.div
                className="text-[120px] font-black leading-none mb-6"
                style={{ 
                  color: result.color,
                  textShadow: `0 0 60px ${result.color}`
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                {result.rating}
              </motion.div>
              {result.damageReduction > 0 && (
                <div className="space-y-4">
                  <div className="text-5xl text-white font-bold">
                    🛡️ {(result.damageReduction * 100).toFixed(0)}% Blocked!
                  </div>
                  {result.counterDamage > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl text-green-400 font-bold"
                    >
                      ⚔️ + {(result.counterDamage * 100).toFixed(0)}% Counter!
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ==================== COUNTDOWN INTRO ====================
const CountdownIntro = ({ onComplete, playerName, enemyName }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [countdown, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl px-8">
        <div className="grid grid-cols-3 gap-8 items-center">
          <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-right">
            <motion.div animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-9xl mb-4">⚔️</motion.div>
            <h2 className="text-4xl font-bold text-cyan-400 mb-2">{playerName}</h2>
            <p className="text-xl text-gray-400">CHALLENGER</p>
          </motion.div>

          <div className="text-center">
            <AnimatePresence mode="wait">
              {countdown > 0 ? (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="text-[200px] font-bold"
                  style={{
                    background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {countdown}
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                  <div className="text-8xl font-bold mb-4" style={{ background: 'linear-gradient(90deg, #00ffff, #ff00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VS</div>
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-2xl text-cyan-400 font-bold">FIGHT!</motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-left">
            <motion.div animate={{ rotate: [5, -5, 5], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-9xl mb-4">🛡️</motion.div>
            <h2 className="text-4xl font-bold text-pink-400 mb-2">{enemyName}</h2>
            <p className="text-xl text-gray-400">OPPONENT</p>
          </motion.div>
        </div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
          <h1 className="text-6xl font-bold" style={{ background: 'linear-gradient(90deg, #00ffff, #ff00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>INCEPTION</h1>
          <p className="text-xl text-gray-400 mt-2">BATTLE ARENA</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ==================== CHARACTER SELECTION ====================
const CharacterSelection = ({ characters, onSelect, onClose }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative max-w-6xl w-full bg-black/80 backdrop-blur-2xl border-2 border-cyan-400 rounded-2xl p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400"><X className="w-6 h-6" /></button>
        <h2 className="text-4xl font-bold text-center mb-8 text-cyan-400">SELECT YOUR FIGHTER</h2>
        {characters.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-6">No characters available!</p>
            <button onClick={() => window.location.href = '/market'} className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-bold">Claim FREE Starter</button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {characters.map((char, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05, y: -5 }} onClick={() => onSelect(char)} className="cursor-pointer bg-gradient-to-br from-purple-900/20 to-black/50 border-2 border-purple-500/30 rounded-xl p-4 hover:border-cyan-400">
                <img src={char.image} alt={char.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                <h3 className="text-lg font-bold text-white">{char.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{char.class}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: 'ATK', value: char.stats.attack, color: '#ef4444' },
                    { label: 'DEF', value: char.stats.defense, color: '#10b981' },
                    { label: 'SPD', value: char.stats.speed, color: '#06b6d4' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-2 rounded" style={{ background: `${stat.color}20` }}>
                      <div className="font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ==================== DAMAGE NUMBER ====================
const DamageNumber = ({ damage, x, y, isCrit, color, rating, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -150, scale: isCrit ? [1, 2.5, 0] : [1, 1.8, 0] }}
      transition={{ duration: 2 }}
      className="absolute pointer-events-none z-50 font-bold text-center"
      style={{ left: x, top: y, fontFamily: 'Orbitron' }}
    >
      <div className="text-8xl mb-2" style={{ color: isCrit ? '#fbbf24' : color, textShadow: `0 0 40px ${color}, 0 0 80px ${color}` }}>
        {isCrit && '💥 '}-{damage}{isCrit && '!'}
      </div>
      {rating && rating !== 'OK' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold"
          style={{ color: rating === 'PERFECT!' ? '#fbbf24' : rating === 'GREAT!' ? '#10b981' : '#06b6d4' }}
        >
          {rating}
        </motion.div>
      )}
    </motion.div>
  );
};

// ==================== ULTIMATE ABILITY BUTTON ====================
const AbilityButton = ({ move, energy, cooldown, onUse, disabled }) => {
  const canUse = energy >= move.energy && cooldown <= 0 && !disabled;
  const isUltimate = move.type === 'ultimate';
  const iconInfo = getMoveIcon(move);
  const IconComponent = iconInfo.icon;

  return (
    <motion.button
      whileHover={canUse ? { scale: 1.08, y: -8 } : {}}
      whileTap={canUse ? { scale: 0.95 } : {}}
      onClick={() => canUse && onUse(move)}
      disabled={!canUse}
      className={`relative p-5 rounded-2xl border-4 transition-all overflow-hidden group ${
        canUse 
          ? `bg-gradient-to-br ${iconInfo.bg} ${iconInfo.border} shadow-[0_0_30px_${move.color}40]`
          : 'bg-black/60 border-gray-700 opacity-40 cursor-not-allowed'
      }`}
      style={{ borderColor: canUse ? move.color : '#374151' }}
    >
      {canUse && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: `linear-gradient(135deg, ${move.color}00, ${move.color}40, ${move.color}00)` }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {cooldown > 0 && (
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl font-black border-4 border-white shadow-lg z-10">
          {cooldown}
        </div>
      )}

      <div className="relative z-10 mb-3 flex justify-center">
        <motion.div
          className="p-3 rounded-xl border-2"
          style={{ 
            borderColor: move.color,
            backgroundColor: `${move.color}20`
          }}
          animate={canUse ? { boxShadow: [`0 0 0px ${move.color}`, `0 0 20px ${move.color}`, `0 0 0px ${move.color}`] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <IconComponent className="w-10 h-10" style={{ color: move.color }} />
        </motion.div>
      </div>

      <div className="relative z-10 text-base font-bold text-white mb-2 leading-tight h-10 flex items-center justify-center">
        {move.name}
      </div>

      <div className="relative z-10 text-xs text-gray-400 mb-3 h-8 leading-tight">
        {move.description}
      </div>
      
      <div className="relative z-10 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-yellow-400 font-bold">{move.energy}</span>
        </div>
        {move.damage > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/20 border border-red-500">
            <Sword className="w-3 h-3 text-red-400" />
            <span className="text-red-400 font-bold">{(move.damage * 100).toFixed(0)}%</span>
          </div>
        )}
      </div>
      
      {move.timing?.enabled && (
        <div className="relative z-10 mt-2 text-xs font-bold text-center py-1 rounded" style={{ backgroundColor: `${move.color}30`, color: move.color }}>
          ⏱️ {move.timing.difficulty.toUpperCase()}
        </div>
      )}

      {isUltimate && canUse && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ boxShadow: `inset 0 0 30px ${move.color}` }}
        />
      )}
    </motion.button>
  );
};

// ==================== MAIN ARENA ====================
export default function Arena() {
  const { address, isConnected } = useAccount();
  const [gamePhase, setGamePhase] = useState('selection');
  const [showTutorial, setShowTutorial] = useState(false);
  const [userCharacters, setUserCharacters] = useState([]);
  const [playerChar, setPlayerChar] = useState(null);
  const [enemyChar, setEnemyChar] = useState(null);
  const [playerHP, setPlayerHP] = useState(1000);
  const [playerMaxHP, setPlayerMaxHP] = useState(1000);
  const [enemyHP, setEnemyHP] = useState(1000);
  const [enemyMaxHP, setEnemyMaxHP] = useState(1000);
  const [playerEnergy, setPlayerEnergy] = useState(120);
  const [turn, setTurn] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cooldowns, setCooldowns] = useState({});
  const [battleLogs, setBattleLogs] = useState([]);
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [rewards, setRewards] = useState(null);
  const [showQTE, setShowQTE] = useState(false);
  const [currentMove, setCurrentMove] = useState(null);
  const [showDefensive, setShowDefensive] = useState(false);
  const [incomingDamage, setIncomingDamage] = useState(0);
  const [screenShake, setScreenShake] = useState(false);

  // 🔥 CHECK TUTORIAL SETTINGS
  useEffect(() => {
    if (address) {
      const virtualNFTs = JSON.parse(localStorage.getItem(VIRTUAL_NFTS_KEY) || '[]');
      setUserCharacters(virtualNFTs.filter(nft => nft.owner === address));
      
      // Check if tutorial is enabled
      const tutorialEnabled = localStorage.getItem(TUTORIAL_ENABLED_KEY);
      const tutorialCompleted = localStorage.getItem(TUTORIAL_COMPLETED_KEY);
      
      // Show tutorial only if enabled (or not disabled) AND not completed
      if (tutorialEnabled !== 'false' && !tutorialCompleted) {
        setShowTutorial(true);
      }
    }
  }, [address]);

  const handleCharacterSelect = (character) => {
    const maxHp = 1000 + (character.stats.defense * 10);
    setPlayerChar(character);
    setPlayerHP(maxHp);
    setPlayerMaxHP(maxHp);
    setPlayerEnergy(120);
    const randomEnemy = getRandomOpponent();
    const enemy = {
      ...randomEnemy,
      maxHp: 1000 + (randomEnemy.stats.defense * 10)
    };
    setEnemyChar(enemy);
    setEnemyHP(enemy.maxHp);
    setEnemyMaxHP(enemy.maxHp);
    setGamePhase('countdown');
  };

  const handleCountdownComplete = () => {
    if (showTutorial) {
      localStorage.setItem(TUTORIAL_COMPLETED_KEY, 'true');
      setShowTutorial(false);
    }
    startBattle();
  };

  const startBattle = () => {
    setGamePhase('battle');
    addLog(`${playerChar.name} enters the arena!`, '#00ffff');
    addLog(`${enemyChar.name} appears!`, '#ff00ff');
    addLog('Battle begins!', '#fbbf24');
  };

  const addLog = (message, color = '#ffffff') => {
    setBattleLogs(prev => [...prev, { message, color, id: Date.now() + Math.random() }]);
  };

  const showDamage = (damage, x, y, isCrit, color, rating) => {
    const id = Date.now() + Math.random();
    setDamageNumbers(prev => [...prev, { id, damage, x, y, isCrit, color, rating }]);
  };

  const handlePlayerMove = async (move) => {
    if (isAnimating || playerEnergy < move.energy) return;
    setIsAnimating(true);
    setPlayerEnergy(prev => prev - move.energy);
    if (move.cooldown > 0) setCooldowns(prev => ({ ...prev, [move.id]: move.cooldown }));

    if (move.timing?.enabled) {
      setCurrentMove(move);
      setShowQTE(true);
    } else {
      executePlayerAttack(move, { bonus: 1, rating: 'OK' });
    }
  };

  const handleQTEComplete = (timing) => {
    setShowQTE(false);
    executePlayerAttack(currentMove, timing);
  };

  const executePlayerAttack = (move, timing) => {
    const result = calculateAdvancedDamage(playerChar, enemyChar, move, timing.bonus);
    
    if (result.isMiss) {
      addLog(`${playerChar.name}'s ${move.name} MISSED!`, '#gray');
    } else {
      addLog(`${playerChar.name} used ${move.name}! ${result.damage} damage!${result.isCrit ? ' CRITICAL!' : ''} ${timing.rating}`, result.isCrit ? '#fbbf24' : move.color);
      const newEnemyHP = Math.max(0, enemyHP - result.damage);
      setEnemyHP(newEnemyHP);
      showDamage(result.damage, '70%', '30%', result.isCrit, move.color, timing.rating);
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 200);
      
      if (newEnemyHP <= 0) {
        setTimeout(() => handleVictory(), 2000);
        setIsAnimating(false);
        return;
      }
    }

    setTimeout(() => handleEnemyTurn(), 1500);
  };

  const handleEnemyTurn = () => {
    const aiMove = generateSmartAI(enemyChar, playerChar, playerHP, enemyHP, turn);
    addLog(`${enemyChar.name} uses ${aiMove.name}!`, '#ff00ff');
    
    const result = calculateAdvancedDamage(enemyChar, playerChar, aiMove, 1);
    
    if (!result.isMiss && result.damage > 0) {
      setIncomingDamage(result.damage);
      setShowDefensive(true);
    } else {
      addLog(`${enemyChar.name}'s attack failed!`, '#gray');
      setTimeout(() => nextTurn(), 1500);
    }
  };

  const handleDefensiveComplete = (defenseResult) => {
    setShowDefensive(false);
    const finalDamage = Math.floor(incomingDamage * (1 - defenseResult.damageReduction));
    const newPlayerHP = Math.max(0, playerHP - finalDamage);
    setPlayerHP(newPlayerHP);
    
    showDamage(finalDamage, '30%', '30%', false, '#ff00ff', defenseResult.rating);
    addLog(`${playerChar.name} ${defenseResult.rating}! Took ${finalDamage} damage!`, defenseResult.color || '#ff00ff');
    
    if (defenseResult.counterDamage > 0) {
      const counterDmg = Math.floor(incomingDamage * defenseResult.counterDamage);
      setEnemyHP(prev => Math.max(0, prev - counterDmg));
      addLog(`Counter attack! ${counterDmg} damage!`, '#10b981');
      showDamage(counterDmg, '70%', '40%', false, '#10b981', 'COUNTER');
    }
    
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 200);
    
    if (newPlayerHP <= 0) {
      setTimeout(() => handleDefeat(), 2000);
      setIsAnimating(false);
    } else {
      setTimeout(() => nextTurn(), 2000);
    }
  };

  const nextTurn = () => {
    setTurn(prev => prev + 1);
    setPlayerEnergy(prev => Math.min(120, prev + 25));
    setCooldowns(prev => {
      const newCooldowns = { ...prev };
      Object.keys(newCooldowns).forEach(key => { newCooldowns[key] = Math.max(0, newCooldowns[key] - 1); });
      return newCooldowns;
    });
    addLog(`Turn ${turn + 1} - Your move!`, '#00ffff');
    setIsAnimating(false);
  };

  const handleVictory = () => {
    const battleRewards = calculateBattleRewards(playerChar, enemyChar, turn);
    setRewards(battleRewards);
    
    const virtualNFTs = JSON.parse(localStorage.getItem(VIRTUAL_NFTS_KEY) || '[]');
    const updatedNFTs = virtualNFTs.map(nft => {
      if (nft.id === playerChar.id) {
        return { ...nft, stats: { attack: battleRewards.attack, defense: battleRewards.defense, speed: battleRewards.speed } };
      }
      return nft;
    });
    localStorage.setItem(VIRTUAL_NFTS_KEY, JSON.stringify(updatedNFTs));
    
    const history = JSON.parse(localStorage.getItem(BATTLE_HISTORY_KEY) || '[]');

    const newBattle = {
      id: `battle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: Date.now(),
      winner: playerChar.name,
      loser: enemyChar.name,
      turns: turn,
      rewards: battleRewards
    };

    const isDuplicate = history.some(b => 
      b.winner === newBattle.winner && 
      b.loser === newBattle.loser && 
      Math.abs(b.date - newBattle.date) < 2000
    );

    if (!isDuplicate) {
      history.push(newBattle);
      localStorage.setItem(BATTLE_HISTORY_KEY, JSON.stringify(history));
    }
    
    setGamePhase('victory');
  };

  const handleDefeat = () => setGamePhase('defeat');

  const handleRestart = () => {
    setGamePhase('selection');
    setPlayerChar(null);
    setEnemyChar(null);
    setBattleLogs([]);
    setDamageNumbers([]);
    setCooldowns({});
    setTurn(1);
    setPlayerEnergy(120);
  };

  // 🔥 TOGGLE TUTORIAL FUNCTION
  const toggleTutorial = () => {
    setShowTutorial(prev => !prev);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Sword className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Wallet</h2>
          <p className="text-gray-400">Connect to access the arena</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      animate={screenShake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.2 }}
    >
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      {/* 🔥 TUTORIAL HELP BUTTON */}
      {gamePhase === 'battle' && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTutorial}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center z-40 border-2 border-white/20"
          title="Toggle Tutorial"
        >
          <HelpCircle className="w-8 h-8 text-white" />
        </motion.button>
      )}

      {/* 🔥 TUTORIAL OVERLAY */}
      <AnimatePresence>
        {showTutorial && gamePhase === 'battle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 border-4 border-cyan-400 rounded-2xl p-8 max-w-4xl relative"
            >
              <button
                onClick={() => setShowTutorial(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-5xl font-bold text-cyan-400 mb-6 text-center">⚔️ BATTLE TUTORIAL</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-purple-500/20 border-2 border-purple-500 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Energy Management
                  </h3>
                  <p className="text-gray-300 mb-3">Each move costs energy. Manage wisely!</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Start with 120 energy</li>
                    <li>• Regenerate 25 per turn</li>
                    <li>• Powerful moves cost more</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-500/20 border-2 border-green-500 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <Target className="w-6 h-6 text-cyan-400" />
                    Timing QTE
                  </h3>
                  <p className="text-gray-300 mb-3">Perfect timing = 2.5x damage!</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Click in yellow zone</li>
                    <li>• PERFECT = 2.5x damage</li>
                    <li>• GREAT = 1.8x damage</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-500/20 border-2 border-blue-500 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-400" />
                    Defensive Actions
                  </h3>
                  <p className="text-gray-300 mb-3">Block or parry incoming attacks!</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• BLOCK = Reduce damage 80%</li>
                    <li>• PARRY = Block 90% + Counter!</li>
                    <li>• React fast for best results</li>
                  </ul>
                </div>

                <div className="p-6 bg-red-500/20 border-2 border-red-500 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-400" />
                    Move Types
                  </h3>
                  <p className="text-gray-300 mb-3">Choose moves strategically!</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Physical: Quick attacks</li>
                    <li>• Special: Heavy damage</li>
                    <li>• Ultimate: Game changers</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setShowTutorial(false);
                    localStorage.setItem(TUTORIAL_COMPLETED_KEY, 'true');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-xl"
                >
                  Got It! Let's Battle 🔥
                </button>
                <p className="text-sm text-gray-400 mt-3">
                  You can access this tutorial anytime by clicking the help button
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {damageNumbers.map((dmg) => (
          <DamageNumber key={dmg.id} {...dmg} onComplete={() => setDamageNumbers(prev => prev.filter(d => d.id !== dmg.id))} />
        ))}
      </AnimatePresence>

      {showQTE && currentMove && <TimingQTE move={currentMove} onComplete={handleQTEComplete} />}
      {showDefensive && <DefensiveQTE incomingDamage={incomingDamage} onComplete={handleDefensiveComplete} />}

      {gamePhase === 'selection' && <CharacterSelection characters={userCharacters} onSelect={handleCharacterSelect} onClose={() => window.location.href = '/dashboard'} />}
      {gamePhase === 'countdown' && <CountdownIntro onComplete={handleCountdownComplete} playerName={playerChar?.name} enemyName={enemyChar?.name} />}

      {gamePhase === 'battle' && playerChar && enemyChar && (
        <div className="relative z-10 p-4 max-w-[2000px] mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold mb-2" style={{ background: 'linear-gradient(90deg, #00ffff, #ff00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BATTLE ARENA</h1>
            <p className="text-gray-400 text-lg">Turn {turn} • {isAnimating ? 'Processing...' : 'Your Turn'}</p>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-3 bg-black/70 backdrop-blur-2xl border-2 border-cyan-400 rounded-2xl p-4">
              <img src={playerChar.image} alt={playerChar.name} className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="text-xl font-bold text-white">{playerChar.name}</h3>
              <p className="text-sm text-cyan-400 mb-3">{playerChar.class}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">HP</span>
                  <span className="text-cyan-400 font-bold">{playerHP}/{playerMaxHP}</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-cyan-400/30">
                  <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${(playerHP / playerMaxHP) * 100}%` }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">⚡ Energy</span>
                  <span className="text-yellow-400 font-bold">{playerEnergy}/120</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-yellow-400/30">
                  <motion.div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: `${(playerEnergy/120) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-black/70 backdrop-blur-2xl border-2 border-purple-400/30 rounded-2xl p-4">
              <h3 className="text-xl font-bold text-purple-400 mb-3">⚔️ BATTLE LOG</h3>
              <div className="space-y-2 h-[500px] overflow-y-auto">
                {battleLogs.slice(-20).map((log) => (
                  <motion.div key={log.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-2 rounded-lg bg-white/5 border-l-4 text-sm font-mono" style={{ borderColor: log.color, color: log.color }}>
                    {log.message}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="col-span-3 bg-black/70 backdrop-blur-2xl border-2 border-pink-400 rounded-2xl p-4">
              <img src={enemyChar.image} alt={enemyChar.name} className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="text-xl font-bold text-white">{enemyChar.name}</h3>
              <p className="text-sm text-pink-400 mb-3">{enemyChar.class}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">HP</span>
                  <span className="text-pink-400 font-bold">{enemyHP}/{enemyMaxHP}</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-pink-400/30">
                  <motion.div className="h-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${(enemyHP / enemyMaxHP) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {Object.values(MOVE_TYPES).slice(0, 15).map((move) => (
              <AbilityButton key={move.id} move={move} energy={playerEnergy} cooldown={cooldowns[move.id] || 0} onUse={handlePlayerMove} disabled={isAnimating} />
            ))}
          </div>
        </div>
      )}

      {(gamePhase === 'victory' || gamePhase === 'defeat') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={`max-w-2xl w-full mx-4 p-12 text-center rounded-2xl border-4 ${gamePhase === 'victory' ? 'bg-gradient-to-br from-yellow-900/80 to-black/80 border-yellow-400' : 'bg-gradient-to-br from-red-900/80 to-black/80 border-red-500'}`}>
            <div className="text-9xl mb-6">{gamePhase === 'victory' ? '🏆' : '💀'}</div>
            <h2 className={`text-6xl font-bold mb-4 ${gamePhase === 'victory' ? 'text-yellow-400' : 'text-red-400'}`}>{gamePhase === 'victory' ? 'VICTORY!' : 'DEFEATED'}</h2>
            <p className="text-3xl text-white mb-8">{gamePhase === 'victory' ? `${playerChar.name} wins in ${turn} turns!` : 'Better luck next time!'}</p>

            {gamePhase === 'victory' && rewards && (
              <div className="bg-black/50 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-green-400 mb-4">⭐ REWARDS EARNED</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: '⚔️', label: 'Attack', value: rewards.attack - playerChar.stats.attack, color: '#ef4444' },
                    { icon: '🛡️', label: 'Defense', value: rewards.defense - playerChar.stats.defense, color: '#10b981' },
                    { icon: '⚡', label: 'Speed', value: rewards.speed - playerChar.stats.speed, color: '#06b6d4' }
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl p-6" style={{ background: `${stat.color}20` }}>
                      <div className="text-5xl mb-2">{stat.icon}</div>
                      <div className="text-3xl font-bold text-white mb-1">+{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button onClick={handleRestart} className={`px-10 py-5 rounded-xl font-bold text-xl flex items-center gap-3 ${gamePhase === 'victory' ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-orange-600'}`}>
                <RotateCcw className="w-6 h-6" /> {gamePhase === 'victory' ? 'Battle Again' : 'Try Again'}
              </button>
              <button onClick={() => window.location.href = '/dashboard'} className="px-10 py-5 rounded-xl bg-gray-600 font-bold text-xl flex items-center gap-3">
                <ArrowRight className="w-6 h-6" /> Exit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
