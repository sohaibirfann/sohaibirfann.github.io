"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  ...(SITE.showWork ? [{ href: "/work/", label: "Work" }] : []),
  { href: "/about/", label: "About" },
  { href: "/photos/", label: "Virtual Photography" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { links } = SITE;

  function isCurrent(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  }

  return (
    <header className="site-header">
      <div className="site-header__pill">
        <nav aria-label="Site">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="m-link"
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__social">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          {links.email && (
            <a href={`mailto:${links.email}`} aria-label="Email" title="Email">
              <MailIcon />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
