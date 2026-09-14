import React from 'react';
import { Award, Star } from 'lucide-react';

const Judges: React.FC = () => {
  const judges = [
    {
      name: "Dr. Patricia Williams",
      role: "NASA Mission Scientist",
      affiliation: "Johnson Space Center",
      expertise: "Planetary Science & Astrobiology",
      bio: "Leading scientist on Mars exploration missions with 15+ years of experience in astrobiology research and mission planning.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Alex Thompson",
      role: "Senior Software Architect",
      affiliation: "Boeing Defense & Space",
      expertise: "Spacecraft Systems & AI",
      bio: "Expert in autonomous spacecraft systems and AI applications for space exploration. Previously worked on Artemis program software systems.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Maria Santos",
      role: "Space Entrepreneur",
      affiliation: "Stellar Innovations (Founder/CEO)",
      expertise: "Commercial Space & Innovation",
      bio: "Serial entrepreneur in the space industry, founder of multiple space-tech startups. Expert in commercializing space technologies.",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Prof. David Chen",
      role: "Research Director",
      affiliation: "University of Houston",
      expertise: "Data Science & Space Analytics",
      bio: "Leading researcher in space data analytics and machine learning applications for astronomical data processing and analysis.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const awards = [
    {
      title: "Best Overall Solution",
      description: "Most innovative and complete solution addressing NASA challenge requirements",
      prize: "Houston Space Center Tour + $1,000 Team Prize",
      icon: "🏆"
    },
    {
      title: "People's Choice Award",
      description: "Most popular solution as voted by event participants",
      prize: "NASA Swag Package + Recognition",
      icon: "👥"
    },
    {
      title: "Technical Excellence",
      description: "Best technical implementation and code quality",
      prize: "Tech Equipment Package + Mentorship",
      icon: "💻"
    },
    {
      title: "Most Creative Approach",
      description: "Most innovative and creative solution to the challenge",
      prize: "$500 Team Prize + Innovation Award",
      icon: "🎨"
    },
    {
      title: "Best Student Team",
      description: "Outstanding solution from university student participants",
      prize: "Educational Resources + Internship Opportunities",
      icon: "🎓"
    },
    {
      title: "Impact Award",
      description: "Solution with the highest potential for real-world impact",
      prize: "Accelerator Program Access + Funding Opportunity",
      icon: "🌍"
    }
  ];

  const judgingCriteria = [
    {
      category: "Innovation & Creativity",
      weight: "25%",
      description: "Originality of the approach and creative problem-solving"
    },
    {
      category: "Technical Implementation",
      weight: "25%",
      description: "Quality of code, architecture, and technical execution"
    },
    {
      category: "Challenge Alignment",
      weight: "20%",
      description: "How well the solution addresses the NASA challenge requirements"
    },
    {
      category: "Impact Potential",
      weight: "15%",
      description: "Potential for real-world application and scalability"
    },
    {
      category: "Presentation Quality",
      weight: "15%",
      description: "Clarity of presentation and demonstration of the solution"
    }
  ];

  return (
    <section id="judges" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Judges & Awards
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Meet our distinguished panel of judges and discover the exciting awards awaiting outstanding teams
          </p>
        </div>

        {/* Judges Section */}
        <div className="mb-20">
          <h3 className="font-overpass font-bold text-3xl text-white text-center mb-12">
            Our Expert Judges
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {judges.map((judge, index) => (
              <div
                key={index}
                className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <h4 className="font-overpass font-bold text-xl text-white mb-1">
                      {judge.name}
                    </h4>
                    <p className="font-fira-sans font-medium text-blue-400 mb-1">
                      {judge.role}
                    </p>
                    <p className="font-fira-sans text-sm text-gray-400 mb-2">
                      {judge.affiliation}
                    </p>
                    <div className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {judge.expertise}
                    </div>
                    <p className="font-fira-sans text-gray-300 text-sm leading-relaxed">
                      {judge.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Judging Criteria */}
          <div className="bg-slate-900/50 rounded-xl p-8 border border-blue-500/20">
            <h4 className="font-overpass font-bold text-2xl text-white text-center mb-8">
              Judging Criteria
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {judgingCriteria.map((criteria, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-fira-sans font-semibold text-white">
                      {criteria.category}
                    </h5>
                    <span className="text-blue-400 font-medium text-sm">
                      {criteria.weight}
                    </span>
                  </div>
                  <p className="font-fira-sans text-gray-300 text-sm">
                    {criteria.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div>
          <h3 className="font-overpass font-bold text-3xl text-white text-center mb-12">
            Awards & Recognition
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{award.icon}</div>
                  <h4 className="font-overpass font-bold text-xl text-white mb-2">
                    {award.title}
                  </h4>
                </div>
                <p className="font-fira-sans text-gray-300 text-sm mb-4 text-center">
                  {award.description}
                </p>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-yellow-500/20">
                  <p className="font-fira-sans font-medium text-yellow-400 text-sm text-center">
                    {award.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-400/20 text-center">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h4 className="font-overpass font-bold text-2xl text-white mb-4">
              Global Recognition Opportunity
            </h4>
            <p className="font-fira-sans text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Winners of local awards will be eligible for global NASA Space Apps Challenge recognition 
              and may be featured in NASA's international showcase of outstanding solutions.
            </p>
            <div className="inline-flex items-center space-x-2 text-blue-400 font-medium">
              <Star className="w-5 h-5" />
              <span>All participants receive official NASA Space Apps certificates</span>
              <Star className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Judges;