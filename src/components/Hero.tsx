import React, { useEffect, useState } from 'react';
import { 
  FileSpreadsheet, UserPlus
} from 'lucide-react';
import {
  useRipples,
  Ripple,
  centerOf,
} from "./RippleEffectUtils";
import { motion, AnimatePresence } from "framer-motion";
import NASAGlobe from './NASAGlobe';

const EVENT_DATE = new Date('2026-11-14T00:00:00');

const Hero: React.FC = () => {
  const { items, add, remove } = useRipples();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = EVENT_DATE.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const spawnFromEl = (el: HTMLElement) => {
    const { x, y } = centerOf(el);
    add(x, y);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* NASA Globe Background */}
      <NASAGlobe showOverlay={false} />
      
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              NASA Space Apps Challenge
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
                2026
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join us for the world's largest global hackathon using NASA's open data to solve real-world challenges on Earth and in space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#registration"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => spawnFromEl(e.currentTarget)}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Register Now
              </motion.a>
              
              <motion.a
                href="#challenges"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => spawnFromEl(e.currentTarget)}
              >
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                View Challenges
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Countdown */}
        <div className="mb-16">
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center max-w-3xl mx-auto"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">Countdown to NASA Space Apps 2026</h3>
            <p className="text-yellow-400 font-semibold mb-4">November 14–15, 2026 • Venue: TBD</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 rounded-lg p-3">
                <p className="text-2xl font-bold text-white">{timeLeft.days}</p>
                <p className="text-xs uppercase tracking-wide text-gray-400">Days</p>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3">
                <p className="text-2xl font-bold text-white">{timeLeft.hours}</p>
                <p className="text-xs uppercase tracking-wide text-gray-400">Hours</p>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3">
                <p className="text-2xl font-bold text-white">{timeLeft.minutes}</p>
                <p className="text-xs uppercase tracking-wide text-gray-400">Minutes</p>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3">
                <p className="text-2xl font-bold text-white">{timeLeft.seconds}</p>
                <p className="text-xs uppercase tracking-wide text-gray-400">Seconds</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {items.map((r) => (
          <Ripple key={r.id} x={r.x} y={r.y} onDone={() => remove(r.id)} />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default Hero;