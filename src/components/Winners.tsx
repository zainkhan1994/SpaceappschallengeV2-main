import React from 'react';
import { Trophy } from 'lucide-react';

const Winners: React.FC = () => {
  return (
    <section id="winners" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24">
      {/* Background image - using the astronaut image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("/Pictures/astronaut-data-visualization.jpg")',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="text-yellow-400 w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Past Winners</h2>
          </div>
          <p className="text-blue-300 max-w-3xl mx-auto">
            Celebrating innovation and excellence in space exploration solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Winner Card 1 */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-yellow-400 font-bold mb-2">2024 Global Winner</div>
            <h3 className="text-2xl font-bold text-white mb-3">Project Aquarius</h3>
            <p className="text-gray-300 mb-4">
              An AI-powered water quality monitoring system that uses satellite data to predict and prevent water contamination events.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-300">Team Hydro Solutions</span>
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                Earth & Climate
              </span>
            </div>
          </div>

          {/* Winner Card 2 */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-yellow-400 font-bold mb-2">2024 Regional Winner</div>
            <h3 className="text-2xl font-bold text-white mb-3">LunarNav</h3>
            <p className="text-gray-300 mb-4">
              A navigation system for lunar rovers using computer vision to identify safe paths in challenging terrain.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-300">Team MoonWalkers</span>
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                Space & Habitats
              </span>
            </div>
          </div>

          {/* Winner Card 3 */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-yellow-400 font-bold mb-2">2024 Local Winner</div>
            <h3 className="text-2xl font-bold text-white mb-3">CoralWatch</h3>
            <p className="text-gray-300 mb-4">
              A platform that uses NASA satellite data to monitor coral reef health and coordinate restoration efforts.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-300">Team ReefGuard</span>
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                Oceans & Ecosystems
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#explore"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
          >
            Join the Challenge
          </a>
        </div>
      </div>
    </section>
  );
};

export default Winners;
