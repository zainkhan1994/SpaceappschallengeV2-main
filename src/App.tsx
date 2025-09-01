import { useEffect, useState } from 'react';
import Header from './components/Header';
import Resources from './components/Resources';
import Winners from './components/Winners';
import Hero from './components/Hero';
import EventBasics from './components/EventBasics';
import Schedule from './components/Schedule';
import WhyJoin from './components/WhyJoin';
import Registration from './components/Registration';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-5VH756CNJR';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5VH756CNJR');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'event-basics',
        'schedule',
        'why-join',
        'registration',
        'team',
        'judges',
        'sponsors',
        'contact'
      ];
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
        <Resources />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;