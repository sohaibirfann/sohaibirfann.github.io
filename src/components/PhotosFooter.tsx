import Link from "next/link";
import { SITE } from "@/lib/content";
import SocialLinks from "./SocialLinks";

/** The photography wing's footer: quiet and centered, museum-plaque
 *  style, instead of the portfolio's bordered bar. */
export default function PhotosFooter() {
  return (
    <footer className="night-footer">
      <span className="night-footer__mark">{SITE.name}</span>
      <div className="night-footer__links">
        <Link href="/" className="m-link">
          Index
        </Link>
        <SocialLinks variant="text" />
      </div>
      <span className="night-footer__credit label">
        Inspired by{" "}
        <a
          className="u-link"
          href="https://www.echosmoker.com"
          target="_blank"
          rel="noreferrer"
        >
          echosmoker.com
        </a>
      </span>
    </footer>
  );
}
