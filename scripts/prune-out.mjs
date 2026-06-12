// After export (postbuild), drop the original gallery shots from out/ —
// the site only serves the webp thumbnails. Originals stay in the repo.
import { readdirSync, existsSync, statSync, rmSync } from "node:fs";
import path from "node:path";

const PHOTOS = path.join(process.cwd(), "out", "photos");
if (!existsSync(PHOTOS)) process.exit(0);

let removed = 0;
for (const slug of readdirSync(PHOTOS)) {
  const dir = path.join(PHOTOS, slug);
  if (!statSync(dir).isDirectory()) continue;

  const thumbs = path.join(dir, "thumbs");
  if (!existsSync(thumbs)) continue;

  // an original is redundant once its thumbs/<name>.webp exists
  for (const file of readdirSync(dir)) {
    const full = path.join(dir, file);
    if (!statSync(full).isFile()) continue;
    if (existsSync(path.join(thumbs, `${path.parse(file).name}.webp`))) {
      rmSync(full);
      removed += 1;
    }
  }
}

console.log(removed ? `Pruned ${removed} original(s) from out/.` : "Nothing to prune.");
