import Link from "next/link";
import { SITE } from "@/lib/content";

/** The photography wing's footer: quiet and centered, museum-plaque
 *  style, instead of the portfolio's bordered bar. */
export default function PhotosFooter() {
  const { links } = SITE;
  return (
    <footer className="night-footer">
      <span className="night-footer__mark">{SITE.name}</span>
      <span className="label">all shots captured in-game</span>
      <div className="night-footer__links">
        <Link href="/" className="m-link">
          Index
        </Link>
        <a className="m-link" href={links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="m-link" href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        {links.email && (
          <a className="m-link" href={`mailto:${links.email}`}>
            Email
          </a>
        )}
      </div>
    </footer>
  );
}
