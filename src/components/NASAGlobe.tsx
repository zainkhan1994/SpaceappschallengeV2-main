import React from 'react';
import { motion } from 'framer-motion';

interface NASAGlobeProps {
  className?: string;
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
}

const NASAGlobe: React.FC<NASAGlobeProps> = ({ 
  className = "", 
  showOverlay = true,
  overlayContent 
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Background Video Container - Exact NASA Implementation */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23000'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23fff' font-size='24'%3ELoading Globe...%3C/text%3E%3C/svg%3E"
        >
          {/* Use the actual NASA video */}
          <source src="/videos/nasa_globe_animation.webm" type="video/webm" />
          <source src="/videos/Earth.mp4" type="video/mp4" />
          <p className="text-white text-center p-8">
            Sorry, your browser doesn't support video playback for the globe animation.
          </p>
        </video>
      </div>
      
      {/* Optional Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80">
          {overlayContent || (
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  NASA Space Apps
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
                    Challenge 2025
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join the global hackathon using NASA's open data to solve real-world challenges on Earth and in space.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#registration"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🚀 Register Now
                  </motion.a>
                  
                  <motion.a
                    href="#challenges"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🌍 Explore Challenges
                  </motion.a>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 opacity-60"></div>
    </div>
  );
};

export default NASAGlobe;
