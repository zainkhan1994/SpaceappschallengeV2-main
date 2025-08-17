import React from 'react';
import { Users, Lightbulb, Trophy, Network, Rocket, Star } from 'lucide-react';

const WhyJoin: React.FC = () => {
  const benefits = [
    {
      icon: Lightbulb,
      title: "Innovation & Learning",
      description: "Work on real NASA challenges and learn cutting-edge space technologies from industry experts and mentors.",
      color: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30"
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with like-minded innovators, space professionals, students, and potential collaborators from Houston's thriving tech scene.",
      color: "from-green-500/20 to-green-600/20 border-green-500/30"
    },
    {
      icon: Trophy,
      title: "Prizes & Recognition",
      description: "Compete for local awards and the chance to represent Houston in the global NASA Space Apps Challenge.",
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30"
    },
    {
      icon: Rocket,
      title: "Skill Development",
      description: "Enhance your technical skills, project management abilities, and gain hands-on experience with space-related challenges.",
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30"
    },
    {
      icon: Network,
      title: "Community Impact",
      description: "Contribute to solutions that can help NASA's missions and potentially benefit humanity's understanding of space.",
      color: "from-teal-500/20 to-teal-600/20 border-teal-500/30"
    },
    {
      icon: Star,
      title: "Local Relevance",
      description: "Be part of Houston's space heritage as Space City, connecting with NASA Johnson Space Center and local aerospace community.",
      color: "from-red-500/20 to-red-600/20 border-red-500/30"
    }
  ];

  const communityStats = [
    { number: "200+", label: "Expected Participants" },
    { number: "40+", label: "Diverse Teams" },
    { number: "48", label: "Hours of Innovation" },
    { number: "15+", label: "NASA Challenges" }
  ];

  return (
    <section id="why-join" className="py-20 bg-gradient-to-b from-slate-800/50 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Why Join Space Apps Houston?
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the incredible benefits and opportunities that await you at Houston's premier space hackathon
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${benefit.color} backdrop-blur-sm rounded-xl p-6 border hover:transform hover:scale-105 transition-all duration-300`}
              >
                <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-600/30">
                  <IconComponent className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-overpass font-bold text-xl text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="font-fira-sans text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Community Section */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-blue-500/20 mb-16">
          <h3 className="font-overpass font-bold text-3xl text-white text-center mb-8">
            Join Houston's Space Community
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-overpass font-bold text-3xl lg:text-4xl text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="font-fira-sans text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-fira-sans text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Space Apps Houston brings together a diverse community of students, professionals, entrepreneurs, 
              designers, and space enthusiasts. Whether you're a seasoned developer, a creative designer, 
              a domain expert, or just passionate about space exploration, there's a place for you in our community.
            </p>
          </div>
        </div>

        {/* Participant Diversity */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-overpass font-bold text-3xl text-white mb-6">
              Who Participates?
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-fira-sans font-semibold text-white mb-2">Students & Academics</h4>
                <p className="font-fira-sans text-gray-300 text-sm">
                  University students, researchers, and faculty from Houston's educational institutions
                </p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-fira-sans font-semibold text-white mb-2">Tech Professionals</h4>
                <p className="font-fira-sans text-gray-300 text-sm">
                  Software developers, data scientists, engineers, and IT professionals
                </p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-fira-sans font-semibold text-white mb-2">Space Industry</h4>
                <p className="font-fira-sans text-gray-300 text-sm">
                  NASA employees, aerospace engineers, and space industry professionals
                </p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-fira-sans font-semibold text-white mb-2">Creatives & Entrepreneurs</h4>
                <p className="font-fira-sans text-gray-300 text-sm">
                  Designers, artists, business professionals, and startup founders
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-400/20">
            <h4 className="font-overpass font-bold text-2xl text-white mb-6">
              What You'll Take Away
            </h4>
            <ul className="space-y-3 font-fira-sans text-gray-300">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>New technical skills and space domain knowledge</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Professional network within Houston's space ecosystem</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Portfolio project demonstrating your capabilities</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Recognition and potential prizes for outstanding work</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Experience working on real-world space challenges</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Memories and friendships that last beyond the weekend</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;