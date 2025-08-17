import React, { useState } from 'react';
import { Clock, Calendar, MapPin, Coffee, Trophy, Lightbulb } from 'lucide-react';

const Schedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  const schedule = [
    {
      day: "Saturday, October 4",
      date: "Day 1",
      events: [
        {
          time: "8:00 AM",
          title: "Registration & Breakfast",
          description: "Check-in, welcome breakfast, and networking",
          icon: Coffee,
          type: "social"
        },
        {
          time: "9:00 AM",
          title: "Opening Ceremony",
          description: "Welcome remarks, NASA challenge overview, and keynote speaker",
          icon: Calendar,
          type: "ceremony"
        },
        {
          time: "10:30 AM",
          title: "Challenge Deep Dive",
          description: "Detailed presentation of challenge themes and requirements",
          icon: Lightbulb,
          type: "info"
        },
        {
          time: "11:30 AM",
          title: "Team Formation",
          description: "Networking session and team building activities",
          icon: MapPin,
          type: "social"
        },
        {
          time: "12:30 PM",
          title: "Lunch & Mentor Introductions",
          description: "Catered lunch and meet your mentors",
          icon: Coffee,
          type: "social"
        },
        {
          time: "2:00 PM",
          title: "Hacking Begins!",
          description: "Official start of the 24-hour development period",
          icon: Clock,
          type: "main"
        },
        {
          time: "6:00 PM",
          title: "Dinner",
          description: "Catered dinner for all participants",
          icon: Coffee,
          type: "social"
        },
        {
          time: "8:00 PM",
          title: "Evening Activities",
          description: "Optional workshops and networking sessions",
          icon: Lightbulb,
          type: "info"
        },
        {
          time: "11:00 PM",
          title: "Venue Closes",
          description: "Day 1 concludes - rest up for tomorrow!",
          icon: MapPin,
          type: "info"
        }
      ]
    },
    {
      day: "Sunday, October 5",
      date: "Day 2",
      events: [
        {
          time: "8:00 AM",
          title: "Venue Opens & Breakfast",
          description: "Doors open, continental breakfast available",
          icon: Coffee,
          type: "social"
        },
        {
          time: "9:00 AM",
          title: "Final Sprint",
          description: "Last hours of development and testing",
          icon: Clock,
          type: "main"
        },
        {
          time: "12:00 PM",
          title: "Lunch Break",
          description: "Quick lunch while continuing development",
          icon: Coffee,
          type: "social"
        },
        {
          time: "2:00 PM",
          title: "Submissions Due",
          description: "Final submissions must be uploaded by this time",
          icon: Trophy,
          type: "deadline"
        },
        {
          time: "2:30 PM",
          title: "Project Presentations",
          description: "Teams present their solutions to judges",
          icon: Lightbulb,
          type: "main"
        },
        {
          time: "4:30 PM",
          title: "Judging & Networking",
          description: "Judges deliberate while participants network",
          icon: MapPin,
          type: "social"
        },
        {
          time: "5:30 PM",
          title: "Closing Ceremony & Awards",
          description: "Winner announcements and prize distribution",
          icon: Trophy,
          type: "ceremony"
        },
        {
          time: "6:00 PM",
          title: "Event Concludes",
          description: "Thank you and see you next year!",
          icon: Calendar,
          type: "ceremony"
        }
      ]
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'ceremony': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'main': return 'border-blue-500/30 bg-blue-500/10';
      case 'deadline': return 'border-red-500/30 bg-red-500/10';
      case 'social': return 'border-green-500/30 bg-green-500/10';
      case 'info': return 'border-purple-500/30 bg-purple-500/10';
      default: return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <section id="schedule" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Event Schedule
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Two action-packed days of innovation, collaboration, and space exploration
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 rounded-lg p-1 border border-blue-500/20">
            {schedule.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`px-6 py-3 rounded-md font-fira-sans font-medium transition-all duration-300 ${
                  activeDay === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <div className="text-sm">{day.date}</div>
                <div className="text-xs opacity-75">{day.day.split(',')[1]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Content */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h3 className="font-overpass font-bold text-2xl text-white text-center mb-2">
              {schedule[activeDay].day}
            </h3>
            <p className="font-fira-sans text-gray-400 text-center">
              All times are in CDT (Central Daylight Time)
            </p>
          </div>

          <div className="space-y-6">
            {schedule[activeDay].events.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={index}
                  className={`rounded-xl p-6 border backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 ${getEventColor(event.type)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center border border-blue-500/20">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="font-overpass font-bold text-xl text-white">
                          {event.title}
                        </h4>
                        <span className="font-fira-sans font-medium text-blue-400 bg-slate-800/50 px-3 py-1 rounded-full text-sm mt-2 sm:mt-0">
                          {event.time}
                        </span>
                      </div>
                      <p className="font-fira-sans text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 rounded-xl p-8 border border-blue-500/20 max-w-2xl mx-auto">
            <h4 className="font-overpass font-bold text-xl text-white mb-4">
              Important Notes
            </h4>
            <ul className="font-fira-sans text-gray-300 space-y-2 text-left max-w-md mx-auto">
              <li>• All meals and snacks are provided throughout the event</li>
              <li>• Mentors will be available during development hours</li>
              <li>• WiFi, power outlets, and workspaces provided</li>
              <li>• Schedule may be adjusted based on participant needs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;