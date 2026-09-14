import React, { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  density?: number;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({ density = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let stars: { x: number; y: number; r: number; v: number; tw: number; ts: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        v: (Math.random() * 0.16 + 0.03) * dpr,
        tw: Math.random() * Math.PI * 2,
        ts: Math.random() * 0.035 + 0.008
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.v;
        if (s.y > h) {
          s.y = -2;
          s.x = Math.random() * w;
        }
        s.tw += s.ts;
        ctx.globalAlpha = 0.3 + Math.sin(s.tw) * 0.28;
        ctx.fillStyle = '#cfe4ff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default StarfieldCanvas;
