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
const SRC_PNG = path.join(ROOT, 'luzherrera.png');
const SRC_JPG = path.join(ROOT, 'luzherrera.jpg');
const SRC_JPEG = path.join(ROOT, 'luzherrera.jpeg');
const SRC = fs.existsSync(SRC_PNG)
  ? SRC_PNG
  : (fs.existsSync(SRC_JPG) ? SRC_JPG : (fs.existsSync(SRC_JPEG) ? SRC_JPEG : null));
const OUT_DIR = path.join(ROOT, 'assets');
const WIDTHS = [480, 768, 1200];
const SUFFIX = '-v2';
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 65;
const JPEG_QUALITY = 82;

if (!SRC) {
  console.error('No se encuentra luzherrera.png, luzherrera.jpg o luzherrera.jpeg en la raiz del proyecto.');
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

    await base.webp({ quality: WEBP_QUALITY }).toFile(path.join(OUT_DIR, `luz-${w}${SUFFIX}.webp`));
    console.log('  luz-%s%s.webp', w, SUFFIX);

    await base.avif({ quality: AVIF_QUALITY }).toFile(path.join(OUT_DIR, `luz-${w}${SUFFIX}.avif`));
    console.log('  luz-%s%s.avif', w, SUFFIX);

    if (w === 768 || w === 1200) {
      await image.clone().resize(w, null, { withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(path.join(OUT_DIR, `luz-${w}${SUFFIX}.jpg`));
      console.log('  luz-%s%s.jpg', w, SUFFIX);
    }
  }

  console.log('Listo. Archivos en /assets');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
