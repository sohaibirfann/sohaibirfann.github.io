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
  /** width / height — drives the justified gallery rows. */
  ar: number;
}

/** Files named hero.* and cover.* are reserved (page background and
 *  index-grid cover) and kept out of the gallery grid. */
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
  return { src: `/photos/${slug}/${f}`, ar };
}

function listImages(slug: string): string[] {
  const dir = path.join(PHOTOS_ROOT, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();
}

/** All shots for a game, discovered from public/photos/<slug>/ at build
 *  time and sorted by filename — name files 01.jpg, 02.jpg… to control order. */
export function getShots(slug: string): Shot[] {
  return listImages(slug)
    .filter((f) => !reservedName(f))
    .map((f) => readShot(slug, f));
}

/** Background image for the game page, picked in priority order:
 *  1. the "hero" field in games.json
 *  2. a file named hero.* in the game's folder
 *  3. the widest shot that is at least 21:9
 *  4. the widest shot available */
function pickHero(slug: string, heroField: string | undefined, shots: Shot[]) {
  if (heroField) return `/photos/${slug}/${heroField}`;
  const heroFile = findReserved(slug, "hero");
  if (heroFile) return heroFile;
  if (shots.length === 0) return null;
  const widest = [...shots].sort((a, b) => b.ar - a.ar);
  const ultrawide = widest.find((s) => s.ar >= 21 / 9);
  return (ultrawide ?? widest[0]).src;
}

/** Cover for the index grid, picked in priority order:
 *  1. the "cover" field in games.json
 *  2. a file named cover.* in the game's folder
 *  3. the first shot alphabetically */
function pickCover(
  slug: string,
  coverField: string | undefined,
  shots: Shot[],
) {
  if (coverField) return `/photos/${slug}/${coverField}`;
  return findReserved(slug, "cover") ?? shots[0]?.src ?? null;
}

export interface GameWithShots extends Omit<Game, "cover" | "hero"> {
  cover: string | null;
  hero: string | null;
  shots: Shot[];
}

export function getGamesWithShots(): GameWithShots[] {
  return GAMES.map((game) => {
    const shots = getShots(game.slug);
    const cover = pickCover(game.slug, game.cover, shots);
    const hero = pickHero(game.slug, game.hero, shots);
    return { ...game, cover, hero, shots };
  });
}

export function getGame(slug: string): GameWithShots | undefined {
  return getGamesWithShots().find((g) => g.slug === slug);
}
