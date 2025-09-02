import React from 'react';
import { Calendar, MapPin, Users, Globe } from 'lucide-react';
import EventContactInfo from './EventContactInfo';

const EventBasics: React.FC = () => {
  return (
    <div className="bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <img 
            src="/Pictures/2024-nasa-international-space-apps-challenge-infographic.png" 
            alt="2024 NASA International Space Apps Challenge Infographic" 
            className="mx-auto mb-6 max-w-full h-auto"
          />
          <h2 className="text-3xl font-bold text-white mb-4">Event Information</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about the 2025 NASA Space Apps Challenge in Houston
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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

            {/* Format & Location */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <MapPin className="mr-2 text-blue-400" size={20} />
                Format & Location
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Format:</span> 
                  <span className="text-white ml-2">In-Person Event</span>
                </div>
                <div>
                  <span className="text-gray-400">Location:</span> 
                  <span className="text-white ml-2">Houston, Texas (Venue TBA)</span>
                </div>
                <div>
                  <span className="text-gray-400">Timezone:</span> 
                  <span className="text-white ml-2">CDT (Central Daylight Time)</span>
                </div>
              </div>
            </div>

            {/* Capacity & Registration */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="mr-2 text-blue-400" size={20} />
                Capacity & Registration
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Event Capacity:</span> 
                  <span className="text-white ml-2">200 participants</span>
                </div>
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
          </div>
          
          <div className="space-y-6">
            {/* Event Duration */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-400" size={20} />
                Event Duration
              </h3>
              <div className="mb-3">
                <span className="text-gray-400">October 4-5, 2025</span>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Day 1 (Sat):</span> 
                  <span className="text-white ml-2">9:00 AM - 11:00 PM CDT</span>
                </div>
                <div>
                  <span className="text-gray-400">Day 2 (Sun):</span> 
                  <span className="text-white ml-2">9:00 AM - 6:00 PM CDT</span>
                </div>
              </div>
            </div>

            {/* Contact Information - NEW */}
            <EventContactInfo />

            {/* Quick Facts */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Quick Facts</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  48-hour hackathon format
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Teams of 2-6 participants
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  NASA challenge themes
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Meals and snacks provided
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Prizes and recognition
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Networking opportunities
                </li>
                <li className="flex items-start mt-4 font-medium text-yellow-400">
                  More details coming soon!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBasics;