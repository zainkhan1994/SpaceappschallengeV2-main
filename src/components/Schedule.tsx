import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Team from './Team';

const Schedule: React.FC = () => {
  const [activeMonth, setActiveMonth] = useState(0);

  const importantDates = [
    {
      month: "July",
      events: [
        "July 8: Theme Announced",
        "July 17: Registration Opens and 2025 Space Agency Partners Announced"
      ]
    },
    {
      month: "August", 
      events: [
        "August 21: Challenge Summaries available and Team Formation opens. Team Formation Participant Guide available."
      ]
    },
    {
      month: "September",
      events: [
        "September 16: Challenge Statements available",
        "September 23: Space Apps Connect opens. Space Apps Connect Participant Guide available."
      ]
    },
    {
      month: "October",
      events: [
        "October 3: Global Offers available. Project Submission and Judging & Awards Participant Guides available.",
        "October 4-5: NASA Space Apps Challenge event"
      ]
    },
    {
      month: "After the Hackathon",
      events: [
        "Judging occurs. Experts from NASA, Space Agency Partners, and industry leaders will evaluate the projects and select the winners. See the Judging and Awards Guide for details about the judging process and Global Awards.",
        "Global Winners are announced!"
      ]
    }
  ];

  const resourceLinks = [
    {
      title: "2025 Registration",
      url: "https://www.spaceappschallenge.org/2025/"
    },
    {
      title: "2025 Challenges",
      url: "https://www.spaceappschallenge.org/2025/challenges/"
    },
    {
      title: "Space Apps Connect Guide",
      url: "https://www.spaceappschallenge.org/resources/space-app-connect-guide/"
    },
    {
      title: "Team Formation Guide", 
      url: "https://www.spaceappschallenge.org/resources/team-formation-guide/"
    }
  ];
          return (
    <section id="schedule" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Important Dates
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Key milestones and deadlines for the 2025 NASA Space Apps Challenge
          </p>
        </div>
        
        {/* Meet Your Local Lead Section moved here */}
        <div className="my-16">
          <Team />
        </div>

        {/* Month Selector */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="bg-slate-800/50 rounded-lg p-1 border border-blue-500/20 flex gap-1">
            {importantDates.map((month, index) => (
              <button
                key={index}
                onClick={() => setActiveMonth(index)}
                className={`px-4 py-3 rounded-md font-fira-sans font-medium transition-all duration-300 whitespace-nowrap ${
                  activeMonth === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {month.month}
              </button>
            ))}
          </div>
        </div>

        {/* Active Month Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-slate-800/50 rounded-xl p-8 border border-blue-500/20">
            <h3 className="font-overpass font-bold text-2xl text-white mb-6 text-center">
              {importantDates[activeMonth].month}
            </h3>
            
            <div className="space-y-4">
              {importantDates[activeMonth].events.map((event, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/10"
                >
                  <p className="font-fira-sans text-gray-200 leading-relaxed">
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Links */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-overpass font-bold text-2xl text-white mb-8 text-center">
            Essential Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resourceLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-fira-sans font-semibold transition-colors duration-200 flex items-center justify-between group"
              >
                <span>{link.title}</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

