// NFT Badge levels and their voting weights
export const BADGE_LEVELS = {
  BRONZE: { name: 'Bronze', weight: 1, color: '#CD7F32' },
  SILVER: { name: 'Silver', weight: 2, color: '#C0C0C0' },
  GOLD: { name: 'Gold', weight: 3, color: '#FFD700' },
  PLATINUM: { name: 'Platinum', weight: 5, color: '#E5E4E2' },
  DIAMOND: { name: 'Diamond', weight: 10, color: '#B9F2FF' }
};

// Calculate total voting weight based on user's badges
export const calculateVotingWeight = (userBadges) => {
  if (!userBadges || userBadges.length === 0) {
    return 1; // Default weight for users without badges
  }

  return userBadges.reduce((totalWeight, badge) => {
    const level = badge.level?.toUpperCase();
    const badgeWeight = BADGE_LEVELS[level]?.weight || 1;
    return totalWeight + badgeWeight;
  }, 0);
};

// Get badge level information
export const getBadgeLevelInfo = (level) => {
  const upperLevel = level?.toUpperCase();
  return BADGE_LEVELS[upperLevel] || BADGE_LEVELS.BRONZE;
};

// Calculate weighted vote result
export const calculateWeightedVote = (votes, userBadges) => {
  const totalWeight = calculateVotingWeight(userBadges);
  
  return {
    vote: votes,
    weight: totalWeight,
    weightedValue: votes * totalWeight
  };
};

// Get badge display information
export const getBadgeDisplayInfo = (badge) => {
  const levelInfo = getBadgeLevelInfo(badge.level);
  
  return {
    ...badge,
    displayName: badge.name || `${levelInfo.name} Badge`,
    color: levelInfo.color,
    weight: levelInfo.weight
  };
};

// Mock function to award badges based on user activity
export const awardBadge = async (userId, activityType, amount) => {
  // In a real implementation, this would mint an NFT badge on Solana
  let badgeLevel = 'BRONZE';
  
  if (activityType === 'donation') {
    if (amount >= 100) badgeLevel = 'GOLD';
    else if (amount >= 50) badgeLevel = 'SILVER';
  } else if (activityType === 'volunteer') {
    if (amount >= 50) badgeLevel = 'GOLD';
    else if (amount >= 25) badgeLevel = 'SILVER';
  } else if (activityType === 'organizer') {
    if (amount >= 10) badgeLevel = 'PLATINUM';
    else if (amount >= 5) badgeLevel = 'GOLD';
  }
  
  return {
    id: Date.now(),
    name: `${getBadgeLevelInfo(badgeLevel).name} ${activityType.charAt(0).toUpperCase() + activityType.slice(1)}`,
    level: badgeLevel.toLowerCase(),
    weight: getBadgeLevelInfo(badgeLevel).weight,
    image: `/badges/${badgeLevel.toLowerCase()}.png`,
    awardedAt: new Date().toISOString()
  };
}; 