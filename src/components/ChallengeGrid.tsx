import React from 'react';
import { Globe, Brain, Zap } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  datasets: string[];
}

interface ChallengeGridProps {
  challenges: Challenge[];
  onChallengeSelect: (challenge: Challenge) => void;
}

export const ChallengeGrid: React.FC<ChallengeGridProps> = ({ challenges, onChallengeSelect }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Earth & Climate': return <Globe className="w-5 h-5" />;
      case 'AI & Big Data': return <Brain className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400';
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          onClick={() => onChallengeSelect(challenge)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-blue-400">
              {getCategoryIcon(challenge.category)}
              <span className="ml-2 text-sm font-medium">{challenge.category}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
            {challenge.title}
          </h3>
          
          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
            {challenge.description.substring(0, 120)}...
          </p>
          
          <div className="flex flex-wrap gap-2">
            {challenge.datasets.slice(0, 2).map((dataset, index) => (
              <span key={index} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">
                {dataset}
              </span>
            ))}
            {challenge.datasets.length > 2 && (
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                +{challenge.datasets.length - 2} more
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};