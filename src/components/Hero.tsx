import React from 'react';
import { 
  Calendar, MapPin, Users, Award, UserPlus, Check, 
  Clock, Globe, Mail, FileSpreadsheet, Upload,
  List,
} from 'lucide-react';
import {
  useRipples,
  Ripple,
  centerOf,
  Stars,
  NAVY,
} from "./RippleEffectUtils";
import { motion, AnimatePresence } from "framer-motion";

// Color lines background component
const ColorLines: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Yellow Line */}
      <div className="absolute h-full w-[80px] md:w-[100px] bg-yellow-400/10 blur-[50px] left-[65%] transform -skew-x-12"></div>
      
      {/* Blue Line */}
      <div className="absolute h-full w-[80px] md:w-[100px] bg-blue-500/10 blur-[50px] left-[52%] transform -skew-x-12"></div>
      
      {/* Red Line */}
      <div className="absolute h-full w-[80px] md:w-[100px] bg-red-500/10 blur-[50px] left-[78%] transform -skew-x-12"></div>
      
      {/* Additional subtle lines */}
      <div className="absolute h-full w-[50px] md:w-[70px] bg-cyan-400/5 blur-[60px] left-[20%] transform skew-x-12"></div>
      <div className="absolute h-full w-[60px] md:w-[80px] bg-purple-500/5 blur-[70px] left-[35%] transform skew-x-12"></div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { items, add, remove } = useRipples();

  const spawnFromEl = (el: HTMLElement) => {
    const { x, y } = centerOf(el);
    add(x, y);
  };

  // Helper to safely render icons with fallback
  const SafeIcon = ({ 
    icon: IconComponent, 
    ...props 
  }: { 
    icon: React.ComponentType<any>,
    [key: string]: any 
  }) => {
    try {
      return <IconComponent {...props} />;
    } catch (e) {
      console.warn("Failed to render icon:", e);
      return <div className={`${props.className || ''} bg-blue-400/30 rounded-sm`}></div>;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: NAVY }}>
      {/* Starfield background */}
      <Stars />
      
      {/* Color lines background */}
      <ColorLines />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* NASA Space Apps Challenge Logo */}
        <div className="text-center mb-10">
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/Pictures/nasa-space-apps-logo.png" 
              alt="NASA Space Apps Challenge Logo" 
              className="w-full h-auto mx-auto"
            />
            <h2 className="text-white font-bold text-2xl mt-4">Houston 2025</h2>
          </motion.div>
        </div>
        
        {/* Save the Date Section */}
        <div className="mb-16 text-center">
          <motion.div
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/Pictures/Savethedate.jpeg" 
              alt="Save the Date - NASA Space Apps Challenge 2025" 
              className="w-full h-auto rounded-lg shadow-2xl relative z-10"
            />
            
            <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full border-2 border-blue-500/20 border-dashed animate-spin-slow transform -translate-x-1/2 -translate-y-1/2"></div>
          </motion.div>
        </div>
        
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Registration Open
          </div>
          
          <motion.h1 
            className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to the 2025
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
              NASA SPACE APPS
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
              CHALLENGE!
            </span>
          </motion.h1>
        </div>

        {/* Event Information Cards - Symmetrical Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Left Column - REPLACED text header with logo above */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-gray-300 mb-4">
              The Houston local event for the world's largest hackathon focused on space exploration,
              bringing together innovators, students, and space enthusiasts.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={(e) => spawnFromEl(e.currentTarget)}
                className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/10"
              >
                <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mb-1">Event Date</div>
                <div className="font-semibold text-white">Oct 4-5, 2025</div>
              </button>
              <button
                onClick={(e) => spawnFromEl(e.currentTarget)}
                className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/10"
              >
                <MapPin className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mb-1">Location</div>
                <div className="font-semibold text-white">Houston, TX</div>
              </button>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <SafeIcon icon={Clock} className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Event Duration</h3>
            </div>
            <p className="text-gray-300 mb-3">October 4-5, 2025</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                <div className="text-white">Day 1 (Sat): 9:00 AM - 11:00 PM CDT</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                <div className="text-white">Day 2 (Sun): 9:00 AM - 6:00 PM CDT</div>
              </div>
            </div>
          </motion.div>

          {/* Format & Location */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Format & Location</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-gray-300 mb-1">Format:</div>
                <div className="text-white font-medium">In-Person Event</div>
              </div>
              <div>
                <div className="text-gray-300 mb-1">Location:</div>
                <div className="text-white font-medium">Houston, Texas (Venue TBA)</div>
              </div>
              <div>
                <div className="text-gray-300 mb-1">Timezone:</div>
                <div className="text-white font-medium">CDT (Central Daylight Time)</div>
              </div>
            </div>
          </motion.div>

          {/* Capacity & Registration */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Capacity & Registration</h3>
            </div>
            <div className="mb-4">
              <div className="text-gray-300 mb-1">Event Capacity:</div>
              <div className="text-white font-medium">200 participants</div>
              <p className="text-gray-400 text-sm mt-2">
                Registration includes waitlist option when capacity is reached. Early registration recommended.
              </p>
            </div>
            <motion.a 
              href="https://www.spaceappschallenge.org/2025/local-events/houston/?tab=details" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              Register Now
            </motion.a>
          </motion.div>

          {/* Local Lead Contact */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Local Lead Contact</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-gray-300 mb-1">Primary contact for all inquiries:</div>
                <div className="text-white font-medium">Zain Khan</div>
                <a 
                  href="mailto:zain@nasaspaceappschallenge.org"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  zain@nasaspaceappschallenge.org
                </a>
              </div>
              <div>
                <div className="text-gray-300 mb-1">Inquiries or Questions:</div>
                <a 
                  href="mailto:houston@nasaspaceappschallenge.org"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  houston@nasaspaceappschallenge.org
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Facts */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <List className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Quick Facts</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-gray-300">48-hour hackathon format</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-gray-300">Teams of 2-6 participants</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-gray-300">NASA challenge themes</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-gray-300">Meals and snacks provided</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-gray-300">Prizes and recognition</span>
              </li>
            </ul>
            <p className="text-yellow-400 text-sm mt-3">More details coming soon!</p>
          </motion.div>
        </div>

        {/* How to Participate Section - Heading */}
        <div className="text-center mb-8 mt-16">
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">How to Participate</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Follow these steps to join the NASA Space Apps Challenge and make your mark in space exploration.</p>
        </div>

        {/* Participation Steps - Symmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Step 01 */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-block px-3 py-1 rounded-md bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              Step 01
            </div>
            <h3 className="text-xl font-bold text-white mb-2">CREATE ACCOUNT</h3>
            <p className="text-yellow-400 text-sm mb-4">July 17, 2025</p>
            <p className="text-gray-300 mb-6">The first step in your hackathon journey is to create a NASA Space Apps account or log in to your existing account.</p>
            <motion.a
              href="https://www.spaceappschallenge.org/account/register/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-600/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <UserPlus size={16} />
              <span>Create Account</span>
            </motion.a>
          </motion.div>
          
          {/* Step 02 */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 rounded-md bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              Step 02
            </div>
            <h3 className="text-xl font-bold text-white mb-2">REGISTER FOR THE HACKATHON</h3>
            <p className="text-yellow-400 text-sm mb-4">July 17, 2025</p>
            <p className="text-gray-300 mb-6">To participate and be eligible for Global Judging, you must first register for the 2025 NASA Space Apps Challenge.</p>
            <motion.a
              href="https://www.spaceappschallenge.org/2025/local-events/houston/?tab=details"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-600/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <Check size={16} />
              <span>Register</span>
            </motion.a>
          </motion.div>
          
          {/* Step 03 */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="inline-block px-3 py-1 rounded-md bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              Step 03
            </div>
            <h3 className="text-xl font-bold text-white mb-2">CHOOSE A LOCAL EVENT</h3>
            <p className="text-yellow-400 text-sm mb-4">July 17, 2025</p>
            <p className="text-gray-300 mb-6">Connect with the NASA Space Apps community by choosing an in-person or virtual Local Event near you.</p>
            <motion.a
              href="https://www.spaceappschallenge.org/2025/locations/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-600/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <MapPin size={16} />
              <span>Choose a Local Event</span>
            </motion.a>
          </motion.div>
          
          {/* Step 04 */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-block px-3 py-1 rounded-md bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              Step 04
            </div>
            <h3 className="text-xl font-bold text-white mb-2">JOIN OR FORM A TEAM</h3>
            <p className="text-yellow-400 text-sm mb-4">August 21, 2025</p>
            <p className="text-gray-300 mb-6">Collaborate with participants by forming or joining a team according to your chosen challenge. Teams should have no more than six participants.</p>
            <motion.a
              href="https://www.spaceappschallenge.org/2025/teams/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-600/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => spawnFromEl(e.currentTarget)}
            >
              <SafeIcon icon={Users} size={16} />
              <span>Browse Teams</span>
            </motion.a>
          </motion.div>
          
          {/* Step 05 */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-md bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              Step 05
            </div>
            <h3 className="text-xl font-bold text-white mb-2">SUBMIT A PROJECT</h3>
            <p className="text-yellow-400 text-sm mb-4">October 5, 2025</p>
            <p className="text-gray-300 mb-6">All project submissions are due by 11:59 p.m. on October 5. Submit your project to receive a participant certificate and to be eligible for Global Judging.</p>
            <motion.div
              className="flex items-center justify-center gap-2 bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg cursor-default"
            >
              <Upload size={16} />
              <span>Coming Soon</span>
            </motion.div>
          </motion.div>
          
          {/* Step 06 */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-md bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              Step 06
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Complete the Participant Survey</h3>
            <p className="text-yellow-400 text-sm mb-4">October 24, 2025</p>
            <p className="text-gray-300 mb-6">Share your feedback about your hackathon journey to help improve future events. All participants are encouraged to complete the survey.</p>
            <motion.div
              className="flex items-center justify-center gap-2 bg-blue-600/30 text-blue-300 px-4 py-2 rounded-lg cursor-default"
            >
              <FileSpreadsheet size={16} />
              <span>Coming Soon</span>
            </motion.div>
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