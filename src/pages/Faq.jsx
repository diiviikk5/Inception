import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HelpCircle,Sparkles,Trophy,TrendingUp, ChevronDown, Search, Zap, Shield, Globe, 
  Wallet, Coins, Users, MessageSquare, Mail, ExternalLink,
  CheckCircle, AlertCircle, Info
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

const GlassCard = ({ children, className = "" }) => (
  <div className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 ${className}`}>
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </div>
);

const FAQItem = ({ question, answer, icon: Icon, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <GlassCard className="mb-4">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left group"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-4 flex-1">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${color}20`, border: `1px solid ${color}40` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {question}
            </span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/10 text-gray-300 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: HelpCircle, color: '#00ffff' },
    { id: 'general', label: 'General', icon: Info, color: '#ff00ff' },
    { id: 'gameplay', label: 'Gameplay', icon: Zap, color: '#39ff14' },
    { id: 'wallet', label: 'Wallet & Crypto', icon: Wallet, color: '#fbbf24' },
    { id: 'nfts', label: 'NFTs', icon: Coins, color: '#8b5cf6' },
  ];

  const faqs = [
    {
      category: 'general',
      question: 'What is INCEPTION?',
      answer: 'INCEPTION is the first truly omnichain gaming ecosystem where NFTs evolve dynamically, battles are provably fair using Chainlink VRF, and assets can be transferred seamlessly across multiple blockchains. We eliminate the limitations of single-chain games and centralized platforms.',
      icon: Info,
      color: '#00ffff'
    },
    {
      category: 'gameplay',
      question: 'How does the battle system work?',
      answer: 'Our battle system uses deterministic battle kernels combined with Chainlink VRF (Verifiable Random Function) to ensure complete fairness. Every battle outcome is cryptographically verifiable and can be replayed to confirm authenticity. No server-side manipulation is possible.',
      icon: Zap,
      color: '#ff00ff'
    },
    {
      category: 'nfts',
      question: 'Do my NFTs really evolve?',
      answer: 'Yes! Your NFTs are dynamic and evolve based on multiple factors: victories in battles, environmental changes in the game world, time elapsed, and interactions with other NFTs. Each evolution is recorded on-chain and permanently updates your NFT metadata.',
      icon: Sparkles,
      color: '#39ff14'
    },
    {
      category: 'wallet',
      question: 'Which wallets are supported?',
      answer: 'We support all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, Rainbow, and more. As long as your wallet supports the chains we operate on (Ethereum, Polygon, Arbitrum, Optimism, etc.), you can play.',
      icon: Wallet,
      color: '#fbbf24'
    },
    {
      category: 'gameplay',
      question: 'Can I play on mobile?',
      answer: 'Yes! INCEPTION is fully responsive and works on mobile browsers. Simply connect your mobile wallet (MetaMask, Trust Wallet, etc.) and you can play on the go. We also have native mobile apps in development.',
      icon: Users,
      color: '#ec4899'
    },
    {
      category: 'nfts',
      question: 'How does cross-chain work?',
      answer: 'We use omnichain attestations and atomic swaps powered by LayerZero and Wormhole protocols. When you mint an NFT on one chain, it automatically gets attestations on all supported chains. You can then move it seamlessly using our bridge interface.',
      icon: Globe,
      color: '#06b6d4'
    },
    {
      category: 'wallet',
      question: 'What are gas fees like?',
      answer: 'Gas fees vary by chain. We primarily operate on Layer 2 solutions like Polygon and Arbitrum where fees are typically under $0.01 per transaction. For Ethereum mainnet, fees are higher but we batch transactions to minimize costs.',
      icon: Coins,
      color: '#f59e0b'
    },
    {
      category: 'gameplay',
      question: 'Is there a ranked system?',
      answer: 'Yes! We have a comprehensive ranking system with divisions: Bronze, Silver, Gold, Platinum, Diamond, Master, and Grandmaster. Your rank is determined by your win rate, total victories, and performance against higher-ranked opponents.',
      icon: Trophy,
      color: '#fbbf24'
    },
    {
      category: 'general',
      question: 'Is INCEPTION audited?',
      answer: 'All our smart contracts are audited by leading blockchain security firms including CertiK and OpenZeppelin. Audit reports are publicly available on our GitHub. We also have an ongoing bug bounty program.',
      icon: Shield,
      color: '#10b981'
    },
    {
      category: 'nfts',
      question: 'Can I trade my NFTs?',
      answer: 'Absolutely! Our built-in marketplace allows peer-to-peer trading with zero platform fees (only gas). NFTs can also be listed on external marketplaces like OpenSea and Blur since they follow standard ERC-721 protocols.',
      icon: TrendingUp,
      color: '#8b5cf6'
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickLinks = [
    { label: 'Getting Started Guide', icon: ExternalLink, color: '#00ffff' },
    { label: 'Whitepaper', icon: ExternalLink, color: '#ff00ff' },
    { label: 'Smart Contract Docs', icon: ExternalLink, color: '#39ff14' },
    { label: 'Community Discord', icon: MessageSquare, color: '#fbbf24' },
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
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-purple-400 rounded-full -z-10"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -120, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      <div className="relative z-10 p-8 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <RevealOnScroll>
          <div className="text-center mb-16 pt-12">
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HelpCircle className="w-20 h-20 text-cyan-400" style={{ filter: 'drop-shadow(0 0 20px #00ffff)' }} />
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
              FAQ
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about INCEPTION
            </p>
          </div>
        </RevealOnScroll>

        {/* Search Bar */}
        <RevealOnScroll delay={0.2}>
          <GlassCard className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors text-lg"
              />
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* Category Pills */}
        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-orbitron font-bold flex items-center gap-2 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </motion.button>
            ))}
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ List */}
          <div className="lg:col-span-2">
            <RevealOnScroll delay={0.4}>
              {filteredFAQs.length > 0 ? (
                <div>
                  {filteredFAQs.map((faq, idx) => (
                    <FAQItem key={idx} {...faq} />
                  ))}
                </div>
              ) : (
                <GlassCard className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-xl text-gray-400">No FAQs found matching your search</p>
                </GlassCard>
              )}
            </RevealOnScroll>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <RevealOnScroll delay={0.5}>
              <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {quickLinks.map((link, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between group transition-all"
                    >
                      <span className="text-white group-hover:text-cyan-400 transition-colors">
                        {link.label}
                      </span>
                      <link.icon className="w-5 h-5" style={{ color: link.color }} />
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </RevealOnScroll>

            {/* Still Have Questions */}
            <RevealOnScroll delay={0.6}>
              <GlassCard className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
                <p className="text-gray-300 mb-6">
                  Our community is here to help! Join our Discord or reach out via email.
                </p>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Join Discord
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-xl border-2 border-purple-500 text-purple-400 font-bold flex items-center justify-center gap-2 hover:bg-purple-500/10"
                  >
                    <Mail className="w-5 h-5" />
                    Email Support
                  </motion.button>
                </div>
              </GlassCard>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
