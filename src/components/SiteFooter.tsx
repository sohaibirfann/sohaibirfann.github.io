import { SITE } from "@/lib/content";

export default function SiteFooter() {
  const { links } = SITE;
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="label">
          {SITE.name} · {SITE.location}
        </span>
        <div className="site-footer__links">
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
      </div>
    </footer>
  );
}
