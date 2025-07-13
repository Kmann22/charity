import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Initialize connection to Solana devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Campaign Program ID (you would deploy your own program for production)
const CAMPAIGN_PROGRAM_ID = new PublicKey('11111111111111111111111111111111'); // System program for now

export class SolanaService {
  static async getBalance(publicKey) {
    try {
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  static async getAccountInfo(publicKey) {
    try {
      const accountInfo = await connection.getAccountInfo(publicKey);
      return accountInfo;
    } catch (error) {
      console.error('Error getting account info:', error);
      throw error;
    }
  }

  static async sendTransaction(fromWallet, toAddress, amount) {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromWallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amount * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );

      const signature = await fromWallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      return signature;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  static async createCampaign(organizerWallet, campaignData) {
    try {
      // This is a simplified version. In a real implementation, you would:
      // 1. Create a new account for the campaign
      // 2. Initialize it with campaign data
      // 3. Store metadata on-chain or in IPFS
      
      const campaignAccount = new PublicKey(campaignData.id);
      
      // For now, we'll just return a mock transaction signature
      const mockSignature = 'mock_campaign_creation_' + Date.now();
      
      return {
        signature: mockSignature,
        campaignAccount: campaignAccount.toString(),
        success: true
      };
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  static async donateToCampaign(donorWallet, campaignAddress, amount) {
    try {
      // Send SOL to the campaign address
      const signature = await this.sendTransaction(
        donorWallet,
        campaignAddress,
        amount
      );
      
      return {
        signature,
        amount,
        success: true
      };
    } catch (error) {
      console.error('Error donating to campaign:', error);
      throw error;
    }
  }

  static async getCampaignBalance(campaignAddress) {
    try {
      const publicKey = new PublicKey(campaignAddress);
      const balance = await this.getBalance(publicKey);
      return balance;
    } catch (error) {
      console.error('Error getting campaign balance:', error);
      throw error;
    }
  }

  static async getTransactionHistory(publicKey, limit = 10) {
    try {
      const signatures = await connection.getSignaturesForAddress(
        publicKey,
        { limit }
      );
      
      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
          });
          return {
            signature: sig.signature,
            slot: sig.slot,
            blockTime: sig.blockTime,
            transaction: tx
          };
        })
      );
      
      return transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
    }
  }

  static async airdropSOL(publicKey, amount = 1) {
    try {
      const signature = await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(signature, 'confirmed');
      return signature;
    } catch (error) {
      console.error('Error requesting airdrop:', error);
      throw error;
    }
  }

  static formatPublicKey(publicKey, chars = 4) {
    if (!publicKey) return '';
    const str = publicKey.toString();
    return `${str.slice(0, chars)}...${str.slice(-chars)}`;
  }

  static async validateAddress(address) {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }
}

// Campaign storage (in a real app, this would be on-chain or in a database)
export const campaignStorage = {
  campaigns: new Map(),
  
  addCampaign(campaign) {
    this.campaigns.set(campaign.id, campaign);
  },
  
  getCampaign(id) {
    return this.campaigns.get(id);
  },
  
  getAllCampaigns() {
    return Array.from(this.campaigns.values());
  },
  
  updateCampaign(id, updates) {
    const campaign = this.campaigns.get(id);
    if (campaign) {
      this.campaigns.set(id, { ...campaign, ...updates });
    }
  }
}; 