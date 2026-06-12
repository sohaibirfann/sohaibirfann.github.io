import Link from "next/link";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectEntry from "@/components/ProjectEntry";
import { SITE, FEATURED_PROJECTS, PROJECTS } from "@/lib/content";
import { getGamesWithShots } from "@/lib/photos";

export default function Home() {
  const games = getGamesWithShots().filter((g) => g.cover);

  return (
    <div className="wing wing--gallery">
      <SiteHeader />

      <main>
        <section className="hero container">
          <Reveal>
            <p className="hero__path label">
              ~/{SITE.shortName.toLowerCase()} <b>·</b> {SITE.location}
            </p>
            <h1>{SITE.name}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero__tagline">
              I build backend systems and AI applications in Python — and{" "}
              <Link href="/photos/" className="u-link">
                photograph the inside of video games
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <section className="section" id="about">
          <div className="container section__grid">
            <Reveal as="h2" className="section__label label">
              §01 — about
            </Reveal>
            <Reveal delay={0.08} className="prose">
              {SITE.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container section__grid">
            <Reveal as="h2" className="section__label label">
              §02 — selected projects
              <small>pulled from GitHub, written by hand</small>
            </Reveal>
            <div>
              {FEATURED_PROJECTS.map((project) => (
                <ProjectEntry key={project.slug} project={project} />
              ))}
              <Reveal className="projects-more">
                <Link href="/projects/" className="m-link">
                  All projects ({String(PROJECTS.length).padStart(2, "0")}) →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container section__grid">
            <Reveal as="h2" className="section__label label">
              §03 — toolbox
            </Reveal>
            <Reveal delay={0.08} className="skills">
              {SITE.skills.map((group) => (
                <div className="skills__group" key={group.group}>
                  <h4>{group.group}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="container section__grid">
            <Reveal as="h2" className="section__label label">
              §04 — the road here
            </Reveal>
            <Reveal delay={0.08}>
              <ol className="timeline">
                {SITE.timeline.map((entry) => (
                  <li key={entry.title}>
                    <span className="timeline__period label">
                      {entry.period}
                    </span>
                    <div>
                      <h4>{entry.title}</h4>
                      <p>{entry.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section className="teaser">
          <div className="container teaser__grid">
            <Reveal>
              <span className="teaser__label label">
                §05 — after hours · virtual photography
              </span>
              <h2>Same eye, different worlds.</h2>
              <p>
                HUD off, photo mode on. A growing collection of shots taken
                inside the games I keep coming back to — composed, graded, and
                hoarded like film negatives.
              </p>
              <Link href="/photos/" className="teaser__cta">
                Enter the gallery →
              </Link>
            </Reveal>
            <Reveal delay={0.15} className="teaser__strip">
              {games.slice(0, 3).map((game) => (
                <div key={game.slug} className="teaser__shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={game.coverThumb!} alt={`${game.title} cover shot`} />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
