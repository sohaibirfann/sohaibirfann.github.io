import site from "../../content/site.json";
import projects from "../../content/projects.json";
import games from "../../content/games.json";
import work from "../../content/work.json";

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  detail: string;
}

export interface Site {
  name: string;
  shortName: string;
  role: string;
  location: string;
  tagline: string;
  intro: string[];
  /** Show the /work timeline page and its nav links. Flip to true
   *  once there's a real entry in content/work.json. */
  showWork: boolean;
  links: { github: string; linkedin: string; email: string };
  /** Longer-form paragraphs for the /about page. */
  about: string[];
  /** Lede above the email on the get-in-touch section. */
  contactLine: string;
  skills: SkillGroup[];
  timeline: TimelineEntry[];
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  /** Featured projects appear on the home page; all projects appear
   *  on /projects. */
  featured?: boolean;
  repo: string;
  /** Optional live/landing page, shown as "Visit site" next to the repo. */
  site?: string;
  tagline: string;
  /** Screenshot shown beside the entry; file lives in public/projects/. */
  image?: { src: string; alt: string; caption?: string };
  story: string[];
  details: string[];
  tech: string[];
}

export interface Game {
  slug: string;
  title: string;
  developer: string;
  year: string;
  /** One line shown big in the info band on the game's page. */
  blurb: string;
  /** Optional filename inside public/photos/<slug>/ to use as the cover
   *  on the gallery index. Defaults to the first image alphabetically. */
  cover?: string;
  /** Optional filename for the full-screen hero behind the game's title.
   *  Defaults to the cover. */
  hero?: string;
}

export interface WorkEntry {
  period: string;
  role: string;
  org: string;
  location?: string;
  summary: string;
  points: string[];
  tech: string[];
}

export const SITE = site as Site;
export const WORK = work as WorkEntry[];
export const PROJECTS = projects as Project[];
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const GAMES = games as Game[];
