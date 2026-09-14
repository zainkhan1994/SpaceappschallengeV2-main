import React from 'react';
import { Users, Globe, Calendar, MapPin, ExternalLink } from 'lucide-react';
import EventContactInfo from './EventContactInfo';

const EventBasics: React.FC = () => {
  return (
    <div className="bg-slate-900/90 py-20 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Event Guide & Key Details
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
            Event Information
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about participating in the 2026 NASA Space Apps Challenge
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Event Details Card */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/80 hover:border-blue-500/40 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-blue-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Global Innovation Sprint
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Join the world’s largest global hackathon focused on space and Earth science, bringing together developers, designers, scientists, and problem solvers of all skill levels.
              </p>
            </div>

            {/* Event Date Card */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/80 hover:border-blue-500/40 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="text-yellow-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Event Dates
              </h3>
              <p className="text-gray-300 leading-relaxed mb-2">
                The 2026 NASA Space Apps Challenge will take place on
              </p>
              <span className="inline-block text-yellow-400 font-bold text-lg bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20">
                November 14–15, 2026
              </span>
            </div>

            {/* Venue Card */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/80 hover:border-blue-500/40 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="text-purple-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Venue Location
              </h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                Physical and hybrid venue details are currently being finalized for 2026.
              </p>
              <span className="inline-block text-purple-300 font-semibold text-sm bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">
                Location Details TBD — Stay Tuned
              </span>
            </div>

            {/* Registration Card */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/80 hover:border-blue-500/40 transition-all duration-300 shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Registration Access
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Registration opens August 26, 2026. Check the official portal to reserve your spot early.
                </p>
              </div>
              <a
                href="https://www.spaceappschallenge.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 w-fit"
              >
                <span>Visit Official Site</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div className="mt-12">
            <EventContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBasics;