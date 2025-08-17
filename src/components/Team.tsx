import React from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Local Lead & Event Coordinator",
      bio: "Space systems engineer at NASA Johnson Space Center with 8+ years of experience in mission operations. Passionate about bringing space innovation to the Houston community.",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
      contact: {
        email: "sarah.chen@spaceapps.local",
        linkedin: "sarahchen-space",
        twitter: "sarahchenspace"
      }
    },
    {
      name: "Marcus Rodriguez",
      role: "Technical Coordinator",
      bio: "Full-stack developer and startup founder with expertise in space data systems. Previously worked on satellite communication platforms and loves hackathons.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      contact: {
        email: "marcus.r@spaceapps.local",
        linkedin: "marcusrodriguez-dev",
        twitter: "marcusrdev"
      }
    },
    {
      name: "Dr. Aisha Patel",
      role: "Academic Liaison & Mentor Coordinator",
      bio: "Computer Science professor at Rice University specializing in AI/ML applications for space exploration. Coordinates university partnerships and mentor programs.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      contact: {
        email: "aisha.patel@spaceapps.local",
        linkedin: "dr-aisha-patel",
        twitter: "drapatel_ai"
      }
    },
    {
      name: "Jordan Kim",
      role: "Community Outreach & Logistics",
      bio: "Event management professional with background in aerospace marketing. Handles partnerships, venue coordination, and community engagement for Space Apps Houston.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      contact: {
        email: "jordan.kim@spaceapps.local",
        linkedin: "jordankim-events",
        twitter: "jordankevents"
      }
    }
  ];

  return (
    <section id="team" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Meet Our Team
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            The passionate organizers making Space Apps Houston 2025 possible
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500/30"
                  />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-overpass font-bold text-xl text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="font-fira-sans font-medium text-blue-400 mb-3">
                    {member.role}
                  </p>
                  <p className="font-fira-sans text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center sm:justify-start space-x-3">
                    <a
                      href={`mailto:${member.contact.email}`}
                      className="w-8 h-8 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                      title="Email"
                    >
                      <Mail className="w-4 h-4 text-gray-300 hover:text-white" />
                    </a>
                    <a
                      href={`https://linkedin.com/in/${member.contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-gray-300 hover:text-white" />
                    </a>
                    <a
                      href={`https://twitter.com/${member.contact.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4 text-gray-300 hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Team Info */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-400/20 text-center">
          <h3 className="font-overpass font-bold text-2xl text-white mb-6">
            Volunteer Opportunities
          </h3>
          <p className="font-fira-sans text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            Interested in joining our organizing team or volunteering at the event? We're always looking for 
            passionate individuals to help make Space Apps Houston even better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:houston@spaceapps.local?subject=Volunteer Opportunity"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-fira-sans font-medium transition-colors duration-200"
            >
              Volunteer with Us
            </a>
            <a
              href="mailto:houston@spaceapps.local?subject=Sponsorship Inquiry"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-blue-500/30 hover:border-blue-400/50 px-6 py-3 rounded-lg font-fira-sans font-medium transition-all duration-200"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;