import React from 'react';
import { Trophy } from 'lucide-react';
import FarmVisAccordion from './FarmVisAccordion2';

const Winners: React.FC = () => {
  return (
    <section id="winners" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/Pictures/astronaut-data-visualization.jpg")', backgroundAttachment: 'fixed' }}
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
            Celebrating innovation and excellence in space exploration solutions
          </p>
        </div>

        {/* Three cards: Winners, Project, FarmVis video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WINNERS card */}
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
              
              {/* Honorable Mention Badge */}
              <div className="bg-gradient-to-r from-[#FFFF66] to-[#FFFF33] text-black px-4 py-2 rounded-lg flex items-center space-x-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animation-delay-300 animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="font-bold text-sm">2024 Honorable Mention</span>
              </div>
            </div>
            
            {/* Team Description */}
            <div className="space-y-4 text-gray-300">
              <p className="text-sm leading-relaxed">
                The FarmVis team demonstrated exceptional innovation in addressing agricultural 
                challenges through NASA satellite data and Earth observation technologies.
              </p>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 text-sm">Achievement Highlights</h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Global recognition from NASA Space Apps Challenge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Innovative use of satellite imagery for farming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Addressing water-related agricultural challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Contributing to global food security solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PROJECT card (now with accordion) */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
            <div className="text-yellow-400 font-bold mb-2">NASA Goddard Scientific Visualization Studio</div>
            <h3 className="text-2xl font-bold text-white mb-4">FarmVis</h3>
            
            {/* Winner Recognition Card */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-400 w-5 h-5" />
                  <span className="text-yellow-300 font-semibold text-sm">2024 WINNER</span>
                </div>
                <div className="bg-yellow-400/20 px-3 py-1 rounded-full">
                  <span className="text-yellow-300 text-xs font-medium">Global Recognition</span>
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
                    <div className="text-yellow-400 text-xs font-medium">Category</div>
                    <div className="text-white text-xs">Challenge 15</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 text-xs font-medium">Year</div>
                    <div className="text-white text-xs">2024</div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <Trophy className="text-yellow-400 w-4 h-4" />
                </div>
              </div>
            </div>
            
            <FarmVisAccordion />
          </div>

          {/* VIDEO card with new caption and social links */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-blue-400/30 transition-transform duration-300 hover:scale-[1.01]">
            <div className="text-yellow-400 font-bold mb-3 text-lg md:text-xl">NASA Goddard Scientific Visualization Studio</div>
            <h3 className="text-3xl font-bold text-white mb-4">FarmVis</h3>

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

            <p className="mt-2 text-xs text-gray-400">
              Video: Feeding a Hungry World, provided by NASA's Goddard Space Flight Center, Scientific Visualization Studio.
            </p>

            <div className="mt-3 flex items-center gap-3">
              {/* Instagram post */}
              <a
                href="https://www.instagram.com/p/DF5tEfvT3_a/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 bg-slate-800/60 hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                aria-label="District Instagram post"
              >
                <svg className="w-4 h-4 opacity-80 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.25-2.75a.75.75 0 1 0 .75.75.75.75 0 0 0-.75-.75z"/></svg>
                <span className="text-xs">District post</span>
              </a>

              {/* School logo button */}
              <a
                href="https://www.katyisd.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 bg-slate-800/60 hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                aria-label="KATY ISD"
              >
                <img src="/images/KATY.png" alt="KATY ISD" className="h-4 w-auto opacity-90 group-hover:opacity-100" />
                <span className="text-xs tracking-wide">KATY</span>
              </a>

              {/* May GitHub */}
              <a
                href="https://goldpig888.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 bg-slate-800/60 hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                aria-label="May GitHub"
              >
                <svg className="w-4 h-4 opacity-80 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.2 9 7.7 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.8 1.9-1.2.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.5-1.5 7.7-5.6 7.7-10.5C23.1 5.3 18.3.5 12 .5z"/></svg>
                <span className="text-xs">May</span>
              </a>

              {/* Sahus GitHub */}
              <a
                href="https://github.com/sahusgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 bg-slate-800/60 hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                aria-label="Sahus GitHub"
              >
                <svg className="w-4 h-4 opacity-80 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.9 3.2 9 7.7 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.8 1.9-1.2.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.2 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.5-1.5 7.7-5.6 7.7-10.5C23.1 5.3 18.3.5 12 .5z"/></svg>
                <span className="text-xs">Sahus</span>
              </a>

              {/* Sahus LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sahusgupta/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 bg-slate-800/60 hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                aria-label="Sahus LinkedIn"
              >
                <svg className="w-4 h-4 opacity-80 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zM9.5 8.98h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.8 2.6 4.8 5.9v6.3h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7h-4v-12z"/></svg>
                <span className="text-xs">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
