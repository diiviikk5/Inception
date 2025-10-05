import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle, Loader, AlertCircle, Sparkles, 
  Zap, Shield, TrendingUp, ExternalLink, ArrowRight
} from 'lucide-react';

const BLOCKCHAINS = [
  { id: 'polygon', name: 'Polygon', icon: '⬡', color: '#8247E5', gasEstimate: '$0.10' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔷', color: '#28A0F0', gasEstimate: '$0.50' },
  { id: 'base', name: 'Base', icon: '🔵', color: '#0052FF', gasEstimate: '$0.30' },
  { id: 'optimism', name: 'Optimism', icon: '🔴', color: '#FF0420', gasEstimate: '$0.40' }
];

export default function ClaimModal({ nft, onClose, onSuccess }) {
  const [step, setStep] = useState('select'); // select, claiming, success, error
  const [selectedChain, setSelectedChain] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleClaim = async () => {
    if (!selectedChain) {
      setError('Please select a blockchain');
      return;
    }

    setStep('claiming');
    setError('');

    // Simulate blockchain transaction (3-5 seconds)
    setTimeout(() => {
      // Generate fake tx hash for demo
      const fakeTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      setTxHash(fakeTxHash);

      // Update NFT status in localStorage
      const allNFTs = JSON.parse(localStorage.getItem('inception_virtual_nfts') || '[]');
      const nftIndex = allNFTs.findIndex(n => n.id === nft.id);
      
      if (nftIndex !== -1) {
        allNFTs[nftIndex].onChain = true;
        allNFTs[nftIndex].blockchain = selectedChain.id;
        allNFTs[nftIndex].txHash = fakeTxHash;
        allNFTs[nftIndex].claimedAt = Date.now();
        localStorage.setItem('inception_virtual_nfts', JSON.stringify(allNFTs));
      }

      setStep('success');
      
      // Call success callback after animation
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 2000);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-cyan-400/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {step !== 'claiming' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* SELECT BLOCKCHAIN STEP */}
        {step === 'select' && (
          <div>
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Sparkles className="w-full h-full text-cyan-400" style={{ filter: 'drop-shadow(0 0 20px #00ffff)' }} />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Claim on Blockchain</h2>
              <p className="text-sm md:text-base text-gray-400">Transform your virtual NFT into a real, tradeable asset</p>
            </div>

            {/* NFT Preview */}
            <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <img src={nft.image} alt={nft.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                  <div className="flex gap-3">
                    {[
                      { label: 'ATK', value: nft.stats.attack, color: '#ef4444' },
                      { label: 'DEF', value: nft.stats.defense, color: '#10b981' },
                      { label: 'SPD', value: nft.stats.speed, color: '#06b6d4' }
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-3">Select Blockchain</h3>
              <div className="grid grid-cols-2 gap-3">
                {BLOCKCHAINS.map((chain) => (
                  <motion.button
                    key={chain.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChain(chain)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedChain?.id === chain.id
                        ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{chain.icon}</span>
                      <div className="text-left flex-1">
                        <div className="font-bold text-white text-sm">{chain.name}</div>
                        <div className="text-xs text-gray-400">Gas: {chain.gasEstimate}</div>
                      </div>
                      {selectedChain?.id === chain.id && (
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Benefits - REDUCED SIZE */}
            <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30">
              <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" />
                What You Get
              </h4>
              <div className="space-y-1.5">
                {[
                  'Full ownership - truly yours forever',
                  'Trade on marketplace for real money',
                  'Transfer to other wallets',
                  'Use across all supported chains'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-400 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Claim Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClaim}
              disabled={!selectedChain}
              className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 ${
                selectedChain
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_30px_rgba(0,255,255,0.4)]'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Claim NFT on {selectedChain?.name || 'Blockchain'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* CLAIMING STEP */}
        {step === 'claiming' && (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 mx-auto mb-6"
            >
              <Loader className="w-full h-full text-cyan-400" style={{ filter: 'drop-shadow(0 0 30px #00ffff)' }} />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-3">Claiming NFT...</h2>
            <p className="text-lg text-gray-400 mb-6">Minting on {selectedChain?.name} blockchain</p>
            
            <div className="space-y-2.5 max-w-md mx-auto text-left">
              {[
                'Preparing transaction...',
                'Waiting for confirmation...',
                'Minting NFT on-chain...',
                'Finalizing ownership...'
              ].map((status, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.8 }}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                    {idx < 2 ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2.5 h-2.5 bg-cyan-400 rounded-full"
                      />
                    ) : (
                      <div className="w-2.5 h-2.5 bg-gray-600 rounded-full" />
                    )}
                  </div>
                  {status}
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-6">Please don't close this window...</p>
          </div>
        )}

        {/* SUCCESS STEP */}
        {step === 'success' && (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-24 h-24 mx-auto mb-6"
            >
              <CheckCircle className="w-full h-full text-green-400" style={{ filter: 'drop-shadow(0 0 30px #10b981)' }} />
            </motion.div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-3"
            >
              🎉 Successfully Claimed!
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-400 mb-6"
            >
              Your NFT is now on the {selectedChain?.name} blockchain
            </motion.p>

            {/* NFT Preview */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-5 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-400"
            >
              <div className="flex items-center justify-center gap-3">
                <img src={nft.image} alt={nft.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="text-xl font-bold text-white mb-1">{nft.name}</div>
                  <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    ON-CHAIN NFT
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transaction Hash */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="text-xs text-gray-400 mb-2">Transaction Hash</div>
              <div className="flex items-center justify-center gap-2">
                <code className="text-cyan-400 font-mono text-xs">
                  {txHash.slice(0, 12)}...{txHash.slice(-12)}
                </code>
                <button 
                  onClick={() => navigator.clipboard.writeText(txHash)}
                  className="p-1.5 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.location.href = '/market';
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 text-sm"
              >
                <TrendingUp className="w-4 h-4" />
                List on Marketplace
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
