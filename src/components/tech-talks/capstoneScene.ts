/**
 * The "requires software" beat: NASA's CAPSTONE CubeSat arrives in its near rectilinear halo orbit around the page's
 * own rotating Moon, NASA's Lunar Reconnaissance Orbiter circles low, and once both are in view a signal passes
 * between them: the spacecraft-to-spacecraft ranging CAPSTONE tested with LRO in May 2023 for its CAPS navigation
 * software. Drawn live over the Moon video, which a depth-only sphere stands in for, so the spacecraft really pass
 * behind it. Models: NASA/JPL-Caltech, Eyes on the Solar System.
 */
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  Box3,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DirectionalLight,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const MOON_DISK = 0.395; // moon video: the Moon's radius as a share of the frame
const SUN = new Vector3(-0.62, 0.3, 0.72).normalize(); // the light the Moon was rendered with, in view space

// scroll window (the section's --p) for the beat
const ARRIVE = [0.335, 0.4]; // CAPSTONE flies in to the top of its orbit, over the north pole
const LINK = 0.398; // ranging starts, both spacecraft over the pole with a clear line of sight
const ACTIVE = [0.3, 0.52];

// CAPSTONE's orbit, drawn after its NRHO: close over the north pole, far out below the south pole. Units: Moon radii
const PERI = 1.75;
const APO = 3.6;
const ECC = (APO - PERI) / (APO + PERI);
const SEMI_LATUS = ((PERI + APO) / 2) * (1 - ECC * ECC);
const TO_APO = new Vector3(0.18, -1, 0).normalize();
const ACROSS = new Vector3(0.55, 0, 0.83).normalize();
const NU_START = 2.55;
const NU_ARRIVED = 0.05;
const capstoneAt = (nu: number, out: Vector3) => {
  const r = SEMI_LATUS / (1 + ECC * Math.cos(nu));
  return out.copy(TO_APO).multiplyScalar(-Math.cos(nu) * r).addScaledVector(ACROSS, Math.sin(nu) * r);
};

// LRO: a low polar orbit seen nearly edge-on; it climbs across the face of the Moon to meet CAPSTONE over the pole
const LRO_ALT = 1.2;
const POLE = new Vector3(0.15, 1, 0).normalize();
const FACING = new Vector3(0.34, 0, 0.94).normalize();
const THETA_START = 2.6;
const THETA_ARRIVED = 0.62;
const lroAt = (theta: number, out: Vector3) =>
  out.copy(POLE).multiplyScalar(Math.cos(theta) * LRO_ALT).addScaledVector(FACING, Math.sin(theta) * LRO_ALT);

const TRAIL_POINTS = 180;

const glowTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(190,225,255,0.8)');
  grad.addColorStop(1, 'rgba(120,180,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
};

