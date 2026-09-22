import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';

const source = await readFile(new URL('../src/components/tech-talks/astro.ts', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'ts', format: 'esm' });
const astro = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const { chicagoOffsetAt, houstonTime, hm, eclipses, seasons, moonPhases, sun, moon, planet } = astro;

assert.equal(chicagoOffsetAt(Date.parse('2026-03-08T07:59:59Z')), -6);
assert.equal(chicagoOffsetAt(Date.parse('2026-03-08T08:00:00Z')), -5);
assert.equal(chicagoOffsetAt(Date.parse('2026-11-01T06:59:59Z')), -5);
assert.equal(chicagoOffsetAt(Date.parse('2026-11-01T07:00:00Z')), -6);
assert.equal(houstonTime(2026, 0, 1, 0), Date.parse('2026-01-01T06:00Z'));
assert.equal(houstonTime(2026, 2, 8, 0), Date.parse('2026-03-08T06:00Z'));
assert.equal(houstonTime(2026, 2, 8, 3), Date.parse('2026-03-08T08:00Z'));
assert.equal(houstonTime(2026, 10, 1, 0), Date.parse('2026-11-01T05:00Z'));
assert.equal(houstonTime(2026, 10, 1, 2), Date.parse('2026-11-01T08:00Z'));
assert.equal(houstonTime(2026, 2, 0, 18), houstonTime(2026, 1, 28, 18));
assert.equal(hm(10 + 59.9 / 60), '11h 00m');

// USNO seasonal and lunar phase UTC values, with the documented low-precision tolerance.
for (const [year, expected] of [
  [2023, ['2023-03-20T21:24Z', '2023-06-21T14:58Z', '2023-09-23T06:50Z', '2023-12-22T03:27Z']],
  [2024, ['2024-03-20T03:06Z', '2024-06-20T20:51Z', '2024-09-22T12:44Z', '2024-12-21T09:20Z']],
  [2025, ['2025-03-20T09:01Z', '2025-06-21T02:42Z', '2025-09-22T18:19Z', '2025-12-21T15:03Z']],
  [2026, ['2026-03-20T14:46Z', '2026-06-21T08:24Z', '2026-09-23T00:05Z', '2026-12-21T20:50Z']]
]) {
  seasons(year).forEach((event, i) => assert.ok(Math.abs(event.t - Date.parse(expected[i])) < 3 * 60000, `${event.id} season time`));
  for (const phase of moonPhases(year)) {
    const lit = moon(phase.t).illum;
    const expectedLit = phase.kind === 'new' ? 0 : phase.kind === 'full' ? 1 : 0.5;
    assert.ok(Math.abs(lit - expectedLit) < 0.015, `${phase.id} illumination`);
  }
  assert.equal(eclipses(year).length, 4);
  for (let month = 0; month < 12; month++) {
    const t = houstonTime(year, month, 15, 18);
    assert.ok(planet('earth', t).speed > 29.2 && planet('earth', t).speed < 30.4);
    assert.ok(Math.abs(sun(t).dec) <= 23.5);
  }
}
// https://aa.usno.navy.mil/api/moon/phases/year?year=2026 (and 2023–2025)
for (const [year, kind, expected] of [
  [2023, 'full', '2023-01-06T23:08Z'], [2023, 'last', '2023-01-15T02:10Z'],
  [2024, 'last', '2024-01-04T03:30Z'], [2024, 'new', '2024-01-11T11:57Z'],
  [2025, 'first', '2025-01-06T23:56Z'], [2025, 'full', '2025-01-13T22:27Z'],
  [2026, 'full', '2026-01-03T10:03Z'], [2026, 'last', '2026-01-10T15:48Z']
]) {
  assert.ok(Math.abs(moonPhases(year).find((e) => e.kind === kind).t - Date.parse(expected)) < 3 * 60000, expected);
}
assert.equal(eclipses(2024).find((e) => e.id === 'solar-eclipse-2024-04-08').t, Date.parse('2024-04-08T18:17:19.816Z'));
console.log('PASS: Houston DST and date normalization, duration rounding, 16 seasons, all lunar phases, eclipse times and orbital ranges.');
