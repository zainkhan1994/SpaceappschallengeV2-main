import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Rocket, Users, Calendar } from 'lucide-react';

const NASAHero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* NASA Globe Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23000'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23fff' font-size='24'%3ELoading Globe...%3C/text%3E%3C/svg%3E"
        >
          <source src="/videos/nasa_globe_animation.webm" type="video/webm" />
          <source src="/videos/Earth.mp4" type="video/mp4" />
          <p className="text-white text-center p-8">
            Sorry, your browser doesn't support video playback for the globe animation.
          </p>
        </video>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* NASA Badge */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3 bg-blue-500/20 border border-blue-400/30 rounded-full px-8 py-4 backdrop-blur-sm">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="text-blue-300 font-semibold text-lg">NASA International Space Apps Challenge</span>
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Learn, Launch,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400">
                Lead
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of innovators worldwide as we tackle real-world challenges using NASA's open data. 
              Together, we'll develop solutions that benefit life on Earth and advance space exploration.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">373k+</div>
                <div className="text-gray-300">Global Participants</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">185+</div>
                <div className="text-gray-300">Countries & Territories</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">2,800+</div>
                <div className="text-gray-300">Local Events</div>
              </motion.div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="#registration"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-6 h-6 mr-3" />
                Register for Houston 2025
              </motion.a>
              
              <motion.a
                href="#challenges"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-6 h-6 mr-3" />
                Explore Challenges
              </motion.a>
            </div>
            
            {/* Mission Complete Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 bg-green-500/20 border border-green-400/30 rounded-xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-2">🎉 Mission Complete!</h3>
              <p className="text-green-300">
                Thank you to everyone who joined us for the 2025 NASA Space Apps Challenge! 
                Stay tuned for the announcement of the Global Nominees on November 5.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 opacity-60"></div>
    </section>
  );
};

export default NASAHero;
