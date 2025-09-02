import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Schedule: React.FC = () => {
  // Removed unused activeMonth state



  const events = [
    {
      date: 'October 5-7, 2024',
      title: 'NASA Space Apps Challenge 2024',
      location: 'Global Event',
      time: '48 Hours'
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Event Schedule</h2>
          <p className="text-xl text-gray-300">Join the global hackathon</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {events.map((event, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center text-blue-400">
                  <Calendar className="w-6 h-6 mr-3" />
                  <span className="text-lg font-semibold">{event.date}</span>
                </div>
                
                <div className="flex items-center text-green-400">
                  <Clock className="w-6 h-6 mr-3" />
                  <span className="text-lg">{event.time}</span>
                </div>
                
                <div className="flex items-center text-purple-400">
                  <MapPin className="w-6 h-6 mr-3" />
                  <span className="text-lg">{event.location}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mt-4 mb-2">{event.title}</h3>
              <p className="text-gray-300">
                A global hackathon where teams create innovative solutions using NASA's open data.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;

