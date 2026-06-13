// GitHub Pages serves files by extension, so the extensionless
// opengraph-image files would go out as octet-stream. Rename them to .png
// (postbuild) and point the meta tags at the new name.
import { readdirSync, statSync, renameSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

function walk(dir, visit) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, visit);
    else visit(full, name);
  }
}

let renamed = 0;
let patched = 0;
walk(OUT, (full, name) => {
  if (name === "opengraph-image") {
    renameSync(full, `${full}.png`);
    renamed += 1;
  } else if (name.endsWith(".html") || name.endsWith(".txt")) {
    const before = readFileSync(full, "utf8");
    const after = before.replaceAll("opengraph-image?", "opengraph-image.png?");
    if (after !== before) {
      writeFileSync(full, after);
      patched += 1;
    }
  }
});

console.log(`OG: renamed ${renamed} image(s), patched ${patched} file(s).`);
