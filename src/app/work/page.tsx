import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE, WORK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Where I've worked and studied, in order.",
};

export default function WorkPage() {
  // hidden until site.json's showWork is flipped to true
  if (!SITE.showWork) notFound();

  return (
    <div className="wing wing--gallery">
      <SiteHeader />

      <main>
        <section className="page-hero container">
          <Reveal>
            <p className="page-hero__label label">
              work · the road so far
            </p>
            <h1>Work</h1>
          </Reveal>
        </section>

        <section className="section">
          <div className="container">
            <ol className="worktl">
              {WORK.map((entry, i) => (
                <Reveal
                  as="li"
                  className="worktl__item"
                  key={`${entry.org}-${entry.period}`}
                  delay={Math.min(i * 0.06, 0.18)}
                >
                  <p className="worktl__period label">{entry.period}</p>
                  <h2 className="worktl__role">{entry.role}</h2>
                  <p className="worktl__org label">
                    {entry.org}
                    {entry.location && ` · ${entry.location}`}
                  </p>
                  <p className="worktl__summary">{entry.summary}</p>
                  {entry.points.length > 0 && (
                    <ul className="worktl__points">
                      {entry.points.map((point) => (
                        <li key={point.slice(0, 24)}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {entry.tech.length > 0 && (
                    <p className="worktl__tech label">
                      {entry.tech.join(" · ")}
                    </p>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
