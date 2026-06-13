"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, isCurrentPath } from "@/lib/nav";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScrollHide } from "@/hooks/useScrollHide";
import SocialLinks from "./SocialLinks";

/** The photography wing's header: a transparent bar over the imagery that
 *  slides away on scroll down. On mobile it collapses to a hamburger that
 *  opens a full-screen menu rising from the bottom. */
export default function PhotosHeader() {
  const pathname = usePathname();
  const hidden = useScrollHide(140);
  const { open, closing, openMenu, closeMenu } = useMobileMenu();
  const current = (href: string) => isCurrentPath(pathname, href);

  return (
    <header className={`night-header${hidden ? " night-header--hidden" : ""}`}>
      <div className="night-header__left">
        <Link href="/" className="night-header__name" onClick={closeMenu}>
          sohaib<em>@</em>irfan
        </Link>
        <nav className="night-header__nav" aria-label="Site">
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
      </div>

      <div className="night-header__social">
        <SocialLinks />
      </div>

      <button
        type="button"
        className={`night-header__toggle${open && !closing ? " is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="night-menu"
        onClick={() => (open ? closeMenu() : openMenu())}
      >
        <span />
        <span />
      </button>

      {open && (
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
                aria-current={current(item.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="night-menu__social">
            <SocialLinks />
          </div>
        </div>
      )}
    </header>
  );
}
