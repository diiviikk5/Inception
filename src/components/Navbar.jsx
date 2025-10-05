import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { 
  Home, Swords, ShoppingCart, Layers, Users, HelpCircle, 
  Mail, Menu, X, Wallet, ChevronDown, Zap, Shield, Trophy,
  Settings, LogOut, User, Sparkles, BookOpen, BarChart3, Crown
} from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Wagmi hooks for wallet connection
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Arena', path: '/arena', icon: Swords },
    { name: 'Tournament', path: '/tournament', icon: Trophy, special: true },
    { name: 'Market', path: '/market', icon: ShoppingCart },
    { name: 'Moves', path: '/moves', icon: BookOpen },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  const moreNavItems = [
    { name: 'Deck Builder', path: '/deck-builder', icon: Layers },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'About', path: '/about', icon: Users },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect();
      setShowUserMenu(false);
    } else {
      connect({ connector: injected() });
    }
  };

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,255,255,0.1)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden"
              style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)' }}
            >
              <img 
                src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/54f9c1be-81c5-46fe-b7c5-7927be96dba5.png"
                alt="Logo"
                className="w-full h-full object-cover p-1"
              />
            </div>
            <div className="hidden md:block">
              <h1 
                className="text-2xl font-orbitron font-bold"
                style={{
                  background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                OMNICHAIN ARENA
              </h1>
            </div>
          </motion.div>

          {/* Desktop Nav - Main Items */}
          <div className="hidden lg:flex items-center gap-2">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-xl font-orbitron font-bold flex items-center gap-2 transition-all relative ${
                    isActive
                      ? item.special
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_30px_rgba(0,255,255,0.4)]'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {item.special && (
                    <Crown className="w-4 h-4 text-yellow-400 animate-pulse" />
                  )}
                </motion.button>
              );
            })}

            {/* More Menu - Dropdown */}
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2.5 rounded-xl font-orbitron font-bold flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/50 transition-all"
              >
                More
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 right-0 w-48 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <div className="p-2">
                  {moreNavItems.map((item) => (
                    <motion.button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-gray-300 hover:text-white transition-colors font-orbitron"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Wallet + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Wallet Button */}
            {isConnected ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500/50 font-orbitron font-bold"
                  style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400">{formatAddress(address)}</span>
                  <ChevronDown className="w-4 h-4 text-green-400" />
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 w-64 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
                            🎮
                          </div>
                          <div>
                            <div className="font-orbitron font-bold text-white">CYBER_WARRIOR</div>
                            <div className="text-xs text-gray-400">{formatAddress(address)}</div>
                          </div>
                        </div>

                        <div className="py-2 space-y-1">
                          {[
                            { icon: User, label: 'Profile', action: () => navigate('/profile') },
                            { icon: Trophy, label: 'Achievements', action: () => navigate('/achievements') },
                            { icon: Settings, label: 'Settings', action: () => navigate('/settings') },
                          ].map((item, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                              onClick={item.action}
                              className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-gray-300 hover:text-white transition-colors font-orbitron"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.label}
                            </motion.button>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-white/10">
                          <motion.button
                            whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            onClick={handleConnectWallet}
                            className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors font-orbitron"
                          >
                            <LogOut className="w-5 h-5" />
                            Disconnect
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConnectWallet}
                className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-orbitron font-bold text-white"
                style={{ boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)' }}
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                {/* Mobile Wallet */}
                {!isConnected && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConnectWallet}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-orbitron font-bold text-white mb-3"
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </motion.button>
                )}

                {/* Mobile Nav Items */}
                {[...mainNavItems, ...moreNavItems].map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={{ x: 5 }}
                      className={`w-full px-5 py-3 rounded-xl font-orbitron font-bold flex items-center gap-3 transition-all ${
                        isActive
                          ? item.special
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                      {item.special && (
                        <Crown className="w-4 h-4 text-yellow-400 ml-auto" />
                      )}
                    </motion.button>
                  );
                })}

                {/* Mobile Disconnect */}
                {isConnected && (
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={handleConnectWallet}
                    className="w-full px-5 py-3 rounded-xl font-orbitron font-bold flex items-center gap-3 bg-red-500/20 border border-red-500/50 text-red-400"
                  >
                    <LogOut className="w-5 h-5" />
                    Disconnect Wallet
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
