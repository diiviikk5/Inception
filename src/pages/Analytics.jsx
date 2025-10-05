import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, DollarSign, Users, Target, Zap, Shield,
  Globe, Award, Rocket, BarChart3, PieChart, LineChart,
  CheckCircle, Star, Gem, Coins, ShoppingCart, Trophy,
  Layers, Package, Sparkles, ArrowUpRight, Activity,
  Briefcase, TrendingDown, AlertCircle, Eye
} from 'lucide-react';

// Premium Card Component
const PremiumCard = ({ children, className = "", glow = false, glowColor = "#00ffff" }) => (
  <motion.div
    className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl ${className}`}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    style={{ boxShadow: glow ? `0 0 40px ${glowColor}40` : undefined }}
  >
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </motion.div>
);

// Metric Card Component
const MetricCard = ({ icon: Icon, label, value, trend, trendValue, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <PremiumCard className="p-6" glow glowColor={color}>
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${color}30`, border: `2px solid ${color}` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </PremiumCard>
  </motion.div>
);

// Revenue Stream Card
const RevenueStreamCard = ({ icon: Icon, title, monthly, yearly, percentage, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <PremiumCard className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}30`, border: `2px solid ${color}` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <div className="text-xs text-gray-400">Active Revenue Stream</div>
        </div>
        <div 
          className="px-3 py-1 rounded-full text-sm font-bold"
          style={{ background: `${color}20`, color }}
        >
          {percentage}%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Monthly</div>
          <div className="text-xl font-bold text-white">${monthly.toLocaleString()}</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Yearly</div>
          <div className="text-xl font-bold text-green-400">${yearly.toLocaleString()}</div>
        </div>
      </div>
    </PremiumCard>
  </motion.div>
);

// USP Feature Card
const USPCard = ({ icon: Icon, title, description, benefits, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <PremiumCard className="p-6 h-full" glow glowColor={color}>
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${color}30`, border: `2px solid ${color}` }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="space-y-2">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-300">{benefit}</span>
          </div>
        ))}
      </div>
    </PremiumCard>
  </motion.div>
);

