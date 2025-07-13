'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Heart, Search, Filter, MapPin, Calendar, DollarSign, Users, Eye } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      title: 'Clean Water for Rural Communities',
      description: 'Providing clean drinking water to 10 rural communities in Africa',
      category: 'health',
      location: 'Kenya, Africa',
      goal: 50000,
      raised: 35000,
      volunteers: 25,
      organizer: 'WaterAid Foundation',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      deadline: '2024-03-15'
    },
    {
      id: 2,
      title: 'Education for Underprivileged Children',
      description: 'Building schools and providing education materials for children in need',
      category: 'education',
      location: 'India',
      goal: 75000,
      raised: 42000,
      volunteers: 18,
      organizer: 'Education First',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      deadline: '2024-04-20'
    },
    {
      id: 3,
      title: 'Disaster Relief for Earthquake Victims',
      description: 'Emergency relief and rebuilding efforts for earthquake-affected areas',
      category: 'disaster',
      location: 'Turkey',
      goal: 100000,
      raised: 85000,
      volunteers: 45,
      organizer: 'Global Relief',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      deadline: '2024-02-28'
    },
    {
      id: 4,
      title: 'Wildlife Conservation Project',
      description: 'Protecting endangered species and their natural habitats',
      category: 'environment',
      location: 'Amazon Rainforest',
      goal: 60000,
      raised: 28000,
      volunteers: 12,
      organizer: 'Wildlife Conservation Society',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400',
      deadline: '2024-05-10'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'health', name: 'Health & Medical' },
    { id: 'education', name: 'Education' },
    { id: 'disaster', name: 'Disaster Relief' },
    { id: 'environment', name: 'Environment' },
    { id: 'poverty', name: 'Poverty Alleviation' }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
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
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {campaign.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {campaign.volunteers} volunteers
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-medium">{formatCurrency(campaign.raised)} / {formatCurrency(campaign.goal)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/campaign/${campaign.id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    View Details
                  </button>
                  {user.role === 'donator' && (
                    <button
                      onClick={() => router.push(`/campaign/${campaign.id}?action=donate`)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      Donate
                    </button>
                  )}
                  {user.role === 'volunteer' && (
                    <button
                      onClick={() => router.push(`/campaign/${campaign.id}?action=volunteer`)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <Users className="h-4 w-4 inline mr-1" />
                      Volunteer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
} 