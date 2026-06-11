// Generates placeholder "shots" for the virtual photography galleries.
// Run with: node scripts/make-placeholders.mjs
// Delete a game's generated SVGs once you drop real screenshots into
// public/photos/<game-slug>/.

import fs from "node:fs";
import path from "node:path";

const palettes = {
  "cyberpunk-2077": {
    bg: ["#0b1018", "#16213a", "#241b3d"],
    glow: ["#e8c060", "#46d8d0", "#c44fd0"],
  },
  "red-dead-redemption-2": {
    bg: ["#170d0a", "#3c1d12", "#5a2c16"],
    glow: ["#e8a45c", "#c2502e", "#f0d9a8"],
  },
  "ghost-of-tsushima": {
    bg: ["#120a0e", "#2e1019", "#471824"],
    glow: ["#b03a48", "#e0d6c0", "#d98a6a"],
  },
  "fallout-4": {
    bg: ["#0e1620", "#1e2c38", "#2c3a48"],
    glow: ["#f5c542", "#6ec1e4", "#c2502e"],
  },
  "deathloop": {
    bg: ["#141114", "#2c1812", "#3a1d12"],
    glow: ["#e8842e", "#46c8d8", "#e8d44f"],
  },
};

const W = 1600;
const H = 900;
const SHOTS_PER_GAME = 6;

function shot(slug, i, palette) {
  const bg = palette.bg;
  const glow = palette.glow[i % palette.glow.length];
  const angle = (i * 53) % 360;
  const cx = 200 + ((i * 467) % (W - 400));
  const cy = 150 + ((i * 311) % (H - 300));
  const r = 180 + ((i * 97) % 240);
  const horizon = 480 + ((i * 131) % 280);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0" stop-color="${bg[0]}"/>
      <stop offset="0.55" stop-color="${bg[1]}"/>
      <stop offset="1" stop-color="${bg[2]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${cx / W}" cy="${cy / H}" r="0.5">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.85"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${i * 7 + 3}"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#glow)"/>
  <rect y="${horizon}" width="${W}" height="2" fill="${glow}" opacity="0.35"/>
  <rect width="${W}" height="${H}" fill="#fff" opacity="0" filter="url(#grain)"/>
  <text x="60" y="${H - 64}" font-family="ui-monospace, monospace" font-size="26" fill="${glow}" opacity="0.8" letter-spacing="3">PLACEHOLDER — ${slug.toUpperCase()} · ${String(i + 1).padStart(2, "0")}</text>
</svg>
`;
}

for (const [slug, palette] of Object.entries(palettes)) {
  const dir = path.join(process.cwd(), "public", "photos", slug);
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < SHOTS_PER_GAME; i++) {
    const file = path.join(dir, `${String(i + 1).padStart(2, "0")}.svg`);
    fs.writeFileSync(file, shot(slug, i, palette));
  }
  console.log(`wrote ${SHOTS_PER_GAME} placeholder shots → public/photos/${slug}/`);
}
