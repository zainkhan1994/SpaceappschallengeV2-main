/**
 * Every NASA Tech Talk as a dated calendar event: the archive data (techTalksData) joined to the card deck
 * (techTalkCards) on year and month, so each talk carries its card's photo and kicker. Times are Houston wall-clock
 * (6:00 PM unless the talk says otherwise), stored as UTC instants.
 */
import { TechTalk, techTalks2023, techTalks2024, techTalks2025, techTalks2026 } from '../../data/techTalksData';
import { techTalkCards, TechTalkCard } from '../../data/techTalkCards';
import { houstonTime } from './astro';

export const CALENDAR_YEARS = [2023, 2024, 2025, 2026];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export interface CalendarTalk extends TechTalk {
  id: string;
  year: number;
  /** 0-11 */
  monthIndex: number;
  /** Start of the talk. */
  t: number;
  /** One hour, unless the listing says otherwise. */
  end: number;
  card?: TechTalkCard;
  /** Card photo, when the talk has one. */
  art?: string;
}

export const talkId = (year: number | string, monthIndex: number) => `talk-${year}-${String(monthIndex + 1).padStart(2, '0')}`;

/** The id of the calendar talk a deck card belongs to, from the card's YYYY-MM slug. */
export const talkIdForCard = (card: TechTalkCard) => `talk-${card.slug.slice(0, 7)}`;

const startHour = (time?: string) => {
  const m = time?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return { h: 18, min: 0 };
  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return { h, min: parseInt(m[2], 10) };
};

const byYear: [number, TechTalk[]][] = [
  [2023, techTalks2023],
  [2024, techTalks2024],
  [2025, techTalks2025],
  [2026, techTalks2026]
];

const cards = new Map(techTalkCards.map((c) => [talkIdForCard(c), c]));

export const calendarTalks: CalendarTalk[] = byYear.flatMap(([year, talks]) =>
  talks.map((talk) => {
    const monthIndex = MONTHS.indexOf(talk.month);
    const day = parseInt(talk.day, 10);
    const { h, min } = startHour(talk.time);
    const t = houstonTime(year, monthIndex, day, h, min);
    const id = talkId(year, monthIndex);
    const card = cards.get(id);
    return { ...talk, id, year, monthIndex, t, end: t + 3600000, card, art: card?.art ? `/tech-talks/cards/${card.slug}.jpg` : undefined };
  })
);

// every card in the deck must land on a talk, or its photo silently goes missing from the calendar
if (import.meta.env.DEV) {
  const ids = new Set(calendarTalks.map((t) => t.id));
  for (const id of cards.keys()) console.assert(ids.has(id), `techTalkCards: ${id} has no matching talk in techTalksData`);
  console.assert(ids.size === calendarTalks.length, 'techTalksData: two talks share a month');
}

export const talksIn = (year: number) => calendarTalks.filter((t) => t.year === year);
