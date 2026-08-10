import React from 'react';
import { Users, Globe, Calendar, MapPin } from 'lucide-react';
import EventContactInfo from './EventContactInfo';

const EventBasics: React.FC = () => {
  return (
    <div className="bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Event Information</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about the 2026 NASA Space Apps Challenge
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="mr-2 text-blue-400" size={20} />
                NASA Space Apps Challenge 2026
              </h3>
              <p className="text-gray-300 mb-4">
                Join the world’s largest global hackathon focused on space exploration,
                bringing together innovators, students, technologists, and citizen scientists.
              </p>
            </div>

            {/* Event Date */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-400" size={20} />
                Event Dates
              </h3>
              <div className="space-y-3">
                <p className="text-gray-300">
                  The 2026 NASA Space Apps Challenge will take place
                  <span className="text-yellow-400 font-semibold"> November 14–15, 2026</span>.
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <MapPin className="mr-2 text-blue-400" size={20} />
                Venue
              </h3>
              <p className="text-gray-300">
                Venue details are <span className="text-yellow-400 font-semibold">TBD</span> and will be announced soon.
              </p>
            </div>

            {/* Registration */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="mr-2 text-blue-400" size={20} />
                Registration
              </h3>
              <p className="text-gray-300 mb-4">
                Registration opens August 26, 2026. Check the official NASA Space Apps website for updates and local event announcements.
              </p>
              <a
                href="https://www.spaceappschallenge.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Visit Official Site
              </a>
            </div>

            <EventContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBasics;