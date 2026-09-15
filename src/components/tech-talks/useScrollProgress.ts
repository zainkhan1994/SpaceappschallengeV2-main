import { useEffect, useRef } from 'react';

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Writes scroll progress (0–1) to the element's `--p` CSS variable without re-rendering.
 * `pin`: progress across a tall section whose sticky child fills the viewport.
 * `pass`: progress from the section entering the bottom edge to leaving the top edge.
 */
export function useScrollProgress<T extends HTMLElement>(mode: 'pin' | 'pass' = 'pin') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia(REDUCED_MOTION).matches) {
      el.style.setProperty('--p', '1');
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = mode === 'pin' ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height);
      el.style.setProperty('--p', Math.min(1, Math.max(0, raw)).toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return ref;
}
