import React from 'react';
import { Users, Globe } from 'lucide-react';
import EventContactInfo from './EventContactInfo';
import Timeline from './Timeline';

const EventBasics: React.FC = () => {
  return (
    <div className="bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Event Information</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about the 2025 NASA Space Apps Challenge in Houston
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column: event info cards */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="mr-2 text-blue-400" size={20} />
                NASA Space Apps Challenge - Houston 2025
              </h3>
              <p className="text-gray-300 mb-4">
                The Houston local event for the world's largest hackathon 
                focused on space exploration, bringing together innovators, 
                students, and space enthusiasts.
              </p>
            </div>

            {/* Capacity & Registration (no event capacity) */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="mr-2 text-blue-400" size={20} />
                Registration
              </h3>
              <div className="space-y-3">
                <p className="text-gray-300">
                  Registration includes waitlist option when capacity is 
                  reached. Early registration recommended.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.spaceappschallenge.org/2025/local-events/houston/?tab=details" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Information - NEW */}
            <EventContactInfo />
          </div>

          {/* Right column: Twitter Embed & Timeline */}
          <div className="space-y-6">
            {/* Challenge Video/Image */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Latest Updates</h3>
              <div className="video-container">
                {/* Challenge Statements Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src="/videos/BA5FA481-BE9D-4F98-B03B-F21E0D3A300C_1_102_o.jpeg"
                    alt="NASA Space Apps Challenge Statements Now Live"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                    Challenge Statements Now Live!
                  </div>
                </div>
                <div className="mt-3 text-gray-300 text-sm">
                  <p>Explore 18 #SpaceApps challenges featuring open data from @NASA & Space Agency Partners.</p>
                  <a 
                    href="https://x.com/i/status/1967981836576936072" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
                  >
                    View original post →
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">IMPORTANT DATES: 2025 NASA SPACE APPS CHALLENGE</h3>
                <Timeline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBasics;