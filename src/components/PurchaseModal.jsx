import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, DollarSign, CheckCircle, Loader, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { useAccount } from 'wagmi';
import { purchaseListing, calculateFees } from '../utils/marketplaceUtils';

export default function PurchaseModal({ listing, onClose, onSuccess }) {
  const { address } = useAccount();
  const [step, setStep] = useState('confirm'); // confirm, processing, success
  const [error, setError] = useState('');

  const fees = calculateFees(listing.price);
  const nft = listing.nft;

  const handlePurchase = () => {
    if (!address) {
      setError('Please connect your wallet');
      return;
    }

    if (address.toLowerCase() === listing.seller.toLowerCase()) {
      setError('You cannot buy your own NFT');
      return;
    }

    setStep('processing');
    setError('');

    // Simulate purchase transaction
    setTimeout(() => {
      purchaseListing(listing.id, address);
      setStep('success');

      setTimeout(() => {
        onSuccess && onSuccess();
        onClose();
      }, 2000);
    }, 3000);
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
        className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-cyan-400/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* CONFIRM STEP */}
        {step === 'confirm' && (
          <div>
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4"
              >
                <ShoppingCart className="w-full h-full text-cyan-400" style={{ filter: 'drop-shadow(0 0 20px #00ffff)' }} />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Purchase NFT</h2>
              <p className="text-gray-400">Review details and confirm purchase</p>
            </div>

            {/* NFT Preview */}
            <div className="mb-6 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <img src={nft.image} alt={nft.name} className="w-32 h-32 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{nft.name}</h3>
                  <div className="text-sm text-gray-400 mb-2">{nft.class}</div>
                  <div className="flex gap-3">
                    {[
                      { label: 'ATK', value: nft.stats.attack, color: '#ef4444' },
                      { label: 'DEF', value: nft.stats.defense, color: '#10b981' },
                      { label: 'SPD', value: nft.stats.speed, color: '#06b6d4' }
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-gray-400 text-sm">Seller</span>
                <span className="text-white font-mono text-sm">
                  {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/30">
              <h4 className="font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Price Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">NFT Price</span>
                  <span className="text-white font-bold text-lg">${listing.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Platform Fee (5%)</span>
                  <span className="text-cyan-400 font-bold">${fees.platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Seller Receives</span>
                  <span>${fees.sellerReceives.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/20 my-3"></div>
                <div className="flex justify-between">
                  <span className="text-gray-200 font-bold text-lg">Total Cost</span>
                  <span className="text-cyan-400 font-bold text-2xl">${fees.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                What You Get
              </h4>
              <div className="space-y-2">
                {[
                  'Full ownership of this NFT',
                  'Use in battles immediately',
                  'Upgrade stats through gameplay',
                  'Resell on marketplace anytime'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* Purchase Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePurchase}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            >
              <ShoppingCart className="w-6 h-6" />
              Purchase for ${listing.price.toFixed(2)}
            </motion.button>
          </div>
        )}

        {/* PROCESSING STEP */}
        {step === 'processing' && (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto mb-8"
            >
              <Loader className="w-full h-full text-cyan-400" style={{ filter: 'drop-shadow(0 0 30px #00ffff)' }} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Processing Purchase...</h2>
            <p className="text-xl text-gray-400 mb-6">Transferring ownership</p>
            
            <div className="space-y-3 max-w-md mx-auto text-left">
              {[
                'Verifying payment...',
                'Transferring NFT...',
                'Updating ownership...',
                'Finalizing transaction...'
              ].map((status, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.6 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-3 h-3 bg-cyan-400 rounded-full"
                    />
                  </div>
                  {status}
                </motion.div>
              ))}
            </div>
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
            
            <h2 className="text-4xl font-bold text-white mb-4">🎉 Purchase Complete!</h2>
            <p className="text-xl text-gray-400 mb-4">NFT is now in your collection</p>
            <p className="text-gray-500 text-sm">Check your dashboard to see your new character</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
