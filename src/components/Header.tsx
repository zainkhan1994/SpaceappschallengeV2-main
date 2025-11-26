import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

interface HeaderProps {
  activeSection: string;
  navItems: NavItem[];
  onChallengeClick: () => void;
  onGlobeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, navItems, onChallengeClick, onGlobeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly scroll to the section when clicking nav items
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an internal anchor link
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      setIsMenuOpen(false);
    }
    
    // External links will work as normal
  };

  // Special handler for Challenges link
  const handleChallengesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onChallengeClick();
    setIsMenuOpen(false);
  };

  // Special handler for Globe Explorer link
  const handleGlobeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGlobeClick) {
      onGlobeClick();
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex flex-col items-center space-y-2" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="flex items-center space-x-4">
              <img 
                src="/Pictures/nasa-space-apps-logo.png" 
                alt="NASA Space Apps Challenge Logo" 
                className="h-16 w-auto"
              />
              <div className="hidden sm:block">
                <div className="flex flex-col">
                  <div className="text-blue-300 text-xs">HOUSTON 2025</div>
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.name === 'Challenges' ? (
                    <button
                      onClick={handleChallengesClick}
                      className={`text-sm font-medium transition-colors duration-300 ${activeSection === 'challenges' ? 'text-[#FFFF33]' : 'text-gray-300 hover:text-[#FFFF33]'}`}
                    >
                      {item.name}
                    </button>
                  ) : item.name === 'Globe Explorer' ? (
                    <button
                      onClick={handleGlobeClick}
                      className={`text-sm font-medium transition-colors duration-300 ${activeSection === 'globe' ? 'text-[#FFFF33]' : 'text-gray-300 hover:text-[#FFFF33]'}`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.href.substring(1) ? 'text-[#FFFF33]' : 'text-gray-300 hover:text-[#FFFF33]'}`}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700">
          <ul className="py-4">
            {navItems.map((item) => (
              <li key={item.name} className="px-6 py-2">
                {item.name === 'Challenges' ? (
                  <button
                    onClick={handleChallengesClick}
                    className={`block w-full text-left text-base transition-colors duration-300 ${activeSection === 'challenges' ? 'text-[#FFFF33]' : 'text-gray-300 hover:text-[#FFFF33]'}`}
                  >
                    {item.name}
                  </button>
                ) : item.name === 'Globe Explorer' ? (
                  <button
                    onClick={handleGlobeClick}
                    className={`block w-full text-left text-base transition-colors duration-300 ${activeSection === 'globe' ? 'text-[#FFFF33]' : 'text-gray-300 hover:text-[#FFFF33]'}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block text-base transition-colors duration-300 ${activeSection === item.href.substring(1) ? 'text-[#FFFF33]' : 'text-gray-300 hover:text-[#FFFF33]'}`}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;