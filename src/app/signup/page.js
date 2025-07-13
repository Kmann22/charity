'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { Heart, Users, Award, Settings, ArrowLeft } from 'lucide-react';
import { SolanaService } from '@/utils/solana';

export default function Signup() {
  const router = useRouter();
  const { user, updateUserRole } = useWallet();
  const { publicKey, connected } = useSolanaWallet();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'donator',
      title: 'Donator',
      description: 'Support campaigns with SOL donations and earn NFT badges for your contributions',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      features: [
        'Donate SOL to campaigns',
        'Earn NFT badges for contributions',
        'Track donation history',
        'Vote on campaign milestones'
      ]
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Offer your time and skills to help campaigns succeed and make a direct impact',
      icon: Users,
      color: 'from-blue-400 to-cyan-500',
      features: [
        'Join campaign volunteer teams',
        'Earn volunteer badges',
        'Track volunteer hours',
        'Build reputation in community'
      ]
    },
    {
      id: 'organizer',
      title: 'Organizer',
      description: 'Create and manage charity campaigns with full control and transparency',
      icon: Settings,
      color: 'from-green-400 to-emerald-500',
      features: [
        'Create new campaigns',
        'Manage campaign funds',
        'Track campaign statistics',
        'Mint NFT badges for contributors'
      ]
    },
    {
      id: 'community',
      title: 'Community Member',
      description: 'Participate in voting and community governance to shape the future of charity',
      icon: Award,
      color: 'from-purple-400 to-pink-500',
      features: [
        'Vote on campaign milestones',
        'Participate in governance',
        'Earn community badges',
        'Stay updated on campaigns'
      ]
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      updateUserRole(selectedRole.id);
      
      if (selectedRole.id === 'organizer') {
        router.push('/organizer');
      } else {
        router.push('/dashboard');
      }
    }
  };

  if (!connected || !publicKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="glass-effect p-10 max-w-lg rounded-2xl">
            <Heart className="h-20 w-20 text-red-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-6">Wallet Not Connected</h1>
            <p className="text-gray-300 mb-8">Please connect your Solana wallet to continue.</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary text-white font-semibold py-4 px-8 rounded-xl"
            >
              <ArrowLeft className="h-6 w-6 mr-3 inline" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-300 hover:text-white mr-8 transition-colors duration-300"
            >
              <ArrowLeft className="h-6 w-6 mr-3" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center">
              <Heart className="h-10 w-10 text-red-400 mr-4" />
              <h1 className="text-3xl font-bold text-white">Choose Your Role</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Choose Your <span className="gradient-text">Role</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Select your role to get started. You can change your role later in your profile settings.
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {roles.map((role, index) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={`card-hover glass-effect rounded-2xl p-8 border cursor-pointer transition-all duration-300 ${
                selectedRole?.id === role.id
                  ? 'border-white/50 bg-white/15'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${role.color} p-5 mr-8`}>
                  <role.icon className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {role.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {role.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-lg">What you can do:</h4>
                <ul className="space-y-3">
                  {role.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className={`w-3 h-3 bg-gradient-to-r ${role.color} rounded-full mr-4`}></div>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center mb-16">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-16 py-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
              selectedRole
                ? 'btn-primary text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedRole ? `Continue as ${selectedRole.title}` : 'Select a Role'}
          </button>
        </div>

        {/* Wallet Info */}
        <div className="glass-effect p-8 max-w-lg mx-auto rounded-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
              <span className="text-green-400 font-bold text-lg">Wallet Connected</span>
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-2">Connected Address</p>
              <p className="font-mono text-sm text-white break-all">
                {SolanaService.formatPublicKey(publicKey, 8)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 