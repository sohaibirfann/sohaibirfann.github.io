// Generates webp thumbnails into public/photos/<slug>/thumbs/ (prebuild).
// Idempotent — skips ones already made.
import { readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "photos");
const MAX_EDGE = 3200;
const QUALITY = 96;
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

if (!existsSync(ROOT)) process.exit(0);

let made = 0;
for (const slug of readdirSync(ROOT)) {
  const dir = path.join(ROOT, slug);
  if (!statSync(dir).isDirectory()) continue;

  const files = readdirSync(dir).filter((f) =>
    RASTER.has(path.extname(f).toLowerCase()),
  );
  if (files.length === 0) continue;

  const thumbs = path.join(dir, "thumbs");
  mkdirSync(thumbs, { recursive: true });

  for (const file of files) {
    const out = path.join(thumbs, `${path.parse(file).name}.webp`);
    if (existsSync(out)) continue;
    await sharp(path.join(dir, file))
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    made += 1;
    console.log("thumb", path.relative(process.cwd(), out));
  }
}

console.log(made ? `\n${made} thumbnail(s) generated.` : "Thumbnails up to date.");
