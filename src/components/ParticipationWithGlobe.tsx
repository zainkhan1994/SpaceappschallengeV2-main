import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Check, Upload, FileSpreadsheet } from 'lucide-react';

interface ParticipationWithGlobeProps {
  spawnFromEl: (el: HTMLElement) => void;
}

const ParticipationWithGlobe: React.FC<ParticipationWithGlobeProps> = ({ spawnFromEl }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* NASA Globe Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23000'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23fff' font-size='24'%3ELoading Globe...%3C/text%3E%3C/svg%3E"
        >
          <source src="/videos/nasa_globe_animation.webm" type="video/webm" />
          <source src="/videos/Earth.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* How to Participate Section - Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-6 py-3">
                <span className="text-blue-300 font-medium">🌍 Global Participation</span>
              </div>
            </div>
            
            <h2 className="font-bold text-4xl sm:text-5xl text-white mb-6">
              How to Participate
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Join thousands of innovators worldwide as we tackle real-world challenges using NASA's open data. 
              Follow these steps to make your mark in space exploration.
            </p>
          </motion.div>
        </div>

        {/* Participation Steps - Enhanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 01 */}
          <motion.div 
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 shadow-2xl"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 rounded-lg bg-blue-600/30 text-blue-300 text-sm font-bold mb-6">
              Step 01
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">CREATE ACCOUNT</h3>
            <p className="text-yellow-400 text-sm mb-4 font-medium">July 17, 2025</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The first step in your hackathon journey is to create a NASA Space Apps account or log in to your existing account.
            </p>
            <motion.a
              href="https://www.spaceappschallenge.org/account/register/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/40 text-blue-300 px-6 py-3 rounded-lg hover:bg-blue-600/60 transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <UserPlus size={18} />
              <span>Create Account</span>
            </motion.a>
          </motion.div>
          
          {/* Step 02 */}
          <motion.div 
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 shadow-2xl"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 rounded-lg bg-blue-600/30 text-blue-300 text-sm font-bold mb-6">
              Step 02
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">REGISTER FOR THE HACKATHON</h3>
            <p className="text-yellow-400 text-sm mb-4 font-medium">July 17, 2025</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              To participate and be eligible for Global Judging, you must first register for the 2025 NASA Space Apps Challenge.
            </p>
            <motion.a
              href="https://www.spaceappschallenge.org/2025/local-events/houston/?tab=details"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/40 text-blue-300 px-6 py-3 rounded-lg hover:bg-blue-600/60 transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <Check size={18} />
              <span>Register</span>
            </motion.a>
          </motion.div>
          
          {/* Step 03 */}
          <motion.div 
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 shadow-2xl"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 rounded-lg bg-blue-600/30 text-blue-300 text-sm font-bold mb-6">
              Step 03
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">SUBMIT YOUR PROJECT</h3>
            <p className="text-yellow-400 text-sm mb-4 font-medium">October 4-5, 2025</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Build your solution during the hackathon weekend and submit your project for judging and potential global recognition.
            </p>
            <motion.a
              href="#registration"
              className="flex items-center justify-center gap-2 bg-blue-600/40 text-blue-300 px-6 py-3 rounded-lg hover:bg-blue-600/60 transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <Upload size={18} />
              <span>Submit Project</span>
            </motion.a>
          </motion.div>
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Ready to Make Your Mark?</h3>
            <p className="text-gray-300 mb-6">
              Join the global community of innovators using NASA's open data to solve real-world challenges. 
              Your solution could help advance space exploration and benefit life on Earth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.spaceappschallenge.org/2025/challenges/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileSpreadsheet size={18} />
                <span>View Challenges</span>
              </motion.a>
              
              <motion.a
                href="https://www.spaceappschallenge.org/2025/local-events/houston/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🌍 Houston Event</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 opacity-60"></div>
    </section>
  );
};

export default ParticipationWithGlobe;
