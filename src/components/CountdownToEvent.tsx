import React, { useEffect, useState } from 'react';

// Count down to the next important date
const getNextImportantDate = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Important dates for 2025
  const importantDates = [
    new Date(`${currentYear}-11-05T00:00:00Z`), // Global Nominees
    new Date(`${currentYear}-11-26T00:00:00Z`), // Global Finalists
    new Date(`${currentYear}-12-18T00:00:00Z`), // Global Winners
  ];
  
  // Find the next upcoming date
  const upcomingDates = importantDates.filter(date => date > now);
  return upcomingDates.length > 0 ? upcomingDates[0] : importantDates[importantDates.length - 1];
};

const targetDate = getNextImportantDate().getTime();

function getTimeLeft() {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const CountdownToEvent: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [targetEvent, setTargetEvent] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    
    // Set the target event name
    const targetDateObj = new Date(targetDate);
    const now = new Date();
    
    if (targetDateObj.getMonth() === 10 && targetDateObj.getDate() === 5) {
      setTargetEvent('Global Nominees Announcement');
    } else if (targetDateObj.getMonth() === 10 && targetDateObj.getDate() === 26) {
      setTargetEvent('Global Finalists + Honorable Mentions');
    } else if (targetDateObj.getMonth() === 11 && targetDateObj.getDate() === 18) {
      setTargetEvent('Global Winners Announcement');
    } else {
      setTargetEvent('Next Important Date');
    }
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      {/* Clean COUNTDOWN Title */}
      <div className="text-[#FFFF33] text-2xl md:text-3xl font-bold mb-4 bg-slate-800/30 rounded-lg py-2 px-6 inline-block border border-[#FFFF33]/30">
        COUNTDOWN
      </div>
      
      {/* Big Stacked Numbers */}
      <div className="grid grid-cols-4 gap-2 md:gap-4 mb-2">
        <div className="text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-300 animate-pulse bg-slate-800/50 rounded-lg p-2 md:p-3 border border-blue-400/30">
            {timeLeft.days}
          </div>
          <div className="text-xs md:text-sm text-[#FFFF33] mt-1 font-semibold">DAYS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-300 animate-pulse bg-slate-800/50 rounded-lg p-2 md:p-3 border border-blue-400/30">
            {timeLeft.hours}
          </div>
          <div className="text-xs md:text-sm text-[#FFFF33] mt-1 font-semibold">HOURS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-300 animate-pulse bg-slate-800/50 rounded-lg p-2 md:p-3 border border-blue-400/30">
            {timeLeft.minutes}
          </div>
          <div className="text-xs md:text-sm text-[#FFFF33] mt-1 font-semibold">MINS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#FFFF33] animate-pulse bg-slate-800/50 rounded-lg p-2 md:p-3 border border-[#FFFF33]/30">
            {timeLeft.seconds}
          </div>
          <div className="text-xs md:text-sm text-[#FFFF33] mt-1 font-semibold">SECS</div>
        </div>
      </div>
      
      {/* Event Info */}
      <div className="text-sm md:text-base text-blue-300 font-medium mb-2">
        NASA Space Apps Challenge 2025
      </div>
      
      {/* What we're counting down to */}
      <div className="text-yellow-400 text-sm md:text-base font-semibold mb-4">
        ⏰ {targetEvent}
      </div>
      
      {/* Important Dates */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 max-w-lg mx-auto">
        <div className="text-yellow-400 text-sm font-bold mb-3 flex items-center justify-center gap-2">
          📅 Important Dates
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-1 px-2 rounded bg-slate-700/30">
            <span className="text-gray-200">Global Nominees</span>
            <span className="text-blue-300 font-semibold">Nov 5</span>
          </div>
          <div className="flex justify-between items-center py-1 px-2 rounded bg-slate-700/30">
            <span className="text-gray-200">Global Finalists + Honorable Mentions</span>
            <span className="text-blue-300 font-semibold">Nov 26</span>
          </div>
          <div className="flex justify-between items-center py-1 px-2 rounded bg-slate-700/30">
            <span className="text-gray-200">Global Winners</span>
            <span className="text-yellow-400 font-semibold">Dec 18</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownToEvent;