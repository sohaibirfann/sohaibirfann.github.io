"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  ...(SITE.showWork ? [{ href: "/work/", label: "Work" }] : []),
  { href: "/about/", label: "About" },
  { href: "/photos/", label: "Virtual Photography" },
];

/** The photography wing's header: a transparent bar over the imagery that
 *  slides away on scroll down. On mobile it collapses to a hamburger that
 *  opens a full-screen menu rising from the bottom. */
export default function PhotosHeader() {
  const pathname = usePathname();
  const { links } = SITE;
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  function isCurrent(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  }

  function closeMenu() {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 300);
  }

  // slide the bar away while scrolling down, back on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    function update() {
      raf = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 140);
        lastY = y;
      }
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // while the full-screen menu is open: lock scroll, close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const social = (
    <>
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
    </>
  );

  return (
    <header className={`night-header${hidden ? " night-header--hidden" : ""}`}>
      <div className="night-header__left">
        <Link
          href="/"
          className="night-header__name"
          onClick={() => setMenuOpen(false)}
        >
          sohaib<em>@</em>irfan
        </Link>
        <nav className="night-header__nav" aria-label="Site">
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
      </div>

      <div className="night-header__social">{social}</div>

      <button
        type="button"
        className={`night-header__toggle${menuOpen && !closing ? " is-open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="night-menu"
        onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
      >
        <span />
        <span />
      </button>

      {menuOpen && (
        <div
          className={`night-menu${closing ? " night-menu--closing" : ""}`}
          id="night-menu"
        >
          <nav className="night-menu__nav" aria-label="Site">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="night-menu__link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="night-menu__social">{social}</div>
        </div>
      )}
    </header>
  );
}
