import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MoonPortrait } from './MoonPortrait';
import { REDUCED_MOTION } from './useScrollProgress';
import {
  AstroEvent,
  chicagoOffsetAt,
  eclipses,
  fmtHouston,
  houstonTime,
  moonPhases,
  seasons,
} from './astro';
import { CALENDAR_YEARS, CalendarTalk, talksIn } from './calendarData';
import type { CalendarMarker, CalendarScene, FocusBody, FocusView, MarkerKind } from './calendarScene';

/**
 * The archive as a calendar. Front layer (DOM): year tabs, live clocks and orbital readouts, playback, a strip of the
 * year's talks, a month grid and an event card that follows whatever you hover. Back layer (WebGL, calendarScene.ts):
 * the solar system with the year drawn on Earth's orbit. Everything readable lives in the front layer, so the calendar
 * still works without WebGL and for reduced motion.
 */

export const CALENDAR_EVENT = 'tt:calendar';

interface CalEvent {
  id: string;
  kind: MarkerKind;
  t: number;
  title: string;
  talk?: CalendarTalk;
  astro?: AstroEvent;
}

const YEAR_MIN = houstonTime(CALENDAR_YEARS[0], 0, 1, 0);
const YEAR_MAX = houstonTime(CALENDAR_YEARS[CALENDAR_YEARS.length - 1] + 1, 0, 1, 0) - 3600000;
const SPEEDS = [1, 10, 100]; // hours of sky per second
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const clamp = (t: number) => Math.min(YEAR_MAX, Math.max(YEAR_MIN, t));
const yearOf = (t: number) => new Date(t + chicagoOffsetAt(t) * 3600000).getUTCFullYear();
/** The body responsible for an event, and the view that shows why: Houston at talk time, the Moon as Earth sees it,
 * Earth side-on to the Sun at an equinox or solstice. */
const viewFor = (kind: MarkerKind): [FocusBody, FocusView] => {
  if (kind === 'new' || kind === 'first' || kind === 'full' || kind === 'last' || kind.endsWith('eclipse')) return ['moon', 'from-earth'];
  if (kind.endsWith('equinox') || kind.endsWith('solstice')) return ['earth', 'side'];
  return ['earth', 'houston'];
};

const eventsFor = (year: number): CalEvent[] => {
  const talks: CalEvent[] = talksIn(year).map((talk) => ({
    id: talk.id,
    kind: talk.status === 'canceled' ? 'talk-canceled' : talk.t >= Date.now() ? 'talk-upcoming' : 'talk',
    t: talk.t,
    title: talk.status === 'canceled' ? 'Canceled' : talk.title,
    talk
  }));
  const sky: CalEvent[] = [year - 1, year, year + 1].flatMap((y) => [...moonPhases(y), ...seasons(y), ...eclipses(y)]).filter((a) => yearOf(a.t) === year).map((a) => ({ id: a.id, kind: a.kind, t: a.t, title: a.title, astro: a }));
  return [...talks, ...sky].sort((a, b) => a.t - b.t);
};

