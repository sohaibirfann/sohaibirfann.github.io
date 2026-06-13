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
  /** Flip to true to show the /work page (fill content/work.json first). */
  showWork: boolean;
  links: { github: string; linkedin: string; email: string };
  about: string[];
  contactLine: string;
  skills: SkillGroup[];
  timeline: TimelineEntry[];
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  /** Featured projects also show on the home page. */
  featured?: boolean;
  repo: string;
  site?: string;
  tagline: string;
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
  blurb: string;
  /** Filename in public/photos/<slug>/ for the index cover (else first shot). */
  cover?: string;
  /** Filename for the full-screen hero (else widest shot). */
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
