import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ShotGrid from "@/components/ShotGrid";
import ParallaxShot from "@/components/ParallaxShot";
import { GAMES } from "@/lib/content";
import { getGame } from "@/lib/photos";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  return {
    title: game ? `${game.title} — Virtual Photography` : "Virtual Photography",
    description: game?.blurb,
  };
}

export default async function GamePage({ params }: Params) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const index = GAMES.findIndex((g) => g.slug === slug);
  const prev = index > 0 ? GAMES[index - 1] : null;
  const next = index < GAMES.length - 1 ? GAMES[index + 1] : null;

  return (
    <>
      {/* full-screen shot from the game, title resting on it */}
      <section className="game-hero">
        {game.heroThumb && (
          <ParallaxShot
            src={game.heroThumb}
            alt={`${game.title} — hero shot`}
            strength={0.12}
            eager
          />
        )}
        <h1 className="game-hero__title">{game.title}</h1>
      </section>

      {/* tagline + minimal meta */}
      <section className="game-info">
        <div className="container game-info__grid">
          <Reveal>
            <p className="game-info__tagline">{game.blurb}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="game-info__meta">
              <li>
                Developed by <b>{game.developer}</b>
              </li>
              <li>Released {game.year}</li>
              <li>
                {String(game.shots.length).padStart(2, "0")} shots in this
                gallery
              </li>
              <li>
                <Link href="/photos/" className="u-link">
                  ← All galleries
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="container--wide">
        {game.shots.length > 0 ? (
          <ShotGrid title={game.title} shots={game.shots} />
        ) : (
          <div className="shot-grid__empty">
            No shots here yet. Drop images into{" "}
            <code>public/photos/{game.slug}/</code> and rebuild — they&apos;ll
            show up automatically, sorted by filename.
          </div>
        )}
      </div>

      {/* previous / back / next gallery */}
      <nav className="game-nav container--wide" aria-label="Galleries">
        {prev ? (
          <Link href={`/photos/${prev.slug}/`} className="game-nav__step">
            <span className="label">← Previous gallery</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        <Link href="/photos/" className="game-nav__all">
          All galleries
        </Link>
        {next ? (
          <Link
            href={`/photos/${next.slug}/`}
            className="game-nav__step game-nav__step--next"
          >
            <span className="label">Next gallery →</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
