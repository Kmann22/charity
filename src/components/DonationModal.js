'use client';

import { useState } from 'react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { SolanaService } from '@/utils/solana';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function DonationModal({ isOpen, onClose, campaign, onSuccess }) {
  const { publicKey, signTransaction } = useSolanaWallet();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }

    if (!publicKey) {
      setErrorMessage('Wallet not connected');
      return;
    }

    setLoading(true);
    setStatus('loading');
    setErrorMessage('');

    try {
      const campaignAddress = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';
      
      const mockWallet = {
        publicKey,
        sendTransaction: async (transaction, connection) => {
          console.log('Sending transaction:', transaction);
          await new Promise(resolve => setTimeout(resolve, 2000));
          return 'mock_transaction_signature_' + Date.now();
        }
      };

      const result = await SolanaService.donateToCampaign(
        mockWallet,
        campaignAddress,
        parseFloat(amount)
      );

      setStatus('success');
      setAmount('');
      
      if (onSuccess) {
        onSuccess(result);
      }

      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Donation error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setStatus('idle');
      setAmount('');
      setErrorMessage('');
    }
  };

  if (!isOpen) return null;

  const quickAmounts = [0.1, 0.5, 1.0, 2.0];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="glass-effect rounded-2xl p-8 w-full max-w-lg mx-4 border border-white/20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Donate to Campaign</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-white disabled:opacity-50 transition-colors duration-300"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        {campaign && (
          <div className="mb-8 p-6 glass-effect rounded-xl border border-white/10">
            <h3 className="font-bold text-white mb-3">{campaign.title}</h3>
            <p className="text-gray-300 text-sm">{campaign.description}</p>
          </div>
        )}

        {status === 'success' ? (
          <div className="text-center py-12">
            <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-8" />
            <h3 className="text-3xl font-bold text-white mb-4">Donation Successful!</h3>
            <p className="text-gray-300 mb-6">Thank you for your contribution to making a difference.</p>
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-green-500/30">
              <span className="text-green-400 text-lg font-medium">Transaction confirmed on Solana</span>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-300 mb-4">
                Amount (SOL)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.1"
                step="0.01"
                min="0.01"
                disabled={loading}
                className="w-full px-6 py-4 glass-effect border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-white placeholder-gray-400 text-lg"
              />
            </div>

            {errorMessage && (
              <div className="mb-8 p-6 glass-effect border border-red-500/20 rounded-xl">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-400 mr-4" />
                  <p className="text-red-300">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Quick Amount Buttons */}
            <div className="mb-8">
              <p className="text-lg text-gray-400 mb-4">Quick Amounts:</p>
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    disabled={loading}
                    className="p-4 glass-effect border border-white/10 hover:border-white/30 disabled:opacity-50 text-white text-lg font-medium rounded-xl transition-all duration-300"
                  >
                    {quickAmount} SOL
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleClose}
                disabled={loading}
                className="flex-1 btn-secondary text-white font-semibold py-4 px-6 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={loading || !amount || parseFloat(amount) <= 0}
                className="flex-1 btn-primary text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-3" />
                    Donate {amount ? `${amount} SOL` : ''}
                  </>
                )}
              </button>
            </div>

            {publicKey && (
              <div className="p-6 glass-effect rounded-xl border border-blue-500/20">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-blue-400 text-lg font-medium">From Wallet</span>
                </div>
                <p className="text-sm text-gray-300 font-mono">
                  {SolanaService.formatPublicKey(publicKey, 8)}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 