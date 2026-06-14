"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentPath } from "@/lib/nav";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScrollHide } from "@/hooks/useScrollHide";
import SocialLinks from "@/components/shared/SocialLinks";
import MobileMenu from "@/components/shared/MobileMenu";
import NavLinks from "@/components/shared/NavLinks";

/** Photography-wing header: transparent bar that hides on scroll down; a
 *  hamburger + full-screen menu on mobile. */
export default function PhotosHeader() {
  const pathname = usePathname();
  const hidden = useScrollHide(140);
  const menu = useMobileMenu();
  const current = (href: string) => isCurrentPath(pathname, href);

  return (
    <header className={`night-header${hidden ? " night-header--hidden" : ""}`}>
      <div className="night-header__left">
        <Link href="/" className="night-header__name" onClick={menu.closeMenu}>
          sohaib<em>@</em>irfan
        </Link>
        <NavLinks className="night-header__nav" current={current} />
      </div>

      <div className="night-header__social">
        <SocialLinks />
      </div>

      <MobileMenu prefix="night" current={current} menu={menu} />
    </header>
  );
}
