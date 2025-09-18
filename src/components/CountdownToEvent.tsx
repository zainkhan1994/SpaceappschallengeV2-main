import React, { useEffect, useState } from 'react';

const targetDate = new Date('2025-10-04T00:00:00Z').getTime();

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
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
      <div className="text-xs md:text-sm text-blue-300 font-medium">
        NASA Space Apps Challenge 2025
      </div>
    </div>
  );
};

export default CountdownToEvent;