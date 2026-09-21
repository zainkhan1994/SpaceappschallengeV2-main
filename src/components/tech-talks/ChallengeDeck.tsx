import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { REDUCED_MOTION } from './useScrollProgress';
import {
  CHALLENGES_URL,
  DIFFICULTIES,
  Difficulty,
  SpaceAppsChallenge,
  challengeGuide,
  spaceAppsChallenges
} from '../../data/spaceAppsChallenges';

/**
 * The challenge deck and its detail sheet. The first card is the Space Apps Houston poster, which opens a guide to
 * how the challenges work; the rest are the 14 official challenges. Opening a card grows its poster into the sheet
 * (a native modal <dialog>: focus trap, Escape and inert page come with it); closing shrinks it back into the deck.
 */

type Item = { kind: 'guide' } | { kind: 'challenge'; c: SpaceAppsChallenge; n: number };

const ITEMS: Item[] = [{ kind: 'guide' }, ...spaceAppsChallenges.map((c, i) => ({ kind: 'challenge' as const, c, n: i + 1 }))];
const TOTAL = spaceAppsChallenges.length;
const ART = '/tech-talks/challenges';
const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

const slugOf = (item: Item) => (item.kind === 'guide' ? challengeGuide.slug : item.c.slug);
const pad = (n: number) => String(n).padStart(2, '0');

const LEVEL_COLOUR: Record<Difficulty, string> = {
  'Beginner/Youth': 'var(--tt-blue)',
  Intermediate: 'var(--tt-yellow)',
  Advanced: 'var(--tt-red)'
};

const STEPS = [
  { when: 'Sep 17', what: 'Summaries live', at: '2026-09-17T00:00:00-05:00' },
  { when: 'Oct 28', what: 'Full statements + resources', at: '2026-10-28T00:00:00-05:00' },
  { when: 'Nov 14–15', what: 'Hackathon weekend', at: '2026-11-14T00:00:00-06:00' }
];

/** Poster art; challenges without a supplied poster get their type set over a NASA photograph, in the posters' voice. */
const ChallengeArt: React.FC<{ item: Item; eager?: boolean }> = ({ item, eager }) => {
  const slug = slugOf(item);
  const cover = item.kind === 'challenge' ? item.c.cover : undefined;
  return (
    <>
      <img src={`${ART}/${slug}.webp`} alt="" width={1122} height={1402} loading={eager ? 'eager' : 'lazy'} draggable={false} />
      {cover && (
        <span className="tt-cover" aria-hidden="true">
          <span className="tt-cover-kicker">Challenge</span>
          <span className="tt-cover-title">{cover.title}</span>
          <span className="tt-cover-blurb">{cover.blurb}</span>
        </span>
      )}
    </>
  );
};

const Title: React.FC<{ text: string; accent?: string }> = ({ text, accent }) => {
  const at = accent ? text.lastIndexOf(accent) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span>{accent}</span>
    </>
  );
};

const Levels: React.FC<{ on: Difficulty[] }> = ({ on }) => (
  <ul className="tt-cs-levels">
    {DIFFICULTIES.map((d) => (
      <li key={d} className={on.includes(d) ? 'is-on' : undefined} style={{ '--c': LEVEL_COLOUR[d] } as React.CSSProperties}>
        <i aria-hidden="true" />
        {d}
        {!on.includes(d) && <span className="sr-only"> (not tagged)</span>}
      </li>
    ))}
  </ul>
);

const Steps: React.FC = () => {
  const now = Date.now();
  const next = STEPS.findIndex((s) => now < new Date(s.at).getTime());
  return (
    <ol className="tt-cs-steps">
      {STEPS.map((s, i) => (
        <li key={s.when} className={next === -1 || i < next ? 'is-done' : i === next ? 'is-next' : undefined}>
          <i aria-hidden="true" />
          <span className="tt-mono">{s.when}</span>
          {s.what}
        </li>
      ))}
    </ol>
  );
};

