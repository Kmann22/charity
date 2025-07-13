'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // You can also provide a custom RPC endpoint
  // const endpoint = useMemo(() => 'https://api.devnet.solana.com', []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  const [user, setUser] = useState({
    role: null,
    name: '',
    email: '',
    walletAddress: '',
    badges: [
      {
        id: 1,
        name: 'First Donor',
        level: 'Bronze',
        weight: 1,
        description: 'Made your first donation',
        icon: '💝',
        earnedDate: '2024-01-15',
        rarity: 'common'
      },
      {
        id: 2,
        name: 'Generous Heart',
        level: 'Silver',
        weight: 2,
        description: 'Donated over $100 total',
        icon: '💎',
        earnedDate: '2024-02-20',
        rarity: 'uncommon'
      },
      {
        id: 3,
        name: 'Community Champion',
        level: 'Gold',
        weight: 3,
        description: 'Supported 5+ campaigns',
        icon: '🏆',
        earnedDate: '2024-03-10',
        rarity: 'rare'
      },
      {
        id: 4,
        name: 'Volunteer Hero',
        level: 'Platinum',
        weight: 4,
        description: 'Volunteered 50+ hours',
        icon: '⭐',
        earnedDate: '2024-03-25',
        rarity: 'epic'
      },
      {
        id: 5,
        name: 'Milestone Guardian',
        level: 'Diamond',
        weight: 5,
        description: 'Voted on 10+ milestones',
        icon: '💎',
        earnedDate: '2024-04-05',
        rarity: 'legendary'
      }
    ],
    totalDonated: 1250,
    campaignsCreated: 0,
    campaignsVolunteered: 0
  });

  const updateUserRole = (role) => {
    setUser(prev => ({ ...prev, role }));
  };

  const updateUserProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  const addBadge = (badge) => {
    setUser(prev => ({
      ...prev,
      badges: [...prev.badges, { ...badge, id: Date.now(), earnedDate: new Date().toISOString().split('T')[0] }]
    }));
  };

  const value = {
    user,
    updateUserRole,
    updateUserProfile,
    addBadge,
    network,
    endpoint
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContext.Provider value={value}>
            {children}
          </WalletContext.Provider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 