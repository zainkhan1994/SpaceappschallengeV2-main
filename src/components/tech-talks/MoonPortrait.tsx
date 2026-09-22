import { useEffect, useRef } from 'react';
import { moon, phaseName } from './astro';
import { drawMoon } from './renderMoon';

export function MoonPortrait({ time }: { time: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const phase = moon(time);
  useEffect(() => {
    let current = true;
    const buffer = document.createElement('canvas');
    drawMoon(buffer, phase.elong, 384).then(() => {
      if (!current || !canvas.current) return;
      canvas.current.width = canvas.current.height = 384;
      canvas.current.getContext('2d')?.drawImage(buffer, 0, 0);
    }).catch(() => undefined);
    return () => { current = false; };
  }, [phase.elong]);
  return <figure className="tt-cal-moon-portrait">
    <canvas ref={canvas} role="img" aria-label={`${phaseName(phase.elong)}, ${Math.round(phase.illum * 100)} percent illuminated at this event`} />
    <figcaption><span className="tt-mono">Moon at this event</span><strong>{phaseName(phase.elong)}</strong><span>{Math.round(phase.illum * 100)}% illuminated</span></figcaption>
  </figure>;
}
