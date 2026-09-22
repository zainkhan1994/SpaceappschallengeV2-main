/**
 * Low-precision astronomy for the Tech Talks calendar, all client-side and dependency-free.
 *
 * Planets: JPL "Keplerian Elements for Approximate Positions of the Major Planets" (1800-2050 AD, E. M. Standish).
 * Sun, Moon, seasons and lunar phases: J. Meeus, Astronomical Algorithms (2nd ed.), chapters 22, 25, 27, 47, 48, 49.
 * Accuracy is minutes for phases and seasons and a fraction of a degree for positions: right for a calendar, not
 * for navigation. Eclipses are listed from NASA's Five Millennium Canon rather than predicted.
 *
 * Coordinates: heliocentric ecliptic of date-ish (J2000 elements), AU; x toward the vernal equinox, z ecliptic north.
 */

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const norm = (deg: number) => ((deg % 360) + 360) % 360;
const sin = (d: number) => Math.sin(d * D2R);
const cos = (d: number) => Math.cos(d * D2R);

export const HOUSTON = { lat: 29.7604, lon: -95.3698, tz: 'America/Chicago', name: 'Houston' };

/** Julian Day (UT) from a JS time value. */
export const jd = (t: number) => t / 86400000 + 2440587.5;
export const fromJd = (j: number) => (j - 2440587.5) * 86400000;
/** Julian centuries from J2000.0. */
const centuries = (t: number) => (jd(t) - 2451545) / 36525;

export type Vec3 = [number, number, number];

/* ------------------------------------------------------------------ planets */

type Elements = [number, number, number, number, number, number]; // a, e, I, L, long.peri, long.node
const PLANETS: Record<string, { el: Elements; rate: Elements }> = {
  mercury: {
    el: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593],
    rate: [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081]
  },
  venus: {
    el: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255],
    rate: [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418]
  },
  earth: {
    el: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0],
    rate: [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0]
  },
  mars: {
    el: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    rate: [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343]
  }
};
export type PlanetName = keyof typeof PLANETS;

export interface PlanetState {
  pos: Vec3;
  /** Distance from the Sun, AU. */
  r: number;
  /** Orbital speed, km/s. */
  speed: number;
  a: number;
  e: number;
}

