/**
 * The celestial layer behind the Tech Talks calendar: the Sun at the centre, Mercury, Venus and Mars on their orbits,
 * and the year laid out as Earth's own orbit, with every talk, lunar phase, equinox, solstice and eclipse pinned to
 * the point of the orbit Earth occupies at that moment. Earth carries its real axial tilt and rotation (day/night
 * terminator, city lights, clouds), the Moon its real position and phase. Positions come from astro.ts.
 * Textures: NASA Visible Earth (Blue Marble, Black Marble 2016, cloud_combined), NASA SVS CGI Moon Kit (LROC).
 */
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  RingGeometry,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  NoColorSpace,
  Object3D,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Raycaster,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { drawMoon } from './renderMoon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { AstroKind, PlanetName, HOUSTON, ZODIAC, gmst, moon, planet, houstonTime, sunLongitudeJ2000 } from './astro';

export type MarkerKind = 'talk' | 'talk-upcoming' | 'talk-canceled' | AstroKind;

export interface CalendarMarker {
  id: string;
  kind: MarkerKind;
  t: number;
  label: string;
}

export type FocusBody = PlanetName | 'moon' | 'sun' | null;
/** Where the camera looks from when it locks on: over Houston, from Earth (the Moon's phase as we see it), or side-on
 * to the Sun (the terminator and the tilt of the axis). */
export type FocusView = 'houston' | 'from-earth' | 'side' | 'sunlit' | 'overview';

export interface CalendarScene {
  setYear(year: number, markers: CalendarMarker[]): void;
  setHighlight(id: string | null): void;
  focus(body: FocusBody, view?: FocusView): void;
  zoom(factor: number): void;
  system(): void;
  dispose(): void;
}

interface Options {
  canvas: HTMLCanvasElement;
  labels: HTMLElement;
  getTime: () => number;
  onHover: (id: string | null, x: number, y: number) => void;
  onPick: (id: string) => void;
  onFocusChange?: (body: FocusBody) => void;
  still: boolean;
}

const AU = 10; // scene units per astronomical unit
const EARTH_R = 0.42;
const MOON_R = 0.12;
const MOON_ORBIT = 1.25; // exaggerated Earth-Moon distance
const SUN_R = 1.15;
const EPS = 23.4393 * (Math.PI / 180);
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const YELLOW = new Color('#bacdc4');
const BLUE = new Color('#2e96f5');
const RED = new Color('#e43700');
const ORANGE = new Color('#ff9a3c');

/** Heliocentric ecliptic (x toward the vernal equinox, z north) to scene space (y up). */
const toScene = ([x, y, z]: number[], s = AU) => new Vector3(x * s, z * s, -y * s);

const earthAt = (t: number) => toScene(planet('earth', t).pos);

/* ------------------------------------------------------------------ shaders */

const EARTH_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vPosW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const EARTH_FRAG = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    float d = dot(n, sunDir);
    // soft terminator: civil twilight spans a few degrees either side of the line
    float day = smoothstep(-0.1, 0.16, d);
    float cloud = texture2D(cloudMap, vUv).r;
    vec3 surface = texture2D(dayMap, vUv).rgb;
    vec3 lit = mix(surface, vec3(1.0), cloud * 0.82) * (0.18 + 0.95 * max(d, 0.0));
    vec3 lights = texture2D(nightMap, vUv).rgb;
    lights = pow(lights, vec3(1.6)) * vec3(1.35, 1.05, 0.7) * (1.0 - cloud * 0.85) * 1.8;
    vec3 col = mix(lights, lit, day);
    // warm band along the terminator
    float band = exp(-pow(d * 7.0, 2.0));
    col += vec3(1.0, 0.42, 0.12) * band * 0.16 * (0.4 + cloud);
    // specular glint on open ocean
    vec3 v = normalize(cameraPosition - vPosW);
    float ocean = 1.0 - smoothstep(0.08, 0.2, max(max(surface.r, surface.g), surface.b) - surface.b * 0.6);
    float spec = pow(max(dot(reflect(-sunDir, n), v), 0.0), 40.0) * ocean * (1.0 - cloud) * day;
    col += vec3(1.0, 0.95, 0.85) * spec * 0.55;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const ATMO_FRAG = /* glsl */ `
  uniform vec3 sunDir;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float rim = pow(1.0 - abs(dot(n, v)), 2.6);
    float sunward = smoothstep(-0.35, 0.6, dot(n, sunDir));
    vec3 col = mix(vec3(0.25, 0.5, 1.0), vec3(0.55, 0.8, 1.0), sunward);
    gl_FragColor = vec4(col * rim * (0.15 + 1.1 * sunward), rim * (0.2 + 0.8 * sunward));
    #include <colorspace_fragment>
  }
`;

