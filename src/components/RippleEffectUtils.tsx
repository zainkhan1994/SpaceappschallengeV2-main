import React, { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export function useRipples() {
  const [items, setItems] = useState<RippleItem[]>([]);
  const idRef = useRef(0);
  const add = useCallback((x: number, y: number) => {
    const id = ++idRef.current;
    setItems((s) => [...s, { id, x, y }]);
  }, []);
  const remove = useCallback((id: number) => setItems((s) => s.filter((i) => i.id !== id)), []);
  return { items, add, remove };
}

export function Ripple({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  const reduce = useReducedMotion();
  const safeX = Number.isFinite(x) ? x : window.innerWidth / 2;
  const safeY = Number.isFinite(y) ? y : window.innerHeight / 2;
  return (
    <motion.div
      initial={{ opacity: 0.35, scale: 0, x: safeX, y: safeY }}
      animate={{ opacity: 0, scale: 6, x: safeX, y: safeY }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: "easeOut" }}
      onAnimationComplete={onDone}
      className="pointer-events-none fixed z-[60] h-10 w-10 rounded-full"
      style={{ left: 0, top: 0, border: `2px solid #7DD3FC`, boxShadow: `0 0 0 4px #7DD3FC20` }}
      aria-hidden
    />
  );
}

export function centerOf(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export function Stars() {
  const dots = useMemo(
    () =>
      Array.from({ length: 200 }).map(() => ({
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.9 + 0.1,
        twinkleDelay: Math.random() * 3,
      })),
    []
  );
  
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <svg width="100%" height="100%" style={{ position: "absolute", left: 0, top: 0 }}>
        {dots.map((d, i) => (
          <circle 
            key={i} 
            cx={d.left} 
            cy={d.top} 
            r={d.size} 
            fill={`rgba(255,255,255,${d.opacity})`}
            className="animate-pulse"
            style={{ 
              animationDelay: `${d.twinkleDelay}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </svg>
      
      {/* Additional cosmic effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-purple-950/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-950/10 to-transparent"></div>
    </div>
  );
}

export const NAVY = "#0b1a3f";
export const BLUE = "#2D81FF";
export const CYAN = "#7DD3FC";
export const YELLOW = "#FFD42A";
export const CARD_BG = "rgba(255,255,255,0.04)";
export const CARD_BORDER = "rgba(255,255,255,0.12)";
