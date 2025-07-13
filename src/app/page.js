'use client';

import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Heart, Users, Award, TrendingUp, ArrowRight, Wallet } from 'lucide-react';
import { SolanaService } from '@/utils/solana';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { user, updateUserRole } = useWallet();
  const { publicKey, connected, disconnect } = useSolanaWallet();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
      updateUserRole('donator');
    }
  }, [connected, publicKey]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    
    try {
      setLoading(true);
      const walletBalance = await SolanaService.getBalance(publicKey);
      setBalance(walletBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToSignup = () => {
    if (connected) {
      router.push('/signup');
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'Transparent Donations',
      description: 'All donations are recorded on the Solana blockchain for complete transparency and accountability'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Vote on campaign milestones and help decide how funds are used through decentralized governance'
    },
    {
      icon: Award,
      title: 'NFT Badges',
      description: 'Earn unique NFT badges for your contributions and achievements with real blockchain ownership'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Tracking',
      description: 'Track campaign progress and fund usage in real-time with immutable blockchain records'
    }
  ];

  const stats = [
    { value: '$2.5M+', label: 'Total Donations' },
    { value: '150+', label: 'Active Campaigns' },
    { value: '5,000+', label: 'Community Members' },
    { value: '25,000+', label: 'NFT Badges Minted' }
  ];

  const formatBalance = (balance) => {
    return `${balance.toFixed(4)} SOL`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-400 mr-3" />
              <h1 className="text-2xl font-bold text-white">Solana Charity</h1>
            </div>
            <WalletMultiButton className="btn-primary text-white font-semibold py-2 px-4 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Decentralized</span>
            <br />
            <span className="text-white">Charity Platform</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto">
            Connect your Solana wallet to start making a difference. Join our community of donors, 
            volunteers, and organizers in creating positive change through blockchain technology.
          </p>
          
          {!connected ? (
            <div className="glass-effect p-10 max-w-lg mx-auto rounded-2xl">
              <div className="text-center mb-8">
                <Wallet className="h-20 w-20 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h3>
                <p className="text-gray-300">
                  Connect your Phantom, Solflare, or other Solana wallet to get started
                </p>
              </div>
              <WalletMultiButton className="w-full btn-primary text-white font-semibold py-4 px-6 rounded-xl text-lg" />
            </div>
          ) : (
            <div className="glass-effect p-10 max-w-lg mx-auto rounded-2xl">
              <div className="flex items-center justify-center mb-8">
                <Wallet className="h-8 w-8 text-green-400 mr-3" />
                <span className="text-green-400 font-bold text-xl">Wallet Connected!</span>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
                  <p className="font-mono text-sm text-white break-all bg-white/10 rounded-lg px-4 py-3">
                    {SolanaService.formatPublicKey(publicKey, 8)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Balance</p>
                  <p className="text-4xl font-bold gradient-text">
                    {loading ? 'Loading...' : formatBalance(balance)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleContinueToSignup}
                  className="w-full btn-primary text-white font-semibold py-4 px-6 rounded-xl"
                >
                  Continue to Signup
                </button>
                <button
                  onClick={disconnect}
                  className="w-full btn-secondary text-white font-semibold py-3 px-4 rounded-xl"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover glass-effect rounded-2xl p-8 border border-white/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl p-4 mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <div className="glass-effect p-16 rounded-3xl">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Platform Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-4">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center">
          <div className="glass-effect p-12 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">Join the Revolution</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the future of charitable giving. Every donation, every vote, every action makes a difference.
            </p>
            <button
              onClick={() => connected ? handleContinueToSignup() : null}
              className="btn-primary text-white font-semibold py-4 px-8 rounded-xl text-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