const BODY_FRAG = /* glsl */ `
  uniform sampler2D map;
  uniform vec3 tint;
  uniform float useMap;
  uniform vec3 sunPos;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    vec3 l = normalize(sunPos - vPosW);
    float d = dot(n, l);
    // phase: lit hemisphere with a narrow, physically soft terminator
    float lit = smoothstep(-0.04, 0.12, d) * (0.1 + 0.9 * max(d, 0.0));
    vec3 base = mix(tint, texture2D(map, vUv).rgb, useMap);
    gl_FragColor = vec4(base * (0.035 + 1.1 * lit), 1.0);
    #include <colorspace_fragment>
  }
`;

const SUN_FRAG = /* glsl */ `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float mu = max(dot(n, v), 0.0);
    float g = noise(n * 9.0 + time * 0.05) * 0.6 + noise(n * 23.0 - time * 0.08) * 0.4;
    vec3 col = mix(vec3(1.0, 0.55, 0.15), vec3(1.0, 0.93, 0.7), pow(mu, 0.55)) * (0.85 + 0.3 * g);
    gl_FragColor = vec4(col * (0.6 + 0.6 * pow(mu, 0.4)), 1.0);
    #include <colorspace_fragment>
  }
`;

/* ------------------------------------------------------------------ small textures */

const radial = (inner: string, outer: string) => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, outer);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
};

/** Textured snapshots of the Moon, with the illumination of each calendar phase. */
const phaseIcon = (kind: 'new' | 'first' | 'full' | 'last') => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const texture = new CanvasTexture(c);
  texture.colorSpace = SRGBColorSpace;
  drawMoon(c, { new: 0, first: 90, full: 180, last: 270 }[kind]).then(() => {
    texture.needsUpdate = true;
  }).catch(() => undefined);
  return texture;
};

const label = (text: string, cls: string) => {
  const el = document.createElement('div');
  el.className = cls;
  el.textContent = text;
  return new CSS2DObject(el);
};

/* ------------------------------------------------------------------ the scene */

