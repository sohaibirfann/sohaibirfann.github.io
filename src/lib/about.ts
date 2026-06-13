import fs from "node:fs";
import path from "node:path";

const CANDIDATES = [
  "portrait.jpg",
  "portrait.jpeg",
  "portrait.png",
  "portrait.webp",
  "portrait.svg",
];

/** The /about portrait — drop a portrait.* into public/about/. */
export function getPortrait(): string {
  const dir = path.join(process.cwd(), "public", "about");
  for (const file of CANDIDATES) {
    if (fs.existsSync(path.join(dir, file))) return `/about/${file}`;
  }
  return "/about/portrait.svg";
}
