import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'event-basics', label: 'Event Info' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'why-join', label: 'Why Join' },
    { id: 'registration', label: 'Register' },
    { id: 'team', label: 'Team' },
    { id: 'judges', label: 'Judges' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img
              src="/Pictures/Award-LocalImpact.jpeg"
              alt="Award Local Impact"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-white">
              <div className="font-overpass font-bold text-lg">SPACE APPS</div>
              <div className="text-xs text-blue-300 font-fira-sans">HOUSTON 2025</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2 border border-blue-500/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-yellow-400 bg-slate-700'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;