const isTalk = (e: CalEvent) => !!e.talk;
const dateLong = (t: number) => fmtHouston(t, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const clock = (t: number) => fmtHouston(t, { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
const utc = (t: number) => new Date(t).toISOString().slice(11, 16) + ' UTC';
/** Houston calendar date parts of an instant (en-US formats as mm/dd/yyyy). */
const localParts = (t: number) => {
  const [mm, dd, yyyy] = fmtHouston(t, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').map(Number);
  return { y: yyyy, m: mm - 1, d: dd };
};

const Glyph: React.FC<{ kind: MarkerKind }> = ({ kind }) => <i className={`tt-cal-glyph is-${kind}`} aria-hidden="true" />;

const EventCard: React.FC<{ ev: CalEvent | null; preview: boolean }> = ({ ev, preview }) => {
  if (!ev) return <div className="tt-cal-card is-empty tt-body">Hover or pick any mark on the calendar.</div>;
  const talk = ev.talk;
  const canceled = talk?.status === 'canceled';
  const upcoming = talk && !canceled && talk.t >= Date.now();
  const who = talk ? [talk.speaker, talk.role].filter(Boolean).join(' — ') : '';
  return (
    <article tabIndex={-1} aria-label="Event details" className={`tt-cal-card${preview ? ' is-preview' : ''}`}>
      {talk?.art && <img className="tt-cal-card-art" src={talk.art} alt="" loading="lazy" />}
      <div className="tt-cal-card-body">
        <p className="tt-cal-card-kicker tt-mono">
          <Glyph kind={ev.kind} />
          {dateLong(ev.t)} · {clock(ev.t)}{ev.kind.endsWith('eclipse') && ' · Greatest eclipse worldwide'}
          {upcoming && <span className="tt-cal-pill">Upcoming</span>}
        </p>
        <h3 className="tt-cal-card-title">{canceled ? `Canceled: ${talk?.title}` : ev.title}</h3>
        <div className="tt-cal-event-story"><MoonPortrait time={ev.t} /><div>
        {talk ? (
          <>
            {who && <p className="tt-cal-card-who tt-mono">{who}</p>}
            {talk.desc && <p className="tt-cal-card-desc tt-body">{talk.desc}</p>}
            {(talk.time || talk.venue || talk.after) && (
              <p className="tt-cal-card-where tt-body">{[talk.time, talk.venue, talk.after].filter(Boolean).join(' · ')}</p>
            )}
          </>
        ) : (
          ev.astro?.note && <p className="tt-cal-card-desc tt-body">{ev.astro.note}</p>
        )}
        </div></div>
        {preview && <p className="tt-body">Select this event to open its details and event link.</p>}
        {talk?.url && !preview && (
          <a className="tt-cal-card-link tt-mono" href={talk.url} target="_blank" rel="noopener noreferrer">
            Event page on Ion District <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
};

export const TalkCalendar: React.FC = () => {
  const [still, setStill] = useState(() => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches);
  const [inView, setInView] = useState(false);
  const [exploring, setExploring] = useState(false);
  const now = useMemo(() => clamp(Date.now()), []);
  const timeRef = useRef(now);
  const [time, setTimeState] = useState(now);
  const [year, setYear] = useState(yearOf(now));
  const [playing, setPlaying] = useState(() => !window.matchMedia(REDUCED_MOTION).matches);
  const [speed, setSpeed] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null);
  const [focus, setFocus] = useState<FocusBody>(null);
  const [sceneOk, setSceneOk] = useState(false);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const scene = useRef<CalendarScene | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const hoverId = useRef<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const pendingFocus = useRef<[FocusBody, FocusView] | null>(null);
  const [detailsRequest, setDetailsRequest] = useState(0);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);
    const update = () => { setStill(media.matches); if (media.matches) setPlaying(false); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!detailsRequest) return;
    const card = section.current?.querySelector<HTMLElement>('.tt-cal-card');
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
  }, [detailsRequest, still]);

  const strip = useRef<HTMLOListElement>(null);
  const events = useMemo(() => eventsFor(year), [year]);
  const byId = useMemo(() => new Map(events.map((e) => [e.id, e])), [events]);
  const talks = useMemo(() => events.filter(isTalk), [events]);

  const setTime = useCallback((t: number) => {
    const c = clamp(t);
    timeRef.current = c;
    setTimeState(c);
    setYear((y) => (yearOf(c) !== y ? yearOf(c) : y));
  }, []);

  // default selection: the next talk from now, else the last one of the year
  useEffect(() => {
    setSelected((cur) => {
      if (cur && byId.has(cur)) return cur;
      const next = talks.find((e) => e.t >= timeRef.current && e.talk?.status !== 'canceled');
      return (next ?? talks[talks.length - 1])?.id ?? null;
    });
  }, [byId, talks]);

  /* the WebGL layer: loaded when the section comes near, never for a missing canvas */
  useEffect(() => {
    const el = section.current;
    const c = canvas.current;
    const l = labels.current;
    if (!el || !c || !l) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        import('./calendarScene')
          .then(({ startCalendarScene }) => {
            if (cancelled) return;
            scene.current = startCalendarScene({
              canvas: c,
              labels: l,
              getTime: () => timeRef.current,
              still,
              onHover: (id, x, y) => {
                // the tooltip follows the pointer without re-rendering the calendar; state changes only per mark
                const box = stage.current?.getBoundingClientRect();
                if (tip.current && box) tip.current.style.transform = `translate(${x - box.left}px, ${y - box.top}px)`;
                if (id === hoverId.current) return;
                hoverId.current = id;
                setHover(id ? { id, x, y } : null);
              },
              onPick: (id) => pickRef.current(id),
              onFocusChange: setFocus
            });
            setSceneOk(true);
          })
          .catch((error) => console.error('Calendar scene unavailable:', String(error), error?.stack));
      },
      { rootMargin: '100% 0px' }
    );
    io.observe(el);
    return () => {
      setSceneOk(false);
      cancelled = true;
      io.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, [still]);

  useEffect(() => {
    if (!sceneOk) return;
    scene.current?.setYear(
      year,
      events.map((e): CalendarMarker => ({ id: e.id, kind: e.kind, t: e.t, label: e.title }))
    );
    if (pendingFocus.current) {
      scene.current?.focus(...pendingFocus.current);
      pendingFocus.current = null;
    }
  }, [sceneOk, year, events]);

  useEffect(() => {
    scene.current?.setHighlight(hover?.id ?? selected);
  }, [sceneOk, hover, selected]);

  // keep the selected talk visible in the strip (horizontally only, never moving the page)
  useEffect(() => {
    const list = strip.current;
    const chip = list?.querySelector<HTMLElement>('.tt-cal-chip.is-selected');
    if (!list || !chip) return;
    const li = chip.parentElement as HTMLElement;
    list.scrollTo({ left: li.offsetLeft - (list.clientWidth - li.offsetWidth) / 2, behavior: still ? 'auto' : 'smooth' });
  }, [selected, year, still]);

  /* playback */
  useEffect(() => {
    if (!playing || !inView) return;
    let raf = 0;
    let last = performance.now();
    let shown = last;
    const tick = (n: number) => {
      const dt = Math.min(0.1, (n - last) / 1000);
      last = n;
      const next = timeRef.current + dt * SPEEDS[speed] * 3600000;
      if (next >= YEAR_MAX) {
        setTime(YEAR_MAX);
        setPlaying(false);
        return;
      }
      timeRef.current = next;
      if (n - shown > 80) {
        shown = n;
        setTime(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      setTime(timeRef.current);
    };
  }, [playing, inView, speed, setTime]);

  const pick = useCallback(
    (id: string, fly = true) => {
      const ev = byId.get(id);
      if (!ev) return;
      setHover(null);
      hoverId.current = null;
      setExploring(false);
      setSelected(id);
      setPlaying(false);
      setTime(ev.t);
      if (fly) {
        if (scene.current) scene.current.focus(...viewFor(ev.kind));
        else pendingFocus.current = viewFor(ev.kind);
      }
    },
    [byId, setTime]
  );
  const pickRef = useRef(pick);
  pickRef.current = pick;

  // a talk card elsewhere on the page asks for its talk; if it is in another year, pick it once that year is loaded
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const y = Number(id.slice(5, 9));
      if (!CALENDAR_YEARS.includes(y)) return;
      setPending(id);
      setYear(y);
      setTime(houstonTime(y, Number(id.slice(10, 12)) - 1, 15, 18));
      stage.current?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    };
    window.addEventListener(CALENDAR_EVENT, on);
    return () => window.removeEventListener(CALENDAR_EVENT, on);
  }, [still, setTime]);
  useEffect(() => {
    const id = pending;
    if (id && byId.has(id)) {
      setPending(null);
      pick(id);
      setDetailsRequest((n) => n + 1);
    }
  }, [pending, byId, pick]);

  const wallTime = () => new Date(timeRef.current + chicagoOffsetAt(timeRef.current) * 3600000);
  const chooseYear = (y: number) => {
    if (y === year) return;
    setPending(null);
    setHover(null);
    setPlaying(false);
    const d = wallTime();
    const day = Math.min(d.getUTCDate(), new Date(Date.UTC(y, d.getUTCMonth() + 1, 0)).getUTCDate());
    setTime(houstonTime(y, d.getUTCMonth(), day, d.getUTCHours(), d.getUTCMinutes()));
    setSelected(null);
  };

  const step = (days: number, months = 0) => {
    setPlaying(false);
    setHover(null);
    const d = wallTime();
    const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1));
    const day = Math.min(d.getUTCDate(), new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate());
    setTime(houstonTime(target.getUTCFullYear(), target.getUTCMonth(), day + days, d.getUTCHours(), d.getUTCMinutes()));
  };

  const togglePlayback = () => {
    setTime(timeRef.current >= YEAR_MAX && !playing ? houstonTime(year, 0, 1, 0) : timeRef.current);
    setPlaying((p) => !p);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setHover(null); hoverId.current = null; }
    const target = e.target as HTMLElement;
    // shortcuts belong to the view; buttons, links and the scrubber keep their own keys
    if (target.closest('button, a, input, select, textarea') || e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (k === ' ' || k === 'k') togglePlayback();
    else if (k === 'ArrowRight') step(e.shiftKey ? 0 : 1, e.shiftKey ? 1 : 0);
    else if (k === 'ArrowLeft') step(e.shiftKey ? 0 : -1, e.shiftKey ? -1 : 0);
    else if (k === '1' || k === '2' || k === '3') setSpeed(Number(k) - 1);
    else if (k === 'Escape' && focus) scene.current?.focus(null);
    else if (k === '+' || k === '=') scene.current?.zoom(0.8);
    else if (k === '-') scene.current?.zoom(1.25);
    else if (k === 't') setTime(Date.now());
    else return;
    e.preventDefault();
  };

  /* live readouts */
  const yearStart = houstonTime(year, 0, 1, 0);
  const yearEnd = Math.min(houstonTime(year + 1, 0, 1, 0) - 3600000, YEAR_MAX);

  /* month grid for the month on the clock (Houston calendar) */
  const lp = localParts(time);
  const monthStart = Date.UTC(lp.y, lp.m, 1);
  const daysIn = new Date(Date.UTC(lp.y, lp.m + 1, 0)).getUTCDate();
  const lead = (new Date(monthStart).getUTCDay() + 6) % 7;
  const monthEvents = new Map<number, CalEvent[]>();
  for (const e of events) {
    const p = localParts(e.t);
    if (p.y === lp.y && p.m === lp.m) monthEvents.set(p.d, [...(monthEvents.get(p.d) ?? []), e]);
  }
  const monthName = new Date(monthStart).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });

  const shown = (hover && byId.get(hover.id)) || (selected ? byId.get(selected) : undefined) || null;
  const hoverEv = hover ? byId.get(hover.id) : undefined;

  return (
    <section ref={section} id="tt-calendar" className="tt-cal" aria-labelledby="tt-cal-title" onKeyDown={onKeyDown}>
      <div className="tt-cal-head">
        <div className="tt-cal-head-row">
          <div>
            <div className="tt-cal-eyebrow">
              <span className="tt-mono">Every talk, on Earth’s orbit</span>
              <i aria-hidden="true" />
              <b aria-hidden="true">
                <i />
                <i />
                <i />
              </b>
            </div>
            <h2 id="tt-cal-title" className="tt-display m-0 text-[clamp(40px,7vw,104px)]">
              The calendar
            </h2>
          </div>
          <div role="group" aria-label="Year" className="tt-cal-years">
            {CALENDAR_YEARS.map((y) => (
              <button key={y} type="button" aria-pressed={year === y} className="tt-tab tt-mono" onClick={() => chooseYear(y)}>
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={stage}
        className={`tt-cal-stage${sceneOk ? ' is-live' : ''}`}
        tabIndex={0}
        role="group"
        aria-label="Solar system view of the year. Space plays and pauses, arrow keys step a day, Shift and an arrow step a month, 1, 2 and 3 set the speed, Escape returns to the orbit view."
      >
        <canvas ref={canvas} className="tt-cal-canvas" aria-hidden="true" />
        <div ref={labels} className="tt-cal-labels" aria-hidden="true" />

        <div className="tt-cal-hud is-tl tt-mono">
          <p className="tt-cal-hud-eyebrow">{exploring ? 'Explore the solar system' : 'A year in orbit'}</p>
          <p className="tt-cal-hud-date">{dateLong(time)}</p>
          <p>{clock(time)} · Houston <span className="tt-cal-hud-utc"> / {utc(time)}</span></p>
        </div>
        <div className="tt-cal-explore">
          <button type="button" className="tt-mono" disabled={!sceneOk} onClick={() => {
            setExploring((v) => !v);
            if (exploring) scene.current?.focus(null); else scene.current?.system();
          }}>{exploring ? 'Back to calendar' : 'Explore solar system'} <span aria-hidden="true">↗</span></button>
          <label className="tt-cal-planet-picker"><span className="sr-only">Explore a planet</span>
            <select aria-label="Explore a planet" disabled={!sceneOk} value={focus ?? ''} onChange={(e) => {
              setExploring(true);
              if (e.target.value) scene.current?.focus(e.target.value as FocusBody);
              else scene.current?.system();
            }}>
              <option value="">All planets</option>
              {['sun','mercury','venus','earth','moon','mars','jupiter','saturn','uranus','neptune'].map((name) => <option key={name} value={name}>{name[0].toUpperCase() + name.slice(1)}</option>)}
            </select>
          </label>
        </div>
        <div className="tt-cal-view-caption tt-mono" aria-hidden="true">
          {focus ? `${focus[0].toUpperCase() + focus.slice(1)} · drag to look around` : 'Drag to orbit · pinch or use + / − to explore'}
        </div>

        <div ref={tip} className={`tt-cal-tip tt-mono${hover && hoverEv && hover.x >= 0 ? ' is-on' : ''}`} aria-hidden="true">
          {hoverEv && (
            <>
              <span>{dateLong(hoverEv.t)}</span>
              {hoverEv.talk?.status === 'canceled' ? 'Canceled' : hoverEv.talk?.short ?? hoverEv.title}
            </>
          )}
        </div>

        <div className="tt-cal-controls">
          <div className="tt-cal-transport">
            <button type="button" onClick={() => step(0, -1)} aria-label="Back one month">
              «
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Back one day">
              ‹
            </button>
            <button type="button" className="is-play" onClick={togglePlayback} aria-label={playing ? 'Pause' : 'Play'}>
              <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span> {playing ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Forward one day">
              ›
            </button>
            <button type="button" onClick={() => step(0, 1)} aria-label="Forward one month">
              »
            </button>
          </div>
          <div className="tt-cal-speeds" role="group" aria-label="Playback speed">
            {SPEEDS.map((v, i) => (
              <button key={v} type="button" aria-pressed={speed === i} onClick={() => setSpeed(i)} aria-label={`${v} hour${v > 1 ? 's' : ''} per second`} title={`${v} hour${v > 1 ? 's' : ''} of sky per second`}>
                {v}h/s
              </button>
            ))}
          </div>
          <div className="tt-cal-view">
            <button type="button" onClick={() => scene.current?.zoom(1.25)} aria-label="Zoom out" disabled={!sceneOk}>
              −
            </button>
            <button type="button" onClick={() => scene.current?.zoom(0.8)} aria-label="Zoom in" disabled={!sceneOk}>
              +
            </button>
            {focus ? (
              <button type="button" className="is-text tt-mono" onClick={() => scene.current?.focus(null)}>
                Orbit view
              </button>
            ) : (
              <button type="button" className="is-text tt-mono" onClick={() => scene.current?.focus('earth')} disabled={!sceneOk}>
                Follow Earth
              </button>
            )}
          </div>
          <label className="tt-cal-scrub">
            <span className="sr-only">Date in {year}</span>
            <input
              type="range"
              min={yearStart}
              max={yearEnd}
              step={3600000}
              value={Math.min(yearEnd, Math.max(yearStart, time))}
              onChange={(e) => {
                setPlaying(false);
                setTime(Number(e.target.value));
              }}
              aria-valuetext={`${dateLong(time)}, ${clock(time)}`}
            />
            <span className="tt-cal-scrub-marks" aria-hidden="true">
              {talks.map((e) => (
                <i key={e.id} className={`is-${e.kind}`} style={{ left: `${((e.t - yearStart) / (yearEnd - yearStart)) * 100}%` }} />
              ))}
            </span>
          </label>
        </div>
      </div>

      <p className="tt-cal-context tt-mono">Planet positions follow the selected date. Sizes are enlarged for exploration. Moon markers show the phase on each date.</p>
      <div className="tt-cal-below">
        <ol ref={strip} className="tt-cal-strip" aria-label={`Talks in ${year}`}>
          {talks.map((e) => {
            const tk = e.talk!;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  className={`tt-cal-chip is-${e.kind}${selected === e.id ? ' is-selected' : ''}`}
                  onClick={() => pick(e.id)}
                  onMouseEnter={() => setHover({ id: e.id, x: -1, y: -1 })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ id: e.id, x: -1, y: -1 })}
                  onBlur={() => setHover(null)}
                  aria-current={selected === e.id ? 'true' : undefined}
                >
                  <span className="tt-mono">
                    {tk.month} {tk.day}
                  </span>
                  {tk.status === 'canceled' ? 'Canceled' : tk.short}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="tt-cal-panels">
          <button type="button" className="tt-cal-skip" onClick={() => {
            setHover(null);
            setDetailsRequest((n) => n + 1);
          }}>Skip to event details</button>
          <div className="tt-cal-month">
            <div className="tt-cal-month-head">
              <button type="button" onClick={() => step(0, -1)} aria-label="Previous month">
                ‹
              </button>
              <p className="tt-cal-month-name">
                {monthName} <span>{lp.y}</span>
              </p>
              <button type="button" onClick={() => step(0, 1)} aria-label="Next month">
                ›
              </button>
            </div>
            <div className="tt-cal-grid" role="group" aria-label={`${monthName} ${lp.y}`}>
              <div className="tt-cal-week">
                {WEEK.map((d) => (
                  <span key={d} className="tt-mono">
                    {d}
                  </span>
                ))}
              </div>
              {Array.from({ length: Math.ceil((lead + daysIn) / 7) }, (_, w) => (
                <div className="tt-cal-week" key={w}>
                  {Array.from({ length: 7 }, (_, i) => {
                    const day = w * 7 + i - lead + 1;
                    if (day < 1 || day > daysIn) return <span key={i} className="tt-cal-day is-out" />;
                    const evs = monthEvents.get(day) ?? [];
                    const talk = evs.find(isTalk);
                    const today = day === lp.d;
                    const label = [`${monthName} ${day}`, ...evs.map((e) => e.title)].join(', ');
                    return (
                      <span key={i} className="tt-cal-cell">
                        <button
                          type="button"
                          className={`tt-cal-day${talk ? ` is-talk is-${talk.kind}` : ''}${today ? ' is-today' : ''}${evs.some((e) => e.id === selected) ? ' is-selected' : ''}`}
                          aria-label={label}
                          aria-current={today ? 'date' : undefined}
                          onClick={() => (evs[0] ? pick((talk ?? evs[0]).id) : setTime(houstonTime(lp.y, lp.m, day, 18)))}
                          onMouseEnter={() => evs[0] && setHover({ id: (talk ?? evs[0]).id, x: -1, y: -1 })}
                          onMouseLeave={() => setHover(null)}
                        >
                          <span className="tt-cal-day-n">{day}</span>
                          <span className="tt-cal-day-glyphs">
                            {evs.map((e) => (
                              <Glyph key={e.id} kind={e.kind} />
                            ))}
                          </span>
                        </button>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
            <details className="tt-cal-event-list">
              <summary className="tt-mono">All events in {monthName}</summary>
              <ul>
                {[...monthEvents.entries()].sort(([a], [b]) => a - b).flatMap(([day, evs]) => evs.map((ev) => (
                  <li key={ev.id}><button type="button" aria-pressed={selected === ev.id} onClick={() => pick(ev.id)}>
                    <Glyph kind={ev.kind} /> {monthName} {day}: {ev.title}
                  </button></li>
                )))}
              </ul>
            </details>
            <ul className="tt-cal-legend tt-mono" aria-label="Legend">
              <li>
                <Glyph kind="talk" /> Talk
              </li>
              <li>
                <Glyph kind="full" /> Moon phase
              </li>
              <li>
                <Glyph kind="june-solstice" /> Equinox · solstice
              </li>
              <li>
                <Glyph kind="solar-eclipse" /> Eclipse
              </li>
            </ul>
          </div>
          <div id="tt-event-details"><EventCard ev={shown} preview={!!hover && hover.id !== selected} /></div>
          <p className="sr-only" aria-live="polite">
            {!playing ? `Calendar date: ${dateLong(time)}, ${clock(time)}. ` : ''}
            {selected && byId.get(selected) ? `Selected: ${byId.get(selected)!.title}, ${dateLong(byId.get(selected)!.t)}` : ''}
          </p>
        </div>
      </div>
      <p className="tt-cal-credits">Surface maps: NASA and <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">Solar System Scope</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>. Planet maps are imagery-based composites, not live photographs.</p>
    </section>
  );
};
