import React from 'react';

const Footer: React.FC = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SA</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">SPACE APPS</div>
                <div className="text-blue-300 text-xs">HOUSTON 2025</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6">
              Join the world's largest hackathon focused on space exploration.
              Two days of innovation, collaboration, and discovery in the heart of Space City.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://twitter.com/spaceapps" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/spaceappschallenge" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/nasaspaceapps/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#event-info" className="text-gray-400 hover:text-white transition-colors">Event Info</a></li>
              <li><a href="#schedule" className="text-gray-400 hover:text-white transition-colors">Schedule</a></li>
              <li><a href="#why-join" className="text-gray-400 hover:text-white transition-colors">Why Join</a></li>
              <li><a href="#registration" className="text-gray-400 hover:text-white transition-colors">Registration</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://www.nasa.gov/stem/nextgenstem/index.html" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NASA STEM Resources</a></li>
              <li><a href="https://www.spaceappschallenge.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Global Space Apps Site</a></li>
              <li><a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NASA Open APIs</a></li>
              <li><a href="https://www.nasa.gov/open/data.html" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NASA Open Data</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © {currentYear} NASA Space Apps Challenge - Houston. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;