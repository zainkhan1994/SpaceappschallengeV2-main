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
      </div>
    </div>
  );
};

export default EventContactInfo;