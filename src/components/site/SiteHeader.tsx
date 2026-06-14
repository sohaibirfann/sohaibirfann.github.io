"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import { isCurrentPath } from "@/lib/nav";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScrollHide } from "@/hooks/useScrollHide";
import SocialLinks from "@/components/shared/SocialLinks";
import MobileMenu from "@/components/shared/MobileMenu";
import NavLinks from "@/components/shared/NavLinks";

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

        <NavLinks className="site-header__nav" current={current} />

        <div className="site-header__social">
          <SocialLinks />
        </div>

        <MobileMenu prefix="site" current={current} menu={menu} />
      </div>
    </header>
  );
}
