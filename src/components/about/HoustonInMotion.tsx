import React, { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { motionClips } from '../../data/aboutData';

/**
 * Space Apps Houston's films, playing on a loop: the city, the planet and the event's own teasers. Silent by default
 * so they can run as atmosphere; one tap gives any of them sound. Nothing plays for reduced motion until asked.
 */
export const HoustonInMotion: React.FC = () => {
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [sound, setSound] = useState<string | null>(null);
  const videos = useRef(new Map<string, HTMLVideoElement>());

  // play only what is on screen, and never autoplay for reduced motion
  useEffect(() => {
    if (still) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) v.play().catch(() => undefined);
          else v.pause();
        });
      },
      { rootMargin: '150px 0px' }
    );
    videos.current.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [still]);

  const toggleSound = (src: string) => {
    const next = sound === src ? null : src;
    setSound(next);
    videos.current.forEach((v, key) => {
      v.muted = key !== next;
      if (key === next) v.play().catch(() => undefined);
    });
  };

  const tile = (clip: (typeof motionClips)[number]) => (
    <figure key={clip.src} className="m-0 relative rounded-2xl overflow-hidden border border-white/14 bg-black group">
      <video
        ref={(el) => {
          if (el) videos.current.set(clip.src, el);
          else videos.current.delete(clip.src);
        }}
        className={`block w-full ${clip.wide ? 'aspect-video' : 'aspect-[9/16]'} object-cover`}
        src={clip.src}
        poster={clip.poster}
        muted={sound !== clip.src}
        loop
        playsInline
        preload="metadata"
        autoPlay={!still}
        controls={still}
        aria-label={clip.label}
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
        <span className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-wider uppercase text-white/90">
          {clip.label}
        </span>
        {!still && (
          <button
            type="button"
            onClick={() => toggleSound(clip.src)}
            aria-pressed={sound === clip.src}
            className="pointer-events-auto flex-none w-10 h-10 grid place-items-center rounded-full border border-white/45 bg-black/55 text-white text-[15px] backdrop-blur-sm transition-colors hover:border-[#EAFE07] hover:text-[#EAFE07]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
              <path d="M4 9v6h4l5 4V5L8 9H4z" />
              {sound === clip.src ? (
                <path d="M16.5 8.3a5 5 0 0 1 0 7.4l1.4 1.4a7 7 0 0 0 0-10.2l-1.4 1.4z" />
              ) : (
                <path d="M16.6 8.3 15.2 9.7l2.3 2.3-2.3 2.3 1.4 1.4 2.3-2.3 2.3 2.3 1.4-1.4-2.3-2.3 2.3-2.3-1.4-1.4-2.3 2.3-2.3-2.3z" />
              )}
            </svg>
            <span className="sr-only">{sound === clip.src ? `Mute ${clip.label}` : `Play ${clip.label} with sound`}</span>
          </button>
        )}
      </figcaption>
    </figure>
  );

  const portrait = motionClips.filter((c) => !c.wide);
  const wide = motionClips.filter((c) => c.wide);

  return (
    <section data-screen-label="Houston in motion" className="py-[clamp(56px,7vw,104px)] px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(26px,3.4vw,42px)] uppercase text-white">
            Houston in motion
          </h2>
          <p className="m-0 mb-9 max-w-[700px] text-[18px] leading-relaxed text-white/72">
            The city, the planet and the weekend itself — on a loop, with the sound off until you want it.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[1.125rem]">{portrait.map(tile)}</div>
        <div className="mt-[1.125rem] grid grid-cols-1 md:grid-cols-2 gap-[1.125rem]">{wide.map(tile)}</div>
      </div>
    </section>
  );
};

export default HoustonInMotion;
