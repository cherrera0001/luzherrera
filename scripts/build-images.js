/**
 * Genera versiones optimizadas de la foto hero para LCP y móvil.
 * Salida: assets/luz-480|768|1200 en .webp, .avif y .jpg (768 como fallback).
 */
const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Instala dependencias: npm install');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'luzherrera.png');
const OUT_DIR = path.join(ROOT, 'assets');
const WIDTHS = [480, 768, 1200];
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 65;
const JPEG_QUALITY = 82;

if (!fs.existsSync(SRC)) {
  console.error('No se encuentra luzherrera.png en la raíz del proyecto.');
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const image = sharp(SRC);
  const meta = await image.metadata();
  console.log('Origen:', SRC, `(${meta.width}x${meta.height})`);

  for (const w of WIDTHS) {
    const base = image.clone().resize(w, null, { withoutEnlargement: true });

    await base.webp({ quality: WEBP_QUALITY }).toFile(path.join(OUT_DIR, `luz-${w}.webp`));
    console.log('  luz-%s.webp', w);

    await base.avif({ quality: AVIF_QUALITY }).toFile(path.join(OUT_DIR, `luz-${w}.avif`));
    console.log('  luz-%s.avif', w);

    if (w === 768 || w === 1200) {
      await image.clone().resize(w, null, { withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(path.join(OUT_DIR, `luz-${w}.jpg`));
      console.log('  luz-%s.jpg', w);
    }
  }

  console.log('Listo. Archivos en /assets');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
