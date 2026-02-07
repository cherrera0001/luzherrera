# Campaña Luz Herrera – Punta de Parra

[![Sitio](https://img.shields.io/badge/sitio-luzherrera.vercel.app-blue)](https://luzherrera.vercel.app) [![GitHub](https://img.shields.io/badge/repo-GitHub-black)](https://github.com/cherrera0001/luzherrera)

Landing estática de campaña social para la **Sra. Luz Herrera** y su familia en **Punta de Parra, Tomé** (Región del Biobío, Chile), damnificados del incendio. Objetivo: facilitar aportes directos (transferencia CuentaRUT, WhatsApp) y difusión, con transparencia y sin intermediarios.

- **Sitio en vivo:** [luzherrera.vercel.app](https://luzherrera.vercel.app) · [www.luzherrera.cl](https://www.luzherrera.cl)
- **Repositorio:** [github.com/cherrera0001/luzherrera](https://github.com/cherrera0001/luzherrera)
- **Referencia de diseño:** [santosherrera.cl](https://santosherrera.cl)

---

## Contexto del proyecto

| Aspecto | Detalle |
|--------|---------|
| **Tipo** | Landing estática (HTML/CSS/JS), sin frameworks |
| **Hosting** | [Vercel](https://vercel.com) |
| **Dominio** | luzherrera.cl (DNS en Cloudflare) |
| **Lenguajes** | HTML, CSS, JavaScript (todo en `index.html` + assets) |
| **Imágenes** | Hero en AVIF/WebP/JPG (480, 768, 1200 px) generadas con [sharp](https://github.com/lovell/sharp) |

El contenido es sobrio y verificable: datos bancarios reales, testimonios en video (Instagram), sección de transparencia y actualizaciones. No se inventan metas de recaudación ni datos personales sin evidencia.

---

## Cómo usar el repositorio

### Ver el sitio

- Producción: [https://luzherrera.vercel.app](https://luzherrera.vercel.app)
- Local: abrir `index.html` en el navegador o usar un servidor estático (ej. `npx serve .`).

### Instalar y generar imágenes

```bash
git clone https://github.com/cherrera0001/luzherrera.git
cd luzherrera
npm install
npm run build:images
```

`npm run build:images` genera en `/assets` las versiones optimizadas (AVIF, WebP, JPG) a partir de `luzherrera.png`, `luzherrera.jpg` o `luzherrera.jpeg`. Requiere Node.js y el script usa [sharp](https://github.com/lovell/sharp).

### Desplegar en Vercel

- Conectar el repo en [Vercel](https://vercel.com) o usar CLI: `npx vercel --prod` desde la raíz del proyecto.

---

## Cómo editar datos (sin inventar)

Todo lo editable está en **`index.html`**:

- **`CONFIG`** (objeto al final del script): `phone` (WhatsApp), `waMessage`, `bankText`. El recuadro bancario visible en la página debe coincidir con `bankText`.
- **Sección `#actualizaciones`:** fecha de "Última actualización" y lista de hitos. Reemplazar el texto `[MISSING: cuando haya avances...]` por hitos reales cuando existan.
- **Sección `#transparencia`:** ubicación y enlaces a reels; no inventar datos.

Solo publicar teléfono o datos personales con autorización de la familia.

---

## Comparación con sitio de referencia (Santos)

| Aspecto | Santos (santosherrera.cl) | Luz (este repo) |
|--------|----------------------------|------------------|
| CTAs | Llamado a la acción | Barra fija móvil + desktop (Copiar datos, WhatsApp, Compartir campaña) |
| Transparencia | Sección explícita | Sección "Transparencia y Confianza" (ubicación, reels, apoyo directo) |
| Actualizaciones | — | Sección con fecha + hitos + placeholder [MISSING] |
| Compartir | Copiar enlace + Instagram | Por testimonio + "Compartir campaña" 1-click |
| Footer | — | Código abierto GitHub + fuente testimonial Instagram |
| Hero | — | &lt;picture&gt; AVIF/WebP/srcset, preload, caché largo en `/assets` |

---

## Checklist [MISSING]

- [ ] **CONFIG.phone:** número real de WhatsApp cuando exista y esté autorizado.
- [ ] **Timeline:** sustituir el placeholder de actualizaciones por hitos concretos (fecha + 2 líneas) cuando haya novedades verificables.
- [ ] No inventar metas de recaudación, montos ni direcciones sin evidencia.

---

## Performance y medición

- **Hero:** &lt;picture&gt; con srcset 480/768/1200; en móvil se sirve ~480w para mantener LCP bajo. Caché largo en `/assets/*` vía `vercel.json`.
- **Lighthouse (ejemplo):**

```bash
npx lighthouse https://luzherrera.vercel.app --output=html --view --preset=performance
```

Metas orientativas: LCP &lt; 2,5 s en móvil, CLS &lt; 0,1.

---

## Estructura del proyecto

```
luzherrera/
├── index.html          # Página única (HTML + CSS + JS)
├── vercel.json         # Headers de seguridad + caché /assets
├── luzherrera.png      # Imagen fuente del hero (o luzherrera.jpg / luzherrera.jpeg)
├── assets/             # Imágenes optimizadas (generadas por npm run build:images)
├── scripts/
│   └── build-images.js # Genera AVIF/WebP/JPG (sharp)
├── package.json
├── README.md
├── CLOUDFLARE-DNS-RESOLVER.md
└── cloudflare-nameservers.txt
```

Headers aplicados en `vercel.json`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`; sin trackers por defecto.

---

## Licencia y uso

Proyecto de campaña social; código abierto para transparencia. Uso del contenido (textos, imágenes, datos) según autorización de la familia y fines de la campaña.

---

**Repositorio:** [https://github.com/cherrera0001/luzherrera](https://github.com/cherrera0001/luzherrera)
