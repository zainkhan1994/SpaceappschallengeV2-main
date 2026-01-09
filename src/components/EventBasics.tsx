import React from 'react';
import { Users, Globe } from 'lucide-react';
import EventContactInfo from './EventContactInfo';

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

        <div className="max-w-5xl mx-auto">
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

            {/* Venue */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Event Location</h3>
              <p className="text-gray-300 mb-2">
                The NASA Space Apps Challenge in Houston will take place at the Cambridge Office Building, Rice University.
              </p>
              <p className="text-gray-300 mb-4">
                Address: 6100 Main St, Houston, TX 77005
              </p>
              <div>
                <a
                  href="https://www.rice.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Venue
                </a>
              </div>
            </div>

            {/* Parking Instructions */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">🚗 Parking Instructions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">On-Site Parking</h4>
                  <p className="text-gray-300 mb-2">
                    The Cambridge Office Building has an on-site garage with 500+ spaces.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Rice University Visitor Lots</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• <strong>Greenbriar Lot</strong> — $3/day per exit</li>
                    <li>• <strong>Founders Court Visitor Lot</strong> — metered (charged per 10 min, daily cap ~$12)</li>
                  </ul>
                  <p className="text-yellow-300 text-sm mt-2">
                    ⚠️ Rice does not provide free parking across campus.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Free Parking Alternative</h4>
                  <p className="text-gray-300 mb-2">
                    You can park in Hermann Park lots (free lots A, G, F, H etc.) and walk across Main Street.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Backup Option</h4>
                  <p className="text-gray-300">
                    Memorial Hermann Medical Plaza garage (at Cambridge & Fannin) is a paid option nearby.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">🗺️ Suggested Directions</h3>
              <ol className="text-gray-300 space-y-2">
                <li>1. Enter Rice via <strong>Entrance 2</strong> from Main St</li>
                <li>2. Proceed and turn left onto <strong>College Way</strong></li>
                <li>3. Follow signage to <strong>Cambridge Office Building</strong></li>
              </ol>
            </div>

            {/* Interactive Maps */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">📍 Interactive Maps</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Cambridge Office Building</h4>
                  <iframe
                    src="https://www.google.com/maps?q=Cambridge%20Office%20Building%20Rice%20University%20Houston&output=embed"
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Cambridge Office Building, Rice University"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Rice University Entrance 2</h4>
                  <iframe
                    src="https://www.google.com/maps?q=Entrance%202%20Rice%20University%20Houston&output=embed"
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Rice University Entrance 2"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Cambridge Garage (Entrance 3)</h4>
                  <iframe
                    src="https://www.google.com/maps?q=Entrance%203%20Garage%20Rice%20University%20Cambridge%20Garage&output=embed"
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Entrance 3 Garage, Cambridge Garage at Rice"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Hermann Park Lot A (Free Parking)</h4>
                  <iframe
                    src="https://www.google.com/maps?q=Hermann%20Park%20Parking%20Lot%20A%20Houston&output=embed"
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Hermann Park Lot A"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Memorial Hermann Medical Plaza Garage</h4>
                  <iframe
                    src="https://www.google.com/maps?q=Memorial%20Hermann%20Medical%20Plaza%20Garage%206400%20Fannin%20St%20Houston&output=embed"
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Memorial Hermann Medical Plaza Garage"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Photo Modal temporarily disabled */}

            {/* Contact Information - NEW */}
            <EventContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBasics;