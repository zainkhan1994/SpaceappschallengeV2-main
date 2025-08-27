import React from 'react';
import { Mail } from 'lucide-react';

const Team: React.FC = () => {
  const localLead = {
    name: "Zain Khan",
    role: "Local Lead",
    bio: "I believe innovation happens when passionate people come together to tackle big problems. Space Apps gives our community the platform to think boldly and create solutions that make an impact.",
    image: "/Pictures/ZainProfilePicture.JPG",
    contact: {
      email: "zain@nasaspaceappschallenge.org"
    }
  };

  return (
    <section id="team" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Meet Your Local Lead
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            The passionate organizer making Space Apps Houston 2025 possible
          </p>
        </div>
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105 w-full max-w-md">
            <div className="flex flex-col items-center">
              <img
                src={localLead.image}
                alt={localLead.name}
                className="w-32 h-32 rounded-full object-cover border-2 border-blue-500/30 mb-4"
              />
              <h3 className="font-overpass font-bold text-2xl text-white mb-1">
                {localLead.name}
              </h3>
              <p className="font-fira-sans font-medium text-blue-400 mb-3">
                {localLead.role}
              </p>
              <p className="font-fira-sans text-gray-300 text-base leading-relaxed mb-4 text-center">
                {localLead.bio}
              </p>
              <a
                href={`mailto:${localLead.contact.email}`}
                className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                title="Email"
              >
                <Mail className="w-5 h-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;