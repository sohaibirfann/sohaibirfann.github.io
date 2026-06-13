"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import { NAV, isCurrentPath } from "@/lib/nav";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScrollHide } from "@/hooks/useScrollHide";
import SocialLinks from "./SocialLinks";

export default function SiteHeader() {
  const pathname = usePathname();
  const hidden = useScrollHide(90);
  const { open, closing, openMenu, closeMenu } = useMobileMenu();
  const current = (href: string) => isCurrentPath(pathname, href);

  return (
    <header className={`site-header${hidden ? " site-header--hidden" : ""}`}>
      <div className="site-header__pill">
        <Link href="/" className="site-header__brand" onClick={closeMenu}>
          {SITE.shortName}
        </Link>

        <nav className="site-header__nav" aria-label="Site">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="m-link"
              aria-current={current(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__social">
          <SocialLinks />
        </div>

        <button
          type="button"
          className={`site-header__toggle${open && !closing ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => (open ? closeMenu() : openMenu())}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div
          className={`site-menu${closing ? " site-menu--closing" : ""}`}
          id="site-menu"
        >
          <nav className="site-menu__nav" aria-label="Site">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="site-menu__link"
                aria-current={current(item.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="site-menu__social">
            <SocialLinks />
          </div>
        </div>
      )}
    </header>
  );
}
