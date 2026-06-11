"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

/** The photography wing's header: no pill — a transparent bar resting
 *  directly on the imagery, with a soft scrim for legibility. Slides
 *  away while scrolling down so the shots have the screen to
 *  themselves, and returns on the first scroll up. */
export default function PhotosHeader() {
  const { links } = SITE;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 140);
        lastY = y;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`night-header${hidden ? " night-header--hidden" : ""}`}
    >
      <div className="night-header__left">
        <Link href="/" className="night-header__name">
          sohaib<em>@</em>irfan
        </Link>
        <nav aria-label="Site">
          <Link href="/" className="m-link">
            Home
          </Link>
          <Link href="/projects/" className="m-link">
            Projects
          </Link>
          {SITE.showWork && (
            <Link href="/work/" className="m-link">
              Work
            </Link>
          )}
          <Link href="/about/" className="m-link">
            About
          </Link>
          <Link href="/photos/" className="m-link" aria-current="page">
            Virtual Photography
          </Link>
        </nav>
      </div>
      <div className="night-header__social">
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
    </header>
  );
}
