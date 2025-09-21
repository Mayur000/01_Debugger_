import React, { useState, useEffect } from 'react';
import { Leaf, Droplets, Home, Lightbulb, Award, CheckCircle, Trophy, Star, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const ConservationHub = () => {
  const [completedTips, setCompletedTips] = useState(new Set());
  const [joinedChallenges, setJoinedChallenges] = useState(new Set());
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [userPoints, setUserPoints] = useState(0);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const conservationTips = [
    {
      id: 1,
      category: 'Bathroom',
      icon: Home,
      title: 'Fix Leaky Faucets',
      description: 'A single dripping faucet can waste over 3,000 liters per year.',
      impact: 'Save up to 10% on water bill',
      difficulty: 'Easy'
    },
    {
      id: 2,
      category: 'Kitchen',
      icon: Droplets,
      title: 'Use Full Dishwasher Loads',
      description: 'Run dishwasher only when full to maximize water efficiency.',
      impact: 'Save 15-20 liters per load',
      difficulty: 'Easy'
    },
    {
      id: 3,
      category: 'Garden',
      icon: Leaf,
      title: 'Install Drip Irrigation',
      description: 'Drip irrigation systems use 30-50% less water than sprinklers.',
      impact: 'Save 40% garden water usage',
      difficulty: 'Medium'
    },
    {
      id: 4,
      category: 'Bathroom',
      icon: Home,
      title: 'Install Low-Flow Showerheads',
      description: 'Reduce shower water usage by up to 40% without compromising pressure.',
      impact: 'Save 25-30 liters per shower',
      difficulty: 'Medium'
    },
    {
      id: 5,
      category: 'General',
      icon: Lightbulb,
      title: 'Collect Rainwater',
      description: 'Set up rain barrels to collect water for garden and cleaning.',
      impact: 'Free water for non-potable uses',
      difficulty: 'Hard'
    },
    {
      id: 6,
      category: 'Kitchen',
      icon: Droplets,
      title: 'Reuse Cooking Water',
      description: 'Use pasta or vegetable cooking water for watering plants after cooling.',
      impact: 'Reduce kitchen water waste',
      difficulty: 'Easy'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '7-Day Water Saver',
      description: 'Reduce daily water usage by 20% for one week',
      detailedDescription: 'Track your daily water consumption and aim to reduce it by 20% compared to your average. Use water-saving techniques like shorter showers, fixing leaks, and efficient appliance usage.',
      reward: 50,
      duration: '7 days',
      participants: 1247,
      difficulty: 'Medium',
      tasks: [
        'Log daily water readings',
        'Identify high-usage areas',
        'Implement water-saving measures',
        'Maintain 20% reduction for 7 days'
      ]
    },
    {
      id: 2,
      title: 'Leak Detective',
      description: 'Check and fix all household leaks',
      detailedDescription: 'Conduct a thorough inspection of your home for water leaks. Check faucets, toilets, pipes, and outdoor spigots. Document and fix any leaks found.',
      reward: 100,
      duration: '3 days',
      participants: 892,
      difficulty: 'Easy',
      tasks: [
        'Inspect all faucets and fixtures',
        'Check toilet for internal leaks',
        'Examine visible pipes',
        'Fix identified leaks',
        'Submit before/after photos'
      ]
    },
    {
      id: 3,
      title: 'Rainwater Harvester',
      description: 'Set up a rainwater collection system',
      detailedDescription: 'Install a rainwater harvesting system to collect and store rainwater for non-potable uses like gardening, cleaning, and toilet flushing.',
      reward: 200,
      duration: '30 days',
      participants: 456,
      difficulty: 'Hard',
      tasks: [
        'Design collection system',
        'Purchase materials',
        'Install collection setup',
        'Test system functionality',
        'Document water collected'
      ]
    },
    {
      id: 4,
      title: 'Smart Shower Challenge',
      description: 'Reduce shower time to under 5 minutes daily',
      detailedDescription: 'Challenge yourself to take efficient showers under 5 minutes while maintaining good hygiene. Use a timer and water-saving techniques.',
      reward: 75,
      duration: '14 days',
      participants: 2156,
      difficulty: 'Easy',
      tasks: [
        'Install shower timer',
        'Track daily shower duration',
        'Maintain under 5 minutes',
        'Share water-saving tips'
      ]
    },
    {
      id: 5,
      title: 'Garden Water Warrior',
      description: 'Implement water-efficient gardening for a month',
      detailedDescription: 'Transform your garden into a water-efficient paradise using drip irrigation, mulching, and drought-resistant plants.',
      reward: 150,
      duration: '30 days',
      participants: 678,
      difficulty: 'Medium',
      tasks: [
        'Install drip irrigation or soaker hoses',
        'Apply mulch to retain moisture',
        'Plant drought-resistant varieties',
        'Monitor and reduce water usage',
        'Document garden transformation'
      ]
    }
  ];

  useEffect(() => {
    // Load user data from localStorage
    const savedTips = localStorage.getItem('completedTips');
    const savedChallenges = localStorage.getItem('joinedChallenges');
    const savedCompletedChallenges = localStorage.getItem('completedChallenges');
    const savedPoints = localStorage.getItem('userPoints');

    if (savedTips) setCompletedTips(new Set(JSON.parse(savedTips)));
    if (savedChallenges) setJoinedChallenges(new Set(JSON.parse(savedChallenges)));
    if (savedCompletedChallenges) setCompletedChallenges(new Set(JSON.parse(savedCompletedChallenges)));
    if (savedPoints) setUserPoints(parseInt(savedPoints));
  }, []);

  const toggleTipCompletion = (tipId) => {
    const newCompleted = new Set(completedTips);
    let pointsChange = 0;

    if (newCompleted.has(tipId)) {
      newCompleted.delete(tipId);
      pointsChange = -25;
      toast.success('Tip unmarked!');
    } else {
      newCompleted.add(tipId);
      pointsChange = 25;
      toast.success('Great job! +25 points earned! 🎉');
    }

    setCompletedTips(newCompleted);
    const newPoints = userPoints + pointsChange;
    setUserPoints(newPoints);

    // Save to localStorage
    localStorage.setItem('completedTips', JSON.stringify([...newCompleted]));
    localStorage.setItem('userPoints', newPoints.toString());
  };

  const joinChallenge = (challengeId) => {
    const newJoined = new Set(joinedChallenges);
    newJoined.add(challengeId);
    setJoinedChallenges(newJoined);
    localStorage.setItem('joinedChallenges', JSON.stringify([...newJoined]));

    const challenge = challenges.find(c => c.id === challengeId);
    toast.success(`Joined "${challenge.title}"! Good luck! 🚀`);
    setShowChallengeModal(false);
  };

  const completeChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const newCompleted = new Set(completedChallenges);
    newCompleted.add(challengeId);
    setCompletedChallenges(newCompleted);

    const newPoints = userPoints + challenge.reward;
    setUserPoints(newPoints);

    localStorage.setItem('completedChallenges', JSON.stringify([...newCompleted]));
    localStorage.setItem('userPoints', newPoints.toString());

    toast.success(`Challenge completed! +${challenge.reward} points earned! 🏆`, { duration: 4000 });
  };

  const openChallengeModal = (challenge) => {
    setSelectedChallenge(challenge);
    setShowChallengeModal(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Water Conservation Hub</h1>
        <p className="text-gray-600 mt-1">Learn, save, and make a difference</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Droplets className="h-8 w-8 text-water-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{completedTips.size}</p>
          <p className="text-sm text-gray-600">Tips Completed</p>
        </div>
        <div className="card text-center">
          <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{completedTips.size * 50}</p>
          <p className="text-sm text-gray-600">Liters Saved (Est.)</p>
        </div>
        <div className="card text-center">
          <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{completedTips.size * 25}</p>
          <p className="text-sm text-gray-600">Points Earned</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conservation Tips */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Conservation Tips</h2>
          <div className="space-y-4">
            {conservationTips.map((tip) => {
              const Icon = tip.icon;
              const isCompleted = completedTips.has(tip.id);

              return (
                <div key={tip.id} className={`card transition-all ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-6 w-6 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{tip.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                        </div>
                        <button
                          onClick={() => toggleTipCompletion(tip.id)}
                          className={`ml-4 p-1 rounded-full transition-colors ${
                            isCompleted
                              ? 'text-green-600 hover:text-green-700'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <CheckCircle className={`h-6 w-6 ${isCompleted ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-sm text-water-600 font-medium">{tip.impact}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                          {tip.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{tip.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Challenges</h2>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>

                <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reward:</span>
                    <span className="font-medium text-yellow-600">{challenge.reward}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{challenge.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full btn-primary text-sm">
                  Join Challenge
                </button>
              </div>
            ))}
          </div>

          {/* Quick Facts */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Did You Know?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Droplets className="h-4 w-4 text-water-500 mt-0.5" />
                <p>The average Indian household uses 200-300 liters of water daily.</p>
              </div>
              <div className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 text-green-500 mt-0.5" />
                <p>Rainwater harvesting can meet 40-50% of household water needs.</p>
              </div>
              <div className="flex items-start space-x-2">
                <Home className="h-4 w-4 text-blue-500 mt-0.5" />
                <p>A 5-minute shower uses about 40-50 liters of water.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConservationHub;
