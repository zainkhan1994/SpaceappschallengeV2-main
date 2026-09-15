import React, { useState, useEffect, useRef } from 'react';
import { primaryNav, navRoutesByTopLabel } from '../../data/navigation';

interface HeaderProps {
  currentRoute: string;
}

const stripHash = (href: string) => href.replace(/^#/, '');

const ChevronDown: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none"
  >
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="w-3.5 h-3.5 flex-none" fill="none">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [flyoutIndex, setFlyoutIndex] = useState<number | null>(null);
  const [mobileOpenTop, setMobileOpenTop] = useState<number | null>(null);
  const [mobileOpenSub, setMobileOpenSub] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const narrow = window.innerWidth < 1120;
      setIsNarrow(narrow);
      if (!narrow) {
        setMenuOpen(false);
        setMobileOpenTop(null);
        setMobileOpenSub(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close the open desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (openIndex === null) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
        setFlyoutIndex(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
        setFlyoutIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openIndex]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileOpenTop(null);
    setMobileOpenSub(null);
  };

  return (
    <header className="sticky top-0 z-[80] bg-[rgba(5,10,28,0.9)] backdrop-blur-md border-b border-[rgba(46,150,245,0.26)]">
      <div className="max-w-[1320px] mx-auto px-6 py-3 flex items-center justify-between gap-5">
        <a href="#/" className="flex items-center gap-3.5 text-white flex-none py-1 group">
          <img
            src="/sac-logo-houston-transparent.png"
            alt="NASA Space Apps Challenge Houston"
            className="h-[76px] md:h-[88px] w-auto object-contain block drop-shadow-[0_0_14px_rgba(234,254,7,0.35)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[18px] md:text-[20px] tracking-wider uppercase">
              Space Apps Houston
            </span>
            <span className="text-[14px] md:text-[15px] font-bold tracking-[0.24em] text-[#EAFE07]">2026</span>
          </span>
        </a>

        {/* Desktop Nav */}
        {!isNarrow && (
          <nav aria-label="Primary" ref={navRef} className="flex items-center gap-1 flex-wrap justify-end flex-1">
            {primaryNav.map((item, i) => {
              const children = item.children;

              if (!children || children.length === 0) {
                const isCurrent = currentRoute === stripHash(item.href);
                return (
                  <a
                    key={item.label}
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
              }

              const isOpen = openIndex === i;
              const isActiveGroup = (navRoutesByTopLabel[item.label] || []).includes(currentRoute);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    setOpenIndex(i);
                    setFlyoutIndex(null);
                  }}
                  onMouseLeave={() => {
                    setOpenIndex(null);
                    setFlyoutIndex(null);
                  }}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[17px] font-semibold transition-colors duration-250 ${
                      isActiveGroup || isOpen
                        ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.12)]'
                        : 'text-white hover:bg-[rgba(46,150,245,0.18)] hover:text-[#EAFE07]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown open={isOpen} />
                  </button>

                  {isOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full pt-2 z-[95]"
                    >
                      <div className="min-w-[248px] rounded-xl border border-[rgba(46,150,245,0.3)] bg-[#0A1530] shadow-[0_18px_50px_rgba(0,0,0,0.55)] py-2">
                        {children.map((child, ci) => {
                          const grandchildren = child.children;
                          const childCurrent = currentRoute === stripHash(child.href);

                          if (!grandchildren || grandchildren.length === 0) {
                            return (
                              <a
                                key={child.label}
                                href={child.href}
                                role="menuitem"
                                target={child.href.startsWith('http') ? '_blank' : undefined}
                                rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                onClick={() => {
                                  setOpenIndex(null);
                                  setFlyoutIndex(null);
                                }}
                                className={`block px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                                  childCurrent ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.08)]' : 'text-white/90 hover:bg-[rgba(46,150,245,0.16)] hover:text-[#EAFE07]'
                                }`}
                              >
                                {child.label}
                              </a>
                            );
                          }

                          const isFlyoutOpen = flyoutIndex === ci;
                          return (
                            <div
                              key={child.label}
                              className="relative"
                              onMouseEnter={() => setFlyoutIndex(ci)}
                            >
                              <button
                                type="button"
                                aria-haspopup="true"
                                aria-expanded={isFlyoutOpen}
                                onClick={() => setFlyoutIndex(ci)}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[15px] font-medium text-left transition-colors duration-200 ${
                                  isFlyoutOpen || childCurrent
                                    ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.08)]'
                                    : 'text-white/90 hover:bg-[rgba(46,150,245,0.16)] hover:text-[#EAFE07]'
                                }`}
                              >
                                {child.label}
                                <ChevronRight />
                              </button>

                              {isFlyoutOpen && (
                                <div role="menu" className="absolute left-full top-0 pl-2 z-[96]">
                                  <div className="min-w-[220px] rounded-xl border border-[rgba(46,150,245,0.3)] bg-[#0A1530] shadow-[0_18px_50px_rgba(0,0,0,0.55)] py-2">
                                    {grandchildren.map((g) => (
                                      <a
                                        key={g.label}
                                        href={g.href}
                                        role="menuitem"
                                        onClick={() => {
                                          setOpenIndex(null);
                                          setFlyoutIndex(null);
                                        }}
                                        className="block px-4 py-2.5 text-[15px] font-medium text-white/90 hover:bg-[rgba(46,150,245,0.16)] hover:text-[#EAFE07] transition-colors duration-200"
                                      >
                                        {g.label}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
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
            onClick={() => (menuOpen ? closeMobileMenu() : setMenuOpen(true))}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="w-12 h-12 rounded-lg border border-white/30 bg-[rgba(46,150,245,0.12)] text-white text-2xl flex items-center justify-center cursor-pointer"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile Menu Accordion */}
      {isNarrow && menuOpen && (
        <nav aria-label="Mobile" className="border-t border-[rgba(46,150,245,0.25)] bg-[rgba(5,10,28,0.98)] px-4 py-4 max-h-[calc(100vh-140px)] overflow-y-auto">
          <ul className="list-none m-0 p-0 grid gap-1">
            {primaryNav.map((item, i) => {
              const children = item.children;

              if (!children || children.length === 0) {
                const isCurrent = currentRoute === stripHash(item.href);
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3.5 rounded-lg text-[19px] font-semibold ${
                        isCurrent ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.12)]' : 'text-white hover:bg-[rgba(46,150,245,0.18)]'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              const isOpen = mobileOpenTop === i;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpenTop(isOpen ? null : i);
                      setMobileOpenSub(null);
                    }}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-lg text-[19px] font-semibold text-white hover:bg-[rgba(46,150,245,0.18)]"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-2xl leading-none w-5 text-center">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <ul className="list-none ml-4 pl-3 my-1 border-l border-white/12 grid gap-0.5">
                      {children.map((child, ci) => {
                        const grandchildren = child.children;
                        const childCurrent = currentRoute === stripHash(child.href);

                        if (!grandchildren || grandchildren.length === 0) {
                          return (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                target={child.href.startsWith('http') ? '_blank' : undefined}
                                rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                onClick={closeMobileMenu}
                                className={`block px-4 py-3 rounded-lg text-[16px] font-medium ${
                                  childCurrent ? 'text-[#EAFE07] bg-[rgba(234,254,7,0.1)]' : 'text-white/85 hover:bg-white/10'
                                }`}
                              >
                                {child.label}
                              </a>
                            </li>
                          );
                        }

                        const isSubOpen = mobileOpenSub === ci;
                        return (
                          <li key={child.label}>
                            <button
                              type="button"
                              onClick={() => setMobileOpenSub(isSubOpen ? null : ci)}
                              aria-expanded={isSubOpen}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-[16px] font-medium text-white/85 hover:bg-white/10"
                            >
                              <span>{child.label}</span>
                              <span aria-hidden="true" className="text-xl leading-none w-5 text-center">
                                {isSubOpen ? '−' : '+'}
                              </span>
                            </button>
                            {isSubOpen && (
                              <ul className="list-none ml-4 pl-3 border-l border-white/10 grid gap-0.5">
                                {grandchildren.map((g) => (
                                  <li key={g.label}>
                                    <a
                                      href={g.href}
                                      onClick={closeMobileMenu}
                                      className="block px-4 py-2.5 rounded-lg text-[15px] text-white/70 hover:bg-white/10"
                                    >
                                      {g.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <a
            href="https://www.spaceappschallenge.org/2026/local-events/houston/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
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
