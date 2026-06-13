// Generates webp thumbnails into public/photos/<slug>/thumbs/ and a social
// share background per game into public/og/ (prebuild). Idempotent.
import { readdirSync, existsSync, mkdirSync, statSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "photos");
const OG_DIR = path.join(process.cwd(), "public", "og");
const MAX_EDGE = 3200;
const QUALITY = 96;
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

if (!existsSync(ROOT)) process.exit(0);

const games = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "games.json"), "utf8"),
);
const heroField = Object.fromEntries(games.map((g) => [g.slug, g.hero]));

// Mirrors pickHero in src/lib/photos.ts: hero field → hero.* → widest shot.
async function pickHero(slug, dir, files) {
  if (heroField[slug]) return heroField[slug];
  const reserved = files.find((f) => path.parse(f).name.toLowerCase() === "hero");
  if (reserved) return reserved;

  const shots = files.filter(
    (f) => !["hero", "cover"].includes(path.parse(f).name.toLowerCase()),
  );
  let widest = null;
  let widestAr = -1;
  for (const f of shots) {
    const { width, height } = await sharp(path.join(dir, f)).metadata();
    const ar = width && height ? width / height : 0;
    if (ar > widestAr) {
      widestAr = ar;
      widest = f;
    }
  }
  return widest;
}

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

  const ogOut = path.join(OG_DIR, `${slug}.jpg`);
  if (!existsSync(ogOut)) {
    const hero = await pickHero(slug, dir, files);
    if (hero) {
      mkdirSync(OG_DIR, { recursive: true });
      await sharp(path.join(dir, hero))
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 82 })
        .toFile(ogOut);
      made += 1;
      console.log("og", path.relative(process.cwd(), ogOut));
    }
  }
}

console.log(made ? `\n${made} image(s) generated.` : "Thumbnails up to date.");
