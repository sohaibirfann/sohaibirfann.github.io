import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/content";
import { getPortrait } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: SITE.tagline,
};

export default function AboutPage() {
  const portrait = getPortrait();
  const { links } = SITE;

  return (
    <div className="wing wing--gallery">
      <SiteHeader />

      <main>
        <section className="page-hero container">
          <Reveal>
            <p className="page-hero__label label">
              about · {SITE.location.toLowerCase()}
            </p>
            <h1>{SITE.name}</h1>
          </Reveal>
        </section>

        <section className="section">
          <div className="container about-grid">
            <Reveal as="figure" className="about-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portrait} alt={`Portrait of ${SITE.name}`} />
              <figcaption className="label">{SITE.role}</figcaption>
            </Reveal>
            <Reveal delay={0.1} className="prose about-prose">
              {SITE.about.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container section__grid">
            <Reveal as="h2" className="section__label label">
              get in touch
            </Reveal>
            <Reveal delay={0.08} className="contact">
              <p className="contact__lede">{SITE.contactLine}</p>
              <a className="contact__email" href={`mailto:${links.email}`}>
                Email me →
              </a>
              <div className="contact__links">
                <a
                  className="m-link"
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                >
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
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
