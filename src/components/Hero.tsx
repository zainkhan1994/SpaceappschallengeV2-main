import React from 'react';
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

const Hero: React.FC = () => {
  const { items, add, remove } = useRipples();

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
                2025 - Houston
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

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">Event Date</h3>
            <p className="text-yellow-400 font-semibold">October 4-5, 2025</p>
          </motion.div>
          
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-yellow-400 font-semibold">Houston, Texas</p>
          </motion.div>
          
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">Team Size</h3>
            <p className="text-yellow-400 font-semibold">1-6 Members</p>
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