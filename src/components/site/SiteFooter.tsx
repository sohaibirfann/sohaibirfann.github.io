import { SITE } from "@/lib/content";
import SocialLinks from "@/components/shared/SocialLinks";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="label">
          {SITE.name} · {SITE.location}
        </span>
        <div className="site-footer__links">
          <SocialLinks variant="text" />
        </div>
      </div>
    </footer>
  );
}
