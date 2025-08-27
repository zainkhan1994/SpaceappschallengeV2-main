import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import {
  useRipples,
  Ripple,
  centerOf,
  Stars,
  NAVY,
  BLUE,
  CYAN,
  YELLOW,
  CARD_BG,
  CARD_BORDER
} from "./RippleEffectUtils";
import { motion, AnimatePresence } from "framer-motion";

const Hero: React.FC = () => {
  const { items, add, remove } = useRipples();

  const spawnFromEl = (el: HTMLElement) => {
    const { x, y } = centerOf(el);
    add(x, y);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: NAVY }}>
      {/* Starfield background */}
      <Stars />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Registration Open
          </div>
          <h1 className="font-overpass font-bold text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight">
            NASA SPACE APPS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
              HOUSTON 2025
            </span>
          </h1>
          <p className="font-fira-sans text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the world's largest hackathon focused on space exploration. 
            Two days of innovation, collaboration, and discovery in the heart of Space City.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
          <motion.button
            onClick={(e) => spawnFromEl(e.currentTarget)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Event Date</div>
            <div className="font-overpass font-semibold text-white">Oct 4-5, 2025</div>
          </motion.button>
          
          <motion.button
            onClick={(e) => spawnFromEl(e.currentTarget)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Location</div>
            <div className="font-overpass font-semibold text-white">Houston, TX</div>
          </motion.button>
          
          <motion.button
            onClick={(e) => spawnFromEl(e.currentTarget)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Capacity</div>
            <div className="font-overpass font-semibold text-white">200 People</div>
          </motion.button>
          
          <motion.button
            onClick={(e) => spawnFromEl(e.currentTarget)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Format</div>
            <div className="font-overpass font-semibold text-white">In-Person</div>
          </motion.button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            onClick={(e) => spawnFromEl(e.currentTarget)}
            className="relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition focus:outline-none focus-visible:ring-4 bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-blue-400/40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register Now
          </motion.button>
          <motion.button
            onClick={(e) => spawnFromEl(e.currentTarget)}
            className="relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition focus:outline-none focus-visible:ring-4 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Schedule
          </motion.button>
        </div>
        {/* About section and other content can remain below */}
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