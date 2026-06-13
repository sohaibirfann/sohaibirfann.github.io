import { SITE } from "@/lib/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

/** GitHub / LinkedIn / Email links. `icon` (default) renders the glyphs used
 *  in the headers; `text` renders the labelled `m-link`s used in the footers. */
export default function SocialLinks({
  variant = "icon",
}: {
  variant?: "icon" | "text";
}) {
  const { links } = SITE;

  if (variant === "text") {
    return (
      <>
        <a className="m-link" href={links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          className="m-link"
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        {links.email && (
          <a className="m-link" href={`mailto:${links.email}`}>
            Email
          </a>
        )}
      </>
    );
  }

  return (
    <>
      <a
        href={links.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <GitHubIcon />
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      {links.email && (
        <a href={`mailto:${links.email}`} aria-label="Email" title="Email">
          <MailIcon />
        </a>
      )}
    </>
  );
}
