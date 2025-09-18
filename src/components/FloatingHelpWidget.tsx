import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Calendar } from 'lucide-react';

const FloatingHelpWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show the widget after a few seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      {/* Collapsed state - floating icon */}
      {!isExpanded && (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsExpanded(true)}
            className="bg-gradient-to-r from-[#FFFF33] to-[#FFFF00] hover:from-[#FFFF66] hover:to-[#FFFF33] text-black p-6 md:p-8 rounded-full shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 animate-pulse"
          >
            <HelpCircle size={48} className="md:w-16 md:h-16" />
          </div>
          <div className="text-[#FFFF33] text-sm md:text-base mt-3 text-center font-medium max-w-20">
            Questions?<br/>Click here
          </div>
        </div>
      )}

      {/* Expanded state - full message */}
      {isExpanded && (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-blue-400/30 rounded-xl p-8 shadow-2xl max-w-md md:max-w-lg relative animate-in slide-in-from-left duration-300">
          {/* Close button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="pr-8">
            <h3 className="text-[#FFFF33] font-bold text-2xl md:text-3xl mb-4">
              Need Help Getting Started?
            </h3>
            
            <div className="space-y-3 text-white text-lg md:text-xl mb-5">
              <p>Feeling unsure about where to begin?</p>
              <p>Curious about forming a team or choosing a challenge?</p>
              <p>New to hackathons?</p>
            </div>

            <p className="text-blue-300 font-semibold text-xl md:text-2xl mb-4">
              Don't worry — you're not alone!
            </p>

            <p className="text-gray-300 text-lg md:text-xl mb-5">
              Schedule a time to connect with your Local Lead, <span className="text-[#FFFF33] font-semibold">Zain</span>.
            </p>

            <p className="text-gray-300 text-base md:text-lg mb-8">
              Whether you're brand new or just need a little guidance, I'm here to help you navigate your Space Apps journey and make the most of your experience.
            </p>

            {/* CTA Button */}
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3NhJFzIf_7Oc7zIWx-XDhPqiPl3R4W8NQbN3Bj21nk2AUQYBNoZbl5SsQrDcg2OaS0SG8xX7db?gv=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#FFFF33] to-[#FFFF00] text-black font-bold py-4 px-6 text-lg rounded-lg hover:from-[#FFFF66] hover:to-[#FFFF33] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Calendar size={24} className="mr-3" />
              Book Appointment
            </a>

            {/* Dismiss option */}
            <button
              onClick={() => setIsVisible(false)}
              className="w-full text-gray-400 text-sm mt-4 hover:text-gray-300 transition-colors"
            >
              Don't show this again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingHelpWidget;