const splitSummary = (summary: string) => {
  const key = 'Your challenge is to ';
  const at = summary.indexOf(key);
  if (at < 0) return { context: summary, ask: '' };
  const ask = summary.slice(at + key.length);
  return { context: summary.slice(0, at).trim(), ask: ask.charAt(0).toUpperCase() + ask.slice(1) };
};

const Rise: React.FC<{ i: number; className?: string; children: React.ReactNode; as?: 'div' | 'p' }> = ({ i, className = '', children, as = 'div' }) => {
  const Tag = as;
  return (
    <Tag className={`tt-cs-rise ${className}`} style={{ '--i': i } as React.CSSProperties}>
      {children}
    </Tag>
  );
};

const ChallengeBody: React.FC<{ item: Extract<Item, { kind: 'challenge' }>; onNext: () => void }> = ({ item, onNext }) => {
  const { c, n } = item;
  const { context, ask } = splitSummary(c.summary);
  return (
    <>
      <Rise i={0} as="p" className="tt-cs-kicker tt-mono">
        Challenge {pad(n)} of {TOTAL}
      </Rise>
      <Rise i={1}>
        <h2 id="tt-cs-title" className={`tt-cs-title${c.title.length > 60 ? ' is-long' : ''}`}>
          <Title text={c.title} accent={c.accent} />
        </h2>
      </Rise>
      <Rise i={2}>
        <dl className="tt-cs-spec">
          <div>
            <dt className="tt-mono">Difficulty</dt>
            <dd>
              <Levels on={c.difficulty} />
            </dd>
          </div>
          <div>
            <dt className="tt-mono">Subjects</dt>
            <dd>
              <ul className="tt-cs-subjects">
                {c.subjects.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Rise>
      <Rise i={3} as="p" className="tt-cs-context tt-body">
        {context}
      </Rise>
      {ask && (
        <Rise i={4} className="tt-cs-ask">
          <p className="tt-mono">Your challenge</p>
          <p className="tt-body">{ask}</p>
        </Rise>
      )}
      <Rise i={5}>
        <Steps />
      </Rise>
      <Rise i={6} className="tt-cs-actions">
        <a className="tt-cs-cta tt-mono" href={c.url} target="_blank" rel="noopener noreferrer">
          Full challenge <span aria-hidden="true">↗</span>
          <span className="sr-only"> on spaceappschallenge.org (opens in a new tab)</span>
        </a>
        <button type="button" className="tt-cs-link tt-mono" onClick={onNext}>
          {n < TOTAL ? 'Next challenge' : 'Back to the start'} <span aria-hidden="true">→</span>
        </button>
      </Rise>
      <Rise i={7} as="p" className="tt-cs-note tt-mono">
        All projects must use NASA data{c.cover ? ` · Photo: ${c.cover.credit}` : ''}
      </Rise>
    </>
  );
};

const GuideBody: React.FC<{ onBrowse: () => void }> = ({ onBrowse }) => (
  <>
    <Rise i={0} as="p" className="tt-cs-kicker tt-mono">
      Start here
    </Rise>
    <Rise i={1}>
      <h2 id="tt-cs-title" className="tt-cs-title">
        How the <span>challenges work</span>
      </h2>
    </Rise>
    <Rise i={2} as="p" className="tt-cs-context tt-body">
      A Space Apps challenge is an open-ended problem written by NASA scientists and subject matter experts. Each one
      points to a real problem facing our planet or our universe, and comes with the open data and tools to take it on.
    </Rise>
    <Rise i={3}>
      <ol className="tt-cs-facts">
        {challengeGuide.facts.map((f, i) => (
          <li key={f.label} style={{ '--c': ['var(--tt-yellow)', 'var(--tt-blue)', '#fff', 'var(--tt-red)', 'var(--tt-yellow)'][i] } as React.CSSProperties}>
            <span className="tt-cs-fact-big">{f.big}</span>
            <span className="tt-cs-fact-label tt-mono">{f.label}</span>
            <p className="tt-body">{f.text}</p>
          </li>
        ))}
      </ol>
    </Rise>
    <Rise i={4} className="tt-cs-ask">
      <p className="tt-mono">Before you choose</p>
      <p className="tt-body">
        Read several challenges, pick the one that excites you, and form a team around shared interests or
        complementary skills. A challenge is a starting point, not a constraint: there is no single right answer.
      </p>
    </Rise>
    <Rise i={5}>
      <dl className="tt-cs-spec">
        <div>
          <dt className="tt-mono">Difficulty</dt>
          <dd>
            <Levels on={DIFFICULTIES} />
            <p className="tt-cs-hint tt-body">Every challenge is tagged with the levels it suits.</p>
          </dd>
        </div>
      </dl>
    </Rise>
    <Rise i={6}>
      <Steps />
    </Rise>
    <Rise i={7} className="tt-cs-actions">
      <button type="button" className="tt-cs-cta tt-mono" onClick={onBrowse}>
        See the {TOTAL} challenges <span aria-hidden="true">→</span>
      </button>
      <a className="tt-cs-link tt-mono" href={CHALLENGES_URL} target="_blank" rel="noopener noreferrer">
        spaceappschallenge.org <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Rise>
  </>
);

export const ChallengeDeck: React.FC<{ deckRef: React.RefObject<HTMLDivElement> }> = ({ deckRef }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const poster = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<'in' | 'open' | 'out' | null>(null);
  const closing = useRef(false);
  const shown = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const still = () => window.matchMedia(REDUCED_MOTION).matches;

  /** Transform that maps the sheet's poster onto a card's box. */
  const toCard = (card: DOMRect, sheet: DOMRect) =>
    `translate(${card.left - sheet.left}px, ${card.top - sheet.top}px) scale(${card.width / sheet.width}, ${card.height / sheet.height})`;

  const open = (i: number) => {
    closing.current = false;
    setIndex(i);
    setPhase('in');
  };

  // grow the card into the sheet once the dialog is laid out
  useLayoutEffect(() => {
    if (index === null || phase !== 'in' || dialog.current?.open) return;
    const d = dialog.current;
    const card = cards.current[index];
    if (!d || !card) return;
    document.documentElement.classList.add('tt-cs-lock');
    d.showModal();
    shown.current = true;
    closeBtn.current?.focus();
    shell.current?.scrollTo(0, 0);
    const p = poster.current;
    const opened = () => setPhase((ph) => (ph === 'in' ? 'open' : ph));
    if (!p || still()) {
      opened();
      return;
    }
    const from = card.getBoundingClientRect();
    const to = p.getBoundingClientRect();
    card.style.visibility = 'hidden';
    p.animate([{ transform: toCard(from, to) }, { transform: 'none' }], { duration: 640, easing: EASE }).finished
      .catch(() => undefined)
      .finally(() => {
        card.style.visibility = '';
        opened();
      });
  }, [index, phase]);

  const finish = useCallback((i: number | null) => {
    if (!shown.current) return;
    shown.current = false;
    const d = dialog.current;
    if (d?.open) d.close();
    document.documentElement.classList.remove('tt-cs-lock');
    cards.current.forEach((c) => c && (c.style.visibility = ''));
    setPhase(null);
    setIndex(null);
    if (i !== null) cards.current[i]?.focus({ preventScroll: true });
    closing.current = false;
  }, []);

  const close = useCallback(() => {
    if (closing.current || index === null) return;
    closing.current = true;
    const deck = deckRef.current;
    const card = cards.current[index];
    const p = poster.current;
    // bring the card we are returning to into view in the deck, so the poster can land on it
    if (deck && card) deck.scrollLeft = card.offsetLeft - (deck.clientWidth - card.offsetWidth) / 2;
    setPhase('out');
    const done = () => finish(index);
    if (!card || !p || still()) {
      window.setTimeout(done, still() ? 0 : 200);
      return;
    }
    const to = card.getBoundingClientRect();
    const from = p.getBoundingClientRect();
    const visible = to.bottom > 0 && to.top < window.innerHeight;
    if (!visible) {
      window.setTimeout(done, 220);
      return;
    }
    card.style.visibility = 'hidden';
    p.animate([{ transform: 'none' }, { transform: toCard(to, from) }], { duration: 520, easing: EASE, fill: 'forwards' }).finished
      .catch(() => undefined)
      .finally(done);
  }, [deckRef, finish, index]);

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i === null ? i : (i + dir + ITEMS.length) % ITEMS.length));
    },
    []
  );

  // reset scroll to the top of the new challenge
  useEffect(() => {
    if (index === null) return;
    shell.current?.scrollTo({ top: 0 });
    body.current?.scrollTo({ top: 0 });
  }, [index]);

  // preload the neighbours
  useEffect(() => {
    if (index === null) return;
    [-1, 1].forEach((d) => {
      const img = new Image();
      img.src = `${ART}/${slugOf(ITEMS[(index + d + ITEMS.length) % ITEMS.length])}.webp`;
    });
  }, [index]);

  useEffect(() => () => document.documentElement.classList.remove('tt-cs-lock'), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape') {
      // handled here as well as in onCancel: some input paths deliver Escape without the dialog's cancel event
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const item = index === null ? null : ITEMS[index];

  return (
    <>
      <div ref={deckRef} className="tt-deck relative">
        {ITEMS.map((it, i) => (
          <button
            key={slugOf(it)}
            ref={(el) => (cards.current[i] = el)}
            type="button"
            className="tt-card-item is-poster"
            aria-haspopup="dialog"
            aria-label={it.kind === 'guide' ? 'Start here: how the challenges work' : `Open challenge: ${it.c.title}`}
            onClick={() => open(i)}
          >
            <ChallengeArt item={it} />
            {it.kind === 'guide' && (
              <span className="tt-card-badge tt-mono" aria-hidden="true">
                Start here · How it works
              </span>
            )}
            <span className="tt-card-open" aria-hidden="true" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className={`tt-cs${phase ? ` is-${phase}` : ''}`}
        aria-labelledby="tt-cs-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => finish(index)}
        onKeyDown={onKeyDown}
      >
        {item && (
          <>
            <div key={`amb-${slugOf(item)}`} className="tt-cs-ambient" style={{ backgroundImage: `url(${ART}/${slugOf(item)}.webp)` }} aria-hidden="true" />
            <div className="tt-cs-veil" aria-hidden="true" />
            <div className="tt-cs-bar">
              <p className="tt-mono m-0" aria-live="polite">
                {item.kind === 'guide' ? 'Start here' : `${pad(item.n)} / ${TOTAL}`}
                <span className="tt-cs-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </p>
              <div className="tt-cs-nav">
                <button type="button" onClick={() => go(-1)} aria-label="Previous challenge">
                  ←
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next challenge">
                  →
                </button>
                <button ref={closeBtn} type="button" className="is-close" onClick={close} aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div
              ref={shell}
              className="tt-cs-shell"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <figure
                ref={poster}
                className="tt-cs-poster m-0"
                aria-hidden="true"
                onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
                onTouchEnd={(e) => {
                  const t = touch.current;
                  touch.current = null;
                  if (!t) return;
                  const dx = e.changedTouches[0].clientX - t.x;
                  const dy = e.changedTouches[0].clientY - t.y;
                  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
                }}
              >
                <div key={slugOf(item)} className="tt-cs-art">
                  <ChallengeArt item={item} eager />
                </div>
              </figure>
              <article ref={body} key={slugOf(item)} className="tt-cs-body">
                {item.kind === 'guide' ? <GuideBody onBrowse={() => setIndex(1)} /> : <ChallengeBody item={item} onNext={() => go(1)} />}
              </article>
            </div>
          </>
        )}
      </dialog>
    </>
  );
};
