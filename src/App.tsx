import React, { useState, useEffect } from 'react';
import SkipLink from './components/layout/SkipLink';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StarfieldCanvas from './components/ui/StarfieldCanvas';

import Hero from './components/home/Hero';
import CountdownBar from './components/home/CountdownBar';
import WhatIsSpaceApps from './components/home/WhatIsSpaceApps';
import FrontDoorToNASA from './components/home/FrontDoorToNASA';
import HoustonGrowth from './components/home/HoustonGrowth';
import WhyJoin from './components/home/WhyJoin';
import ParticipantJourney from './components/home/ParticipantJourney';
import GetInvolved from './components/home/GetInvolved';
import ChallengesTeaser from './components/home/ChallengesTeaser';
import VenueTeaser from './components/home/VenueTeaser';
import PartnersTeaser from './components/home/PartnersTeaser';
import LocalLead from './components/home/LocalLead';
import GlobalCommunity from './components/home/GlobalCommunity';
import FinalCTA from './components/home/FinalCTA';

import AboutSection from './components/sections/AboutSection';
import ChallengesSection from './components/sections/ChallengesSection';
import ScheduleSection from './components/sections/ScheduleSection';
import VenueSection from './components/sections/VenueSection';
import ResourcesSection from './components/sections/ResourcesSection';
import FAQSection from './components/sections/FAQSection';
import PartnersSection from './components/sections/PartnersSection';
import PastEventsSection from './components/sections/PastEventsSection';
import ContactSection from './components/sections/ContactSection';

const pad = (n: number) => String(n).padStart(2, '0');

const milestones = [
  { label: 'Challenge Summaries + Team Formation', when: 'Sep 17', t: '2026-09-17T09:00:00-05:00' },
  { label: 'Full Challenge Statements', when: 'Oct 28', t: '2026-10-28T09:00:00-05:00' },
  { label: 'Space Apps Connect opens', when: 'Nov 2', t: '2026-11-02T09:00:00-06:00' },
  { label: 'Hack weekend begins', when: 'Nov 14', t: '2026-11-14T09:00:00-06:00' }
];

const App: React.FC = () => {
  const [route, setRoute] = useState<string>('/');
  const [nextLabel, setNextLabel] = useState<string>('Challenge Summaries + Team Formation');
  const [nextWhen, setNextWhen] = useState<string>('Sep 17');
  const [barClock, setBarClock] = useState<{ k: string; v: string | number }[]>([]);
  const [heroClock, setHeroClock] = useState<{ k: string; v: string | number }[]>([]);

  useEffect(() => {
    const syncRoute = () => {
      const h = (window.location.hash || '').replace(/^#/, '');
      const current = h && h.startsWith('/') ? h : '/';
      setRoute(current);
    };

    syncRoute();

    const handleHashChange = () => {
      syncRoute();
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const split = (ms: number) => ({
      d: Math.max(0, Math.floor(ms / 86400000)),
      h: Math.max(0, Math.floor(ms / 3600000) % 24),
      m: Math.max(0, Math.floor(ms / 60000) % 60),
      s: Math.max(0, Math.floor(ms / 1000) % 60)
    });

    const tick = () => {
      const now = Date.now();
      const next =
        milestones.find((m) => new Date(m.t).getTime() > now) ||
        milestones[milestones.length - 1];

      setNextLabel(next.label);
      setNextWhen(next.when);

      const barSplit = split(Math.max(0, new Date(next.t).getTime() - now));
      setBarClock([
        { k: 'd', v: barSplit.d },
        { k: 'h', v: pad(barSplit.h) },
        { k: 'm', v: pad(barSplit.m) },
        { k: 's', v: pad(barSplit.s) }
      ]);

      const mainSplit = split(Math.max(0, new Date('2026-11-14T09:00:00-06:00').getTime() - now));
      setHeroClock([
        { k: 'Days', v: mainSplit.d },
        { k: 'Hours', v: pad(mainSplit.h) },
        { k: 'Minutes', v: pad(mainSplit.m) },
        { k: 'Seconds', v: pad(mainSplit.s) }
      ]);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050A1C] text-white font-['Fira_Sans',sans-serif] overflow-x-hidden selection:bg-[#EAFE07] selection:text-[#050A1C]">
      <SkipLink />
      <StarfieldCanvas density={200} />

      <div className="relative z-10">
        <Header
          currentRoute={route}
          nextLabel={nextLabel}
          nextWhen={nextWhen}
          barClock={barClock}
        />

        <main id="main">
          {route === '/' && (
            <div>
              <Hero />
              <CountdownBar clock={heroClock} />
              <WhatIsSpaceApps />
              <FrontDoorToNASA />
              <HoustonGrowth />
              <WhyJoin />
              <ParticipantJourney />
              <GetInvolved />
              <ChallengesTeaser />
              <VenueTeaser />
              <PartnersTeaser />
              <LocalLead />
              <GlobalCommunity />
              <FinalCTA />
            </div>
          )}

          {route === '/about' && <AboutSection />}
          {route === '/challenges' && <ChallengesSection />}
          {route === '/schedule' && <ScheduleSection />}
          {route === '/venue' && <VenueSection />}
          {route === '/resources' && <ResourcesSection />}
          {route === '/faq' && <FAQSection />}
          {route === '/partners' && <PartnersSection />}
          {route === '/past-events' && <PastEventsSection />}
          {route === '/contact' && <ContactSection />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
