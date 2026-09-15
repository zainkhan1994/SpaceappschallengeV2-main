import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { User, Users, Lightbulb, Laptop, UploadCloud, Trophy } from 'lucide-react';
import { journeyRoute } from '../../data/homeData';

const YELLOW = '#EAFE07';
const BLUE = '#2E96F5';
const RED = '#E43700';
const ICONS = [User, Users, Lightbulb, Laptop, UploadCloud, Trophy];
const ACCENTS = [YELLOW, BLUE, BLUE, BLUE, RED, RED];
const NS = 'http://www.w3.org/2000/svg';

const EARTH_MASK = 'radial-gradient(ellipse 72% 82% at 62% 80%, #000 40%, transparent 80%)';
const ASTRO_MASK = 'radial-gradient(ellipse 68% 70% at 46% 62%, #000 32%, transparent 74%)';
const EARTH_MASK_MOBILE = 'linear-gradient(to bottom, transparent, #000 45%)';

type Pt = [number, number];

interface Geometry {
  d: string;
  total: number;
  nodes: Pt[];
  nodeLens: number[];
  keyYs: number[];
  keyLens: number[];
  w: number;
  h: number;
  stops: { offset: number; color: string }[];
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/** Smooth Catmull-Rom spline through every point, as cubic Bézier segments. */
const splineSegments = (pts: Pt[]) => {
  const segs: string[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    segs.push(
      `C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ` +
        `${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`
    );
  }
  return segs;
};

/**
 * Build the route through the checkpoints and measure how far along the path
 * each one sits, so a checkpoint lights exactly when the line reaches it.
 */
const buildGeometry = (pts: Pt[], nodeIdx: number[], w: number, h: number, axis: 'x' | 'y'): Geometry => {
  const start = `M ${pts[0][0]} ${pts[0][1]}`;
  const segs = splineSegments(pts);
  const d = `${start} ${segs.join(' ')}`;

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;visibility:hidden');
  const path = document.createElementNS(NS, 'path');
  svg.appendChild(path);
  document.body.appendChild(svg);
  path.setAttribute('d', d);
  const total = path.getTotalLength();
  const nodeLens = nodeIdx.map((pi) => {
    path.setAttribute('d', `${start} ${segs.slice(0, pi).join(' ')}`);
    return path.getTotalLength();
  });
  svg.remove();

  const nodes = nodeIdx.map((pi) => pts[pi]);
  const extent = axis === 'x' ? w : h;
  const at = (i: number) => clamp01(nodes[i][axis === 'x' ? 0 : 1] / extent);

  return {
    d,
    total,
    nodes,
    nodeLens,
    keyYs: [pts[0][1], ...nodes.map((n) => n[1]), pts[pts.length - 1][1]],
    keyLens: [0, ...nodeLens, total],
    w,
    h,
    stops: [
      { offset: 0, color: YELLOW },
      { offset: at(0), color: YELLOW },
      { offset: at(1), color: BLUE },
      { offset: at(3), color: BLUE },
      { offset: at(4), color: RED },
      { offset: 1, color: RED }
    ]
  };
};

/** Mobile: map a y position in the list to a distance along the vertical route. */
const lengthAtY = (g: Geometry, y: number) => {
  const { keyYs, keyLens } = g;
  if (y <= keyYs[0]) return 0;
  for (let i = 1; i < keyYs.length; i++) {
    if (y <= keyYs[i]) {
      const t = (y - keyYs[i - 1]) / (keyYs[i] - keyYs[i - 1] || 1);
      return keyLens[i - 1] + t * (keyLens[i] - keyLens[i - 1]);
    }
  }
  return g.total;
};

const nodeStyle = (accent: string) =>
  ({ '--a': accent, '--a35': rgba(accent, 0.35), '--a20': rgba(accent, 0.2) }) as React.CSSProperties;

export const ParticipantJourney: React.FC = () => {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [geo, setGeo] = useState<Geometry | null>(null);

  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const glowRef = useRef<SVGPathElement | null>(null);
  const coreRef = useRef<SVGPathElement | null>(null);
  const sparkRef = useRef<SVGPathElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const headHaloRef = useRef<SVGCircleElement | null>(null);
  const litRef = useRef<boolean[]>([]);
  const primedRef = useRef(false);

  const pinned = wide && !reduced;

  useEffect(() => {
    const wq = window.matchMedia('(min-width: 1024px)');
    const rq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onWide = () => setWide(wq.matches);
    const onReduced = () => setReduced(rq.matches);
    wq.addEventListener('change', onWide);
    rq.addEventListener('change', onReduced);
    return () => {
      wq.removeEventListener('change', onWide);
      rq.removeEventListener('change', onReduced);
    };
  }, []);

  // Route geometry — recomputed whenever the frame (desktop) or list (mobile) resizes.
  useLayoutEffect(() => {
    const target = wide ? frameRef.current : listRef.current;
    if (!target) return;

    const compute = () => {
      litRef.current = [];
      primedRef.current = false;

      if (wide) {
        const w = target.clientWidth;
        const h = target.clientHeight;
        const rowY = Math.round(Math.min(Math.max(h * 0.54, 330), h - 240));
        const amp = Math.min(42, h * 0.05);
        const xs = [0.115, 0.267, 0.419, 0.571, 0.723, 0.875];
        const pts: Pt[] = [[-0.04 * w, rowY - 0.42 * h]];
        const idx: number[] = [];
        xs.forEach((x, i) => {
          idx.push(pts.length);
          pts.push([x * w, rowY]);
          if (i < xs.length - 1) pts.push([((x + xs[i + 1]) / 2) * w, rowY + (i % 2 === 0 ? amp : -amp)]);
        });
        pts.push([1.04 * w, rowY - 0.44 * h]);
        setGeo(buildGeometry(pts, idx, w, h, 'x'));
        return;
      }

      const box = target.getBoundingClientRect();
      const centers = ringRefs.current.slice(0, journeyRoute.length).flatMap((r) => {
        if (!r) return [];
        const b = r.getBoundingClientRect();
        return [[b.left + b.width / 2 - box.left, b.top + b.height / 2 - box.top] as Pt];
      });
      if (centers.length < 2) return;
      const cx = centers[0][0];
      const amp = 14;
      const pts: Pt[] = [[cx, centers[0][1] - 60]];
      const idx: number[] = [];
      centers.forEach((c, i) => {
        idx.push(pts.length);
        pts.push(c);
        if (i < centers.length - 1) pts.push([cx + (i % 2 === 0 ? amp : -amp), (c[1] + centers[i + 1][1]) / 2]);
      });
      pts.push([cx, centers[centers.length - 1][1] + 60]);
      setGeo(buildGeometry(pts, idx, box.width, box.height, 'y'));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(target);
    return () => ro.disconnect();
  }, [wide]);

  // Single scroll-driven writer: progress → line, spark, checkpoints, parallax.
  useEffect(() => {
    const root = rootRef.current;
    if (!geo || !root) return;
    let raf: number | null = null;

    const render = () => {
      raf = null;
      let len: number;
      if (reduced) {
        len = geo.total;
      } else if (wide) {
        const r = root.getBoundingClientRect();
        const span = r.height - window.innerHeight;
        const raw = span > 0 ? -r.top / span : 1;
        len = clamp01((raw - 0.04) / 0.84) * geo.total;
      } else {
        const list = listRef.current;
        if (!list) return;
        len = lengthAtY(geo, window.innerHeight * 0.62 - list.getBoundingClientRect().top);
      }

      root.style.setProperty('--jp', (geo.total ? len / geo.total : 0).toFixed(4));
      const offset = String(geo.total - len);
      [glowRef, coreRef, sparkRef].forEach((ref) => {
        if (ref.current) ref.current.style.strokeDashoffset = offset;
      });

      let litCount = 0;
      geo.nodeLens.forEach((nodeLen, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const lit = len >= nodeLen - 0.5;
        if (lit) litCount++;
        el.style.setProperty('--near', clamp01(1 - Math.abs(len - nodeLen) / 110).toFixed(3));
        if (litRef.current[i] !== lit) {
          litRef.current[i] = lit;
          el.dataset.lit = lit ? 'true' : 'false';
          // Surge only when the light actually arrives while scrolling — not on
          // first paint or a resize, and never under reduced motion.
          if (lit && primedRef.current && !reduced) {
            el.classList.remove('jr-surge');
            void el.offsetWidth;
            el.classList.add('jr-surge');
          }
        }
      });
      primedRef.current = true;

      const head = headRef.current;
      if (head && coreRef.current) {
        const moving = !reduced && len > 1 && len < geo.total - 1;
        head.style.opacity = moving ? '1' : '0';
        if (moving) {
          const pt = coreRef.current.getPointAtLength(len);
          head.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
          headHaloRef.current?.setAttribute('fill', ACCENTS[Math.min(litCount, ACCENTS.length - 1)]);
        }
      }
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(render);
    };

    render();
    if (!reduced) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [geo, wide, reduced]);

  const ring = (i: number) => {
    const Icon = ICONS[i];
    return (
      <span ref={(el) => (ringRefs.current[i] = el)} className="jr-ring">
        <span aria-hidden="true" className="jr-halo" />
        <span aria-hidden="true" className="jr-burst" />
        <Icon aria-hidden="true" className="jr-icon" strokeWidth={1.7} />
      </span>
    );
  };

  const litPath = (ref: React.MutableRefObject<SVGPathElement | null>, props: React.SVGProps<SVGPathElement>) =>
    geo && (
      <path
        ref={ref}
        d={geo.d}
        fill="none"
        strokeLinecap="butt"
        strokeDasharray={`${geo.total} ${geo.total}`}
        strokeDashoffset={geo.total}
        {...props}
      />
    );

  const routeSvg = geo && (
    <svg
      aria-hidden="true"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      className="absolute left-0 top-0 overflow-visible pointer-events-none"
    >
      <defs>
        <linearGradient id="jr-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={wide ? geo.w : 0} y2={wide ? 0 : geo.h}>
          {geo.stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
        <filter id="jr-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* The full route, faint */}
      <path d={geo.d} fill="none" stroke="url(#jr-grad)" strokeWidth={14} strokeLinecap="round" opacity={0.05} />
      <path d={geo.d} fill="none" stroke="url(#jr-grad)" strokeWidth={2.5} strokeLinecap="round" opacity={0.2} />

      {/* The lit route, filled by scroll */}
      {litPath(glowRef, { stroke: 'url(#jr-grad)', strokeWidth: 16, opacity: 0.75, filter: 'url(#jr-glow)' })}
      {litPath(coreRef, { stroke: 'url(#jr-grad)', strokeWidth: 4 })}
      {litPath(sparkRef, { stroke: '#fff', strokeWidth: 1.4, opacity: 0.85 })}

      {/* The travelling light */}
      <g ref={headRef} style={{ opacity: 0, transition: 'opacity .3s ease' }}>
        <circle ref={headHaloRef} r={20} fill={YELLOW} opacity={0.6} filter="url(#jr-glow)" />
        <circle r={5} fill="#fff" />
      </g>
    </svg>
  );

  if (wide) {
    return (
      <section
        ref={rootRef}
        data-screen-label="Journey"
        aria-label="Participant journey"
        className={`relative ${pinned ? 'h-[320vh]' : ''}`}
      >
        <div
          ref={frameRef}
          className={`${pinned ? 'sticky top-0 h-screen' : 'relative h-[clamp(640px,92vh,900px)]'} overflow-hidden`}
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <img
              src="/journey-earth.jpg"
              alt=""
              className="jr-parallax-earth absolute right-[-4%] bottom-[-6%] w-[72%] h-[58%] object-cover object-[58%_40%] opacity-90"
              style={{ WebkitMaskImage: EARTH_MASK, maskImage: EARTH_MASK }}
            />
            <img
              src="/astronaut-earth.jpg"
              alt=""
              className="jr-parallax-astro absolute left-[-2%] bottom-[-4%] w-[24%] max-w-[360px] h-[46%] object-cover object-[52%_38%] opacity-80"
              style={{ WebkitMaskImage: ASTRO_MASK, maskImage: ASTRO_MASK }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,28,0.85)_0%,rgba(5,10,28,0.25)_30%,rgba(5,10,28,0)_55%,rgba(5,10,28,0.35)_100%)]" />
          </div>

          <h2 className="absolute z-20 left-1/2 -translate-x-1/2 top-[clamp(92px,13vh,140px)] m-0 text-center whitespace-nowrap font-['Overpass',sans-serif] font-black uppercase leading-[0.95] text-[clamp(40px,4.6vw,68px)] text-white">
            Participant
            <br />
            <span className="text-[#E43700]">Journey</span>
          </h2>

          <div className="absolute inset-0 z-10">
            {routeSvg}
            {geo &&
              journeyRoute.map((s, i) => (
                <div
                  key={s.num}
                  ref={(el) => (nodeRefs.current[i] = el)}
                  data-lit="false"
                  className="jr-node absolute w-0 h-0"
                  style={{ left: geo.nodes[i][0], top: geo.nodes[i][1], ...nodeStyle(ACCENTS[i]) }}
                >
                  <span className="jr-num absolute left-0 bottom-[46px] -translate-x-1/2">{s.num}</span>
                  <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">{ring(i)}</span>
                  <div className="absolute left-0 top-[50px] -translate-x-1/2 w-[clamp(128px,11.5vw,172px)] text-center">
                    <div className="jr-copy">
                      <h3 className="jr-title">{s.title}</h3>
                      <p className="jr-desc">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      data-screen-label="Journey"
      aria-label="Participant journey"
      className="relative overflow-hidden px-6 py-[clamp(64px,10vw,96px)]"
    >
      <img
        src="/journey-earth.jpg"
        alt=""
        aria-hidden="true"
        className="jr-parallax-earth absolute left-0 right-0 bottom-0 w-full h-[42%] object-cover object-[60%_40%] opacity-60 pointer-events-none"
        style={{ WebkitMaskImage: EARTH_MASK_MOBILE, maskImage: EARTH_MASK_MOBILE }}
      />

      <h2 className="relative z-10 m-0 mb-12 font-['Overpass',sans-serif] font-black uppercase leading-[0.95] text-[clamp(38px,10vw,56px)] text-white">
        Participant
        <br />
        <span className="text-[#E43700]">Journey</span>
      </h2>

      <div ref={listRef} className="relative z-10 max-w-[560px]">
        {routeSvg}
        <ol className="relative list-none m-0 p-0 grid gap-11">
          {journeyRoute.map((s, i) => (
            <li
              key={s.num}
              ref={(el) => (nodeRefs.current[i] = el)}
              data-lit="false"
              className="jr-node relative flex items-start gap-5"
              style={nodeStyle(ACCENTS[i])}
            >
              <span className="flex-none">{ring(i)}</span>
              <div className="jr-copy pt-1.5 min-w-0">
                <span className="jr-num">{s.num}</span>
                <h3 className="jr-title">{s.title}</h3>
                <p className="jr-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ParticipantJourney;