export function startCalendarScene(o: Options): CalendarScene {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas: o.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch {
    throw new Error('WebGL unavailable');
  }
  let disposed = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x03050c, 1);

  const labels = new CSS2DRenderer({ element: o.labels });

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.02, 12000);
  camera.position.set(0, 21, 27);

  const controls = new OrbitControls(camera, o.canvas);
  controls.enableDamping = !o.still;
  controls.dampingFactor = 0.08;
  controls.enableZoom = false; // page scroll stays page scroll; zoom is trackpad ctrl+wheel or the HUD buttons
  controls.enablePan = false;
  controls.minDistance = 0.6;
  controls.maxDistance = 2600;
  controls.rotateSpeed = 0.6;
  o.canvas.style.touchAction = 'pan-y'; // vertical swipes scroll the page; horizontal drags orbit

  const disposables: { dispose: () => void }[] = [renderer, controls];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  /* stars */
  {
    const n = 2600;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = 6000 + Math.random() * 1200;
      const s = Math.sqrt(1 - u * u);
      pos.set([r * s * Math.cos(th), r * u, r * s * Math.sin(th)], i * 3);
    }
    const g = track(new BufferGeometry());
    g.setAttribute('position', new BufferAttribute(pos, 3));
    scene.add(new Points(g, track(new PointsMaterial({ color: 0xbfd2ff, size: 1.3, sizeAttenuation: false, transparent: true, opacity: 0.75 }))));
  }

  /* the Sun */
  const sunMat = track(new ShaderMaterial({ vertexShader: EARTH_VERT, fragmentShader: SUN_FRAG, uniforms: { time: { value: 0 } } }));
  const sunMesh = new Mesh(track(new SphereGeometry(SUN_R, 64, 32)), sunMat);
  scene.add(sunMesh);
  const glowTex = track(radial('rgba(255,236,190,1)', 'rgba(255,150,60,0.35)'));
  const sunGlow = new Sprite(track(new SpriteMaterial({ map: glowTex, blending: AdditiveBlending, depthWrite: false, transparent: true })));
  sunGlow.scale.setScalar(SUN_R * 7);
  scene.add(sunGlow);

  /* planets */
  const texLoader = new TextureLoader();
  const loadTex = (url: string) => {
    const t = texLoader.load(url);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return track(t);
  };
  const blank = track(new Texture());
  const bodyMat = (tint: string, map?: Texture) =>
    track(
      new ShaderMaterial({
        vertexShader: EARTH_VERT,
        fragmentShader: BODY_FRAG,
        uniforms: { map: { value: map ?? blank }, tint: { value: new Color(tint) }, useMap: { value: map ? 1 : 0 }, sunPos: { value: new Vector3() } }
      })
    );
  // NASA sidereal rotation periods; tilt direction/prime meridians are illustrative.
  const specs: { name: Exclude<PlanetName, 'earth'>; r: number; day: number; tilt: number; period: number }[] = [
    { name: 'mercury', r: .16, day: 1407.6, tilt: .034, period: 87.969 },
    { name: 'venus', r: .39, day: -5832.5, tilt: 2.6, period: 224.701 },
    { name: 'mars', r: .23, day: 24.623, tilt: 25.2, period: 686.98 },
    { name: 'jupiter', r: 1.65, day: 9.925, tilt: 3.1, period: 4332.59 },
    { name: 'saturn', r: 1.38, day: 10.7, tilt: 26.7, period: 10759.22 },
    { name: 'uranus', r: .85, day: -17.2, tilt: 82.2, period: 30688.5 },
    { name: 'neptune', r: .82, day: 16.1, tilt: 28.3, period: 60182 }
  ];
  const others = specs.map((spec) => {
    const map = loadTex(`/tech-talks/calendar/${spec.name}.jpg`);
    const mesh = new Mesh(track(new SphereGeometry(spec.r, 96, 48)), bodyMat('#ffffff', map));
    mesh.userData.body = spec.name;
    // Apply tilt after local spin so the pole stays fixed through each rotation.
    mesh.rotation.order = 'ZYX';
    mesh.rotation.z = spec.tilt * Math.PI / 180;
    scene.add(mesh);
    const tag = label(spec.name[0].toUpperCase() + spec.name.slice(1), 'tt-cal-label is-planet');
    scene.add(tag);
    return { ...spec, mesh, tag, map };
  });
  const saturn = others.find((p) => p.name === 'saturn')!;
  const ringGeo = track(new RingGeometry(saturn.r * 1.3, saturn.r * 2.35, 192));
  const ringPos = ringGeo.attributes.position;
  const ringUV = ringGeo.attributes.uv;
  for (let i = 0; i < ringPos.count; i++) {
    const radius = Math.hypot(ringPos.getX(i), ringPos.getY(i));
    ringUV.setXY(i, (radius / saturn.r - 1.3) / 1.05, .5);
  }
  const ring = new Mesh(ringGeo, track(new MeshBasicMaterial({ map: loadTex('/tech-talks/calendar/saturn-ring.png'), side: DoubleSide, transparent: true, opacity: .85, depthWrite: false })));
  ring.rotation.x = Math.PI / 2;
  saturn.mesh.add(ring);

  // Closed paths at the current epoch; no extrapolation of orbital shape into later centuries.
  const orbitLines = new Group();
  scene.add(orbitLines);
  for (const spec of specs) {
    const pts: number[] = [];
    const t0 = o.getTime();
    for (let i = 0; i <= 512; i++) pts.push(...toScene(planet(spec.name, t0 + (i / 512) * spec.period * 86400000, t0).pos).toArray());
    const g = track(new BufferGeometry());
    g.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3));
    orbitLines.add(new Line(g, track(new LineBasicMaterial({ color: 0x7894ac, transparent: true, opacity: .17 }))));
  }

  /* Earth */
  const earthGroup = new Group();
  earthGroup.matrixAutoUpdate = false;
  scene.add(earthGroup);
  const earthUniforms = {
    dayMap: { value: loadTex('/tech-talks/calendar/earth-day.jpg') },
    nightMap: { value: loadTex('/tech-talks/calendar/earth-night.jpg') },
    cloudMap: { value: loadTex('/tech-talks/calendar/earth-clouds.jpg') },
    sunDir: { value: new Vector3(1, 0, 0) }
  };
  earthUniforms.cloudMap.value.colorSpace = NoColorSpace; // coverage data, not colour
  const earth = new Mesh(track(new SphereGeometry(EARTH_R, 96, 48)), track(new ShaderMaterial({ vertexShader: EARTH_VERT, fragmentShader: EARTH_FRAG, uniforms: earthUniforms })));
  earthGroup.add(earth);
  const atmo = new Mesh(
    track(new SphereGeometry(EARTH_R * 1.06, 64, 32)),
    track(new ShaderMaterial({ vertexShader: EARTH_VERT, fragmentShader: ATMO_FRAG, uniforms: { sunDir: earthUniforms.sunDir }, transparent: true, blending: AdditiveBlending, depthWrite: false, side: BackSide }))
  );
  earthGroup.add(atmo);
  // Houston, on the surface
  const lat = (HOUSTON.lat * Math.PI) / 180;
  const lon = (HOUSTON.lon * Math.PI) / 180;
  const houston = new Mesh(track(new SphereGeometry(0.018, 12, 8)), track(new MeshBasicMaterial({ color: YELLOW })));
  houston.position.set(Math.cos(lat) * Math.cos(lon), Math.sin(lat), -Math.cos(lat) * Math.sin(lon)).multiplyScalar(EARTH_R * 1.004);
  earthGroup.add(houston);
  const houstonLabel = label('Houston', 'tt-cal-label is-houston');
  houstonLabel.position.copy(houston.position).multiplyScalar(1.08);
  earthGroup.add(houstonLabel);
  const earthLabel = label('Earth', 'tt-cal-label is-body');
  earthLabel.position.set(0, EARTH_R * 1.9, 0);
  scene.add(earthLabel);

  /* the Moon */
  const moonMat = bodyMat('#b8b8b8', loadTex('/tech-talks/calendar/moon.jpg'));
  const moonMesh = new Mesh(track(new SphereGeometry(MOON_R, 48, 24)), moonMat);
  scene.add(moonMesh);
  earth.userData.body = 'earth'; moonMesh.userData.body = 'moon'; sunMesh.userData.body = 'sun';
  const bodyMeshes = [earth, moonMesh, sunMesh, ...others.map((p) => p.mesh)];
  let hdController: AbortController | undefined;
  let releaseHD: (() => void) | undefined;
  const detailMap = async (body: FocusBody) => {
    hdController?.abort(); releaseHD?.(); releaseHD = undefined;
    if (window.innerWidth < 900 || !body || !['earth', 'moon', 'mars', 'jupiter', 'saturn'].includes(body)) return;
    const controller = new AbortController(); hdController = controller;
    const uniform = body === 'earth' ? earthUniforms.dayMap : body === 'moon' ? moonMat.uniforms.map : (others.find((p) => p.name === body)!.mesh.material as ShaderMaterial).uniforms.map;
    const low = uniform.value;
    try {
      const response = await fetch(`/tech-talks/calendar/${body}-hd.jpg`, { signal: controller.signal });
      if (!response.ok) return;
      const limit = Math.min(4096, renderer.capabilities.maxTextureSize);
      const bitmap = await createImageBitmap(await response.blob(), { resizeWidth: limit, resizeHeight: limit / 2, imageOrientation: 'flipY' });
      if (disposed || controller.signal.aborted) { bitmap.close(); return; }
      const high = new Texture(bitmap); high.colorSpace = SRGBColorSpace; high.flipY = false;
      high.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); high.needsUpdate = true;
      uniform.value = high;
      releaseHD = () => { uniform.value = low; high.dispose(); bitmap.close(); };
    } catch { /* The lightweight map remains usable offline or after switching bodies. */ }
  };

  const moonOrbit = (() => {
    const pts: number[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(Math.cos(a) * MOON_ORBIT, 0, Math.sin(a) * MOON_ORBIT);
    }
    const g = track(new BufferGeometry());
    g.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3));
    return new Line(g, track(new LineBasicMaterial({ color: 0x9fb3d9, transparent: true, opacity: 0.22 })));
  })();
  scene.add(moonOrbit);

  /* the zodiac, on a far ring: the constellation behind the Sun as seen from Earth */
  const zodiac = new Group();
  scene.add(zodiac);
  const zodiacLabels: { name: string; obj: CSS2DObject }[] = [];
  ZODIAC.forEach(([name, start], i) => {
    const next = ZODIAC[(i + 1) % ZODIAC.length][1];
    const span = (((next - start) % 360) + 360) % 360;
    const mid = ((start + span / 2) * Math.PI) / 180;
    const obj = label(name, 'tt-cal-label is-zodiac');
    obj.position.copy(toScene([Math.cos(mid), Math.sin(mid), 0], 22));
    zodiac.add(obj);
    zodiacLabels.push({ name, obj });
  });

  /* the year: Earth's orbit as a calendar ring */
  const yearGroup = new Group();
  scene.add(yearGroup);
  const pickables: Object3D[] = [];
  const markerObjs = new Map<string, { obj: Object3D; kind: MarkerKind; base: number }>();
  const lineMat = track(new LineBasicMaterial({ color: 0x9dc6ff, transparent: true, opacity: 0.25 }));
  const tickMat = track(new LineBasicMaterial({ color: 0x9dc6ff, transparent: true, opacity: 0.14 }));
  const monthMat = track(new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }));
  const talkGeo = track(new CylinderGeometry(0.018, 0.018, 1, 12));
  const talkMats = {
    talk: track(new MeshBasicMaterial({ color: YELLOW })),
    'talk-upcoming': track(new MeshBasicMaterial({ color: YELLOW })),
    'talk-canceled': track(new MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.8 }))
  };
  const capTex = track(radial('rgba(208,229,225,0.7)', 'rgba(156,188,194,0.08)'));
  const seasonGeo = track(new OctahedronGeometry(0.17));
  const seasonMat = track(new MeshBasicMaterial({ color: BLUE }));
  const eclipseGeo = track(new TorusGeometry(0.19, 0.035, 8, 32));
  const eclipseMats = { 'solar-eclipse': track(new MeshBasicMaterial({ color: ORANGE })), 'lunar-eclipse': track(new MeshBasicMaterial({ color: RED })) };
  const phaseTex = { new: track(phaseIcon('new')), first: track(phaseIcon('first')), full: track(phaseIcon('full')), last: track(phaseIcon('last')) };

  let highlight: string | null = null;

  const clearYear = () => {
    yearGroup.children.slice().forEach((c) => {
      yearGroup.remove(c);
      if (c instanceof Line || c instanceof LineSegments || c instanceof LineLoop) c.geometry.dispose();
      if (c instanceof CSS2DObject) c.element.remove();
      c.traverse((d) => {
        if (d instanceof CSS2DObject) d.element.remove();
        if (d instanceof Sprite) d.material.dispose();
      });
    });
    pickables.length = 0;
    markerObjs.clear();
  };

  const setYear = (year: number, markers: CalendarMarker[]) => {
    clearYear();
    const t0 = houstonTime(year, 0, 1, 0);
    const t1 = houstonTime(year + 1, 0, 1, 0);
    const days = Math.round((t1 - t0) / 86400000);
    // the ring: one point per six hours of the year, so Earth's changing speed shows in the spacing
    const ring: number[] = [];
    for (let i = 0; i <= days * 4; i++) ring.push(...earthAt(t0 + i * 21600000).toArray());
    const ringGeo = new BufferGeometry();
    ringGeo.setAttribute('position', new BufferAttribute(new Float32Array(ring), 3));
    yearGroup.add(new Line(ringGeo, lineMat));
    // day ticks, longer at each month
    const ticks: number[] = [];
    const months: number[] = [];
    for (let d = 0; d < days; d++) {
      const t = houstonTime(year, 0, d + 1, 0);
      const p = earthAt(t);
      const out = p.clone().setY(0).normalize();
      const first = new Date(Date.UTC(year, 0, d + 1)).getUTCDate() === 1;
      const inner = p.clone().addScaledVector(out, first ? -0.45 : -0.14);
      const outer = p.clone().addScaledVector(out, first ? 0.45 : 0.14);
      (first ? months : ticks).push(...inner.toArray(), ...outer.toArray());
    }
    const tg = new BufferGeometry();
    tg.setAttribute('position', new BufferAttribute(new Float32Array(ticks), 3));
    yearGroup.add(new LineSegments(tg, tickMat));
    const mg = new BufferGeometry();
    mg.setAttribute('position', new BufferAttribute(new Float32Array(months), 3));
    yearGroup.add(new LineSegments(mg, monthMat));
    MONTHS.forEach((m, i) => {
      const t = houstonTime(year, i, 15, 0);
      const p = earthAt(t);
      const obj = label(m, 'tt-cal-label is-month');
      obj.position.copy(p.clone().addScaledVector(p.clone().setY(0).normalize(), 1.35));
      yearGroup.add(obj);
    });
    const yearLabel = label(String(year), 'tt-cal-label is-year');
    yearLabel.position.set(0, -2.4, 0);
    yearGroup.add(yearLabel);

    // markers
    for (const m of markers) {
      const p = earthAt(m.t);
      const out = p.clone().setY(0).normalize();
      let obj: Object3D;
      let base = 1;
      if (m.kind === 'talk' || m.kind === 'talk-upcoming' || m.kind === 'talk-canceled') {
        const h = m.kind === 'talk-canceled' ? 0.22 : 0.5;
        const g = new Group();
        const bar = new Mesh(talkGeo, talkMats[m.kind]);
        bar.scale.y = h;
        bar.position.y = h / 2;
        const cap = new Sprite(new SpriteMaterial({ map: capTex, blending: AdditiveBlending, depthWrite: false, transparent: true, color: m.kind === 'talk-canceled' ? RED : YELLOW }));
        cap.scale.setScalar(0.18);
        cap.position.y = h + 0.05;
        g.add(bar, cap);
        g.position.copy(p);
        bar.userData.id = m.id;
        cap.userData.id = m.id;
        pickables.push(bar, cap);
        obj = g;
      } else if (m.kind.endsWith('equinox') || m.kind.endsWith('solstice')) {
        const mesh = new Mesh(seasonGeo, seasonMat);
        mesh.position.copy(p).addScaledVector(out, 0.75).setY(0.12);
        mesh.userData.id = m.id;
        pickables.push(mesh);
        const l = label(m.kind.endsWith('solstice') ? 'Solstice' : 'Equinox', 'tt-cal-label is-season');
        l.position.set(0, 0.36, 0);
        mesh.add(l);
        obj = mesh;
      } else if (m.kind === 'solar-eclipse' || m.kind === 'lunar-eclipse') {
        const mesh = new Mesh(eclipseGeo, eclipseMats[m.kind]);
        mesh.position.copy(p).addScaledVector(out, m.kind === 'solar-eclipse' ? 1.15 : -1.15);
        mesh.rotation.x = Math.PI / 2;
        mesh.userData.id = m.id;
        pickables.push(mesh);
        obj = mesh;
      } else {
        const s = new Sprite(new SpriteMaterial({ map: phaseTex[m.kind as 'new' | 'first' | 'full' | 'last'], transparent: true, depthWrite: false }));
        base = 0.32;
        s.scale.setScalar(base);
        s.position.copy(p).addScaledVector(out, -0.62);
        s.userData.id = m.id;
        pickables.push(s);
        obj = s;
      }
      yearGroup.add(obj);
      markerObjs.set(m.id, { obj, kind: m.kind, base });
    }
    setHighlight(highlight);
  };

  const setHighlight = (id: string | null) => {
    highlight = id;
    markerObjs.forEach((m, key) => {
      const on = key === id;
      if (m.obj instanceof Sprite) m.obj.scale.setScalar(m.base * (on ? 1.7 : 1));
      else m.obj.scale.setScalar(on ? 1.45 : 1);
    });
  };

  /* camera focus: overview, or locked onto a body that keeps moving with time */
  let focusBody: FocusBody = null;
  let focusView: FocusView | null = null;
  let focusDist = camera.position.length();
  const overviewDist = camera.position.length();
  const focusPos = new Vector3();
  const bodyPos = (b: FocusBody, out: Vector3) => {
    if (b === 'earth') return out.copy(earthPos);
    if (b === 'moon') return out.copy(moonMesh.position);
    const other = others.find((p) => p.name === b);
    if (other) return out.copy(other.mesh.position);
    return out.set(0, 0, 0);
  };
  const focus = (b: FocusBody, view?: FocusView) => {
    focusBody = b;
    focusView = b ? view ?? null : 'overview';
    const other = others.find((p) => p.name === b);
    focusDist = other ? other.r * (b === 'saturn' ? 9 : 5.5) : b === 'earth' ? 2.3 : b === 'moon' ? 0.85 : b === 'sun' ? 7 : overviewDist;
    controls.minDistance = other ? other.r * 2.6 : b === 'earth' ? .65 : b === 'moon' ? .25 : b === 'sun' ? 2.5 : .6;
    void detailMap(b);
    if (b && !view) focusView = b === 'moon' ? 'from-earth' : 'sunlit';
    o.onFocusChange?.(b);
  };
  const zoom = (factor: number) => {
    focusDist = Math.min(controls.maxDistance, Math.max(controls.minDistance, focusDist * factor));
    if (focusBody && factor > 1 && focusDist > 18) { focusBody = null; focusView = null; o.onFocusChange?.(null); void detailMap(null); }
  };

  const system = () => { focus(null); focusDist = Math.min(2500, 390 / (Math.tan(camera.fov * Math.PI / 360) * Math.min(1, camera.aspect))); };

  const onWheel = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return; // trackpad pinch arrives as ctrl+wheel
    e.preventDefault();
    zoom(Math.exp(e.deltaY * 0.01));
  };
  o.canvas.addEventListener('wheel', onWheel, { passive: false });

  let pinchDistance = 0;
  const pinch = (event: TouchEvent) => {
    if (event.touches.length !== 2) { pinchDistance = 0; return; }
    event.preventDefault();
    const [a, b] = Array.from(event.touches);
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    if (pinchDistance) zoom(pinchDistance / distance);
    pinchDistance = distance;
  };
  const endPinch = () => { pinchDistance = 0; };
  o.canvas.addEventListener('touchstart', pinch, { passive: false });
  o.canvas.addEventListener('touchmove', pinch, { passive: false });
  o.canvas.addEventListener('touchend', endPinch);

  /* picking */
  const ray = new Raycaster();
  const ndc = new Vector2();
  let hovered: string | null = null;
  let down: { x: number; y: number } | null = null;
  const pick = (e: PointerEvent) => {
    const r = o.canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects([...pickables, ...bodyMeshes], false).find(({ object }) => {
      for (let parent: Object3D | null = object; parent; parent = parent.parent) if (!parent.visible) return false;
      return true;
    });
    return (hit?.object.userData.id as string | undefined) ?? (hit?.object.userData.body ? `body:${hit.object.userData.body}` : null);
  };
  const onMove = (e: PointerEvent) => {
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6 &&
      (e.pointerType !== 'touch' || Math.abs(e.clientX - down.x) > Math.abs(e.clientY - down.y))) focusView = null;
    if (e.pointerType === 'touch') return;
    const id = pick(e);
    if (id !== hovered) {
      hovered = id;
      o.canvas.style.cursor = id ? 'pointer' : '';
    }
    o.onHover(id?.startsWith('body:') ? null : id, e.clientX, e.clientY);
  };
  const onLeave = () => {
    hovered = null;
    o.canvas.style.cursor = '';
    o.onHover(null, 0, 0);
  };
  const onDown = (e: PointerEvent) => (down = { x: e.clientX, y: e.clientY });
  const onUp = (e: PointerEvent) => {
    const start = down;
    down = null;
    if (!start || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) return;
    const id = pick(e);
    if (id?.startsWith('body:')) focus(id.slice(5) as FocusBody);
    else if (id) o.onPick(id);
  };
  const onCancel = () => { down = null; onLeave(); };
  o.canvas.addEventListener('pointercancel', onCancel);
  o.canvas.addEventListener('pointermove', onMove);
  o.canvas.addEventListener('pointerleave', onLeave);
  o.canvas.addEventListener('pointerdown', onDown);
  o.canvas.addEventListener('pointerup', onUp);

  /* per-frame state */
  const earthPos = new Vector3();
  const tmp = new Vector3();
  const m3 = new Matrix4();
  const lunarX = new Vector3();
  const lunarY = new Vector3();
  const lunarZ = new Vector3();
  const UP = new Vector3(0, 1, 0);
  const want = new Vector3();

  const place = (t: number) => {
    earthPos.copy(earthAt(t));
    // Earth's orientation: body frame (y north, +x Greenwich) -> Earth-fixed -> inertial (sidereal turn) -> ecliptic
    // (axial tilt) -> scene
    const th = (gmst(t) * Math.PI) / 180;
    const c = Math.cos(th), s = Math.sin(th), ce = Math.cos(EPS), se = Math.sin(EPS);
    // columns: images of body-frame x, y, z
    const bx = [c, s * ce, -s * se]; // ECEF x -> ecliptic (x, y, z)
    const bz = [0, se, ce]; // ECEF z (north) -> ecliptic
    const by = [s, -c * ce, c * se]; // body z = -(ECEF y)
    const sc = (v: number[]) => [v[0], v[2], -v[1]]; // ecliptic -> scene
    const cx = sc(bx), cy = sc(bz), cz = sc(by);
    m3.set(cx[0] , cy[0], cz[0], earthPos.x, cx[1], cy[1], cz[1], earthPos.y, cx[2], cy[2], cz[2], earthPos.z, 0, 0, 0, 1);
    earthGroup.matrix.copy(m3);
    earthGroup.matrixWorldNeedsUpdate = true;
    earthUniforms.sunDir.value.copy(earthPos).negate().normalize();
    earthLabel.position.copy(earthPos).add(tmp.set(0, EARTH_R * 1.9, 0));
    earthLabel.visible = focusBody !== 'earth'; // CSS2DRenderer owns the elements' display
    // Houston's label only up close, and only on the side of Earth facing the camera
    earthGroup.updateMatrixWorld(true);
    houston.getWorldPosition(tmp);
    const facing = tmp.clone().sub(earthPos).normalize().dot(camera.position.clone().sub(tmp).normalize());
    houstonLabel.visible = focusBody === 'earth' && facing > 0.15;

    // the Moon: geocentric ecliptic position, drawn at an exaggerated distance, near side toward Earth
    const mo = moon(t);
    const ml = (mo.lon * Math.PI) / 180, mb = (mo.lat * Math.PI) / 180;
    moonMesh.position.copy(earthPos).add(toScene([Math.cos(mb) * Math.cos(ml), Math.cos(mb) * Math.sin(ml), Math.sin(mb)], MOON_ORBIT));
    lunarX.copy(earthPos).sub(moonMesh.position).normalize();
    lunarY.copy(UP).addScaledVector(lunarX, -UP.dot(lunarX)).normalize();
    lunarZ.crossVectors(lunarX, lunarY);
    moonMesh.quaternion.setFromRotationMatrix(m3.makeBasis(lunarX, lunarY, lunarZ));
    moonOrbit.position.copy(earthPos);
    (moonMat.uniforms.sunPos.value as Vector3).copy(moonMesh.position).addScaledVector(earthUniforms.sunDir.value, 10000);

    for (const p of others) {
      p.mesh.position.copy(toScene(planet(p.name, t).pos));
      p.mesh.rotation.y = ((t / 3600000 / p.day) % 1) * Math.PI * 2;
      const distance = camera.position.distanceTo(p.mesh.position);
      p.tag.position.copy(p.mesh.position).add(new Vector3(0, Math.max(p.r * 1.7, distance * .014), 0));
      p.tag.visible = !(camera.position.length() > 100 && ['mercury','venus','mars'].includes(p.name)) && focusBody !== p.name && (distance > 24 || ['mercury','venus','mars'].includes(p.name));
      (p.mesh.material as ShaderMaterial).uniforms.sunPos.value.set(0, 0, 0);
    }

    // the constellation behind the Sun, seen from Earth
    const sl = sunLongitudeJ2000(t);
    zodiacLabels.forEach(({ obj }, i) => {
      const start = ZODIAC[i][1];
      const next = ZODIAC[(i + 1) % ZODIAC.length][1];
      const inside = ((sl - start + 360) % 360) < ((next - start + 360) % 360);
      obj.element.classList.toggle('is-current', inside);
    });
  };

  let w = 0;
  let h = 0;
  let raf = 0;
  let visible = false;
  let last = performance.now();

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const cw = o.canvas.clientWidth;
    const ch = o.canvas.clientHeight;
    if (cw !== w || ch !== h) {
      w = cw;
      h = ch;
      renderer.setSize(w, h, false);
      labels.setSize(w, h);
      camera.aspect = w / Math.max(1, h);
      camera.fov = camera.aspect < 0.8 ? 52 : 38;
      camera.updateProjectionMatrix();
    }
    const t = o.getTime();
    place(t);
    sunMat.uniforms.time.value = o.still ? 0 : (t / 3600000) / 24;

    // follow the focused body; ease the distance, and the direction when a view is locked
    const k = o.still ? 1 : 1 - Math.pow(0.0015, dt);
    bodyPos(focusBody, focusPos);
    tmp.subVectors(focusPos, controls.target).multiplyScalar(k);
    controls.target.add(tmp);
    camera.position.add(tmp);
    const offset = tmp.subVectors(camera.position, controls.target);
    const len = offset.length();
    if (focusView) {
      if (focusView === 'overview') want.set(0, .62, .78).normalize();
      else if (focusView === 'houston') houston.getWorldPosition(want).sub(earthPos).normalize();
      else if (focusView === 'from-earth') want.subVectors(earthPos, moonMesh.position).normalize();
      else if (focusView === 'sunlit') {
        bodyPos(focusBody, want).negate().normalize();
        if (want.lengthSq() === 0) want.set(0, 0, 1);
      }
      else want.crossVectors(UP, earthUniforms.sunDir.value).normalize();
      if (focusView !== 'from-earth') want.addScaledVector(UP, 0.28).normalize();
      offset.normalize().lerp(want, k).normalize();
    } else offset.normalize();
    offset.multiplyScalar(len + (focusDist - len) * k);
    camera.position.copy(controls.target).add(offset);
    controls.update();

    // markers that would fill the frame up close step aside
    const clear = focusBody ? 6 : 3.2;
    markerObjs.forEach((m) => {
      m.obj.visible = m.obj.position.distanceTo(camera.position) > clear;
    });

    const overview = camera.position.length();
    yearGroup.visible = overview < 95;
    zodiac.visible = overview < 75 && !focusBody;
    moonOrbit.visible = focusBody === 'earth' || focusBody === 'moon' || overview < 28;
    renderer.render(scene, camera);
    labels.render(scene, camera);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });
  io.observe(o.canvas);

  return {
    setYear,
    setHighlight,
    focus,
    zoom,
    system,
    dispose() {
      disposed = true; hdController?.abort(); releaseHD?.();
      o.canvas.removeEventListener('touchstart', pinch);
      o.canvas.removeEventListener('touchmove', pinch);
      o.canvas.removeEventListener('touchend', endPinch);
      io.disconnect();
      cancelAnimationFrame(raf);
      o.canvas.removeEventListener('wheel', onWheel);
      o.canvas.removeEventListener('pointercancel', onCancel);
      o.canvas.removeEventListener('pointermove', onMove);
      o.canvas.removeEventListener('pointerleave', onLeave);
      o.canvas.removeEventListener('pointerdown', onDown);
      o.canvas.removeEventListener('pointerup', onUp);
      clearYear();
      zodiac.traverse((d) => d instanceof CSS2DObject && d.element.remove());
      scene.traverse((d) => d instanceof CSS2DObject && d.element.remove());
      renderer.forceContextLoss();
      disposables.forEach((d) => d.dispose());
    }
  };
}
