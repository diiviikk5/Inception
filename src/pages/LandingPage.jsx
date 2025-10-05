import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Zap, Shield, Gamepad2, Users, Sparkles, Sword, ChevronDown, 
  Play, Download, Github, Twitter, MessageSquare, Globe, Network,
  CheckCircle, Rocket, Target, Layers, ArrowRight, Hexagon,
  Flame, Crown, Trophy, Star, Coins
} from 'lucide-react';

// Battle Video Background with smooth transition
const CyberpunkBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Battle Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ filter: 'brightness(0.7) contrast(1.2)' }}
      >
        <source src="https://user-gen-media-assets.s3.amazonaws.com/veo_videos/bbd179c6-533e-4e13-a084-c1e210684982.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-cyan-900/30" />
      
      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

// Floating Particles
const FloatingParticles = ({ count = 50 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: ['#ff00ff', '#00ffff', '#39ff14'][i % 3],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 10px ${['#ff00ff', '#00ffff', '#39ff14'][i % 3]}`
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Reveal Animation
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div ref={ref}>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Enhanced Loading Screen with Battle Video
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      {/* Battle video in loading screen */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        style={{ filter: 'brightness(0.5)' }}
      >
        <source src="https://user-gen-media-assets.s3.amazonaws.com/veo_videos/bbd179c6-533e-4e13-a084-c1e210684982.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 text-center">
        <motion.div
          className="w-32 h-32 mx-auto mb-8 relative"
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full border-4 border-cyan-500/50 border-t-cyan-500 absolute" />
          <div className="w-24 h-24 absolute inset-4 rounded-full border-4 border-purple-500/50 border-b-purple-500" />
          <div className="w-16 h-16 absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
        </motion.div>
        
        <motion.h2
          className="text-3xl font-orbitron font-bold mb-6 text-glow-cyan"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INITIALIZING OMNICHAIN
        </motion.h2>
        
        <div className="w-96 h-3 bg-gray-900 rounded-full mx-auto overflow-hidden border border-cyan-500/30">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <motion.div
              className="absolute inset-0 bg-white/30"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        <motion.p className="text-cyan-400 mt-4 font-orbitron text-xl font-bold">
          {Math.floor(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [glitchText, setGlitchText] = useState('INCEPTION');
  const titleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchChars = ['I', 'N', 'C', 'E', 'P', 'T', 'I', 'O', 'N', '█', '▓', '░'];
    const original = 'INCEPTION';
    
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = original.split('').map(char => 
          Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(original), 100);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (titleRef.current && !isLoading) {
      gsap.from(titleRef.current, {
        duration: 1.5,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.3
      });
    }
  }, [isLoading]);

  const stats = [
    { value: '1M+', label: 'Players Ready', icon: Users, color: '#00ffff' },
    { value: '500K+', label: 'NFTs Minted', icon: Sparkles, color: '#ff00ff' },
    { value: '250K+', label: 'Battles Won', icon: Sword, color: '#39ff14' },
    { value: '100K+', label: 'Cross-Chain', icon: Network, color: '#fbbf24' },
  ];

  const features = [
    {
      icon: Gamepad2,
      title: 'DYNAMIC EVOLUTION',
      subtitle: 'Living NFT Ecosystem',
      description: 'Watch your NFTs evolve based on victories, environmental changes, and time. Each asset becomes truly unique.',
      color: '#ff00ff',
      features: ['Real-time evolution', 'Environmental adaptation', 'Victory upgrades', 'Time mutations']
    },
    {
      icon: Shield,
      title: 'ZERO-TRUST COMBAT',
      subtitle: 'Provably Fair Battles',
      description: 'Every combat outcome is cryptographically verified using VRF. No cheating, ever.',
      color: '#00ffff',
      features: ['Chainlink VRF', 'Deterministic outcomes', 'Replay protection', 'Crypto proofs']
    },
    {
      icon: Globe,
      title: 'OMNICHAIN LIQUIDITY',
      subtitle: 'Cross-Chain Freedom',
      description: 'Seamlessly move assets across L1s and L2s with atomic swaps. True blockchain freedom.',
      color: '#39ff14',
      features: ['Atomic swaps', 'Multi-chain support', 'Instant settlements', 'Bridge-less transfers']
    }
  ];

  const team = [
    { name: 'Aarushi', role: 'Serial Sleeper', avatar: '🚀' },
    { name: 'Harsh Dixit', role: '6x UPSC cleared', avatar: '🎮' },
    { name: 'Divik', role: 'Existing', avatar: '⚡' },
    { name: 'Hardik', role: 'Women Helpline', avatar: '🎨' }
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Effects with Battle Video */}
      <CyberpunkBackground />
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-20">
        <RevealOnScroll>
          <div ref={titleRef} className="mb-8">
            <motion.h1 
              className="text-7xl md:text-9xl font-orbitron font-black tracking-wider mb-4"
              style={{
                background: 'linear-gradient(90deg, #ff00ff, #00ffff, #39ff14, #ff00ff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(0, 255, 255, 0.5)'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {glitchText}
            </motion.h1>
            
            <motion.div
              className="h-2 rounded-full mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
              style={{ maxWidth: '600px' }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-glow-green"
            animate={{ 
              textShadow: [
                '0 0 30px #39ff14',
                '0 0 50px #39ff14, 0 0 80px #39ff14',
                '0 0 30px #39ff14'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            THE OMNICHAIN REVOLUTION
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl">
            {[
              { icon: Zap, text: 'Cross-Chain Evolution', color: '#00ffff' },
              { icon: Shield, text: 'Zero-Trust Combat', color: '#ff00ff' },
              { icon: Globe, text: 'True Ownership', color: '#39ff14' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-3 p-5 rounded-xl glass-dark border hover-glow-cyan"
                style={{ borderColor: `${item.color}40` }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
                <span className="font-orbitron font-bold" style={{ color: item.color }}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <div className="flex flex-col md:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/dashboard'}
              className="px-12 py-5 text-xl font-orbitron font-bold rounded-xl relative overflow-hidden group"
              style={{
                background: 'linear-gradient(45deg, #ff00ff, #bf00ff)',
                boxShadow: '0 20px 40px rgba(255, 0, 255, 0.4)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-6 h-6" />
                ENTER THE ARENA
                <ArrowRight className="w-6 h-6" />
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 text-xl font-orbitron font-bold border-2 border-cyan-500 text-cyan-400 rounded-xl hover-glow-cyan glass-dark"
            onClick={() => window.open('/whitepaper.pdf', '_blank')}
            >
              <span className="flex items-center gap-3">
                <Download className="w-6 h-6" />
                Whitepaper
                 
              </span>
              
            </motion.button>
            
          </div>
        </RevealOnScroll>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-green-400"
          >
            <span className="font-orbitron text-sm mb-2">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 z-20">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-5xl font-orbitron font-bold text-center mb-16 text-glow-cyan">
              REVOLUTION IN NUMBERS
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center p-8 rounded-2xl glass-dark border"
                  style={{
                    borderColor: `${stat.color}40`,
                    boxShadow: `0 10px 40px ${stat.color}20`
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <stat.icon className="w-16 h-16 mx-auto mb-4" style={{ color: stat.color }} />
                  </motion.div>
                  <div className="text-5xl font-orbitron font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-orbitron">{stat.label}</div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 z-20">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-5xl font-orbitron font-bold text-center mb-16 text-glow-green">
              BREAKTHROUGH TECHNOLOGY
            </h2>
          </RevealOnScroll>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.2}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="p-8 rounded-2xl glass-dark border-2 h-full"
                  style={{
                    borderColor: feature.color,
                    boxShadow: `0 0 40px ${feature.color}20`
                  }}
                >
                  <feature.icon className="w-20 h-20 mb-6" style={{ color: feature.color }} />
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2">{feature.title}</h3>
                  <h4 className="text-xl mb-4" style={{ color: feature.color }}>{feature.subtitle}</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" style={{ color: feature.color }} />
                        <span className="text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6 z-20 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-5xl font-orbitron font-bold text-center mb-16 text-glow-purple" style={{ color: '#ff00ff' }}>
              ELITE TEAM
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="text-center p-8 rounded-2xl glass-dark border border-cyan-500/30 hover-glow-cyan"
                >
                  <div className="text-7xl mb-6">{member.avatar}</div>
                  <h3 className="text-2xl font-orbitron font-bold text-cyan-400 mb-2">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 z-20 border-t border-purple-500/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-4xl font-orbitron font-bold text-glow-pink mb-4" style={{ color: '#ff00ff' }}>
                INCEPTION
              </h3>
              <p className="text-gray-400 max-w-md">
                The future of gaming is here. Join the omnichain revolution.
              </p>
            </div>
            
            <div className="flex gap-6">
              {[
                { icon: Twitter, color: '#00ffff' },
                { icon: MessageSquare, color: '#ff00ff' },
                { icon: Github, color: '#39ff14' }
              ].map((social, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 border-2 rounded-xl glass-dark"
                  style={{ borderColor: social.color }}
                >
                  <social.icon className="w-7 h-7" style={{ color: social.color }} />
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 font-orbitron">
            <p>© 2025 INCEPTION. Breaking the chains of centralized gaming.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
