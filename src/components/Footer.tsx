import React from 'react';
import { Rocket, Mail, ExternalLink, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    event: [
      { name: 'Registration', href: '#registration' },
      { name: 'Schedule', href: '#schedule' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'NASA Space Apps Global', href: 'https://www.spaceappschallenge.org', external: true },
      { name: 'Challenge Guidelines', href: 'https://www.spaceappschallenge.org/challenges', external: true },
      { name: 'Code of Conduct', href: 'https://www.spaceappschallenge.org/code-of-conduct', external: true }
    ],
    community: [
      { name: 'Houston Tech Community', href: 'https://houstontechrodeo.com', external: true },
      { name: 'NASA Johnson Space Center', href: 'https://www.nasa.gov/johnson', external: true },
      { name: 'Rice University', href: 'https://www.rice.edu', external: true },
      { name: 'Space Center Houston', href: 'https://www.spacecenter.org', external: true }
    ]
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-overpass font-bold text-xl text-white">SPACE APPS</div>
                  <div className="text-sm text-blue-300 font-fira-sans">HOUSTON 2025</div>
                </div>
              </div>
              
              <p className="font-fira-sans text-gray-300 mb-6 leading-relaxed">
                Join Houston's premier space hackathon and be part of the world's largest hackathon 
                focused on space exploration and innovation.
              </p>

              <div className="flex items-center space-x-2 text-gray-400 mb-4">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:houston@spaceapps.local"
                  className="font-fira-sans text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  houston@spaceapps.local
                </a>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
                <div className="font-fira-sans font-semibold text-white mb-1">Event Date</div>
                <div className="font-fira-sans text-blue-400">October 4-5, 2025</div>
                <div className="font-fira-sans text-gray-400 text-sm">Houston, Texas</div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
              {/* Event Links */}
              <div>
                <h4 className="font-overpass font-bold text-lg text-white mb-4">Event</h4>
                <ul className="space-y-3">
                  {footerLinks.event.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="font-fira-sans text-gray-400 hover:text-white transition-colors duration-200 text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-overpass font-bold text-lg text-white mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="https://www.spaceappschallenge.org/resources/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      All Resources
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/resources/-faq/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Participant FAQ
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/brand/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Brand Guidelines
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/nasa-space-apps-2024/awards/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Awards
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/2025/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      2025 Hackathon
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/2025/local-events/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      2025 Local Events
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/2025/challenges/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      2025 Challenges
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/2025/find-a-team/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Find a Team
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.spaceappschallenge.org/2025/space-agency-partners/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Space Agency Partners
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/spaceappschallenge" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Facebook
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/spaceapps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Twitter
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/nasa_spaceapps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      Instagram
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/nasaspaceappschallenge" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 font-fira-sans text-blue-400 hover:underline">
                      YouTube
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="font-overpass font-bold text-lg text-white mb-4">Community</h4>
                <ul className="space-y-3">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.external) {
                            e.preventDefault();
                            scrollToSection(link.href);
                          }
                        }}
                        className="inline-flex items-center space-x-1 font-fira-sans text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <span>{link.name}</span>
                        {link.external && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="font-fira-sans text-gray-400 text-sm mb-4 md:mb-0">
              <p>© {currentYear} NASA Space Apps Challenge - Houston Local Event.</p>
              <p>Official NASA Space Apps Challenge local event.</p>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Houston</span>
            </div>
          </div>

          {/* Legal & Compliance */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="font-fira-sans text-xs text-gray-500 text-center leading-relaxed">
              <p className="mb-2">
                This is a local event page for the NASA Space Apps Challenge. 
                NASA Space Apps Challenge is an official NASA program.
              </p>
              <p>
                All NASA logos and branding are used in accordance with NASA Space Apps Challenge 
                brand guidelines and are property of NASA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;