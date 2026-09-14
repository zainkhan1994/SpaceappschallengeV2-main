import React, { useRef, useEffect } from 'react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let raf: number | null = null;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = null;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', px - r.left + 'px');
      hero.style.setProperty('--my', py - r.top + 'px');
      hero.querySelectorAll<HTMLElement>('[data-sweep]').forEach((el) => {
        const b = el.getBoundingClientRect();
        el.style.setProperty('--tx', px - b.left + 'px');
        el.style.setProperty('--ty', py - b.top + 'px');
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      px = e.clientX;
      py = e.clientY;
      hero.style.setProperty('--hov', '1');
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const handlePointerLeave = () => {
      hero.style.setProperty('--hov', '0');
    };

    hero.addEventListener('pointermove', handlePointerMove);
    hero.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      data-screen-label="Hero"
      className="relative overflow-hidden min-h-[clamp(640px,94vh,1000px)] flex flex-col items-center justify-center text-center px-6 pt-[clamp(56px,8vw,96px)] pb-[clamp(90px,10vw,130px)] bg-[radial-gradient(ellipse_130%_85%_at_50%_42%,#0B1B37_0%,#061029_44%,#02060F_100%)]"
    >
      <svg
        viewBox="0 0 1200 1000"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <defs>
          <linearGradient id="rY" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EAFE07" stopOpacity="0" />
            <stop offset="22%" stopColor="#EAFE07" stopOpacity=".95" />
            <stop offset="82%" stopColor="#C9D400" stopOpacity=".9" />
            <stop offset="100%" stopColor="#7A8200" stopOpacity=".25" />
          </linearGradient>
          <linearGradient id="rB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E96F5" stopOpacity="0" />
            <stop offset="22%" stopColor="#2E96F5" stopOpacity=".95" />
            <stop offset="82%" stopColor="#0042A6" stopOpacity=".95" />
            <stop offset="100%" stopColor="#001A4D" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id="rR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E43700" stopOpacity="0" />
            <stop offset="22%" stopColor="#E43700" stopOpacity=".95" />
            <stop offset="82%" stopColor="#B32200" stopOpacity=".9" />
            <stop offset="100%" stopColor="#4A0E00" stopOpacity=".3" />
          </linearGradient>
        </defs>
        <g fill="none" strokeLinecap="round" className="opacity-[calc(0.82+var(--hov,0)*0.18)] transition-opacity duration-400">
          <path d="M352 -40 L352 700 C352 880 268 960 78 1020" stroke="url(#rY)" strokeWidth="46" opacity=".16" style={{ filter: 'blur(26px)' }} />
          <path d="M352 -40 L352 700 C352 880 268 960 78 1020" stroke="url(#rY)" strokeWidth="14" opacity=".55" style={{ filter: 'blur(7px)' }} />
          <path d="M352 -40 L352 700 C352 880 268 960 78 1020" stroke="url(#rY)" strokeWidth="7" style={{ filter: 'blur(.5px)' }} className="animate-[pulse_9s_ease-in-out_infinite]" />
          <path d="M352 -40 L352 700 C352 880 268 960 78 1020" stroke="#FFFFC8" strokeWidth="1.8" opacity=".85" />

          <path d="M592 -40 L592 720 C592 890 556 968 486 1020" stroke="url(#rB)" strokeWidth="44" opacity=".18" style={{ filter: 'blur(26px)' }} />
          <path d="M592 -40 L592 720 C592 890 556 968 486 1020" stroke="url(#rB)" strokeWidth="12" opacity=".5" style={{ filter: 'blur(7px)' }} />
          <path d="M592 -40 L592 720 C592 890 556 968 486 1020" stroke="url(#rB)" strokeWidth="6" style={{ filter: 'blur(.5px)' }} className="animate-[pulse_11s_ease-in-out_infinite]" />
          <path d="M592 -40 L592 720 C592 890 556 968 486 1020" stroke="#DCEEFF" strokeWidth="1.6" opacity=".8" />

          <path d="M646 -40 L646 730 C646 900 618 972 560 1020" stroke="#2E96F5" strokeWidth="7" opacity=".2" style={{ filter: 'blur(6px)' }} />
          <path d="M646 -40 L646 730 C646 900 618 972 560 1020" stroke="#7FB8F0" strokeWidth="1.4" opacity=".35" />

          <path d="M812 -40 L812 700 C812 880 896 960 1104 1020" stroke="url(#rR)" strokeWidth="46" opacity=".16" style={{ filter: 'blur(26px)' }} />
          <path d="M812 -40 L812 700 C812 880 896 960 1104 1020" stroke="url(#rR)" strokeWidth="14" opacity=".5" style={{ filter: 'blur(7px)' }} />
          <path d="M812 -40 L812 700 C812 880 896 960 1104 1020" stroke="url(#rR)" strokeWidth="7" style={{ filter: 'blur(.5px)' }} className="animate-[pulse_10s_ease-in-out_infinite]" />
          <path d="M812 -40 L812 700 C812 880 896 960 1104 1020" stroke="#FFD2C0" strokeWidth="1.7" opacity=".8" />
        </g>
      </svg>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_56%_44%_at_50%_46%,rgba(2,6,15,0.8),rgba(2,6,15,0.36)_64%,transparent_100%)]" />

      {/* Interactive mouse spotlight sweep */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 w-[640px] h-[640px] -ml-[320px] -mt-[320px] z-[3] pointer-events-none mix-blend-screen opacity-[var(--hov,0)] transition-opacity duration-450"
        style={{ transform: 'translate(var(--mx, -900px), var(--my, -900px))' }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(196,232,255,0.3),rgba(88,160,235,0.12)_38%,transparent_68%)] -left-[6px] top-[11px]">
          <div className="absolute left-[175px] top-[267px] w-[360px] h-[1.5px] -ml-[180px] rotate-[26deg] bg-[linear-gradient(90deg,transparent,rgba(180,222,255,0.6)_50%,transparent)] blur-[0.6px]">
            <div className="absolute left-[77px] top-[-4px] w-[170px] h-[170px] -ml-[85px] -mt-[85px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),rgba(160,215,255,0.2)_42%,transparent_70%)] blur-[6px]" />
          </div>
          <div className="absolute left-[41px] top-[241px] w-[620px] h-[2px] -ml-[310px] -rotate-[19deg] bg-[linear-gradient(90deg,transparent,rgba(214,240,255,0.8)_48%,rgba(255,255,255,0.95)_50%,rgba(214,240,255,0.8)_52%,transparent)] blur-[0.4px]" />
        </div>
      </div>

      <div className="relative z-[2] max-w-[1000px] mx-auto">
        <img
          src="public/sac-logo-houston-transparent.png"
          alt=""
          className="w-[280px] md:w-[323px] h-auto block mx-auto mb-7 animate-[bounce_9s_ease-in-out_infinite] drop-shadow-[0_0_22px_rgba(120,180,255,0.3)] opacity-90"
        />

        <div data-sweep="" className="relative block mb-0.5">
          <p className="m-0 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[clamp(12px,3.6vw,55px)] leading-tight tracking-[0.075em] uppercase whitespace-nowrap bg-gradient-to-b from-white/40 via-white/10 to-white/70 bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(90,165,240,0.4)]">
            NASA Space Apps Challenge
          </p>
        </div>

        <div data-sweep="" className="relative block">
          <h1
            aria-label="NASA Space Apps Challenge Houston 2026"
            className="m-0 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[clamp(64px,13.4vw,204px)] leading-[0.94] tracking-[0.004em] uppercase whitespace-nowrap bg-gradient-to-b from-white/34 via-white/10 to-white/42 bg-clip-text text-transparent drop-shadow-[0_0_44px_rgba(96,170,244,0.42)]"
          >
            Houston
          </h1>
        </div>

        <div className="mt-8 mx-auto inline-flex items-center gap-3.5 border-2 border-[#EAFE07] rounded-2xl px-8 py-3.5 bg-[rgba(234,254,7,0.07)] shadow-[0_0_40px_rgba(234,254,7,0.22)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EAFE07] animate-pulse" />
          <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[clamp(19px,2.4vw,30px)] tracking-wider text-[#EAFE07] uppercase">
            November 14–15, 2026
          </span>
        </div>

        <p className="mt-7 mx-auto max-w-[620px] text-[clamp(17px,1.6vw,21px)] leading-relaxed text-white/80 font-light">
          Two days in Space City building real solutions with NASA's free and open data. Free to attend, open to everyone — no experience required.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="https://www.spaceappschallenge.org/2026/local-events/houston/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-11 py-45 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[20px] shadow-[0_10px_40px_rgba(46,150,245,0.4)] transition-all hover:bg-[#5FB4FF] hover:-translate-y-0.5"
          >
            Register
          </a>
          <a
            href="#/about"
            className="px-8 py-45 rounded-xl border border-white/40 text-white font-bold text-[20px] transition-all hover:border-[#EAFE07] hover:text-[#EAFE07] hover:bg-[rgba(234,254,7,0.07)]"
          >
            What is Space Apps?
          </a>
        </div>
        <p className="mt-4 text.sm text-white/60">Registration is open on the official NASA Space Apps site.</p>
      </div>

      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <span className="text-[11px] tracking-[0.3em] text-white/50">SCROLL</span>
        <span className="w-0.5 h-8 bg-gradient-to-b from-[#2E96F5] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