/** Fits a loaded model to `size` Moon radii along its longest side, centred on its own middle. */
const fit = (model: Object3D, size: number) => {
  const box = new Box3().setFromObject(model);
  const dims = box.getSize(new Vector3());
  const centre = box.getCenter(new Vector3());
  model.position.sub(centre);
  const holder = new Group();
  holder.add(model);
  holder.scale.setScalar(size / Math.max(dims.x, dims.y, dims.z));
  return holder;
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function startCapstoneScene(canvas: HTMLCanvasElement, section: HTMLElement, moon: HTMLElement): () => void {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch {
    return () => undefined;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.38;
  const sun = new DirectionalLight(0xfff4e6, 3.6);
  sun.position.copy(SUN).multiplyScalar(10);
  scene.add(sun, new AmbientLight(0x8899bb, 0.12));

  const camera = new OrthographicCamera(0, 1, 0, -1, -5000, 5000);
  camera.position.z = 2000;

  // everything below lives in Moon radii around the Moon's centre
  const frame = new Group();
  scene.add(frame);
  const occluder = new Mesh(new SphereGeometry(1, 96, 48), new MeshBasicMaterial({ colorWrite: false }));
  occluder.renderOrder = -1;
  frame.add(occluder);

  const trailGeo = new BufferGeometry();
  const trailPos = new Float32Array(TRAIL_POINTS * 3);
  const trailCol = new Float32Array(TRAIL_POINTS * 3);
  trailGeo.setAttribute('position', new BufferAttribute(trailPos, 3));
  trailGeo.setAttribute('color', new BufferAttribute(trailCol, 3));
  const trail = new Line(trailGeo, new LineBasicMaterial({ vertexColors: true, transparent: true, blending: AdditiveBlending, depthWrite: false }));
  frame.add(trail);

  const linkGeo = new BufferGeometry();
  const linkPos = new Float32Array(6);
  linkGeo.setAttribute('position', new BufferAttribute(linkPos, 3));
  const linkMat = new LineBasicMaterial({ color: 0x9fd0ff, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
  const link = new Line(linkGeo, linkMat);
  frame.add(link);
  const glow = glowTexture();
  const pulse = new Sprite(new SpriteMaterial({ map: glow, transparent: true, blending: AdditiveBlending, depthWrite: false, opacity: 0 }));
  pulse.scale.setScalar(0.13);
  frame.add(pulse);

  const capstone = new Group();
  const lro = new Group();
  frame.add(capstone, lro);
  const loader = new GLTFLoader();
  let loaded = 0;
  loader.load('/tech-talks/models/capstone.glb', (g) => {
    const m = fit(g.scene, 0.62);
    capstone.add(m);
    loaded++;
  });
  loader.load('/tech-talks/models/lro.glb', (g) => {
    lro.add(fit(g.scene, 0.46));
    loaded++;
  });

  const cPos = new Vector3();
  const lPos = new Vector3();
  const tmp = new Vector3();
  let w = 0;
  let h = 0;
  let raf = 0;
  let visible = false;
  let cleared = true;

  const draw = (now: number) => {
    raf = requestAnimationFrame(draw);
    const p = parseFloat(section.style.getPropertyValue('--p')) || 0;
    if (p < ACTIVE[0] || p > ACTIVE[1] || loaded < 2) {
      if (!cleared) {
        renderer.clear();
        cleared = true;
      }
      return;
    }
    cleared = false;

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw !== w || ch !== h) {
      w = cw;
      h = ch;
      renderer.setSize(w, h, false);
      camera.right = w;
      camera.bottom = -h;
      camera.updateProjectionMatrix();
    }
    const box = canvas.getBoundingClientRect();
    const m = moon.getBoundingClientRect();
    const radius = m.width * MOON_DISK;
    frame.position.set(m.left + m.width / 2 - box.left, -(m.top + m.height / 2 - box.top), 0);
    frame.scale.setScalar(radius);

    // CAPSTONE: in fast from below, easing into the pass over the pole, then drifting on
    const a = smooth(ARRIVE[0], ARRIVE[1], p);
    const eased = 1 - Math.pow(1 - a, 3);
    const after = Math.max(0, p - ARRIVE[1]);
    const nu = NU_START + (NU_ARRIVED - NU_START) * eased - after * 12;
    capstoneAt(nu, cPos);
    capstone.position.copy(cPos);
    // a three-quarter view of the CubeSat with its array catching the sun, turning slowly as it flies
    capstone.rotation.set(0.55, -0.95 + p * 2.4, 0.18);

    for (let i = 0; i < TRAIL_POINTS; i++) {
      const f = i / (TRAIL_POINTS - 1);
      capstoneAt(NU_START + (nu - NU_START) * f, tmp);
      trailPos.set([tmp.x, tmp.y, tmp.z], i * 3);
      const k = 0.8 * Math.pow(f, 1.4) * a; // fades toward where it came from
      trailCol.set([0.62 * k, 0.8 * k, k], i * 3);
    }
    trailGeo.attributes.position.needsUpdate = true;
    trailGeo.attributes.color.needsUpdate = true;
    trailGeo.computeBoundingSphere();

    const theta = THETA_START + (THETA_ARRIVED - THETA_START) * smooth(ARRIVE[0], ARRIVE[1], p) - after * 10;
    lroAt(theta, lPos);
    lro.position.copy(lPos);
    tmp.copy(lPos).multiplyScalar(0.5); // instruments to the Moon, array to the side
    lro.lookAt(tmp);

    // the ranging signal, only while the two can see each other
    tmp.subVectors(lPos, cPos);
    const len = tmp.length();
    const tc = Math.min(1, Math.max(0, -cPos.dot(tmp) / (len * len)));
    const clearance = tmp.multiplyScalar(tc).add(cPos).length();
    const on = smooth(LINK, LINK + 0.02, p) * smooth(1.02, 1.12, clearance);
    linkPos.set([cPos.x, cPos.y, cPos.z, lPos.x, lPos.y, lPos.z]);
    linkGeo.attributes.position.needsUpdate = true;
    linkGeo.computeBoundingSphere();
    linkMat.opacity = 0.6 * on;
    const trip = ((now / 1000) % 1.6) / 1.6;
    const along = trip < 0.5 ? trip * 2 : 2 - trip * 2;
    pulse.position.copy(cPos).lerp(lPos, along);
    (pulse.material as SpriteMaterial).opacity = on;

    renderer.render(scene, camera);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) raf = requestAnimationFrame(draw);
  });
  io.observe(section);

  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
    renderer.dispose();
    pmrem.dispose();
    glow.dispose();
  };
}
