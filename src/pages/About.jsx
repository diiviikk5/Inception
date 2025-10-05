import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Zap, Shield, Globe, Rocket, Users, Target, Sparkles, 
  TrendingUp, Award, Code, Gamepad2, Lock, Layers, Network,
  CheckCircle, ArrowRight, Github, Twitter, MessageSquare
} from 'lucide-react';

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

const GlassCard = ({ children, className = "", glow = false, glowColor = "#00ffff" }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 ${className}`}
    style={{
      boxShadow: glow ? `0 0 40px ${glowColor}40, inset 0 0 30px rgba(0, 0, 0, 0.5)` : '0 20px 60px rgba(0, 0, 0, 0.5)'
    }}
  >
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </motion.div>
);

export default function About() {
  const [activeTab, setActiveTab] = useState('vision');

  const features = [
    {
      icon: Gamepad2,
      title: 'Dynamic Evolution',
      description: 'NFTs that evolve based on victories, time, and environmental changes',
      color: '#ff00ff'
    },
    {
      icon: Shield,
      title: 'Zero-Trust Combat',
      description: 'Provably fair battles using Chainlink VRF and on-chain verification',
      color: '#00ffff'
    },
    {
      icon: Globe,
      title: 'Omnichain Liquidity',
      description: 'Seamless cross-chain asset transfers with atomic swaps',
      color: '#39ff14'
    },
    {
      icon: Lock,
      title: 'True Ownership',
      description: 'Your NFTs, your rules. Complete sovereignty over digital assets',
      color: '#fbbf24'
    },
    {
      icon: Network,
      title: 'Multi-Chain Support',
      description: 'Works across Ethereum, Polygon, Arbitrum, and more L1s/L2s',
      color: '#8b5cf6'
    },
    {
      icon: Layers,
      title: 'Warp Minting',
      description: 'Mint once, available everywhere with omnichain attestations',
      color: '#ec4899'
    }
  ];

  const team = [
    { name: 'Aarushi', role: 'Serial Sleeper', emoji: '🚀', color: '#00ffff', bio: 'Blockchain architect pushing the boundaries of cross-chain technology' },
    { name: 'Harsh Dixit', role: '6x UPSC Cleared', emoji: '🎮', color: '#ff00ff', bio: 'Game theory expert and smart contract wizard' },
    { name: 'Divik', role: 'Existing', emoji: '⚡', color: '#39ff14', bio: 'Full-stack developer creating seamless user experiences' },
    { name: 'Hardik', role: 'Women Helpline', emoji: '🎨', color: '#fbbf24', bio: 'UI/UX designer crafting the visual identity of INCEPTION' }
  ];

  const stats = [
    { value: '1M+', label: 'Community Members', icon: Users, color: '#00ffff' },
    { value: '500K+', label: 'NFTs Minted', icon: Sparkles, color: '#ff00ff' },
    { value: '10+', label: 'Supported Chains', icon: Network, color: '#39ff14' },
    { value: '99.9%', label: 'Uptime', icon: Zap, color: '#fbbf24' },
  ];

  const milestones = [
    { year: '2024 Q1', title: 'Concept & Research', desc: 'Initial research into cross-chain gaming' },
    { year: '2024 Q2', title: 'Alpha Launch', desc: 'First testnet deployment on Polygon' },
    { year: '2024 Q3', title: 'Beta Release', desc: 'Multi-chain support added' },
    { year: '2024 Q4', title: 'Mainnet Launch', desc: 'Full production release with 5 chains' },
    { year: '2025 Q1', title: 'Ecosystem Growth', desc: 'Partnership with major L2s and gaming studios' },
    { year: '2025 Q2', title: 'DAO Formation', desc: 'Community governance launch' },
  ];

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
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-cyan-400 rounded-full -z-10"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <RevealOnScroll>
          <div className="text-center mb-20 pt-12">
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <h1 
              className="text-6xl md:text-7xl font-orbitron font-black mb-6"
              style={{
                background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ABOUT INCEPTION
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The first truly omnichain gaming ecosystem where your NFTs evolve, 
              battles are provably fair, and assets flow seamlessly across blockchains.
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats Bar */}
        <RevealOnScroll delay={0.2}>
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, idx) => (
              <GlassCard key={idx} glow glowColor={stat.color}>
                <div className="text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4" style={{ color: stat.color }} />
                  <div className="text-4xl font-orbitron font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>

        {/* Vision/Mission/Values Tabs */}
        <RevealOnScroll delay={0.3}>
          <GlassCard className="mb-20">
            <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
              {['vision', 'mission', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-orbitron font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'vision' && (
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-cyan-400">Our Vision</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    We envision a future where blockchain gaming transcends the limitations of centralized platforms and single-chain ecosystems. INCEPTION is building the infrastructure for truly sovereign digital ownership and cross-chain interoperability.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Our goal is to eliminate walled gardens, create fair and transparent game mechanics, and empower players with unprecedented control over their digital assets across the entire blockchain landscape.
                  </p>
                </div>
              )}

              {activeTab === 'mission' && (
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-purple-400">Our Mission</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    To revolutionize blockchain gaming by delivering provably fair combat systems, dynamic NFT evolution, and seamless omnichain liquidity. We're committed to:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Building the most advanced cross-chain gaming infrastructure',
                      'Ensuring 100% transparency and fairness in all game mechanics',
                      'Empowering players with true digital ownership',
                      'Creating a sustainable and rewarding gaming economy'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'values' && (
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-green-400">Our Values</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: 'Transparency', desc: 'All game logic is on-chain and auditable' },
                      { title: 'Innovation', desc: 'Pushing boundaries of blockchain technology' },
                      { title: 'Community', desc: 'Building with and for our players' },
                      { title: 'Security', desc: 'Rigorous audits and best practices' }
                    ].map((value, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                        <p className="text-gray-400">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </GlassCard>
        </RevealOnScroll>

        {/* Key Features */}
        <RevealOnScroll delay={0.4}>
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-white">
            Revolutionary Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {features.map((feature, idx) => (
              <GlassCard key={idx} glow glowColor={feature.color}>
                <feature.icon className="w-16 h-16 mb-6" style={{ color: feature.color }} />
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <RevealOnScroll delay={0.5}>
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-white">
            Our Journey
          </h2>
          <div className="relative mb-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />
            
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-8 mb-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <GlassCard>
                    <div className="text-cyan-400 font-bold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.desc}</p>
                  </GlassCard>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-4 border-black z-10" />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Team */}
        <RevealOnScroll delay={0.6}>
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-white">
            Meet The Team
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {team.map((member, idx) => (
              <GlassCard key={idx} glow glowColor={member.color}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: member.color }}>
                    {member.name}
                  </h3>
                  <p className="text-gray-400 mb-4 font-bold">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.bio}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>

        {/* CTA Section */}
        <RevealOnScroll delay={0.7}>
          <GlassCard className="text-center" glow glowColor="#00ffff">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-white">
              Join The Revolution
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the future of blockchain gaming. Connect your wallet and start battling today.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-orbitron font-bold text-white flex items-center gap-3 justify-center"
                style={{ boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)' }}
              >
                Start Playing
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl border-2 border-purple-500 font-orbitron font-bold text-purple-400 hover:bg-purple-500/10"
              >
                Read Whitepaper
              </motion.button>
            </div>

            <div className="flex gap-6 justify-center">
              {[
                { icon: Twitter, color: '#00ffff' },
                { icon: Github, color: '#ff00ff' },
                { icon: MessageSquare, color: '#39ff14' }
              ].map((social, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 rounded-xl border-2"
                  style={{ borderColor: social.color }}
                >
                  <social.icon className="w-6 h-6" style={{ color: social.color }} />
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </div>
  );
}
