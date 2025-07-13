'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { Heart, Users, Award, Calendar, DollarSign, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import DonationModal from '@/components/DonationModal';

export default function CampaignDetails() {
  const { user } = useWallet();
  const { publicKey, connected } = useSolanaWallet();
  const router = useRouter();
  const params = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [volunteerHours, setVolunteerHours] = useState('');

  // Mock campaign data
  const mockCampaigns = {
    1: {
      id: 1,
      title: 'Clean Water for Rural Communities',
      description: 'Providing clean drinking water to 10 rural communities in Africa. This campaign aims to build sustainable water infrastructure including wells, water purification systems, and community training programs. The project will directly impact over 5,000 people across 10 villages.',
      longDescription: `Our mission is to provide sustainable access to clean drinking water for rural communities in Africa that currently lack this basic necessity. This comprehensive project includes:

• Construction of 10 deep wells with hand pumps
• Installation of water purification systems
• Community training on water management and hygiene
• Regular maintenance and monitoring programs
• Local capacity building for long-term sustainability

The project will be implemented in partnership with local communities and will include extensive community engagement to ensure the solutions are culturally appropriate and sustainable.`,
      category: 'health',
      organizer: 'WaterAid Foundation',
      organizerWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      targetAmount: 50000,
      raisedAmount: 35000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      deadline: '2024-12-31',
      volunteers: 25,
      donors: 150,
      status: 'active',
      milestones: [
        { id: 1, title: 'Site Assessment Complete', completed: true, date: '2024-01-15' },
        { id: 2, title: 'Community Engagement', completed: true, date: '2024-02-20' },
        { id: 3, title: 'Well Construction Started', completed: false, date: '2024-03-30' },
        { id: 4, title: 'Water Systems Installation', completed: false, date: '2024-05-15' },
        { id: 5, title: 'Community Training', completed: false, date: '2024-06-30' }
      ],
      updates: [
        { id: 1, title: 'Project Launch', content: 'Campaign officially launched with great community support.', date: '2024-01-01' },
        { id: 2, title: 'Site Assessment', content: 'Completed initial site assessments in all 10 target communities.', date: '2024-01-15' },
        { id: 3, title: 'Community Meetings', content: 'Held successful community meetings to discuss project plans.', date: '2024-02-20' }
      ]
    },
    2: {
      id: 2,
      title: 'Education for Underprivileged Children',
      description: 'Building schools and providing education materials for children in need. This campaign focuses on creating educational opportunities for children who lack access to quality education.',
      longDescription: `Our mission is to provide quality education to underprivileged children who currently have limited or no access to schooling. This comprehensive project includes:

• Construction of 5 new schools in rural areas
• Provision of educational materials and supplies
• Teacher training and development programs
• Scholarship programs for students
• Community education awareness campaigns

The project will be implemented in partnership with local education authorities and will include extensive community engagement to ensure the solutions are culturally appropriate and sustainable.`,
      category: 'education',
      organizer: 'Education First',
      organizerWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      targetAmount: 75000,
      raisedAmount: 42000,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      deadline: '2024-11-30',
      volunteers: 40,
      donors: 200,
      status: 'active',
      milestones: [
        { id: 1, title: 'Site Selection Complete', completed: true, date: '2024-01-10' },
        { id: 2, title: 'Community Approval', completed: true, date: '2024-02-15' },
        { id: 3, title: 'Construction Started', completed: false, date: '2024-04-01' },
        { id: 4, title: 'School Equipment', completed: false, date: '2024-06-15' },
        { id: 5, title: 'Teacher Training', completed: false, date: '2024-08-30' }
      ],
      updates: [
        { id: 1, title: 'Project Launch', content: 'Education campaign launched with strong community support.', date: '2024-01-01' },
        { id: 2, title: 'Site Selection', content: 'Completed site selection for all 5 schools.', date: '2024-01-10' },
        { id: 3, title: 'Community Approval', content: 'Received approval from all target communities.', date: '2024-02-15' }
      ]
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const campaignData = mockCampaigns[params.id];
      if (campaignData) {
        setCampaign(campaignData);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleDonationSuccess = (result) => {
    setCampaign(prev => ({
      ...prev,
      raisedAmount: prev.raisedAmount + (result.amount * 100),
      donors: prev.donors + 1
    }));
  };

  const handleVolunteer = async () => {
    if (!volunteerHours || parseFloat(volunteerHours) <= 0) return;

    console.log(`Volunteering ${volunteerHours} hours for campaign ${campaign.id}`);
    
    setTimeout(() => {
      setShowVolunteerModal(false);
      setVolunteerHours('');
      setCampaign(prev => ({
        ...prev,
        volunteers: prev.volunteers + 1
      }));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-8"></div>
          <p className="text-gray-300 text-xl">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="glass-effect p-10 max-w-lg rounded-2xl">
            <Heart className="h-20 w-20 text-red-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-6">Campaign Not Found</h1>
            <p className="text-gray-300 mb-8">The campaign you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="btn-primary text-white font-semibold py-4 px-8 rounded-xl"
            >
              <ArrowLeft className="h-6 w-6 mr-3 inline" />
              Back to Dashboard
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
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center text-gray-300 hover:text-white mr-8 transition-colors duration-300"
              >
                <ArrowLeft className="w-6 h-6 mr-3" />
                <span className="font-medium">Back</span>
              </button>
              <div className="flex items-center">
                <Heart className="w-10 h-10 text-red-400 mr-4" />
                <h1 className="text-3xl font-bold text-white">Campaign Details</h1>
              </div>
            </div>
            <span className="text-sm text-gray-300">
              Welcome, {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Header */}
        <div className="glass-effect overflow-hidden mb-12 rounded-3xl">
          <div className="relative h-96 bg-gray-200">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute top-8 left-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-white/30">
                <span className="text-white text-lg font-medium">
                  {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-10">
            <h1 className="text-5xl font-bold text-white mb-6">{campaign.title}</h1>
            <p className="text-2xl text-gray-300 mb-10">{campaign.description}</p>
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-300">Raised</span>
                <span className="font-bold text-white">{formatCurrency(campaign.raisedAmount)} / {formatCurrency(campaign.targetAmount)}</span>
              </div>
              <div className="w-full glass-effect rounded-2xl h-6 backdrop-blur-sm border border-white/20">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-6 rounded-2xl progress-animate"
                  style={{ width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%` }}
                ></div>
              </div>
              <p className="text-lg text-gray-400 mt-3">
                {getProgressPercentage(campaign.raisedAmount, campaign.targetAmount).toFixed(1)}% of goal reached
              </p>
            </div>

            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              {[
                { value: campaign.donors, label: 'Donors', icon: Heart },
                { value: campaign.volunteers, label: 'Volunteers', icon: Users },
                { value: campaign.milestones.filter(m => m.completed).length, label: 'Milestones Completed', icon: Award },
                { value: Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24)), label: 'Days Left', icon: Calendar }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl p-4 mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              {connected ? (
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="flex-1 btn-primary text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center text-lg"
                >
                  <Heart className="h-7 w-7 mr-4" />
                  Donate SOL
                </button>
              ) : (
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 btn-secondary text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center text-lg"
                >
                  <Heart className="h-7 w-7 mr-4" />
                  Connect Wallet to Donate
                </button>
              )}
              
              <button
                onClick={() => setShowVolunteerModal(true)}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center text-lg"
              >
                <Users className="h-7 w-7 mr-4" />
                Volunteer
              </button>
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Long Description */}
            <div className="card-hover glass-effect rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">About This Campaign</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{campaign.longDescription}</p>
              </div>
            </div>

            {/* Milestones */}
            <div className="card-hover glass-effect rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">Project Milestones</h2>
              <div className="space-y-8">
                {campaign.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-8 ${
                      milestone.completed 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                        : 'glass-effect border border-white/20'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="h-8 w-8 text-white" />
                      ) : (
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-2 ${
                        milestone.completed ? 'text-green-400' : 'text-white'
                      }`}>
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates */}
            <div className="card-hover glass-effect rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">Recent Updates</h2>
              <div className="space-y-8">
                {campaign.updates.map((update) => (
                  <div key={update.id} className="border-l-4 border-blue-500 pl-8">
                    <h3 className="font-bold text-white mb-3 text-xl">{update.title}</h3>
                    <p className="text-gray-300 mb-3 text-lg">{update.content}</p>
                    <p className="text-sm text-gray-500">{update.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Organizer Info */}
            <div className="card-hover glass-effect rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Campaign Organizer</h3>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mr-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl">{campaign.organizer}</h4>
                  <p className="text-lg text-green-400 flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    Verified Organizer
                  </p>
                </div>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="card-hover glass-effect rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Campaign Info</h3>
              <div className="space-y-6">
                <div className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 text-gray-400 mr-4" />
                  <span className="text-gray-300">Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-lg">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-4" />
                  <span className="text-gray-300">Goal: {formatCurrency(campaign.targetAmount)}</span>
                </div>
                <div className="flex items-center text-lg">
                  <Users className="h-5 w-5 text-gray-400 mr-4" />
                  <span className="text-gray-300">{campaign.volunteers} volunteers needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Donation Modal */}
      <DonationModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        campaign={campaign}
        onSuccess={handleDonationSuccess}
      />

      {/* Volunteer Modal */}
      {showVolunteerModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="glass-effect rounded-2xl p-8 w-full max-w-lg mx-4 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-8">Volunteer for Campaign</h2>
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-300 mb-4">
                Hours Available
              </label>
              <input
                type="number"
                value={volunteerHours}
                onChange={(e) => setVolunteerHours(e.target.value)}
                placeholder="10"
                min="1"
                className="w-full px-6 py-4 glass-effect border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 text-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowVolunteerModal(false)}
                className="flex-1 btn-secondary text-white font-semibold py-4 px-6 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleVolunteer}
                disabled={!volunteerHours || parseFloat(volunteerHours) <= 0}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl"
              >
                Volunteer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 