/** Heliocentric ecliptic position of a planet (Earth = Earth-Moon barycentre, close enough here). */
export function planet(name: PlanetName, t: number): PlanetState {
  const T = centuries(t);
  const { el, rate } = PLANETS[name];
  const [a, e, I, L, wbar, node] = el.map((v, i) => v + rate[i] * T) as Elements;
  const w = wbar - node;
  const M = norm(L - wbar);
  // Kepler's equation
  let E = M + R2D * e * sin(M);
  for (let i = 0; i < 8; i++) E -= (E - R2D * e * sin(E) - M) / (1 - e * cos(E));
  const xp = a * (cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * sin(E);
  const cw = cos(w), sw = sin(w), cn = cos(node), sn = sin(node), ci = cos(I), si = sin(I);
  const x = (cw * cn - sw * sn * ci) * xp + (-sw * cn - cw * sn * ci) * yp;
  const y = (cw * sn + sw * cn * ci) * xp + (-sw * sn + cw * cn * ci) * yp;
  const z = sw * si * xp + cw * si * yp;
  const r = Math.hypot(x, y, z);
  // vis-viva, with sqrt(GM_sun / 1 AU) = 29.7847 km/s
  const speed = 29.7847 * Math.sqrt(2 / r - 1 / a);
  return { pos: [x, y, z], r, speed, a, e };
}

/* ------------------------------------------------------------------ the Sun, seen from Earth */

export interface SunState {
  /** Apparent geocentric ecliptic longitude, degrees. */
  lon: number;
  ra: number;
  dec: number;
  /** Earth-Sun distance, AU. */
  dist: number;
  /** Equation of time, minutes (apparent minus mean solar time). */
  eot: number;
  obliquity: number;
}

/** Meeus ch. 25 (low accuracy, ~0.01 degrees). */
export function sun(t: number): SunState {
  const T = centuries(t);
  const L0 = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const e = 0.016708634 - 0.000042037 * T;
  const C = (1.914602 - 0.004817 * T) * sin(M) + (0.019993 - 0.000101 * T) * sin(2 * M) + 0.000289 * sin(3 * M);
  const trueLon = L0 + C;
  const v = M + C;
  const dist = (1.000001018 * (1 - e * e)) / (1 + e * cos(v));
  const omega = 125.04 - 1934.136 * T;
  const lon = norm(trueLon - 0.00569 - 0.00478 * sin(omega));
  const eps0 = 23 + (26 + (21.448 - 46.815 * T) / 60) / 60;
  const obliquity = eps0 + 0.00256 * cos(omega);
  const ra = norm(R2D * Math.atan2(cos(obliquity) * sin(lon), cos(lon)));
  const dec = R2D * Math.asin(sin(obliquity) * sin(lon));
  // equation of time (Meeus 28.3), minutes
  const y = Math.tan((obliquity / 2) * D2R) ** 2;
  const eotRad =
    y * Math.sin(2 * L0 * D2R) - 2 * e * Math.sin(M * D2R) + 4 * e * y * Math.sin(M * D2R) * Math.cos(2 * L0 * D2R) -
    0.5 * y * y * Math.sin(4 * L0 * D2R) - 1.25 * e * e * Math.sin(2 * M * D2R);
  return { lon, ra, dec, dist, eot: 4 * eotRad * R2D, obliquity };
}

/** Greenwich mean sidereal time, degrees (Meeus 12.4). */
export function gmst(t: number): number {
  const J = jd(t) - 2451545;
  const T = J / 36525;
  return norm(280.46061837 + 360.98564736629 * J + 0.000387933 * T * T - (T * T * T) / 38710000);
}

/** Altitude and azimuth (degrees, azimuth from north through east) of an RA/Dec for an observer. */
export function horizontal(t: number, ra: number, dec: number, lat = HOUSTON.lat, lon = HOUSTON.lon) {
  const H = norm(gmst(t) + lon - ra);
  const alt = R2D * Math.asin(sin(lat) * sin(dec) + cos(lat) * cos(dec) * cos(H));
  const az = norm(R2D * Math.atan2(sin(H), cos(H) * sin(lat) - Math.tan(dec * D2R) * cos(lat)) + 180);
  return { alt, az };
}

/** Hours of daylight at a latitude for the Sun's declination (standard -0.833 degree horizon). */
export function daylightHours(dec: number, lat = HOUSTON.lat): number {
  const c = (sin(-0.833) - sin(lat) * sin(dec)) / (cos(lat) * cos(dec));
  if (c <= -1) return 24;
  if (c >= 1) return 0;
  return (2 * R2D * Math.acos(c)) / 15;
}

/** Sunrise, solar noon and sunset (JS time values) on the Houston calendar day containing t. */
export function sunTimes(t: number, lat = HOUSTON.lat, lon = HOUSTON.lon) {
  const local = new Date(t + chicagoOffsetAt(t) * 3600000);
  const midnight = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  // apparent noon: 12h mean solar time at the longitude, corrected by the equation of time (iterated once)
  let noon = midnight + (12 - lon / 15) * 3600000;
  for (let i = 0; i < 2; i++) noon = midnight + (12 - lon / 15) * 3600000 - sun(noon).eot * 60000;
  const s = sun(noon);
  const half = (daylightHours(s.dec, lat) / 2) * 3600000;
  return { noon, rise: noon - half, set: noon + half, hours: daylightHours(s.dec, lat) };
}

/** Local apparent solar time at a longitude, as hours 0-24. */
export function solarTime(t: number, lon = HOUSTON.lon): number {
  const utcHours = ((t / 3600000) % 24 + 24) % 24;
  return ((utcHours + lon / 15 + sun(t).eot / 60) % 24 + 24) % 24;
}

/* ------------------------------------------------------------------ the Moon */

export interface MoonState {
  /** Geocentric ecliptic longitude and latitude, degrees; distance, km. */
  lon: number;
  lat: number;
  dist: number;
  /** Illuminated fraction 0-1 and phase angle, degrees. */
  illum: number;
  /** Elongation from the Sun, 0-360 in the direction of motion: 0 new, 90 first quarter, 180 full, 270 last. */
  elong: number;
  ra: number;
  dec: number;
}

/** Meeus ch. 47 with the largest periodic terms (~0.1 degree), phase from ch. 48. */
export function moon(t: number): MoonState {
  const T = centuries(t);
  const Lp = norm(218.3164477 + 481267.88123421 * T);
  const D = norm(297.8501921 + 445267.1114034 * T);
  const M = norm(357.5291092 + 35999.0502909 * T);
  const Mp = norm(134.9633964 + 477198.8675055 * T);
  const F = norm(93.272095 + 483202.0175233 * T);
  const lon = norm(
    Lp +
      6.288774 * sin(Mp) + 1.274027 * sin(2 * D - Mp) + 0.658314 * sin(2 * D) + 0.213618 * sin(2 * Mp) -
      0.185116 * sin(M) - 0.114332 * sin(2 * F) + 0.058793 * sin(2 * D - 2 * Mp) + 0.057066 * sin(2 * D - M - Mp) +
      0.053322 * sin(2 * D + Mp) + 0.045758 * sin(2 * D - M) - 0.040923 * sin(M - Mp) - 0.03472 * sin(D) -
      0.030383 * sin(M + Mp) + 0.015327 * sin(2 * D - 2 * F) - 0.012528 * sin(Mp + 2 * F) + 0.01098 * sin(Mp - 2 * F) +
      0.010675 * sin(4 * D - Mp) + 0.010034 * sin(3 * Mp) + 0.008548 * sin(4 * D - 2 * Mp) - 0.007888 * sin(2 * D + M - Mp) -
      0.006766 * sin(2 * D + M) - 0.005163 * sin(D - Mp)
  );
  const lat =
    5.128122 * sin(F) + 0.280602 * sin(Mp + F) + 0.277693 * sin(Mp - F) + 0.173237 * sin(2 * D - F) +
    0.055413 * sin(2 * D - Mp + F) + 0.046271 * sin(2 * D - Mp - F) + 0.032573 * sin(2 * D + F) + 0.017198 * sin(2 * Mp + F);
  const dist =
    385000.56 - 20905.355 * cos(Mp) - 3699.111 * cos(2 * D - Mp) - 2955.968 * cos(2 * D) - 569.925 * cos(2 * Mp) +
    48.888 * cos(M) - 3.149 * cos(2 * F) + 246.158 * cos(2 * D - 2 * Mp) - 152.138 * cos(2 * D - M - Mp);
  const s = sun(t);
  const elong = norm(lon - s.lon);
  const cosPsi = cos(lat) * cos(lon - s.lon);
  const psi = R2D * Math.acos(Math.max(-1, Math.min(1, cosPsi)));
  const sunKm = s.dist * 149597870.7;
  const i = R2D * Math.atan2(sunKm * sin(psi), dist - sunKm * cos(psi));
  const illum = (1 + cos(i)) / 2;
  const eps = s.obliquity;
  const ra = norm(R2D * Math.atan2(sin(lon) * cos(eps) - Math.tan(lat * D2R) * sin(eps), cos(lon)));
  const dec = R2D * Math.asin(sin(lat) * cos(eps) + cos(lat) * sin(eps) * sin(lon));
  return { lon, lat, dist, illum, elong, ra, dec };
}

export function phaseName(elong: number): string {
  const e = norm(elong);
  if (e < 6 || e >= 354) return 'New moon';
  if (e < 84) return 'Waxing crescent';
  if (e < 96) return 'First quarter';
  if (e < 174) return 'Waxing gibbous';
  if (e < 186) return 'Full moon';
  if (e < 264) return 'Waning gibbous';
  if (e < 276) return 'Last quarter';
  return 'Waning crescent';
}

/* ------------------------------------------------------------------ events: phases, seasons, eclipses */

export type AstroKind = 'new' | 'first' | 'full' | 'last' | 'march-equinox' | 'june-solstice' | 'sept-equinox' | 'dec-solstice' | 'solar-eclipse' | 'lunar-eclipse';

export interface AstroEvent {
  id: string;
  kind: AstroKind;
  t: number;
  title: string;
  note?: string;
}

/** Lunar phases in a year (Meeus ch. 49, main periodic terms; good to a few minutes). */
export function moonPhases(year: number): AstroEvent[] {
  const out: AstroEvent[] = [];
  const k0 = Math.floor((year - 2000) * 12.3685) - 1;
  const names: [AstroKind, string][] = [
    ['new', 'New moon'],
    ['first', 'First quarter'],
    ['full', 'Full moon'],
    ['last', 'Last quarter']
  ];
  for (let k = k0; k < k0 + 15; k++) {
    for (let q = 0; q < 4; q++) {
      const kk = k + q / 4;
      const T = kk / 1236.85;
      let jde = 2451550.09766 + 29.530588861 * kk + 0.00015437 * T * T - 0.00000015 * T * T * T;
      const E = 1 - 0.002516 * T - 0.0000074 * T * T;
      const M = norm(2.5534 + 29.1053567 * kk - 0.0000014 * T * T);
      const Mp = norm(201.5643 + 385.81693528 * kk + 0.0107582 * T * T);
      const F = norm(160.7108 + 390.67050284 * kk - 0.0016118 * T * T);
      const Om = norm(124.7746 - 1.56375588 * kk + 0.0020672 * T * T);
      let c = 0;
      if (q === 0 || q === 2) {
        const nm = q === 0;
        c =
          (nm ? -0.4072 : -0.40614) * sin(Mp) + (nm ? 0.17241 : 0.17302) * E * sin(M) + (nm ? 0.01608 : 0.01614) * sin(2 * Mp) +
          (nm ? 0.01039 : 0.01043) * sin(2 * F) + (nm ? 0.00739 : 0.00734) * E * sin(Mp - M) - (nm ? 0.00514 : 0.00515) * E * sin(Mp + M) +
          (nm ? 0.00208 : 0.00209) * E * E * sin(2 * M) - 0.00111 * sin(Mp - 2 * F) - 0.00057 * sin(Mp + 2 * F) +
          0.00056 * E * sin(2 * Mp + M) - 0.00042 * sin(3 * Mp) + 0.00042 * E * sin(M + 2 * F) + 0.00038 * E * sin(M - 2 * F) -
          0.00024 * E * sin(2 * Mp - M) - 0.00017 * sin(Om);
      } else {
        c =
          -0.62801 * sin(Mp) + 0.17172 * E * sin(M) - 0.01183 * E * sin(Mp + M) + 0.00862 * sin(2 * Mp) + 0.00804 * sin(2 * F) +
          0.00454 * E * sin(Mp - M) + 0.00204 * E * E * sin(2 * M) - 0.0018 * sin(Mp - 2 * F) - 0.0007 * sin(Mp + 2 * F) -
          0.0004 * sin(3 * Mp) - 0.00034 * E * sin(2 * Mp - M) + 0.00032 * E * sin(M + 2 * F) + 0.00032 * E * sin(M - 2 * F) -
          0.00028 * E * E * sin(Mp + 2 * M) + 0.00027 * E * sin(2 * Mp + M) - 0.00017 * sin(Om);
        const W = 0.00306 - 0.00038 * E * cos(M) + 0.00026 * cos(Mp) - 0.00002 * cos(Mp - M) + 0.00002 * cos(Mp + M) + 0.00002 * cos(2 * F);
        c += q === 1 ? W : -W;
      }
      jde += c;
      const t = fromJd(jde) - 69000; // TT to UT (Delta T ~ 69 s)
      if (new Date(t).getUTCFullYear() !== year) continue;
      const [kind, title] = names[q];
      out.push({ id: `${kind}-${Math.round(t / 60000)}`, kind, t, title });
    }
  }
  return out.sort((a, b) => a.t - b.t);
}

const SEASON_TERMS: [number, number, number][] = [
  [485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186], [182, 27.85, 445267.112],
  [156, 73.14, 45036.886], [136, 171.52, 22518.443], [77, 222.54, 65928.934], [74, 296.72, 3034.906],
  [70, 243.58, 9037.513], [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
  [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417], [18, 155.12, 67555.328],
  [17, 288.79, 4562.452], [16, 198.04, 62894.029], [14, 199.76, 31436.921], [12, 95.39, 14577.848],
  [12, 287.11, 31931.756], [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074]
];

/** Equinoxes and solstices (Meeus ch. 27, ~1 minute). */
export function seasons(year: number): AstroEvent[] {
  const Y = (year - 2000) / 1000;
  const base: [AstroKind, string, number][] = [
    ['march-equinox', 'March equinox', 2451623.80984 + 365242.37404 * Y + 0.05169 * Y ** 2 - 0.00411 * Y ** 3 - 0.00057 * Y ** 4],
    ['june-solstice', 'June solstice', 2451716.56767 + 365241.62603 * Y + 0.00325 * Y ** 2 + 0.00888 * Y ** 3 - 0.0003 * Y ** 4],
    ['sept-equinox', 'September equinox', 2451810.21715 + 365242.01767 * Y - 0.11575 * Y ** 2 + 0.00337 * Y ** 3 + 0.00078 * Y ** 4],
    ['dec-solstice', 'December solstice', 2451900.05952 + 365242.74049 * Y - 0.06223 * Y ** 2 - 0.00823 * Y ** 3 + 0.00032 * Y ** 4]
  ];
  return base.map(([kind, title, jde0]) => {
    const T = (jde0 - 2451545) / 36525;
    const W = 35999.373 * T - 2.47;
    const dl = 1 + 0.0334 * cos(W) + 0.0007 * cos(2 * W);
    const S = SEASON_TERMS.reduce((acc, [A, B, C]) => acc + A * cos(B + C * T), 0);
    const t = fromJd(jde0 + (0.00001 * S) / dl) - 69000;
    return { id: `${kind}-${year}`, kind, t, title };
  });
}

/** Solar and lunar eclipses, global greatest eclipse in TD; converted to UTC below (NASA GSFC Five Millennium Canon). */
const ECLIPSES: [string, 'solar-eclipse' | 'lunar-eclipse', string, string?][] = [
  ['2023-04-20T04:17:55Z', 'solar-eclipse', 'Hybrid solar eclipse'],
  ['2023-05-05T17:24:05Z', 'lunar-eclipse', 'Penumbral lunar eclipse'],
  ['2023-10-14T18:00:40Z', 'solar-eclipse', 'Annular solar eclipse', 'The path of annularity crossed Texas; Houston saw a deep partial eclipse.'],
  ['2023-10-28T20:15:18Z', 'lunar-eclipse', 'Partial lunar eclipse'],
  ['2024-03-25T07:13:59Z', 'lunar-eclipse', 'Penumbral lunar eclipse'],
  ['2024-04-08T18:18:29Z', 'solar-eclipse', 'Total solar eclipse', 'The path of totality crossed Texas; Houston saw about 94% of the Sun covered.'],
  ['2024-09-18T02:45:25Z', 'lunar-eclipse', 'Partial lunar eclipse'],
  ['2024-10-02T18:46:13Z', 'solar-eclipse', 'Annular solar eclipse'],
  ['2025-03-14T06:59:56Z', 'lunar-eclipse', 'Total lunar eclipse', 'Visible from Houston overnight.'],
  ['2025-03-29T10:48:36Z', 'solar-eclipse', 'Partial solar eclipse'],
  ['2025-09-07T18:12:58Z', 'lunar-eclipse', 'Total lunar eclipse'],
  ['2025-09-21T19:43:04Z', 'solar-eclipse', 'Partial solar eclipse'],
  ['2026-02-17T12:13:05Z', 'solar-eclipse', 'Annular solar eclipse'],
  ['2026-03-03T11:34:52Z', 'lunar-eclipse', 'Total lunar eclipse', 'Visible from Houston before dawn.'],
  ['2026-08-12T17:47:05Z', 'solar-eclipse', 'Total solar eclipse'],
  ['2026-08-28T04:14:04Z', 'lunar-eclipse', 'Partial lunar eclipse']
];

export function eclipses(year: number): AstroEvent[] {
  return ECLIPSES.filter(([d]) => d.startsWith(String(year))).map(([d, kind, title, note]) => {
    const t = Date.parse(d) - 69184; // TT - UTC = 69.184 s for 2023–2026
    return { id: `${kind}-${d.slice(0, 10)}`, kind, t, title, note };
  });
}

/* ------------------------------------------------------------------ the zodiac: constellations behind the Sun */

/** IAU constellations along the ecliptic, with the ecliptic longitude (J2000) where the Sun enters each. */
export const ZODIAC: [string, number][] = [
  ['Pisces', 351.650], ['Aries', 28.687], ['Taurus', 53.417], ['Gemini', 90.140], ['Cancer', 117.988], ['Leo', 138.038],
  ['Virgo', 173.851], ['Libra', 217.810], ['Scorpius', 241.047], ['Ophiuchus', 247.638], ['Sagittarius', 266.238],
  ['Capricornus', 299.656], ['Aquarius', 327.488]
];

/** Approximate Sun longitude in the same J2000 frame as the constellation boundaries.
 * Boundaries: https://www.cantab.net/users/davidasher/orrery/zodiac.html */
export function sunLongitudeJ2000(t: number): number {
  return norm(sun(t).lon - 1.39697 * centuries(t));
}

/** The constellation for a J2000 ecliptic longitude. */
export function sunConstellation(lon: number): string {
  const l = norm(lon);
  let name = ZODIAC[0][0];
  let best = -1;
  for (const [n, start] of ZODIAC) {
    const since = norm(l - start);
    if (best < 0 || since < best) {
      best = since;
      name = n;
    }
  }
  return name;
}

/* ------------------------------------------------------------------ Houston wall-clock helpers */

/** UTC offset (hours) in Houston on a calendar date: CDT from the second Sunday of March to the first Sunday of November. */
export function chicagoOffset(y: number, m: number, d: number): number {
  const nthSunday = (month: number, n: number) => {
    const first = new Date(Date.UTC(y, month, 1)).getUTCDay();
    return 1 + ((7 - first) % 7) + (n - 1) * 7;
  };
  const start = nthSunday(2, 2);
  const end = nthSunday(10, 1);
  const dst = (m > 2 && m < 10) || (m === 2 && d >= start) || (m === 10 && d < end);
  return dst ? -5 : -6;
}

/** Houston's UTC offset at an instant, including the 2 AM transition hours. */
export function chicagoOffsetAt(t: number): number {
  const y = new Date(t).getUTCFullYear();
  const sunday = (m: number, n: number) => 1 + (7 - new Date(Date.UTC(y, m, 1)).getUTCDay()) % 7 + (n - 1) * 7;
  const start = Date.UTC(y, 2, sunday(2, 2), 8); // 2 AM CST
  const end = Date.UTC(y, 10, sunday(10, 1), 7); // 2 AM CDT
  return t >= start && t < end ? -5 : -6;
}

/** JS time for Houston wall time. Overflows normalize before DST lookup.
 * Repeated fall hour uses its earlier occurrence; the missing spring hour advances. */
export function houstonTime(y: number, m: number, d: number, h: number, min = 0): number {
  const wall = Date.UTC(y, m, d, h, min);
  const daylight = wall + 5 * 3600000;
  const standard = wall + 6 * 3600000;
  return chicagoOffsetAt(daylight) === -5 ? daylight : standard;
}

export const fmtHouston = (t: number, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: HOUSTON.tz, ...opts }).format(new Date(t));

export const hm = (hours: number) => {
  const minutes = Math.round(hours * 60);
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
};

export const compass = (az: number) => ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(norm(az) / 45) % 8];
