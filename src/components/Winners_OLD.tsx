import React from 'react';
import FarmVisAccordion2 from './FarmVisAccordion2';
import { Trophy } from 'lucide-react';

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
            Innovating for Earth and beyond
          </p>
        </div>

        {/* Three cards: Team Winners, Project, FarmVis video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* TEAM WINNERS card */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-[#FFFF33] font-bold mb-2">Winners</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              About the Team
            </h3>
            
            {/* Honor Badges */}
            <div className="space-y-3 mb-6">
              {/* Global Nominee Badge */}
              <div className="bg-gradient-to-r from-[#FFFF33] to-[#FFFF00] text-black px-4 py-2 rounded-lg flex items-center space-x-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="font-bold text-sm">2024 Global Nominee</span>
              </div>
              
              {/* Honorable Mention Badge - Expandable */}
              <div>
                <div 
                  className="bg-gradient-to-r from-[#FFFF66] to-[#FFFF33] text-black px-4 py-2 rounded-lg flex items-center justify-between cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg animation-delay-300 animate-pulse"
                  onClick={() => {
                    const teamDetails = document.getElementById('team-details');
                    if (teamDetails) {
                      teamDetails.style.display = teamDetails.style.display === 'none' ? 'block' : 'none';
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="font-bold text-sm">2024 Honorable Mention</span>
                  </div>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                
                {/* Team Details Section (Initially Hidden) */}
                <div id="team-details" style={{ display: 'none' }} className="mt-3 bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3 text-sm">About the Team</h4>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>
                      <p className="text-[#FFFF33] font-semibold">May Lynn Espinola</p>
                      <p className="text-xs">Junior, Tompkins High School</p>
                      <p className="text-xs mt-1">Focus on using technology for real problems. Winner in NASA Apps Challenge and Apple WWDC inventor. USACO Silver, Computer Vision research at UT through Robotics and Vision Learning Lab. Building an AI app that personalizes math learning.</p>
                    </div>
                    <div className="border-t border-gray-600 pt-3">
                      <p className="text-[#FFFF33] font-semibold">Sahus Gupta</p>
                      <p className="text-xs">Senior, Tompkins High School</p>
                      <p className="text-xs mt-1">Building AI agent - PLATON, making research accessible to everyone through PLATON. Used by 3,000+ students. Skills in Python, Java, JavaScript. Support Data research at Linkedin. Building AI applications with Headstarter AI.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Winner Images Grid */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-3 rounded-xl border border-blue-400/30 transform transition-all duration-300 hover:scale-105">
                <img src="/Pictures/5 Posts.png" alt="FarmVis Team" className="w-full rounded-lg mb-2 shadow-lg" />
                <p className="text-white font-semibold text-sm">FarmVis Team</p>
                <p className="text-blue-300 text-xs">NASA Space Apps Challenge Winners</p>
              </div>
            </div>
            
            {/* Connect with Winners Section - Expandable */}
            <div>
              <div 
                className="bg-slate-700/50 rounded-lg p-3 mb-4 cursor-pointer hover:bg-slate-600/50 transition-all duration-300"
                onClick={() => {
                  const connectSection = document.getElementById('connect-section');
                  if (connectSection) {
                    connectSection.style.display = connectSection.style.display === 'none' ? 'block' : 'none';
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm">Connect with the Winners</h4>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              
              <div id="connect-section" style={{ display: 'none' }} className="space-y-3 mb-4">
                <a 
                  href="https://goldpig888.github.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-slate-600/50 px-3 py-2 rounded-lg hover:bg-slate-500/50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.2 9 7.7 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.8 1.9-1.2.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.5-1.5 7.7-5.6 7.7-10.5C23.1 5.3 18.3.5 12 .5z"/>
                  </svg>
                  <div>
                    <p className="text-[#FFFF33] font-medium text-sm">May Lynn Espinola</p>
                    <p className="text-gray-400 text-xs">Junior, Tompkins High School</p>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/sahusgupta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-slate-600/50 px-3 py-2 rounded-lg hover:bg-slate-500/50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.2 9 7.7 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.8 1.9-1.2.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.5-1.5 7.7-5.6 7.7-10.5C23.1 5.3 18.3.5 12 .5z"/>
                  </svg>
                  <div>
                    <p className="text-[#FFFF33] font-medium text-sm">Sahus Gupta</p>
                    <p className="text-gray-400 text-xs">Senior, Tompkins High School</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/sahusgupta/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-slate-600/50 px-3 py-2 rounded-lg hover:bg-slate-500/50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div>
                    <p className="text-[#FFFF33] font-medium text-sm">Sahus Gupta</p>
                    <p className="text-gray-400 text-xs">LinkedIn Profile</p>
                  </div>
                </a>
              </div>
            </div>

            {/* School Logo */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex items-center justify-center">
                <a 
                  href="https://www.katyisd.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-slate-700/50 px-4 py-2 rounded-lg hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
                >
                  <img src="/Pictures/KATY.png" alt="KATY ISD" className="h-6 w-auto" />
                  <span className="text-blue-300 text-sm font-medium">KATY ISD</span>
                </a>
              </div>
            </div>
          </div>

          {/* PROJECT card (now with accordion) */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-[#FFFF33] font-bold mb-2">NASA Goddard Scientific Visualization Studio</div>
            <h3 className="text-2xl font-bold text-white mb-4">FarmVis</h3>
            
            {/* Winner Recognition Card */}
            <div className="bg-gradient-to-r from-[#FFFF00]/20 to-[#FFAA00]/20 border border-[#FFFF33]/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-[#FFFF33] w-5 h-5" />
                  <span className="text-[#FFFF33] font-semibold text-sm">2024 WINNER</span>
                </div>
                <div className="bg-[#FFFF33]/20 px-3 py-1 rounded-full">
                  <span className="text-[#FFFF33] text-xs font-medium">Global Recognition</span>
                </div>
              </div>
              
              <h4 className="text-white font-bold text-lg mb-2">Outstanding Achievement</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Recognized by NASA for innovative use of satellite data and Earth observation 
                technologies to address critical agricultural challenges and food security.
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-[#FFFF33] text-xs font-medium">Category</div>
                    <div className="text-white text-xs">Challenge 15</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#FFFF33] text-xs font-medium">Year</div>
                    <div className="text-white text-xs">2024</div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-[#FFFF33]/20 rounded-full flex items-center justify-center">
                  <Trophy className="text-[#FFFF33] w-4 h-4" />
                </div>
              </div>
            </div>
            
            <FarmVisAccordion2 />
          </div>

          {/* VIDEO card */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-blue-400/30 transition-transform duration-300 hover:scale-[1.01]">
            <div className="w-full flex justify-center mb-5">
              <video
                src="/videos/Farm.mp4"
                controls
                className="rounded-xl w-full aspect-video border-2 border-blue-500/40 shadow-lg"
                style={{ background: '#000' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <p className="mt-2 text-xs text-gray-400 text-center">
              Video: Feeding a Hungry World, provided by NASA's Goddard Space Flight Center, Scientific Visualization Studio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
