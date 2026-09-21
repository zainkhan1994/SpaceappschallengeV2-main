import React from 'react';
import { footerCols } from '../../data/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[rgba(46,150,245,0.25)] bg-[rgba(5,10,28,0.92)] text-white">
      <div className="max-w-[1320px] mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3.5 mb-4">
            <img
              src="/sac-logo-houston-transparent.png"
              alt="NASA Space Apps Challenge Houston"
              className="h-[54px] w-[54px] object-contain block"
            />
            <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[16px] tracking-wide uppercase leading-tight">
              Space Apps Houston
              <br />
              <span className="text-[#EAFE07]">2026</span>
            </span>
          </div>
          <p className="m-0 text-[16px]">
            <a href="mailto:zain@nasaspaceappschallenge.org" className="text-[#2E96F5] hover:text-[#EAFE07]">
              zain@nasaspaceappschallenge.org
            </a>
          </p>
        </div>

        {footerCols.map((col, idx) => (
          <nav key={idx} aria-label={col.title} className="md:col-span-1">
            <h2 className="m-0 mb-4 text-[13px] font-extrabold tracking-widest uppercase text-white">
              {col.title}
            </h2>
            <ul className="list-none m-0 p-0 grid gap-2.5">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a href={link.href} className="text-[16px] text-white/70 hover:text-[#EAFE07] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-5 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center text-sm text-white/45">
        <p className="m-0 max-w-[620px]">
          An official NASA Space Apps Challenge Local Event, organized by volunteers in Houston, Texas. Not affiliated with, or endorsed by, NASA beyond the Space Apps program.
        </p>
        <p className="m-0">© 2026 NASA Space Apps Challenge</p>
      </div>
    </footer>
  );
};

export default Footer;
