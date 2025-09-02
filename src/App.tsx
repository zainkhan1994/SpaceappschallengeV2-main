import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventBasics from './components/EventBasics';
import Schedule from './components/Schedule';
import WhyJoin from './components/WhyJoin';
import Registration from './components/Registration';
import Resources from './components/Resources';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import Winners from './components/Winners';
import ChallengeExplorer from './components/ChallengeExplorer';

export type ViewMode = 'landing' | 'explorer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Event Info', href: '#event-info' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Why Join', href: '#why-join' },
    { name: 'Registration', href: '#registration' },
    { name: 'Resources', href: '#resources' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Challenges', href: '#challenges' }
    // Removed the Contact nav item
  ];

  useEffect(() => {
    // Only run scroll handler for landing page
    if (viewMode !== 'landing') return;

    const handleScroll = () => {
      const sections = [
        'home', 'event-info', 'schedule', 'why-join', 
        'registration', 'resources', 'sponsors', 'contact'
      ];
      
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleChallengeClick = () => {
    console.log('Switching to explorer mode');
    setViewMode('explorer');
  };

  const handleBackToLanding = () => {
    console.log('Switching back to landing mode');
    setViewMode('landing');
  };

  // If in explorer mode, show challenge explorer
  if (viewMode === 'explorer') {
    return <ChallengeExplorer onBackToLanding={handleBackToLanding} />;
  }

  // Original landing page - fixed container
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Header 
        activeSection={activeSection} 
        navItems={navItems} 
        onChallengeClick={handleChallengeClick} 
      />
      <main className="w-full">
        <section id="home" className="w-full">
          <Hero />
        </section>
        <Winners />
        <section id="event-info" className="w-full">
          <EventBasics />
        </section>
        <section id="schedule" className="w-full">
          <Schedule />
        </section>
        <section id="why-join" className="w-full">
          <WhyJoin />
        </section>
        <section id="registration" className="w-full">
          <Registration />
        </section>
        <section id="resources" className="w-full">
          <Resources />
        </section>
        <section id="sponsors" className="w-full">
          <Sponsors />
        </section>
        {/* Removed Contact section */}
      </main>
      <Footer />
    </div>
  );
};

export default App;