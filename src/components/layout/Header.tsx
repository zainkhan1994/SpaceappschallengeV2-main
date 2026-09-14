import React, { useState, useEffect } from 'react';
import { navDesktopItems, navExtraItems } from '../../data/navigation';

interface HeaderProps {
  currentRoute: string;
  nextLabel: string;
  nextWhen: string;
  barClock: { k: string; v: string | number }[];
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, nextLabel, nextWhen, barClock }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const narrow = window.innerWidth < 1120;
      setIsNarrow(narrow);
      if (!narrow) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navAll = [navExtraItems[0], ...navDesktopItems, ...navExtraItems.slice(1)];

  return (
    <header className="sticky top-0 z-[80] bg-[rgba(5,10,28,0.9)] backdrop-blur-md border-b border-[rgba(46,150,245,0.26)]">
      <div className="max-w-[1320px] mx-auto px-6 py-3 flex items-center justify-between gap-5">
        <a href="#/" className="flex items-center gap-3 text-white flex-none">
          <img
            src="public/sac-logo-houston-transparent.png"
            alt="NASA Space Apps Challenge Houston"
            className="h-[58px] w-[58px] object-contain block"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[16px] tracking-wider uppercase">
              Space Apps Houston
            </span>
          </span>
          <span className="text-[15px] font-semibold tracking-[0.24em] text-[#EAFE07]">2026</span>
        </a>

        {/* Desktop Nav */}
        {!isNarrow && (
          <nav aria-label="Primary" className="flex items-center gap-1 flex-wrap justify-end flex-1">
            {navDesktopItems.map((item) => {
              const isCurrent = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-[17px] font-semibold transition-colors duration-250 ${
                    isCurrent
                      ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.12)]'
                      : 'text-white hover:bg-[rgba(46,150,245,0.18)] hover:text-[#EAFE07]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="https://www.spaceappschallenge.org/2026/local-events/houston/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-6 py-3 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[17px] shadow-[0_6px_26px_rgba(46,150,245,0.35)] transition-all hover:bg-[#5FB4FF] hover:-translate-y-0.5"
            >
              Register
            </a>
          </nav>
        )}

        {/* Mobile Burger Button */}
        {isNarrow && (
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="w-12 h-12 rounded-lg border border-white/30 bg-[rgba(46,150,245,0.12)] text-white text-2xl flex items-center justify-center cursor-pointer"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Countdown Announcement Sub-bar */}
      <div className="border-t border-[rgba(46,150,245,0.2)] bg-gradient-to-r from-[rgba(46,150,245,0.14)] via-[rgba(5,10,28,0.2)] to-[rgba(234,254,7,0.1)]">
        <div className="max-w-[1320px] mx-auto px-6 py-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center sm:text-left">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              aria-hidden="true"
              className="w-1.75 h-1.75 rounded-full bg-[#EAFE07] shadow-[0_0_10px_#EAFE07] animate-pulse flex-none"
            />
            <span className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-extrabold tracking-[0.24em] uppercase text-white/60 flex-none whitespace-nowrap">
              Next up
            </span>
            <span className="text-[14px] font-bold text-white">{nextLabel}</span>
            <span className="text-[13px] text-white/55 flex-none">{nextWhen}</span>
          </div>

          <div className="flex items-center gap-2">
            {barClock.map((c, i) => (
              <span key={i} className="flex items-baseline gap-1">
                <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[17px] tabular-nums text-[#EAFE07]">
                  {c.v}
                </span>
                <span className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-wider uppercase text-white/50">
                  {c.k}
                </span>
              </span>
            ))}
          </div>

          <a
            href="#/schedule"
            className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#2E96F5] hover:text-[#EAFE07]"
          >
            All key dates →
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isNarrow && menuOpen && (
        <nav aria-label="Mobile" className="border-t border-[rgba(46,150,245,0.25)] bg-[rgba(5,10,28,0.98)] px-4 py-4">
          <ul className="list-none m-0 p-0 grid gap-1">
            {navAll.map((item) => {
              const isCurrent = currentRoute === item.route;
              return (
                <li key={item.route}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3.5 rounded-lg text-[19px] font-semibold ${
                      isCurrent
                        ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.12)]'
                        : 'text-white hover:bg-[rgba(46,150,245,0.18)]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="https://www.spaceappschallenge.org/2026/local-events/houston/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block text-center py-4 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[19px]"
          >
            Register
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
