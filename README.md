# Solana Charity Platform
https://youtu.be/NX_tKCiYUGI

A decentralized charity platform built on Solana blockchain using Next.js, featuring role-based access control, NFT badges, and transparent donation tracking.

## 🌟 Features

- **Wallet Integration**: Connect with Phantom, Solflare, and other Solana wallets
- **Role-Based Access**: Support for Donators, Volunteers, Organizers, and Community Members
- **NFT Badges**: Earn unique blockchain-based badges for contributions
- **Campaign Management**: Create and manage charity campaigns with full transparency
- **Voting System**: Community-driven milestone voting with weighted votes based on NFT badges
- **Real-time Tracking**: Monitor campaign progress and fund usage on the blockchain
- **Modern UI**: Beautiful, responsive design with glass morphism effects

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js, Wallet Adapter
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Solana wallet (Phantom, Solflare, etc.)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kmann22/solana-charity-platform.git
   cd solana-charity-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 User Roles

### Donator
- Donate SOL to campaigns
- Earn NFT badges for contributions
- Track donation history
- Vote on campaign milestones

### Volunteer
- Join campaign volunteer teams
- Earn volunteer badges
- Track volunteer hours
- Build reputation in community

### Organizer
- Create new campaigns
- Manage campaign funds
- Track campaign statistics
- Mint NFT badges for contributors

### Community Member
- Vote on campaign milestones
- Participate in governance
- Earn community badges
- Stay updated on campaigns

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

### Solana Network
The platform is configured for Solana mainnet by default. For development, you can switch to devnet by updating the environment variables.

## 📱 Usage

1. **Connect Wallet**: Click the "Connect Wallet" button and select your Solana wallet
2. **Choose Role**: Select your role (Donator, Volunteer, Organizer, or Community Member)
3. **Browse Campaigns**: View active charity campaigns and their details
4. **Make Donations**: Donate SOL to campaigns you want to support
5. **Earn Badges**: Receive NFT badges for your contributions
6. **Vote on Milestones**: Participate in community voting for campaign milestones

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── campaign/          # Campaign details pages
│   ├── dashboard/         # User dashboard
│   ├── organizer/         # Organizer dashboard
│   ├── profile/           # User profile
│   ├── signup/            # Role selection
│   ├── voting/            # Milestone voting
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable components
│   ├── DonationModal.js   # Donation modal
│   └── ...
├── context/               # React context providers
│   └── WalletContext.js   # Wallet state management
└── utils/                 # Utility functions
    └── solana.js          # Solana blockchain operations
```

## 🔐 Security Features

- **Wallet Authentication**: Secure wallet connection with signature verification
- **Transaction Signing**: All blockchain transactions require user approval
- **Transparent Ledger**: All donations and activities recorded on Solana blockchain
- **Role-Based Permissions**: Access control based on user roles and NFT badges

## 🎨 UI/UX Features

- **Glass Morphism**: Modern glass effect design
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Subtle hover effects and transitions
- **Dark Theme**: Eye-friendly dark color scheme
- **Gradient Accents**: Beautiful gradient text and button effects

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Solana Foundation for the blockchain infrastructure
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Built with ❤️ for the Solana community**
