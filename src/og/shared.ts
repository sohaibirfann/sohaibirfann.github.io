import fs from "node:fs";
import path from "node:path";

const fontDir = path.join(process.cwd(), "src/og/fonts");

/** Read a bundled .ttf from src/og/fonts for a next/og ImageResponse. */
export function ogFont(file: string) {
  return fs.readFileSync(path.join(fontDir, file));
}

/** base64 data URI for a game's share background (public/og/<slug>.jpg,
 *  rendered by scripts/thumbs.mjs), or null if it hasn't been generated. */
export function ogBackground(slug: string): string | null {
  const file = path.join(process.cwd(), "public", "og", `${slug}.jpg`);
  if (!fs.existsSync(file)) return null;
  return `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
}
