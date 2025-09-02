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
}

const Header: React.FC<HeaderProps> = ({ activeSection, navItems, onChallengeClick }) => {
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

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SA</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-xl">SPACE APPS</div>
              <div className="text-blue-300 text-xs">HOUSTON 2025</div>
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
                      className={`text-sm font-medium ${activeSection === 'challenges' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-sm font-medium ${activeSection === item.href.substring(1) ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
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
                    className={`block w-full text-left text-base ${activeSection === 'challenges' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block text-base ${activeSection === item.href.substring(1) ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
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