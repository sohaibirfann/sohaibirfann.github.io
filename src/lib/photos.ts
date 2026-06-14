import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { GAMES, type Game } from "./content";

const PHOTOS_ROOT = path.join(process.cwd(), "public", "photos");
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

export interface Shot {
  src: string;
  /** smaller webp shown in the grid; see scripts/thumbs.mjs */
  thumb: string;
  /** width / height — drives the justified gallery rows. */
  ar: number;
}

/** hero.* and cover.* are reserved and kept out of the gallery grid. */
function reservedName(f: string) {
  const name = path.parse(f).name.toLowerCase();
  return name === "hero" || name === "cover";
}

function findReserved(slug: string, name: "hero" | "cover") {
  const file = listImages(slug).find(
    (f) => path.parse(f).name.toLowerCase() === name,
  );
  return file ? `/photos/${slug}/${file}` : null;
}

function readShot(slug: string, f: string): Shot {
  let ar = 16 / 9;
  try {
    const { width, height } = imageSize(
      fs.readFileSync(path.join(PHOTOS_ROOT, slug, f)),
    );
    if (width && height) ar = width / height;
  } catch {
    // unreadable dimensions — fall back to 16:9
  }
  const isRaster = path.extname(f).toLowerCase() !== ".svg";
  return {
    src: `/photos/${slug}/${f}`,
    thumb: isRaster
      ? `/photos/${slug}/thumbs/${path.parse(f).name}.webp`
      : `/photos/${slug}/${f}`,
    ar,
  };
}

function listImages(slug: string): string[] {
  const dir = path.join(PHOTOS_ROOT, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();
}

/** A game's shots, discovered at build time and sorted by filename. */
function getShots(slug: string): Shot[] {
  return listImages(slug)
    .filter((f) => !reservedName(f))
    .map((f) => readShot(slug, f));
}

/** Game-page background: games.json "hero" → hero.* file → widest shot. */
function pickHero(slug: string, heroField: string | undefined, shots: Shot[]) {
  if (heroField) return `/photos/${slug}/${heroField}`;
  const heroFile = findReserved(slug, "hero");
  if (heroFile) return heroFile;
  if (shots.length === 0) return null;
  const widest = [...shots].sort((a, b) => b.ar - a.ar);
  const ultrawide = widest.find((s) => s.ar >= 21 / 9);
  return (ultrawide ?? widest[0]).src;
}

/** Index-grid cover: games.json "cover" → cover.* file → first shot. */
function pickCover(
  slug: string,
  coverField: string | undefined,
  shots: Shot[],
) {
  if (coverField) return `/photos/${slug}/${coverField}`;
  return findReserved(slug, "cover") ?? shots[0]?.src ?? null;
}

/** The webp thumbnail for a /photos/<slug>/<file> path. */
function thumbOf(src: string | null): string | null {
  if (!src || src.toLowerCase().endsWith(".svg")) return src;
  const slash = src.lastIndexOf("/");
  const base = src.slice(slash + 1).replace(/\.[^.]+$/, "");
  return `${src.slice(0, slash)}/thumbs/${base}.webp`;
}

export interface GameWithShots extends Omit<Game, "cover" | "hero"> {
  cover: string | null;
  /** lighter cover for the index grid; see scripts/thumbs.mjs */
  coverThumb: string | null;
  hero: string | null;
  /** webp version of the hero behind the game title */
  heroThumb: string | null;
  shots: Shot[];
}

// Scanned once per process — the photos folder doesn't change mid-build.
let cached: GameWithShots[] | null = null;

export function getGamesWithShots(): GameWithShots[] {
  if (cached) return cached;
  cached = GAMES.map((game) => {
    const shots = getShots(game.slug);
    const cover = pickCover(game.slug, game.cover, shots);
    const hero = pickHero(game.slug, game.hero, shots);
    return {
      ...game,
      cover,
      coverThumb: thumbOf(cover),
      hero,
      heroThumb: thumbOf(hero),
      shots,
    };
  });
  return cached;
}

export function getGame(slug: string): GameWithShots | undefined {
  return getGamesWithShots().find((g) => g.slug === slug);
}
