import React, { useRef, useEffect } from 'react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Start the banner video immediately. React doesn't write the `muted`
  // attribute to the DOM, and some browsers (Safari/iOS) block autoplay without
  // it, so set it explicitly and call play() ourselves, retrying once the media
  // is ready, when the tab becomes visible, and on the first interaction.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const tryPlay = () => {
      if (!video.paused) return;
      video.play().catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };

    const interactionEvents = ['pointerdown', 'touchstart', 'keydown', 'scroll'] as const;

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', onVisible);
    interactionEvents.forEach((e) => window.addEventListener(e, tryPlay, { once: true, passive: true }));

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onVisible);
      interactionEvents.forEach((e) => window.removeEventListener(e, tryPlay));
    };
  }, []);

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
      aria-label="NASA Space Apps Challenge Houston 2026"
      className="relative overflow-hidden h-[clamp(360px,52vh,640px)] bg-[#02060F]"
    >
      <h1 className="sr-only">NASA Space Apps Challenge Houston 2026</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/videos/save-the-date.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_46%,rgba(2,6,15,0.35),rgba(2,6,15,0.5)_60%,rgba(2,6,15,0.75)_100%)]" />

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
    </section>
  );
};

export default Hero;
