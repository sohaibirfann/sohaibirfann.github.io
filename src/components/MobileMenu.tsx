import Link from "next/link";
import { NAV } from "@/lib/nav";
import type { useMobileMenu } from "@/hooks/useMobileMenu";
import SocialLinks from "./SocialLinks";

/** The hamburger button + full-screen overlay menu, shared by both wings.
 *  `prefix` picks the class namespace ("site" or "night"); the wing's CSS
 *  handles the rest (light vs dark, slide-from-left vs rise-from-bottom). */
export default function MobileMenu({
  prefix,
  current,
  menu,
}: {
  prefix: "site" | "night";
  current: (href: string) => boolean;
  menu: ReturnType<typeof useMobileMenu>;
}) {
  const { open, closing, openMenu, closeMenu } = menu;

  return (
    <>
      <button
        type="button"
        className={`${prefix}-header__toggle${open && !closing ? " is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={`${prefix}-menu`}
        onClick={() => (open ? closeMenu() : openMenu())}
      >
        <span />
        <span />
      </button>

      {open && (
        <div
          className={`${prefix}-menu${closing ? ` ${prefix}-menu--closing` : ""}`}
          id={`${prefix}-menu`}
        >
          <nav className={`${prefix}-menu__nav`} aria-label="Site">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${prefix}-menu__link`}
                aria-current={current(item.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={`${prefix}-menu__social`}>
            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
}
