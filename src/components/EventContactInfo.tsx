import React from 'react';
import { Mail } from 'lucide-react';

const EventContactInfo: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Mail className="mr-2 text-blue-400" size={20} />
        Local Lead Contact
      </h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-300">Primary contact for all inquiries:</p>
          <p className="text-white mt-1">Zain Khan</p>
          <a 
            href="mailto:zain@nasaspaceappschallenge.org" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            zain@nasaspaceappschallenge.org
          </a>
        </div>
        
        <div className="pt-2 border-t border-slate-700">
          <p className="text-gray-300 mb-2">Inquiries or Questions:</p>
          <a 
            href="mailto:houston@nasaspaceappschallenge.org" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            houston@nasaspaceappschallenge.org
          </a>
        </div>
        
        <div className="pt-2">
          <p className="text-gray-300 mb-2">Follow us:</p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://www.instagram.com/nasaspaceapps_houston" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-blue-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
            <a 
              href="https://www.facebook.com/Space-Apps-Houston" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-blue-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </a>
            <a 
              href="https://discord.gg/join-Discord" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-blue-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <path d="M7.5 7.2c3.6-1 5.5-1 9 0"></path>
                <path d="M7.5 16.8c3.6 1 5.5 1 9 0"></path>
                <path d="M15.5 17l1 3c1.7-1.4 2.7-3 3.1-4.8.4-1.8.4-3.8-.1-5.7-.5-1.8-1.4-3.5-2.8-4.9l-1.2 3"></path>
                <path d="M8.5 17l-1 3c-1.7-1.4-2.7-3-3.1-4.8-.4-1.8-.4-3.8.1-5.7.5-1.8 1.4-3.5 2.8-4.9l1.2 3"></path>
              </svg>
              Discord
            </a>
          </div>
        </div>
        
        {/* Calendar Appointment Scheduling */}
        <div className="pt-4 border-t border-slate-700">
          <p className="text-gray-300 mb-3">Schedule a Meeting:</p>
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg p-4 border border-[#FFFF33]/30">
            <div className="text-center">
              <h4 className="text-[#FFFF33] font-semibold mb-2 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Book an Appointment
              </h4>
              <p className="text-gray-300 text-sm mb-4">Schedule a one-on-one meeting with our Local Lead</p>
              
              <a 
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3NhJFzIf_7Oc7zIWx-XDhPqiPl3R4W8NQbN3Bj21nk2AUQYBNoZbl5SsQrDcg2OaS0SG8xX7db?gv=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFFF33] to-[#FFFF00] text-black font-semibold rounded-lg hover:from-[#FFFF66] hover:to-[#FFFF33] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#FFFF33]/25"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Schedule Now
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* Reassuring Message */}
              <div className="mt-4 p-4 bg-blue-900/30 border border-blue-400/30 rounded-lg">
                <div className="text-center">
                  <h5 className="text-blue-300 font-semibold text-2xl md:text-3xl mb-3">
                    Are you confused? Are you worried? Are you unsure how to get started?
                  </h5>
                  <p className="text-white text-xl md:text-2xl mb-4">
                    <strong>Don't worry!</strong> Make an appointment with your Local Lead <span className="text-[#FFFF33] font-semibold">Zain</span>.
                  </p>
                  <p className="text-blue-200 text-lg md:text-xl">
                    Whether you're new to hackathons, need help forming a team, or just want guidance getting started - I'm here to help you succeed!
                  </p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mt-3">
                Perfect for questions about registration, team formation, or event details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventContactInfo;