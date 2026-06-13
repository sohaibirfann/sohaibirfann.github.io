import { SITE } from "./content";

/** The site nav, shared by both wings' headers. */
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  ...(SITE.showWork ? [{ href: "/work/", label: "Work" }] : []),
  { href: "/about/", label: "About" },
  { href: "/photos/", label: "Virtual Photography" },
];

export function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}
