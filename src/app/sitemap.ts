import type { MetadataRoute } from "next";
import { GAMES, SITE } from "@/lib/content";

const BASE = "https://sohaibirfann.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects/", "/about/", "/photos/"];
  if (SITE.showWork) pages.push("/work/");
  GAMES.forEach((game) => pages.push(`/photos/${game.slug}/`));

  return pages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
