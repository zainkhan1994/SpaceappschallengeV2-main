/** A shaded sphere sampled from the real lunar surface map. Phase snapshots, not extra moons. */
let pixels: Promise<ImageData> | undefined;
const surface = () => pixels ??= new Promise<ImageData>((resolve, reject) => {
  const image = new Image();
  image.onload = () => {
    const c = document.createElement('canvas');
    c.width = 2048; c.height = 1024;
    const g = c.getContext('2d', { willReadFrequently: true });
    if (!g) { reject(new Error('Canvas unavailable')); return; }
    g.drawImage(image, 0, 0, c.width, c.height);
    resolve(g.getImageData(0, 0, c.width, c.height));
  };
  image.onerror = () => reject(new Error('Moon texture unavailable'));
  image.src = '/tech-talks/calendar/moon.jpg';
});

export async function drawMoon(canvas: HTMLCanvasElement, elongation: number, size = 256): Promise<void> {
  const map = await surface();
  const g = canvas.getContext('2d');
  if (!g) return;
  canvas.width = canvas.height = size;
  const output = g.createImageData(size, size);
  const angle = elongation * Math.PI / 180;
  const lightX = Math.sin(angle), lightZ = -Math.cos(angle);
  for (let py = 0; py < size; py++) for (let px = 0; px < size; px++) {
    const x = (px + 0.5 - size / 2) / (size * 0.48);
    const y = (size / 2 - py - 0.5) / (size * 0.48);
    const r2 = x * x + y * y;
    if (r2 >= 1) continue;
    const z = Math.sqrt(1 - r2);
    const u = 0.5 + Math.atan2(x, z) / (2 * Math.PI);
    const v = 0.5 - Math.asin(y) / Math.PI;
    const src = (Math.min(map.height - 1, Math.floor(v * map.height)) * map.width + Math.floor(u * map.width)) * 4;
    const dst = (py * size + px) * 4;
    const illumination = 0.055 + 0.945 * Math.pow(Math.max(0, x * lightX + z * lightZ), 0.55);
    for (let channel = 0; channel < 3; channel++) output.data[dst + channel] = map.data[src + channel] * illumination;
    output.data[dst + 3] = Math.min(1, (1 - Math.sqrt(r2)) * size * 0.48) * 255;
  }
  g.putImageData(output, 0, 0);
}
