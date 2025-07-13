'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Heart, Users, Award, Plus, BarChart3, TrendingUp, DollarSign, Calendar, Edit, Trash2, Eye } from 'lucide-react';

export default function OrganizerDashboard() {
  const { user } = useWallet();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    category: 'health',
    targetAmount: '',
    deadline: '',
    image: ''
  });

  // Mock organizer campaigns
  const mockCampaigns = [
    {
      id: 1,
      title: 'Clean Water for Rural Communities',
      description: 'Providing clean drinking water to 10 rural communities in Africa.',
      category: 'health',
      targetAmount: 50000,
      raisedAmount: 35000,
      deadline: '2024-12-31',
      volunteers: 25,
      donors: 150,
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      title: 'Education for Underprivileged Children',
      description: 'Building schools and providing education materials for children in need.',
      category: 'education',
      targetAmount: 75000,
      raisedAmount: 60000,
      deadline: '2024-11-30',
      volunteers: 40,
      donors: 200,
      status: 'active',
      createdAt: '2024-01-15'
    }
  ];

  const mockStats = {
    totalCampaigns: 2,
    activeCampaigns: 2,
    totalRaised: 95000,
    totalDonors: 350,
    totalVolunteers: 65,
    completionRate: 85
  };

  const categories = [
    { id: 'health', name: 'Health', icon: <Heart className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <Users className="w-4 h-4" /> },
    { id: 'disaster', name: 'Disaster Relief', icon: <Award className="w-4 h-4" /> },
    { id: 'animals', name: 'Animals', icon: <Heart className="w-4 h-4" /> }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateCampaign = async () => {
    if (!newCampaign.title || !newCampaign.description || !newCampaign.targetAmount || !newCampaign.deadline) {
      return;
    }

    // Simulate campaign creation
    const campaign = {
      id: Date.now(),
      ...newCampaign,
      targetAmount: parseFloat(newCampaign.targetAmount),
      raisedAmount: 0,
      volunteers: 0,
      donors: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns(prev => [campaign, ...prev]);
    setNewCampaign({
      title: '',
      description: '',
      category: 'health',
      targetAmount: '',
      deadline: '',
      image: ''
    });
    setShowCreateModal(false);
  };

  const handleDeleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
  };

  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user || user.role !== 'organizer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be an organizer to access this dashboard.</p>
          <button
            onClick={() => router.push('/profile')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Change Role
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading organizer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, Organizer
              </span>
              <button
                onClick={() => router.push('/profile')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, Organizer!
              </h2>
              <p className="text-gray-600">
                Manage your charity campaigns and track their progress.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRaised)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Your Campaigns</h3>
            <span className="text-sm text-gray-500">{campaigns.length} campaigns</span>
          </div>

          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 mr-3">{campaign.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{campaign.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Target</p>
                        <p className="font-semibold">{formatCurrency(campaign.targetAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Raised</p>
                        <p className="font-semibold text-green-600">{formatCurrency(campaign.raisedAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Donors</p>
                        <p className="font-semibold">{campaign.donors}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Volunteers</p>
                        <p className="font-semibold">{campaign.volunteers}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{getProgressPercentage(campaign.raisedAmount, campaign.targetAmount).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => router.push(`/campaign/${campaign.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Campaign"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                      title="Edit Campaign"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete Campaign"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Campaign</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter campaign title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Describe your campaign"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newCampaign.category}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={newCampaign.targetAmount}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, targetAmount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50000"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newCampaign.deadline}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.title || !newCampaign.description || !newCampaign.targetAmount || !newCampaign.deadline}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 