import Link from "next/link";
import { SITE } from "@/lib/content";

/** The photography wing's footer: quiet and centered, museum-plaque
 *  style, instead of the portfolio's bordered bar. */
export default function PhotosFooter() {
  const { links } = SITE;
  return (
    <footer className="night-footer">
      <span className="night-footer__mark">{SITE.name}</span>
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
