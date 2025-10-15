import React from 'react';
import { motion } from 'framer-motion';
import InteractiveGlobe from '../components/InteractiveGlobe';

interface GlobeExplorerProps {
  onBackToLanding?: () => void;
}

const GlobeExplorer: React.FC<GlobeExplorerProps> = ({ onBackToLanding }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Back Button */}
          {onBackToLanding && (
            <div className="absolute top-4 left-4">
              <button
                onClick={onBackToLanding}
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/20"
              >
                ← Back to Home
              </button>
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
              Space Agencies
            </span>
            <span className="block text-white">Around the World</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the global network of space agencies supporting the NASA Space Apps Challenge. 
            Click on any country to discover their space program and contributions to space exploration.
          </p>
        </motion.div>
      </div>

      {/* Interactive Globe */}
      <div className="h-[calc(100vh-200px)] w-full">
        <InteractiveGlobe />
      </div>

      {/* Footer Info */}
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🌟 Global Space Collaboration
            </h3>
            <p className="text-gray-300 leading-relaxed">
              The NASA Space Apps Challenge brings together space agencies from around the world 
              to solve real-world challenges using NASA's open data. Each agency contributes 
              unique expertise, resources, and perspectives to advance space exploration and 
              benefit life on Earth.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GlobeExplorer;
