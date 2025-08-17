import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Winners from './components/Winners';
import Hero from './components/Hero';
import EventBasics from './components/EventBasics';
import Schedule from './components/Schedule';
import WhyJoin from './components/WhyJoin';
import Registration from './components/Registration';
import Team from './components/Team';
import Judges from './components/Judges';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'event-basics', 'schedule', 'why-join', 'registration', 'team', 'judges', 'sponsors', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Winners />
        <EventBasics />
        <Schedule />
        <WhyJoin />
        <Registration />
        <Team />
        <Judges />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;