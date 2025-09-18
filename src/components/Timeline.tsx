import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, Rocket, Trophy, Users, FileText, Globe, Zap, Star } from "lucide-react";

const TIMELINE = [
  {
    label: "July",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-600/30",
    icon: <Calendar className="w-5 h-5" />,
    items: [
      { text: "July 8: Theme Announced", icon: <Zap className="w-4 h-4" /> },
      { text: "July 17: Registration Opens and 2025 Space Agency Partners Announced", link: "https://www.spaceappschallenge.org/resources/-faq/#important-dates-live", icon: <Globe className="w-4 h-4" /> },
    ],
  },
  {
    label: "August",
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    icon: <FileText className="w-5 h-5" />,
    items: [
      { text: "August 21: Challenge Summaries available", link: "https://www.spaceappschallenge.org/2025/challenges/", icon: <FileText className="w-4 h-4" /> },
      { text: "Team Formation opens", link: "https://www.spaceappschallenge.org/resources/team-formation-guide/", icon: <Users className="w-4 h-4" /> },
    ],
  },
  {
    label: "September",
    color: "from-blue-600 to-blue-800",
    bgColor: "bg-blue-700/10",
    borderColor: "border-blue-700/30",
    icon: <Rocket className="w-5 h-5" />,
    items: [
      { text: "September 16: Challenge Statements available", link: "https://www.spaceappschallenge.org/2025/challenges/", icon: <FileText className="w-4 h-4" /> },
      { text: "September 23: Space Apps Connect opens", link: "https://www.spaceappschallenge.org/resources/space-app-connect-guide/", icon: <Globe className="w-4 h-4" /> },
    ],
  },
  {
    label: "October",
    color: "from-yellow-500 to-yellow-700",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    icon: <Rocket className="w-5 h-5" />,
    items: [
      { text: "October 3: Global Offers available", icon: <Star className="w-4 h-4" /> },
      { text: "Project Submission Guide", link: "https://www.spaceappschallenge.org/resources/project-submission-guide/", icon: <FileText className="w-4 h-4" /> },
      { text: "Judging & Awards Guide", link: "https://www.spaceappschallenge.org/resources/judging-awards-guide/", icon: <Trophy className="w-4 h-4" /> },
      { text: "October 4–5: NASA Space Apps Challenge event", icon: <Rocket className="w-4 h-4" /> },
    ],
  },
  {
    label: "After the Hackathon",
    color: "from-blue-700 to-blue-900",
    bgColor: "bg-blue-800/10",
    borderColor: "border-blue-800/30",
    icon: <Trophy className="w-5 h-5" />,
    items: [
      { text: "Judging by NASA, Space Agency Partners, and industry leaders", icon: <Trophy className="w-4 h-4" /> },
      { text: "Judging & Awards Guide", link: "https://www.spaceappschallenge.org/resources/judging-awards-guide/", icon: <FileText className="w-4 h-4" /> },
      { text: "November 5: Global Nominees Announced", icon: <Star className="w-4 h-4" /> },
      { text: "November 26: Global Finalists and Honorable Mentions Announced", icon: <Trophy className="w-4 h-4" /> },
      { text: "December 18: Global Winners Announced", icon: <Trophy className="w-4 h-4" /> },
    ],
  },
];

const Timeline: React.FC = () => {
  const [open, setOpen] = useState(Array(TIMELINE.length).fill(true));

  const toggle = (idx: number) => {
    setOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  const collapseAll = () => setOpen(Array(TIMELINE.length).fill(false));
  const expandAll = () => setOpen(Array(TIMELINE.length).fill(true));

  return (
    <div className="relative">
      {/* Control Buttons */}
      <div className="flex justify-end mb-6 gap-3">
        <button 
          onClick={expandAll} 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Expand All
        </button>
        <button 
          onClick={collapseAll} 
          className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg text-sm font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Collapse All
        </button>
      </div>

      {/* Timeline Container */}
      <div className="space-y-6 relative">
        {/* Connecting Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-yellow-400 to-blue-700 opacity-30"></div>
        
        {TIMELINE.map((section, idx) => (
          <div key={section.label} className="relative">
            {/* Timeline Dot */}
            <div className={`absolute left-4 w-4 h-4 rounded-full ${open[idx] ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : `bg-gradient-to-r ${section.color}`} shadow-lg z-10 border-2 border-slate-900 transition-all duration-300`}></div>
            
            {/* Content Card */}
            <div className="ml-12">
              <button
                className={`w-full text-left rounded-xl border ${open[idx] ? 'border-yellow-400/50 bg-yellow-400/5' : `${section.borderColor} ${section.bgColor}`} backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 group overflow-hidden relative`}
                onClick={() => toggle(idx)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 ${open[idx] ? 'bg-gradient-to-r from-yellow-400/10 to-yellow-500/10' : `bg-gradient-to-r ${section.color}`} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Header Content */}
                <div className="relative px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${open[idx] ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : `bg-gradient-to-r ${section.color}`} text-white shadow-lg transition-all duration-300`}>
                      {section.icon}
                    </div>
                    <span className={`text-xl font-bold ${open[idx] ? 'text-yellow-300' : 'text-white'} group-hover:text-blue-300 transition-colors duration-300`}>
                      {section.label}
                    </span>
                  </div>
                  
                  <div className={`p-2 rounded-full ${open[idx] ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : `bg-gradient-to-r ${section.color}`} text-white transform transition-transform duration-300 ${open[idx] ? 'rotate-180' : ''}`}>
                    {open[idx] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open[idx] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`${open[idx] ? 'bg-yellow-400/5 border-yellow-400/30' : `${section.bgColor} border ${section.borderColor}`} border-t-0 rounded-b-xl backdrop-blur-sm`}>
                  <div className="px-6 py-4">
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className={`p-1.5 rounded-lg ${open[idx] ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : `bg-gradient-to-r ${section.color}`} text-white shadow-md mt-0.5 flex-shrink-0 transition-all duration-300`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            {item.link ? (
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`${open[idx] ? 'text-yellow-200 hover:text-yellow-100' : 'text-blue-300 hover:text-blue-200'} font-medium transition-colors duration-300 hover:underline`}
                              >
                                {item.text}
                              </a>
                            ) : (
                              <span className="text-gray-300 font-medium">{item.text}</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;