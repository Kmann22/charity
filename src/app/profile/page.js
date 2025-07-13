'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Heart, Users, Award, ArrowLeft, Settings, Activity, Calendar, DollarSign, Clock, Star } from 'lucide-react';

export default function Profile() {
  const { user, updateUserRole } = useWallet();
  const router = useRouter();
  const [userStats, setUserStats] = useState({});
  const [activityHistory, setActivityHistory] = useState([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || '');
  const [loading, setLoading] = useState(true);

  // Mock user stats
  const mockUserStats = {
    totalDonations: 1250,
    totalVolunteerHours: 45,
    campaignsSupported: 8,
    badgesEarned: user.badges?.length || 0,
    votingWeight: user.badges?.length > 0 ? user.badges.length + 1 : 1,
    memberSince: '2024-01-01'
  };

  // Mock activity history
  const mockActivityHistory = [
    {
      id: 1,
      type: 'donation',
      title: 'Donated to Clean Water Campaign',
      amount: 50,
      date: '2024-03-15',
      campaign: 'Clean Water for Rural Communities',
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    },
    {
      id: 2,
      type: 'volunteer',
      title: 'Volunteered for Education Campaign',
      hours: 8,
      date: '2024-03-10',
      campaign: 'Education for Underprivileged Children',
      icon: <Users className="w-5 h-5 text-blue-500" />
    },
    {
      id: 3,
      type: 'vote',
      title: 'Voted on Campaign Milestone',
      date: '2024-03-05',
      campaign: 'Disaster Relief for Earthquake Victims',
      icon: <Award className="w-5 h-5 text-purple-500" />
    },
    {
      id: 4,
      type: 'badge',
      title: 'Earned Silver Donor Badge',
      date: '2024-02-28',
      badge: 'Silver Donor',
      icon: <Star className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 5,
      type: 'donation',
      title: 'Donated to Animal Shelter',
      amount: 25,
      date: '2024-02-20',
      campaign: 'Animal Shelter Renovation',
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    }
  ];

  const roles = [
    { id: 'donator', name: 'Donator', description: 'Support causes through donations' },
    { id: 'volunteer', name: 'Volunteer', description: 'Offer time and skills to help' },
    { id: 'organizer', name: 'Organizer', description: 'Create and manage campaigns' },
    { id: 'community', name: 'Community Member', description: 'Participate in governance' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUserStats(mockUserStats);
      setActivityHistory(mockActivityHistory);
      setLoading(false);
    }, 1000);
  }, [user.badges]);

  const handleRoleChange = () => {
    if (selectedRole && selectedRole !== user.role) {
      updateUserRole(selectedRole);
      setShowRoleModal(false);
      // Redirect based on new role
      if (selectedRole === 'organizer') {
        router.push('/organizer');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'volunteer': return <Users className="w-5 h-5 text-blue-500" />;
      case 'vote': return <Award className="w-5 h-5 text-purple-500" />;
      case 'badge': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
              <button
                onClick={() => router.push(user?.role === 'organizer' ? '/organizer' : '/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Wallet: {user.walletAddress?.slice(0, 8)}...{user.walletAddress?.slice(-8)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                {user?.role?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                </h2>
                <p className="text-gray-600 mb-2">Member since {new Date(userStats.memberSince).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 font-mono break-all">
                  {user.walletAddress}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowRoleModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Change Role
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{userStats.totalDonations}</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{userStats.totalVolunteerHours}</div>
              <div className="text-sm text-gray-600">Volunteer Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{userStats.campaignsSupported}</div>
              <div className="text-sm text-gray-600">Campaigns Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{userStats.votingWeight}x</div>
              <div className="text-sm text-gray-600">Voting Weight</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Badges */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">NFT Badges</h3>
            
            {!user.badges || user.badges.length === 0 ? (
              <div className="text-center py-8">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No badges yet</h4>
                <p className="text-gray-600 mb-4">Start contributing to earn NFT badges!</p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Browse Campaigns
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {user.badges.map((badge, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {badge.level?.charAt(0).toUpperCase() || 'B'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{badge.name || `Badge ${index + 1}`}</h4>
                      <p className="text-sm text-gray-600">Weight: {badge.weight || 1}x</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activityHistory.map((activity) => (
                <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="mr-3 mt-1">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-600">{activity.campaign}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                    {activity.amount && (
                      <p className="text-xs text-green-600 font-medium">{formatCurrency(activity.amount)}</p>
                    )}
                    {activity.hours && (
                      <p className="text-xs text-blue-600 font-medium">{activity.hours} hours</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Role Change Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Your Role</h3>
            <p className="text-gray-600 mb-6">Select a new role for your account:</p>
            
            <div className="space-y-3 mb-6">
              {roles.map((role) => (
                <label key={role.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{role.name}</div>
                    <div className="text-sm text-gray-600">{role.description}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                disabled={!selectedRole || selectedRole === user.role}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Change Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 