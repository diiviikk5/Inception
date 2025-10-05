import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon, User, Bell, Shield, Eye, Volume2, Gamepad2, Palette,
  Globe, Lock, Key, Trash2, Download, Upload, Save, X, Check,
  AlertCircle, Info, ChevronRight, Moon, Sun, Monitor, Zap,
  Wifi, Database, Link, Smartphone, Mail, MessageSquare, Twitter,
  Github, LogOut, RefreshCw, ExternalLink,
  Sliders, BarChart3, Activity, Target, Sword, Heart, Clock,
  Radio, Vibrate, VolumeX, Volume1, Languages, DollarSign,
  CreditCard, Wallet, ChevronDown, Plus, Minus, RotateCcw,
  Filter, Search, HelpCircle, FileText, Share2, Copy, Sparkles
} from 'lucide-react';

// Glass Card Component
const GlassCard = ({ children, className = "" }) => (
  <div className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl ${className}`}>
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all">
    <div className="flex-1">
      <div className="font-bold text-white mb-1">{label}</div>
      {description && <div className="text-sm text-gray-400">{description}</div>}
    </div>
    <motion.button
      onClick={() => onChange(!enabled)}
      className={`relative w-16 h-8 rounded-full transition-colors ${
        enabled ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-700'
      }`}
      style={{ boxShadow: enabled ? '0 0 20px rgba(0, 255, 255, 0.4)' : 'none' }}
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
        animate={{ x: enabled ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  </div>
);

// Slider Component
const SliderSetting = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '%', icon: Icon }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
        <span className="font-bold text-white">{label}</span>
      </div>
      <span className="text-cyan-400 font-bold">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
      style={{
        background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(value / max) * 100}%, #374151 ${(value / max) * 100}%, #374151 100%)`
      }}
    />
  </div>
);

