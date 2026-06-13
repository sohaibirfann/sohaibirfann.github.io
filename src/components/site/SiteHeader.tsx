"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import { NAV, isCurrentPath } from "@/lib/nav";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScrollHide } from "@/hooks/useScrollHide";
import SocialLinks from "@/components/shared/SocialLinks";
import MobileMenu from "@/components/shared/MobileMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const hidden = useScrollHide(90);
  const menu = useMobileMenu();
  const current = (href: string) => isCurrentPath(pathname, href);

  return (
    <header className={`site-header${hidden ? " site-header--hidden" : ""}`}>
      <div className="site-header__pill">
        <Link href="/" className="site-header__brand" onClick={menu.closeMenu}>
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

        <MobileMenu prefix="site" current={current} menu={menu} />
      </div>
    </header>
  );
}
