import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const WIDE_QUERY = '(min-width: 1024px)';

/** Portal artwork that is just a photograph, revealed when the portal opens. */
export const photoArt = (src: string, position = '50% 50%'): React.FC => {
  const PhotoArt: React.FC = () => (
    <img src={src} alt="" className="wp-photo absolute inset-0 w-full h-full object-cover" style={{ objectPosition: position }} />
  );
  return PhotoArt;
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const q = window.matchMedia(query);
    const onChange = () => setMatches(q.matches);
    onChange();
    q.addEventListener('change', onChange);
    return () => q.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

export interface PortalItem {
  key: string;
  num: string;
  title: string;
  short: string;
  accent: string;
  headline: [string, string];
  detail: string;
  Icon: LucideIcon;
  /** Artwork revealed behind the copy; uses the .wp-* classes in index.css. */
  Art: React.FC;
  chip?: string;
  href?: string;
  cta?: string;
}

interface PortalRowProps {
  items: PortalItem[];
  /** Desktop row height, e.g. "lg:h-[clamp(480px,42vw,560px)]". */
  rowClassName: string;
  mobileClosed: number;
  mobileOpen: number;
  activeGrow?: number;
  compressedGrow?: number;
  headlineClassName?: string;
  revealMinWidthClassName?: string;
  /** Which portal starts open on mobile, where there is no hover. */
  defaultMobileOpen?: number | null;
}

/**
 * A row of visual portals: restrained at rest; the hovered / focused / tapped
 * one physically grows and reveals its artwork while the others compress.
 */
export const PortalRow: React.FC<PortalRowProps> = ({
  items,
  rowClassName,
  mobileClosed,
  mobileOpen,
  activeGrow = 2.4,
  compressedGrow = 0.75,
  headlineClassName = 'text-[clamp(24px,2.5vw,36px)]',
  revealMinWidthClassName = 'lg:min-w-[440px]',
  defaultMobileOpen = 0
}) => {
  const wide = useMediaQuery(WIDE_QUERY);
  const [active, setActive] = useState<number | null>(wide ? null : defaultMobileOpen);

  useEffect(() => {
    setActive(wide ? null : defaultMobileOpen);
  }, [wide, defaultMobileOpen]);

  return (
    <div
      className={`flex flex-col lg:flex-row gap-3 ${rowClassName}`}
      onMouseLeave={() => wide && setActive(null)}
      onBlur={(e) => {
        if (wide && !e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
      }}
    >
      {items.map((p, i) => {
        const state = active === null ? 'idle' : active === i ? 'active' : 'compressed';
        const isActive = state === 'active';
        const { Art, Icon } = p;
        return (
          <article
            key={p.key}
            data-state={state}
            tabIndex={0}
            aria-label={`${p.title}: ${p.headline.join(' ')}`}
            // Every handler *sets* the open portal — none toggles — so hover,
            // focus and tap can never fight each other.
            onMouseEnter={() => wide && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="wp-card relative overflow-hidden rounded-2xl border bg-[#060C1F] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:min-w-0 transition-[flex-grow,height,border-color,box-shadow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{
              flexGrow: wide ? (state === 'active' ? activeGrow : state === 'compressed' ? compressedGrow : 1) : undefined,
              flexBasis: wide ? 0 : undefined,
              height: wide ? undefined : isActive ? mobileOpen : mobileClosed,
              borderColor: isActive ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.12)'
            }}
          >
            <div aria-hidden="true" className="absolute inset-0">
              <Art />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,31,0.78)_0%,rgba(6,12,31,0.15)_30%,rgba(6,12,31,0.25)_50%,rgba(6,12,31,0.9)_76%,rgba(6,12,31,0.98)_100%)]"
            />

            <div className="relative z-10 flex items-start justify-between gap-3 p-[clamp(18px,1.8vw,26px)]">
              <div className="min-w-0">
                <div className="font-['Fira_Sans_Condensed',sans-serif] text-[15px] font-extrabold tracking-wider" style={{ color: p.accent }}>
                  {p.num}
                </div>
                <h3 className="m-0 mt-1 font-['Overpass',sans-serif] font-black uppercase text-[clamp(17px,1.5vw,21px)] leading-tight text-white">
                  {p.title}
                </h3>
              </div>
              <span
                aria-hidden="true"
                className={`flex-none grid place-items-center w-9 h-9 rounded-full border transition-transform duration-500 ${
                  isActive ? '-rotate-45' : 'border-white/25 text-white/80'
                }`}
                style={isActive ? { borderColor: p.accent, color: p.accent } : undefined}
              >
                <ArrowRight size={16} />
              </span>
            </div>

            <div className="wp-idle absolute z-10 left-0 right-0 bottom-0 p-[clamp(18px,1.8vw,26px)]">
              <Icon aria-hidden="true" size={30} strokeWidth={1.4} className="hidden lg:block mb-3 text-white/45" />
              <p className="wp-short m-0 text-[15px] leading-snug text-white/70 transition-opacity duration-300">{p.short}</p>
            </div>

            <div className="wp-reveal absolute z-10 left-0 right-0 bottom-0 p-[clamp(20px,2vw,30px)]">
              <div className={`${revealMinWidthClassName} max-w-[560px]`}>
                <p className={`m-0 font-['Overpass',sans-serif] font-black uppercase leading-[1.02] text-white ${headlineClassName}`}>
                  {p.headline[0]}
                  <br />
                  <span style={{ color: p.accent }}>{p.headline[1]}</span>
                </p>
                <p className="mt-3 mb-0 text-[15px] leading-relaxed text-white/80 max-w-[480px]">{p.detail}</p>
                {(p.chip || p.href) && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    {p.chip && (
                      <span className="inline-flex items-center gap-2.5 font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                        <Icon aria-hidden="true" size={18} strokeWidth={1.6} style={{ color: p.accent }} />
                        {p.chip}
                      </span>
                    )}
                    {p.href && (
                      <a
                        href={p.href}
                        tabIndex={isActive ? 0 : -1}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
                        style={{ borderColor: p.accent }}
                      >
                        {p.cta}
                        <ArrowRight aria-hidden="true" size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PortalRow;
