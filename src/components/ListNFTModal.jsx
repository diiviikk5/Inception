import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, TrendingUp, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { addListing, calculateFees } from '../utils/marketplaceUtils';

export default function ListNFTModal({ nft, onClose, onSuccess }) {
  const [price, setPrice] = useState('');
  const [step, setStep] = useState('input'); // input, confirming, success
  const [error, setError] = useState('');

  const fees = price ? calculateFees(parseFloat(price)) : null;

  const handleList = () => {
    if (!price || parseFloat(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setStep('confirming');
    setError('');

    // Simulate listing process
    setTimeout(() => {
      const listing = {
        nftId: nft.id,
        nft: nft,
        price: parseFloat(price),
        seller: nft.owner,
      };

      addListing(listing);
      setStep('success');

      setTimeout(() => {
        onSuccess && onSuccess();
        onClose();
      }, 2000);
    }, 2000);
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
        className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-purple-400/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {step !== 'confirming' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* INPUT STEP */}
        {step === 'input' && (
          <div>
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-4"
              >
                <TrendingUp className="w-full h-full text-purple-400" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">List NFT for Sale</h2>
              <p className="text-gray-400">Set your price and earn from your character</p>
            </div>

            {/* NFT Preview */}
            <div className="mb-6 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <img src={nft.image} alt={nft.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{nft.name}</h3>
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

            {/* Price Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-400 mb-2">Set Price (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-2xl font-bold focus:border-purple-500 focus:outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Fee Breakdown */}
            {fees && (
              <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Fee Breakdown
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sale Price</span>
                    <span className="text-white font-bold">${fees.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Platform Fee (5%)</span>
                    <span className="text-red-400 font-bold">-${fees.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-200 font-bold">You Receive</span>
                    <span className="text-green-400 font-bold text-xl">${fees.sellerReceives.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* List Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleList}
              disabled={!price || parseFloat(price) <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 ${
                price && parseFloat(price) > 0
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <TrendingUp className="w-6 h-6" />
              List on Marketplace
            </motion.button>
          </div>
        )}

        {/* CONFIRMING STEP */}
        {step === 'confirming' && (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto mb-8"
            >
              <TrendingUp className="w-full h-full text-purple-400" style={{ filter: 'drop-shadow(0 0 30px #a855f7)' }} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Listing NFT...</h2>
            <p className="text-xl text-gray-400">Creating marketplace listing</p>
          </div>
        )}

        {/* SUCCESS STEP */}
        {step === 'success' && (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-32 h-32 mx-auto mb-8"
            >
              <CheckCircle className="w-full h-full text-green-400" style={{ filter: 'drop-shadow(0 0 30px #10b981)' }} />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-4">🎉 Listed Successfully!</h2>
            <p className="text-xl text-gray-400 mb-4">Your NFT is now on the marketplace</p>
            <p className="text-2xl text-green-400 font-bold">${price}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
    