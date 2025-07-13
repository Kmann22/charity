'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Heart, Users, Award, ArrowLeft, CheckCircle, XCircle, Vote, Clock, AlertCircle } from 'lucide-react';

export default function VotingPage() {
  const { user } = useWallet();
  const router = useRouter();
  const params = useParams();
  const [campaign, setCampaign] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingWeight, setVotingWeight] = useState(1);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteChoice, setVoteChoice] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  // Mock campaign data with realistic milestone statuses
  const mockCampaigns = {
    1: {
      id: 1,
      title: 'Clean Water for Rural Communities',
      organizer: 'WaterAid Foundation',
      milestones: [
        {
          id: 1,
          title: 'Site Assessment Complete',
          description: 'Initial site assessments completed in all 10 target communities',
          status: 'completed',
          date: '2024-01-15',
          dueDate: '2024-01-15',
          votes: { approve: 45, reject: 5 },
          totalVotes: 50,
          proof: 'Site assessment reports and community feedback collected',
          images: ['/proof/site-assessment-1.jpg', '/proof/site-assessment-2.jpg'],
          canVote: true,
          activityCompleted: true
        },
        {
          id: 2,
          title: 'Community Engagement',
          description: 'Community meetings held and local partnerships established',
          status: 'pending_vote',
          date: '2024-02-20',
          dueDate: '2024-02-20',
          votes: { approve: 0, reject: 0 },
          totalVotes: 0,
          proof: 'Meeting minutes, attendance records, and partnership agreements',
          images: ['/proof/community-meeting-1.jpg', '/proof/partnership-agreement.pdf'],
          canVote: true,
          activityCompleted: true
        },
        {
          id: 3,
          title: 'Well Construction Started',
          description: 'Construction of the first 3 wells has begun',
          status: 'in_progress',
          date: '2024-03-30',
          dueDate: '2024-04-15',
          votes: { approve: 0, reject: 0 },
          totalVotes: 0,
          proof: 'Construction photos and progress reports',
          images: [],
          canVote: false,
          activityCompleted: false
        },
        {
          id: 4,
          title: 'Water Systems Installation',
          description: 'Installation of water purification systems in all communities',
          status: 'upcoming',
          date: '2024-05-15',
          dueDate: '2024-05-15',
          votes: { approve: 0, reject: 0 },
          totalVotes: 0,
          proof: '',
          images: [],
          canVote: false,
          activityCompleted: false
        }
      ]
    },
    2: {
      id: 2,
      title: 'Education for Underprivileged Children',
      organizer: 'Education First',
      milestones: [
        {
          id: 1,
          title: 'Site Selection Complete',
          description: 'Completed site selection for all 5 schools',
          status: 'completed',
          date: '2024-01-10',
          dueDate: '2024-01-10',
          votes: { approve: 38, reject: 2 },
          totalVotes: 40,
          proof: 'Site selection reports and community approval documents',
          images: [],
          canVote: true,
          activityCompleted: true
        },
        {
          id: 2,
          title: 'Community Approval',
          description: 'Received approval from all target communities',
          status: 'pending_vote',
          date: '2024-02-15',
          dueDate: '2024-02-15',
          votes: { approve: 0, reject: 0 },
          totalVotes: 0,
          proof: 'Community meeting records and approval signatures',
          images: [],
          canVote: true,
          activityCompleted: true
        },
        {
          id: 3,
          title: 'Construction Started',
          description: 'Construction of school buildings has begun',
          status: 'in_progress',
          date: '2024-04-01',
          dueDate: '2024-04-30',
          votes: { approve: 0, reject: 0 },
          totalVotes: 0,
          proof: 'Construction progress photos and reports',
          images: [],
          canVote: false,
          activityCompleted: false
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const campaignData = mockCampaigns[params.id];
      if (campaignData) {
        setCampaign(campaignData);
        setMilestones(campaignData.milestones);
        // Calculate user's voting weight based on badges
        const weight = user.badges?.reduce((total, badge) => total + badge.weight, 0) || 1;
        setVotingWeight(weight);
      }
      setLoading(false);
    }, 1000);
  }, [params.id, user.badges]);

  const handleVote = async () => {
    if (!selectedMilestone || !voteChoice) return;

    setIsVoting(true);
    
    // Simulate voting process
    console.log(`Voting ${voteChoice} on milestone ${selectedMilestone.id} with weight ${votingWeight}`);
    
    setTimeout(() => {
      // Update milestone votes
      setMilestones(prev => prev.map(milestone => {
        if (milestone.id === selectedMilestone.id) {
          return {
            ...milestone,
            votes: {
              ...milestone.votes,
              [voteChoice]: milestone.votes[voteChoice] + votingWeight
            },
            totalVotes: milestone.totalVotes + votingWeight
          };
        }
        return milestone;
      }));

      setShowVoteModal(false);
      setSelectedMilestone(null);
      setVoteChoice(null);
      setIsVoting(false);
    }, 2000);
  };

  const getVotePercentage = (votes, total) => {
    if (total === 0) return 0;
    return (votes / total) * 100;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending_vote': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'upcoming': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'pending_vote': return <Vote className="w-5 h-5" />;
      case 'in_progress': return <Clock className="w-5 h-5" />;
      case 'upcoming': return <AlertCircle className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getVotingMessage = (milestone) => {
    if (milestone.status === 'completed') {
      return 'This milestone has been completed and approved.';
    } else if (milestone.status === 'pending_vote' && milestone.canVote) {
      return 'Activity completed! You can now vote on this milestone.';
    } else if (milestone.status === 'pending_vote' && !milestone.canVote) {
      return 'Waiting for activity completion before voting opens.';
    } else if (milestone.status === 'in_progress') {
      return 'Activity is in progress. Voting will be available once completed.';
    } else if (milestone.status === 'upcoming') {
      return 'This milestone is upcoming. Activity has not started yet.';
    }
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading voting page...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <p className="text-gray-600 mb-6">The campaign you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Back to Dashboard
          </button>
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
                onClick={() => router.push(`/campaign/${params.id}`)}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Campaign
              </button>
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Vote on Milestones</h1>
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
        {/* Campaign Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{campaign.title}</h2>
          <p className="text-gray-600 mb-4">by {campaign.organizer}</p>
          
          {/* Voting Weight Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Your Voting Power</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700">Voting Weight: <span className="font-bold">{votingWeight}x</span></p>
                <p className="text-sm text-blue-600">Based on your {user.badges?.length || 0} NFT badges</p>
              </div>
              <div className="flex space-x-2">
                {user.badges?.slice(0, 5).map((badge, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    title={`${badge.name} (${badge.weight}x weight)`}
                  >
                    {badge.icon}
                  </div>
                ))}
                {user.badges?.length > 5 && (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                    +{user.badges.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg mr-3 ${getStatusColor(milestone.status)}`}>
                      {getStatusIcon(milestone.status)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{milestone.description}</p>
                  <p className="text-sm text-gray-500">Due: {milestone.dueDate}</p>
                  
                  {/* Voting Status Message */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{getVotingMessage(milestone)}</p>
                  </div>
                </div>
                
                {milestone.canVote && milestone.status === 'pending_vote' && (
                  <button
                    onClick={() => {
                      setSelectedMilestone(milestone);
                      setShowVoteModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Vote Now
                  </button>
                )}
              </div>

              {/* Vote Results */}
              {milestone.totalVotes > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Vote Results</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Approve</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${getVotePercentage(milestone.votes.approve, milestone.totalVotes)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{milestone.votes.approve}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm">Reject</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${getVotePercentage(milestone.votes.reject, milestone.totalVotes)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{milestone.votes.reject}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Total votes: {milestone.totalVotes}</p>
                </div>
              )}

              {/* Proof */}
              {milestone.proof && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Proof of Completion</h4>
                  <p className="text-sm text-gray-600">{milestone.proof}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Vote Modal */}
      {showVoteModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Vote on Milestone</h3>
            <p className="text-gray-600 mb-4">{selectedMilestone.title}</p>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-3">Your voting weight: <span className="font-bold">{votingWeight}x</span></p>
              <div className="space-y-3">
                <button
                  onClick={() => setVoteChoice('approve')}
                  className={`w-full p-3 rounded-lg border-2 transition-colors ${
                    voteChoice === 'approve'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Approve</span>
                  </div>
                </button>
                <button
                  onClick={() => setVoteChoice('reject')}
                  className={`w-full p-3 rounded-lg border-2 transition-colors ${
                    voteChoice === 'reject'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Reject</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowVoteModal(false);
                  setSelectedMilestone(null);
                  setVoteChoice(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                disabled={!voteChoice || isVoting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                {isVoting ? 'Voting...' : 'Submit Vote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 