// Market Comparison Component
const MarketComparison = () => {
  const competitors = [
    { name: 'Axie Infinity', users: '2M', revenue: '$1.3B', onboarding: '15 min', crosschain: false },
    { name: 'Gods Unchained', users: '500K', revenue: '$50M', onboarding: '10 min', crosschain: false },
    { name: 'Illuvium', users: '300K', revenue: '$30M', onboarding: '20 min', crosschain: false },
    { name: 'INCEPTION', users: 'Launch', revenue: 'Launch', onboarding: '< 30 sec', crosschain: true, highlight: true }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-gray-400 font-bold">Platform</th>
            <th className="text-left py-4 px-4 text-gray-400 font-bold">Active Users</th>
            <th className="text-left py-4 px-4 text-gray-400 font-bold">Annual Revenue</th>
            <th className="text-left py-4 px-4 text-gray-400 font-bold">Onboarding Time</th>
            <th className="text-left py-4 px-4 text-gray-400 font-bold">Omnichain</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp, idx) => (
            <motion.tr
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`border-b border-white/5 ${comp.highlight ? 'bg-cyan-500/10' : ''}`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className={`text-lg font-bold ${comp.highlight ? 'text-cyan-400' : 'text-white'}`}>
                    {comp.name}
                  </div>
                  {comp.highlight && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-gray-300">{comp.users}</td>
              <td className="py-4 px-4 text-gray-300">{comp.revenue}</td>
              <td className="py-4 px-4">
                <span className={comp.highlight ? 'text-green-400 font-bold' : 'text-gray-300'}>
                  {comp.onboarding}
                </span>
              </td>
              <td className="py-4 px-4">
                {comp.crosschain ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-red-500"></div>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Growth Projection Chart (Simple visualization)
const GrowthProjection = () => {
  const years = [
    { year: 'Year 1', revenue: 1.3, users: 10, color: '#06b6d4' },
    { year: 'Year 2', revenue: 3.9, users: 50, color: '#8b5cf6' },
    { year: 'Year 3', revenue: 6.5, users: 150, color: '#ec4899' }
  ];

  return (
    <div className="space-y-6">
      {years.map((data, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold">{data.year}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{data.users}K users</span>
              <span className="text-lg font-bold text-green-400">${data.revenue}M</span>
            </div>
          </div>
          <div className="h-8 bg-black/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(data.revenue / 6.5) * 100}%` }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${data.color}, ${data.color}80)` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Analytics Component
export default function Analytics() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'usp', label: 'Unique Value', icon: Rocket },
    { id: 'revenue', label: 'Revenue Model', icon: DollarSign },
    { id: 'market', label: 'Market Analysis', icon: BarChart3 },
    { id: 'projections', label: 'Growth Forecast', icon: TrendingUp }
  ];

  const keyMetrics = [
    { icon: Users, label: 'Target Users Y1', value: '10,000+', trend: 'up', trendValue: 'Launch', color: '#06b6d4' },
    { icon: DollarSign, label: 'Projected ARR Y1', value: '$1.3M', trend: 'up', trendValue: '+278%', color: '#10b981' },
    { icon: Trophy, label: 'Market Size 2028', value: '$21B', trend: 'up', trendValue: '22% CAGR', color: '#fbbf24' },
    { icon: Target, label: 'User Retention', value: '65%', trend: 'up', trendValue: '+15%', color: '#a855f7' }
  ];

  const revenueStreams = [
    { icon: ShoppingCart, title: 'Marketplace Fees', monthly: 37500, yearly: 450000, percentage: 33, color: '#8b5cf6' },
    { icon: Package, title: 'Premium NFT Mints', monthly: 25000, yearly: 300000, percentage: 22, color: '#10b981' },
    { icon: Sparkles, title: 'Cosmetics Store', monthly: 30000, yearly: 360000, percentage: 27, color: '#ec4899' },
    { icon: Trophy, title: 'Tournaments', monthly: 10000, yearly: 120000, percentage: 9, color: '#ef4444' },
    { icon: Gem, title: 'Battle Pass', monthly: 6667, yearly: 80000, percentage: 6, color: '#fbbf24' },
    { icon: Layers, title: 'Bridge Fees', monthly: 3000, yearly: 36000, percentage: 3, color: '#06b6d4' }
  ];

  const uspFeatures = [
    {
      icon: Globe,
      title: 'True Omnichain Gaming',
      description: 'First Web3 game enabling seamless cross-chain NFT battles across Polygon, Arbitrum, Base, and Optimism.',
      benefits: [
        'Cross-chain NFT interoperability',
        'Unified liquidity across chains',
        'Future-proof infrastructure',
        'First-mover advantage in omnichain'
      ],
      color: '#06b6d4'
    },
    {
      icon: Zap,
      title: 'Zero-Friction Onboarding',
      description: 'Virtual NFTs allow instant play without wallets. Convert to on-chain assets anytime.',
      benefits: [
        'Play immediately (< 30 seconds)',
        'No wallet/crypto required to start',
        '95% reduction in onboarding friction',
        'Gradual Web3 education'
      ],
      color: '#10b981'
    },
    {
      icon: Shield,
      title: 'Skill-Based Combat',
      description: 'Timing-based QTE system where player skill determines outcomes, not just RNG or pay-to-win.',
      benefits: [
        'Perfect timing = 2.5x damage multiplier',
        'Strategic move selection matters',
        'Fair competitive environment',
        'Engaging, skill-driven gameplay'
      ],
      color: '#a855f7'
    },
    {
      icon: Award,
      title: 'Play-to-Own Economy',
      description: 'Battle victories permanently increase NFT stats and value. True ownership meets progression.',
      benefits: [
        'NFTs appreciate through gameplay',
        'Permanent stat increases',
        'Real value creation',
        'Sustainable token economy'
      ],
      color: '#fbbf24'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <div className="relative z-10 p-8 max-w-[2000px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <BarChart3 className="w-20 h-20 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }} />
          </motion.div>
          <h1 
            className="text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(90deg, #00ffff, #8b5cf6, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Business Analytics
          </h1>
          <p className="text-2xl text-gray-400">Data-Driven Insights & Market Strategy</p>
        </motion.div>

        {/* Section Navigation */}
        <div className="flex justify-center gap-3 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_30px_rgba(0,255,255,0.4)]'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {section.label}
              </motion.button>
            );
          })}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6">
              {keyMetrics.map((metric, idx) => (
                <MetricCard key={idx} {...metric} delay={idx * 0.1} />
              ))}
            </div>

            {/* Executive Summary */}
            <PremiumCard className="p-8" glow glowColor="#00ffff">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-cyan-400" />
                Executive Summary
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Problem Statement</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Web3 gaming faces three critical challenges: <strong>high onboarding friction</strong> (average 15+ minutes to start), 
                    <strong>blockchain fragmentation</strong> (assets locked to single chains), and <strong>shallow gameplay</strong> 
                    (pay-to-win mechanics without skill).
                  </p>
                  <div className="space-y-2">
                    {[
                      '95% of potential users abandon during wallet setup',
                      'NFT liquidity fragmented across 10+ chains',
                      'Average session time < 5 minutes (boring gameplay)'
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-400">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-3">Our Solution</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    INCEPTION solves all three with <strong>Virtual NFTs</strong> (instant play), 
                    <strong>omnichain infrastructure</strong> (cross-chain battles), and <strong>skill-based QTE combat</strong> 
                    (engaging, fair gameplay).
                  </p>
                  <div className="space-y-2">
                    {[
                      'Play in < 30 seconds, claim on-chain later',
                      'Battle across Polygon, Arbitrum, Base, Optimism',
                      'Timing-based combat with 2.5x skill multipliers'
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <PremiumCard className="p-6 text-center">
                <div className="text-5xl font-black text-cyan-400 mb-2">$21B</div>
                <div className="text-gray-400">Web3 Gaming Market by 2028</div>
              </PremiumCard>
              <PremiumCard className="p-6 text-center">
                <div className="text-5xl font-black text-purple-400 mb-2">22%</div>
                <div className="text-gray-400">Compound Annual Growth Rate</div>
              </PremiumCard>
              <PremiumCard className="p-6 text-center">
                <div className="text-5xl font-black text-pink-400 mb-2">1st</div>
                <div className="text-gray-400">True Omnichain Battle Game</div>
              </PremiumCard>
            </div>
          </div>
        )}

        {/* USP Section */}
        {activeSection === 'usp' && (
          <div>
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Unique Value Propositions</h2>
            <div className="grid grid-cols-2 gap-6">
              {uspFeatures.map((feature, idx) => (
                <USPCard key={idx} {...feature} delay={idx * 0.1} />
              ))}
            </div>

            {/* Competitive Advantages */}
            <PremiumCard className="p-8 mt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why We'll Win</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Target, label: 'First-Mover Advantage', value: 'No omnichain competitors', color: '#06b6d4' },
                  { icon: Users, label: 'Lowest Barrier to Entry', value: '< 30 sec onboarding', color: '#10b981' },
                  { icon: Activity, label: 'Deepest Engagement', value: 'Skill-based gameplay', color: '#a855f7' }
                ].map((adv, idx) => {
                  const Icon = adv.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
                    >
                      <Icon className="w-12 h-12 mx-auto mb-3" style={{ color: adv.color }} />
                      <div className="text-lg font-bold text-white mb-2">{adv.label}</div>
                      <div className="text-sm text-gray-400">{adv.value}</div>
                    </motion.div>
                  );
                })}
              </div>
            </PremiumCard>
          </div>
        )}

        {/* Revenue Model Section */}
        {activeSection === 'revenue' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">Multi-Stream Revenue Model</h2>
              <p className="text-xl text-gray-400">Diversified income with $1.3M+ projected Year 1 ARR</p>
            </div>

            {/* Revenue Pie Chart Visual */}
            <PremiumCard className="p-8" glow glowColor="#8b5cf6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Revenue Distribution</h3>
              <div className="flex items-center justify-center gap-12">
                <div className="relative w-64 h-64">
                  {/* Simplified pie chart visualization */}
                  {revenueStreams.map((stream, idx) => {
                    const rotation = revenueStreams.slice(0, idx).reduce((acc, s) => acc + (s.percentage * 3.6), 0);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="absolute inset-0"
                        style={{
                          background: `conic-gradient(from ${rotation}deg, ${stream.color} 0deg, ${stream.color} ${stream.percentage * 3.6}deg, transparent ${stream.percentage * 3.6}deg)`,
                          borderRadius: '50%',
                          opacity: 0.3
                        }}
                      />
                    );
                  })}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-black/80 rounded-full w-32 h-32 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-white">$1.3M</div>
                      <div className="text-xs text-gray-400">Year 1 ARR</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {revenueStreams.map((stream, idx) => {
                    const Icon = stream.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: stream.color }}
                        />
                        <span className="text-white font-bold w-32">{stream.title}</span>
                        <span className="text-gray-400">{stream.percentage}%</span>
                        <span className="text-green-400 font-bold">${stream.yearly.toLocaleString()}/yr</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </PremiumCard>

            {/* Detailed Revenue Streams */}
            <div className="grid grid-cols-2 gap-6">
              {revenueStreams.map((stream, idx) => (
                <RevenueStreamCard key={idx} {...stream} delay={idx * 0.1} />
              ))}
            </div>

            {/* Unit Economics */}
            <PremiumCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Unit Economics</h3>
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Customer Acquisition Cost', value: '$5', color: '#ef4444' },
                  { label: 'Lifetime Value', value: '$85', color: '#10b981' },
                  { label: 'LTV/CAC Ratio', value: '17:1', color: '#fbbf24' },
                  { label: 'Gross Margin', value: '92%', color: '#a855f7' }
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-4xl font-bold mb-2" style={{ color: metric.color }}>{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </PremiumCard>
          </div>
        )}

        {/* Market Analysis Section */}
        {activeSection === 'market' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Market Analysis</h2>

            {/* Market Size */}
            <PremiumCard className="p-8" glow glowColor="#10b981">
              <h3 className="text-2xl font-bold text-white mb-6">Total Addressable Market</h3>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: 'Web3 Gaming (2025)', value: '$9.2B', growth: '22% CAGR', color: '#06b6d4' },
                  { label: 'Projected (2028)', value: '$21B', growth: '128% growth', color: '#10b981' },
                  { label: 'Target Segment', value: '$3B', growth: 'Skill gaming', color: '#a855f7' }
                ].map((market, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center p-6 rounded-xl border-2"
                    style={{ borderColor: market.color, background: `${market.color}10` }}
                  >
                    <div className="text-5xl font-black mb-3" style={{ color: market.color }}>{market.value}</div>
                    <div className="text-lg font-bold text-white mb-2">{market.label}</div>
                    <div className="text-sm text-gray-400">{market.growth}</div>
                  </motion.div>
                ))}
              </div>
            </PremiumCard>

            {/* Competitive Landscape */}
            <PremiumCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Competitive Landscape</h3>
              <MarketComparison />
            </PremiumCard>

            {/* Market Gaps */}
            <div className="grid grid-cols-2 gap-6">
              <PremiumCard className="p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">Market Gaps We Fill</h3>
                <div className="space-y-3">
                  {[
                    'No true omnichain gaming platform exists',
                    'Onboarding remains 10-20 minute barrier',
                    'Most games are RNG-based, not skill-based',
                    'NFT value doesn\'t increase through gameplay'
                  ].map((gap, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-300">{gap}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>

              <PremiumCard className="p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">Our Advantages</h3>
                <div className="space-y-3">
                  {[
                    'First-mover in omnichain gaming space',
                    '< 30 second onboarding vs 10+ minutes',
                    'Skill-based combat with measurable outcomes',
                    'Play-to-own with permanent stat increases'
                  ].map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-300">{adv}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </div>
          </div>
        )}

        {/* Growth Projections Section */}
        {activeSection === 'projections' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Growth Forecast</h2>

            {/* 3-Year Projection */}
            <PremiumCard className="p-8" glow glowColor="#fbbf24">
              <h3 className="text-2xl font-bold text-white mb-6">Revenue Projection (Conservative)</h3>
              <GrowthProjection />
            </PremiumCard>

            {/* Milestones */}
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  quarter: 'Q1 2025',
                  milestones: ['Launch MVP', '1,000 users', '$10K MRR'],
                  color: '#06b6d4'
                },
                {
                  quarter: 'Q2 2025',
                  milestones: ['Mobile app', '5,000 users', '$50K MRR'],
                  color: '#8b5cf6'
                },
                {
                  quarter: 'Q4 2025',
                  milestones: ['PvP tournaments', '10,000 users', '$110K MRR'],
                  color: '#10b981'
                }
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <PremiumCard className="p-6" glow glowColor={milestone.color}>
                    <div 
                      className="text-lg font-bold mb-4 pb-3 border-b"
                      style={{ color: milestone.color, borderColor: `${milestone.color}40` }}
                    >
                      {milestone.quarter}
                    </div>
                    <div className="space-y-2">
                      {milestone.milestones.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" style={{ color: milestone.color }} />
                          <span className="text-sm text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>

            {/* Investment Ask */}
            <PremiumCard className="p-8" glow glowColor="#ec4899">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Investment Opportunity</h3>
                <div className="text-6xl font-black mb-6" style={{
                  background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  $500K - $1M Seed Round
                </div>
                <p className="text-xl text-gray-400 mb-8">40% Development • 30% Marketing • 20% Team • 10% Operations</p>
                
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { label: 'Pre-Money Valuation', value: '$4M' },
                    { label: 'Expected ROI (3yr)', value: '8-12x' },
                    { label: 'Break-Even', value: 'Month 8' },
                    { label: 'Exit Potential', value: '$50M+' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{item.value}</div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </div>
        )}
      </div>
    </div>
  );
}
