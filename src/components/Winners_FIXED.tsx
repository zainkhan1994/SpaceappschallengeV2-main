import React from 'react';
import { Trophy, Bookmark } from 'lucide-react';

const Winners: React.FC = () => {
  return (
    <section id="winners" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/Pictures/Wallpaper.jpeg")', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="text-[#FFFF33] w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">2024 Winners</h2>
          </div>
          <p className="text-blue-300 max-w-3xl mx-auto">
            Celebrating innovation and excellence in the NASA Space Apps Challenge
          </p>
        </div>

        {/* Winners Content - Clean 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT: Project Recognition */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            {/* Winner Recognition Card */}
            <div className="bg-gradient-to-r from-[#FFFF00]/20 to-[#FFAA00]/20 border border-[#FFFF33]/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Trophy className="text-[#FFFF33] w-6 h-6" />
                  <span className="text-[#FFFF33] font-bold text-lg">2024 GLOBAL WINNER</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">FarmVis</h3>
                <p className="text-gray-300">NASA Goddard Scientific Visualization Studio Challenge</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-[#FFFF33] text-sm font-medium">Challenge</div>
                  <div className="text-white font-semibold">Challenge 15</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-[#FFFF33] text-sm font-medium">Recognition</div>
                  <div className="text-white font-semibold">Global Impact</div>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-[#FFFF33] to-[#FFFF00] text-black px-4 py-2 rounded-lg flex items-center space-x-2 transform transition-all duration-300 hover:scale-105">
                <Bookmark className="w-5 h-5" />
                <span className="font-bold text-sm">2024 Global Nominee</span>
              </div>
              
              <div className="bg-gradient-to-r from-[#FFFF66] to-[#FFFF33] text-black px-4 py-2 rounded-lg flex items-center space-x-2 transform transition-all duration-300 hover:scale-105">
                <Bookmark className="w-5 h-5" />
                <span className="font-bold text-sm">2024 Honorable Mention</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Team Members */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-[#FFFF33] font-bold mb-6 flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span className="text-xl">Meet the Team</span>
            </div>
            
            {/* Team Member Cards */}
            <div className="space-y-4 mb-6">
              {/* May Lynn Espinola */}
              <div className="bg-slate-700/50 rounded-lg p-5 border border-[#FFFF33]/20 hover:border-[#FFFF33]/40 transition-all duration-300">
                <div>
                  <h4 className="text-[#FFFF33] font-bold text-lg">May Lynn Espinola</h4>
                  <p className="text-blue-300 text-sm mb-2">Junior, Tompkins High School</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Technology innovator focusing on real-world problem solving. NASA Apps Challenge and Apple WWDC winner. 
                    USACO Silver medalist with Computer Vision research experience at UT.
                  </p>
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://github.com/maylynn-espinola" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-[#FFFF33] text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.2 9 7.7 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.8 1.9-1.2.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.5-1.5 7.7-5.6 7.7-10.5C23.1 5.3 18.3.5 12 .5z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/may-lynn-espinola-a0120b206/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-[#FFFF33] text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sahus Gupta */}
              <div className="bg-slate-700/50 rounded-lg p-5 border border-[#FFFF33]/20 hover:border-[#FFFF33]/40 transition-all duration-300">
                <div>
                  <h4 className="text-[#FFFF33] font-bold text-lg">Sahus Gupta</h4>
                  <p className="text-blue-300 text-sm mb-2">Senior, Tompkins High School</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    AI researcher and developer. Creator of PLATON platform used by 3,000+ students. 
                    Experienced in Python, Java, JavaScript with expertise in AI applications.
                  </p>
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://github.com/sahusgupta" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-[#FFFF33] text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.2 9 7.7 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.8 1.9-1.2.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.5-1.5 7.7-5.6 7.7-10.5C23.1 5.3 18.3.5 12 .5z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/sahusgupta/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-[#FFFF33] text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* School Affiliation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div></div>
              <div className="border-t border-gray-600 pt-6">
                <div className="flex items-center justify-center">
                  <a 
                    href="https://www.katyisd.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-slate-700/50 px-6 py-3 rounded-lg hover:bg-slate-600/50 transition-all duration-300 hover:scale-105 border border-blue-400/30"
                  >
                    <img src="/Pictures/KATY.png" alt="KATY ISD" className="h-8 w-auto" />
                    <div className="text-center">
                      <div className="text-blue-300 font-semibold">KATY ISD</div>
                      <div className="text-gray-400 text-xs">Tompkins High School</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Recognition Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-8 border border-[#FFFF33]/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">About FarmVis</h3>
              <p className="text-gray-300 leading-relaxed">
                FarmVis represents an innovative approach to agricultural visualization and data analysis, 
                designed to help address global food security challenges. This project demonstrates the power 
                of combining space technology with agricultural science to create solutions that can help 
                feed a growing world population.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
