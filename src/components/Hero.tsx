import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with space theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

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
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Event Date</div>
            <div className="font-overpass font-semibold text-white">Oct 4-5, 2025</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Location</div>
            <div className="font-overpass font-semibold text-white">Houston, TX</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Capacity</div>
            <div className="font-overpass font-semibold text-white">200 People</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-fira-sans text-sm text-gray-300 mb-1">Format</div>
            <div className="font-overpass font-semibold text-white">In-Person</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-fira-sans font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            Register Now
          </button>
          <button 
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-white border border-blue-500/30 hover:border-blue-400/50 px-8 py-4 rounded-lg font-fira-sans font-semibold text-lg transition-all duration-300"
          >
            View Schedule
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;