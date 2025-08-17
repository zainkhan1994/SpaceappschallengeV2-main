import React from 'react';
import { Clock, MapPin, Users, Mail, Globe } from 'lucide-react';

const EventBasics: React.FC = () => {
  return (
    <section id="event-basics" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Event Information
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about the 2025 NASA Space Apps Challenge in Houston
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-overpass font-bold text-xl text-white mb-2">
                    NASA Space Apps Challenge – Houston 2025
                  </h3>
                  <p className="font-fira-sans text-gray-300">
                    The Houston local event for the world's largest hackathon focused on space exploration, 
                    bringing together innovators, students, and space enthusiasts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-overpass font-bold text-xl text-white mb-2">
                    Format & Location
                  </h3>
                  <p className="font-fira-sans text-gray-300 mb-2">
                    <strong>Format:</strong> In-Person Event
                  </p>
                  <p className="font-fira-sans text-gray-300 mb-2">
                    <strong>Location:</strong> Houston, Texas (Venue TBA)
                  </p>
                  <p className="font-fira-sans text-gray-300">
                    <strong>Timezone:</strong> CDT (Central Daylight Time)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-overpass font-bold text-xl text-white mb-2">
                    Capacity & Registration
                  </h3>
                  <p className="font-fira-sans text-gray-300 mb-2">
                    <strong>Event Capacity:</strong> 200 participants
                  </p>
                  <p className="font-fira-sans text-gray-300">
                    Registration includes waitlist option when capacity is reached. 
                    Early registration recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-overpass font-bold text-xl text-white mb-2">
                    Event Duration
                  </h3>
                  <p className="font-fira-sans text-gray-300 mb-4">
                    <strong>October 4-5, 2025</strong>
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Day 1 (Sat):</span>
                      <span className="text-white">9:00 AM - 11:00 PM CDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Day 2 (Sun):</span>
                      <span className="text-white">9:00 AM - 6:00 PM CDT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-overpass font-bold text-xl text-white mb-2">
                    Local Lead Contact
                  </h3>
                  <p className="font-fira-sans text-gray-300 mb-2">
                    For questions about the Houston event:
                  </p>
                  <a 
                    href="mailto:houston@spaceapps.local" 
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    houston@spaceapps.local
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-400/30">
              <h3 className="font-overpass font-bold text-xl text-white mb-3">
                Quick Facts
              </h3>
              <ul className="space-y-2 font-fira-sans text-gray-300">
                <li>• 48-hour hackathon format</li>
                <li>• Teams of 2-6 participants</li>
                <li>• NASA challenge themes</li>
                <li>• Meals and snacks provided</li>
                <li>• Prizes and recognition</li>
                <li>• Networking opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBasics;