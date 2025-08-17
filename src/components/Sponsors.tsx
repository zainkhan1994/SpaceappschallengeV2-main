import React from 'react';
import { ExternalLink, Heart, Handshake } from 'lucide-react';

const Sponsors: React.FC = () => {
  const sponsors = {
    title: [
      {
        name: "NASA Johnson Space Center",
        logo: "🚀", // Using emoji as placeholder for NASA JSC
        description: "Primary partner providing expertise, mentors, and facility support for Space Apps Houston.",
        website: "https://www.nasa.gov/johnson",
        type: "Government Partner"
      }
    ],
    presenting: [
      {
        name: "Rice University",
        logo: "🎓",
        description: "Academic partner providing venue, student participants, and faculty mentors.",
        website: "https://www.rice.edu",
        type: "Academic Partner"
      },
      {
        name: "Houston Tech Rodeo",
        logo: "🤠",
        description: "Supporting Houston's tech ecosystem and providing networking opportunities.",
        website: "https://houstontechrodeo.com",
        type: "Community Partner"
      }
    ],
    supporting: [
      {
        name: "Texas Aerospace Commission",
        logo: "✈️",
        description: "Supporting Texas aerospace innovation and industry connections.",
        website: "https://gov.texas.gov/business/aerospace",
        type: "Government Partner"
      },
      {
        name: "Greater Houston Partnership",
        logo: "🏢",
        description: "Promoting Houston's economic development and innovation ecosystem.",
        website: "https://www.houston.org",
        type: "Economic Development"
      },
      {
        name: "Space Center Houston",
        logo: "🌎",
        description: "Official visitor center providing educational resources and venue support.",
        website: "https://www.spacecenter.org",
        type: "Educational Partner"
      },
      {
        name: "Houston Innovation District",
        logo: "💡",
        description: "Supporting startup ecosystem and innovation in Houston.",
        website: "https://www.houstoninnovation.org",
        type: "Innovation Hub"
      }
    ],
    community: [
      {
        name: "IEEE Houston Section",
        logo: "⚡",
        description: "Professional engineering society providing technical mentorship.",
        website: "https://ieee-hou.org",
        type: "Professional Organization"
      },
      {
        name: "Women in Aerospace - Houston",
        logo: "👩‍🚀",
        description: "Promoting diversity and inclusion in aerospace industry.",
        website: "https://www.womeninspacehoustion.org",
        type: "Professional Organization"
      },
      {
        name: "Houston Startup Week",
        logo: "🚀",
        description: "Supporting entrepreneurship and startup community engagement.",
        website: "https://houstonstartupweek.com",
        type: "Startup Community"
      },
      {
        name: "Code for Houston",
        logo: "💻",
        description: "Civic tech organization promoting technology for social good.",
        website: "https://codeforhouston.org",
        type: "Civic Tech"
      }
    ]
  };

  const renderSponsorCard = (sponsor: any, size: 'large' | 'medium' | 'small' = 'medium') => {
    const sizeClasses = {
      large: 'lg:col-span-2 p-8',
      medium: 'p-6',
      small: 'p-4'
    };

    return (
      <div
        key={sponsor.name}
        className={`bg-slate-900/50 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105 ${sizeClasses[size]}`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">{sponsor.logo}</div>
          <h4 className="font-overpass font-bold text-xl text-white mb-2">
            {sponsor.name}
          </h4>
          <div className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium mb-3">
            {sponsor.type}
          </div>
          <p className="font-fira-sans text-gray-300 text-sm mb-4 leading-relaxed">
            {sponsor.description}
          </p>
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section id="sponsors" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Our Partners & Sponsors
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Thank you to our amazing partners and collaborators who make Space Apps Houston possible
          </p>
        </div>

        {/* Title Sponsor */}
        <div className="mb-16">
          <h3 className="font-overpass font-bold text-2xl text-white text-center mb-8">
            Lead Partner
          </h3>
          <div className="max-w-2xl mx-auto">
            {sponsors.title.map(sponsor => renderSponsorCard(sponsor, 'large'))}
          </div>
        </div>

        {/* Presenting Sponsors */}
        <div className="mb-16">
          <h3 className="font-overpass font-bold text-2xl text-white text-center mb-8">
            Presenting Partners
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {sponsors.presenting.map(sponsor => renderSponsorCard(sponsor, 'medium'))}
          </div>
        </div>

        {/* Supporting Sponsors */}
        <div className="mb-16">
          <h3 className="font-overpass font-bold text-2xl text-white text-center mb-8">
            Supporting Partners
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.supporting.map(sponsor => renderSponsorCard(sponsor, 'small'))}
          </div>
        </div>

        {/* Community Partners */}
        <div className="mb-16">
          <h3 className="font-overpass font-bold text-2xl text-white text-center mb-8">
            Community Partners
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.community.map(sponsor => renderSponsorCard(sponsor, 'small'))}
          </div>
        </div>

        {/* Become a Sponsor */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-400/20 text-center">
          <Handshake className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h3 className="font-overpass font-bold text-3xl text-white mb-4">
            Become a Sponsor
          </h3>
          <p className="font-fira-sans text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Join us in supporting innovation and space exploration in Houston. Sponsor packages available 
            for organizations of all sizes looking to connect with Houston's space and tech communities.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <h4 className="font-fira-sans font-semibold text-white mb-2">Community Impact</h4>
              <p className="font-fira-sans text-gray-300 text-sm">Support STEM education and innovation in Houston</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
              <ExternalLink className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-fira-sans font-semibold text-white mb-2">Brand Visibility</h4>
              <p className="font-fira-sans text-gray-300 text-sm">Reach engaged tech and space professionals</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
              <Handshake className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-fira-sans font-semibold text-white mb-2">Network Access</h4>
              <p className="font-fira-sans text-gray-300 text-sm">Connect with top talent and innovators</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:houston@spaceapps.local?subject=Sponsorship Inquiry"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-fira-sans font-semibold transition-colors duration-200"
            >
              Sponsorship Inquiries
            </a>
            <a
              href="mailto:houston@spaceapps.local?subject=Partnership Opportunity"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-blue-500/30 hover:border-blue-400/50 px-8 py-3 rounded-lg font-fira-sans font-semibold transition-all duration-200"
            >
              Partnership Opportunities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;