// Select Component
const SelectSetting = ({ label, value, onChange, options, icon: Icon }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
      <span className="font-bold text-white">{label}</span>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:outline-none cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Main Settings Component
export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // General Settings
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [timezone, setTimezone] = useState('UTC-8');
  const [currency, setCurrency] = useState('USD');

  // Notification Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [battleNotifications, setBattleNotifications] = useState(true);
  const [marketNotifications, setMarketNotifications] = useState(true);
  const [friendNotifications, setFriendNotifications] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);

  // Privacy Settings
  const [profilePublic, setProfilePublic] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowFriendRequests, setAllowFriendRequests] = useState(true);
  const [showBattleHistory, setShowBattleHistory] = useState(true);
  const [showInventory, setShowInventory] = useState(false);

  // Audio Settings
  const [masterVolume, setMasterVolume] = useState(70);
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(80);
  const [voiceVolume, setVoiceVolume] = useState(60);
  const [muteOnMinimize, setMuteOnMinimize] = useState(true);

  // Gameplay Settings
  const [autoPlay, setAutoPlay] = useState(false);
  const [quickActions, setQuickActions] = useState(true);
  const [confirmActions, setConfirmActions] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [showDamageNumbers, setShowDamageNumbers] = useState(true);
  const [showHealthBars, setShowHealthBars] = useState(true);
  const [particleEffects, setParticleEffects] = useState(100);
  const [screenShake, setScreenShake] = useState(50);

  // Graphics Settings
  const [graphicsQuality, setGraphicsQuality] = useState('high');
  const [resolution, setResolution] = useState('1920x1080');
  const [frameRate, setFrameRate] = useState(60);
  const [vsync, setVsync] = useState(true);
  const [antiAliasing, setAntiAliasing] = useState(true);
  const [shadows, setShadows] = useState(true);
  const [bloom, setBloom] = useState(true);

  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'gameplay', label: 'Gameplay', icon: Gamepad2 },
    { id: 'graphics', label: 'Graphics', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'account', label: 'Account', icon: User },
  ];

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      // Reset logic here
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
      {Array.from({ length: 20 }).map((_, i) => (
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 
              className="text-5xl font-orbitron font-black mb-2"
              style={{
                background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              SETTINGS
            </h1>
            <p className="text-gray-400 text-lg">Customize your experience</p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border-2 border-gray-600 text-gray-400 font-bold flex items-center gap-2 hover:bg-gray-600/20"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </motion.button>
          </div>
        </div>

        {/* Save Notification */}
        <AnimatePresence>
          {showSaveNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-8 z-50 px-6 py-4 rounded-xl bg-green-500/20 border-2 border-green-500 backdrop-blur-xl flex items-center gap-3"
            >
              <Check className="w-6 h-6 text-green-400" />
              <span className="font-bold text-white">Settings saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <GlassCard className="p-4 sticky top-8">
              <div className="space-y-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 5 }}
                    className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 font-bold transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-white/0 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <AnimatePresence mode="wait">
              {/* General Settings */}
              {activeSection === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8 mb-6">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <SettingsIcon className="w-8 h-8 text-cyan-400" />
                      General Settings
                    </h2>

                    <div className="space-y-4">
                      <SelectSetting
                        label="Language"
                        value={language}
                        onChange={setLanguage}
                        icon={Languages}
                        options={[
                          { value: 'en', label: 'English' },
                          { value: 'es', label: 'Español' },
                          { value: 'fr', label: 'Français' },
                          { value: 'de', label: 'Deutsch' },
                          { value: 'ja', label: '日本語' },
                          { value: 'ko', label: '한국어' },
                          { value: 'zh', label: '中文' },
                        ]}
                      />

                      <SelectSetting
                        label="Theme"
                        value={theme}
                        onChange={setTheme}
                        icon={Palette}
                        options={[
                          { value: 'dark', label: 'Dark Mode' },
                          { value: 'light', label: 'Light Mode' },
                          { value: 'auto', label: 'Auto (System)' },
                          { value: 'cyberpunk', label: 'Cyberpunk' },
                        ]}
                      />

                      <SelectSetting
                        label="Timezone"
                        value={timezone}
                        onChange={setTimezone}
                        icon={Globe}
                        options={[
                          { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
                          { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
                          { value: 'UTC+0', label: 'UTC +0' },
                          { value: 'UTC+1', label: 'Central European (UTC+1)' },
                          { value: 'UTC+8', label: 'Singapore/Hong Kong (UTC+8)' },
                          { value: 'UTC+9', label: 'Japan/Korea (UTC+9)' },
                        ]}
                      />

                      <SelectSetting
                        label="Currency"
                        value={currency}
                        onChange={setCurrency}
                        icon={DollarSign}
                        options={[
                          { value: 'USD', label: 'USD ($)' },
                          { value: 'EUR', label: 'EUR (€)' },
                          { value: 'GBP', label: 'GBP (£)' },
                          { value: 'JPY', label: 'JPY (¥)' },
                          { value: 'KRW', label: 'KRW (₩)' },
                        ]}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <Bell className="w-8 h-8 text-cyan-400" />
                      Notification Settings
                    </h2>

                    <div className="space-y-3">
                      <ToggleSwitch
                        label="Enable All Notifications"
                        description="Master switch for all notification types"
                        enabled={notificationsEnabled}
                        onChange={setNotificationsEnabled}
                      />
                      <ToggleSwitch
                        label="Email Notifications"
                        description="Receive updates via email"
                        enabled={emailNotifications}
                        onChange={setEmailNotifications}
                      />
                      <ToggleSwitch
                        label="Push Notifications"
                        description="Browser and mobile push notifications"
                        enabled={pushNotifications}
                        onChange={setPushNotifications}
                      />
                      <ToggleSwitch
                        label="Battle Notifications"
                        description="Get notified when challenged to battle"
                        enabled={battleNotifications}
                        onChange={setBattleNotifications}
                      />
                      <ToggleSwitch
                        label="Market Notifications"
                        description="Updates on marketplace activity"
                        enabled={marketNotifications}
                        onChange={setMarketNotifications}
                      />
                      <ToggleSwitch
                        label="Friend Notifications"
                        description="Friend requests and activity updates"
                        enabled={friendNotifications}
                        onChange={setFriendNotifications}
                      />
                      <ToggleSwitch
                        label="Achievement Notifications"
                        description="Get notified when you unlock achievements"
                        enabled={achievementNotifications}
                        onChange={setAchievementNotifications}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <Shield className="w-8 h-8 text-cyan-400" />
                      Privacy Settings
                    </h2>

                    <div className="space-y-3">
                      <ToggleSwitch
                        label="Public Profile"
                        description="Allow others to view your profile"
                        enabled={profilePublic}
                        onChange={setProfilePublic}
                      />
                      <ToggleSwitch
                        label="Show Online Status"
                        description="Display when you're online"
                        enabled={showOnlineStatus}
                        onChange={setShowOnlineStatus}
                      />
                      <ToggleSwitch
                        label="Allow Friend Requests"
                        description="Let other players send friend requests"
                        enabled={allowFriendRequests}
                        onChange={setAllowFriendRequests}
                      />
                      <ToggleSwitch
                        label="Show Battle History"
                        description="Make your battle history visible to others"
                        enabled={showBattleHistory}
                        onChange={setShowBattleHistory}
                      />
                      <ToggleSwitch
                        label="Show Inventory"
                        description="Allow others to see your NFT collection"
                        enabled={showInventory}
                        onChange={setShowInventory}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Audio Settings */}
              {activeSection === 'audio' && (
                <motion.div
                  key="audio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8 mb-6">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <Volume2 className="w-8 h-8 text-cyan-400" />
                      Audio Settings
                    </h2>

                    <div className="space-y-4">
                      <SliderSetting
                        label="Master Volume"
                        value={masterVolume}
                        onChange={setMasterVolume}
                        icon={Volume2}
                      />
                      <SliderSetting
                        label="Music Volume"
                        value={musicVolume}
                        onChange={setMusicVolume}
                        icon={Volume1}
                      />
                      <SliderSetting
                        label="Sound Effects Volume"
                        value={sfxVolume}
                        onChange={setSfxVolume}
                        icon={Zap}
                      />
                      <SliderSetting
                        label="Voice Chat Volume"
                        value={voiceVolume}
                        onChange={setVoiceVolume}
                        icon={MessageSquare}
                      />

                      <div className="pt-4">
                        <ToggleSwitch
                          label="Mute When Minimized"
                          description="Automatically mute audio when window is minimized"
                          enabled={muteOnMinimize}
                          onChange={setMuteOnMinimize}
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Gameplay Settings */}
              {activeSection === 'gameplay' && (
                <motion.div
                  key="gameplay"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <Gamepad2 className="w-8 h-8 text-cyan-400" />
                      Gameplay Settings
                    </h2>

                    <div className="space-y-4">
                      <div className="space-y-3 mb-6">
                        <ToggleSwitch
                          label="Auto-Play"
                          description="Automatically play moves when timer runs out"
                          enabled={autoPlay}
                          onChange={setAutoPlay}
                        />
                        <ToggleSwitch
                          label="Quick Actions"
                          description="Enable keyboard shortcuts for faster gameplay"
                          enabled={quickActions}
                          onChange={setQuickActions}
                        />
                        <ToggleSwitch
                          label="Confirm Actions"
                          description="Require confirmation before critical actions"
                          enabled={confirmActions}
                          onChange={setConfirmActions}
                        />
                        <ToggleSwitch
                          label="Show Damage Numbers"
                          description="Display damage numbers during battles"
                          enabled={showDamageNumbers}
                          onChange={setShowDamageNumbers}
                        />
                        <ToggleSwitch
                          label="Show Health Bars"
                          description="Display health bars above characters"
                          enabled={showHealthBars}
                          onChange={setShowHealthBars}
                        />
                      </div>

                      <SliderSetting
                        label="Animation Speed"
                        value={animationSpeed}
                        onChange={setAnimationSpeed}
                        icon={Zap}
                      />
                      <SliderSetting
                        label="Particle Effects"
                        value={particleEffects}
                        onChange={setParticleEffects}
                        icon={Sparkles}
                      />
                      <SliderSetting
                        label="Screen Shake Intensity"
                        value={screenShake}
                        onChange={setScreenShake}
                        icon={Vibrate}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Graphics Settings */}
              {activeSection === 'graphics' && (
                <motion.div
                  key="graphics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <Palette className="w-8 h-8 text-cyan-400" />
                      Graphics Settings
                    </h2>

                    <div className="space-y-4">
                      <SelectSetting
                        label="Graphics Quality"
                        value={graphicsQuality}
                        onChange={setGraphicsQuality}
                        icon={Monitor}
                        options={[
                          { value: 'low', label: 'Low' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'high', label: 'High' },
                          { value: 'ultra', label: 'Ultra' },
                        ]}
                      />

                      <SelectSetting
                        label="Resolution"
                        value={resolution}
                        onChange={setResolution}
                        icon={Monitor}
                        options={[
                          { value: '1280x720', label: '1280x720 (HD)' },
                          { value: '1920x1080', label: '1920x1080 (Full HD)' },
                          { value: '2560x1440', label: '2560x1440 (2K)' },
                          { value: '3840x2160', label: '3840x2160 (4K)' },
                        ]}
                      />

                      <SelectSetting
                        label="Frame Rate Limit"
                        value={frameRate}
                        onChange={setFrameRate}
                        icon={Activity}
                        options={[
                          { value: 30, label: '30 FPS' },
                          { value: 60, label: '60 FPS' },
                          { value: 120, label: '120 FPS' },
                          { value: 144, label: '144 FPS' },
                          { value: 0, label: 'Unlimited' },
                        ]}
                      />

                      <div className="space-y-3 pt-4">
                        <ToggleSwitch
                          label="V-Sync"
                          description="Synchronize frame rate with monitor refresh rate"
                          enabled={vsync}
                          onChange={setVsync}
                        />
                        <ToggleSwitch
                          label="Anti-Aliasing"
                          description="Smooth jagged edges"
                          enabled={antiAliasing}
                          onChange={setAntiAliasing}
                        />
                        <ToggleSwitch
                          label="Shadows"
                          description="Enable dynamic shadows"
                          enabled={shadows}
                          onChange={setShadows}
                        />
                        <ToggleSwitch
                          label="Bloom Effects"
                          description="Enable glow and bloom effects"
                          enabled={bloom}
                          onChange={setBloom}
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8 mb-6">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <Lock className="w-8 h-8 text-cyan-400" />
                      Security Settings
                    </h2>

                    <div className="space-y-4">
                      <ToggleSwitch
                        label="Two-Factor Authentication"
                        description="Add an extra layer of security to your account"
                        enabled={twoFactorEnabled}
                        onChange={setTwoFactorEnabled}
                      />
                      <ToggleSwitch
                        label="Biometric Authentication"
                        description="Use fingerprint or face recognition"
                        enabled={biometricAuth}
                        onChange={setBiometricAuth}
                      />

                      <SelectSetting
                        label="Session Timeout"
                        value={sessionTimeout}
                        onChange={setSessionTimeout}
                        icon={Clock}
                        options={[
                          { value: 15, label: '15 minutes' },
                          { value: 30, label: '30 minutes' },
                          { value: 60, label: '1 hour' },
                          { value: 240, label: '4 hours' },
                          { value: 0, label: 'Never' },
                        ]}
                      />

                      <div className="pt-4 space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Key className="w-5 h-5 text-cyan-400" />
                            <div className="text-left">
                              <div className="font-bold text-white">Change Password</div>
                              <div className="text-sm text-gray-400">Update your account password</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-cyan-400" />
                            <div className="text-left">
                              <div className="font-bold text-white">Trusted Devices</div>
                              <div className="text-sm text-gray-400">Manage devices that can access your account</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-cyan-400" />
                            <div className="text-left">
                              <div className="font-bold text-white">Login Activity</div>
                              <div className="text-sm text-gray-400">View recent login history</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </motion.button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GlassCard className="p-8 mb-6">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                      <User className="w-8 h-8 text-cyan-400" />
                      Account Management
                    </h2>

                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Wallet className="w-5 h-5 text-cyan-400" />
                          <div className="text-left">
                            <div className="font-bold text-white">Connected Wallets</div>
                            <div className="text-sm text-gray-400">Manage your blockchain wallets</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-cyan-400" />
                          <div className="text-left">
                            <div className="font-bold text-white">Export Data</div>
                            <div className="text-sm text-gray-400">Download all your account data</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-cyan-400" />
                          <div className="text-left">
                            <div className="font-bold text-white">Privacy Policy</div>
                            <div className="text-sm text-gray-400">Review our privacy policy</div>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-cyan-400" />
                          <div className="text-left">
                            <div className="font-bold text-white">Help & Support</div>
                            <div className="text-sm text-gray-400">Get help with your account</div>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </motion.button>
                    </div>
                  </GlassCard>

                  {/* Danger Zone */}
                  <GlassCard className="p-8 border-red-500/30">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6" />
                      Danger Zone
                    </h3>
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 hover:bg-red-500/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="w-5 h-5 text-red-400" />
                          <div className="text-left">
                            <div className="font-bold text-red-400">Sign Out All Devices</div>
                            <div className="text-sm text-red-300/70">Sign out from all active sessions</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-400" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 hover:bg-red-500/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Trash2 className="w-5 h-5 text-red-400" />
                          <div className="text-left">
                            <div className="font-bold text-red-400">Delete Account</div>
                            <div className="text-sm text-red-300/70">Permanently delete your account and data</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-400" />
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </div>
  );
}
