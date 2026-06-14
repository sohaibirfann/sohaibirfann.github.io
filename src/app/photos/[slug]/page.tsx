import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShotGrid from "@/components/photos/ShotGrid";
import ParallaxShot from "@/components/photos/ParallaxShot";
import HeroScrollHint from "@/components/photos/HeroScrollHint";
import { GAMES, SITE } from "@/lib/content";
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
  if (!game) return { title: "Virtual Photography" };

  const title = `${game.title} — ${SITE.name}`;
  const description = `${game.shots.length} shots from ${game.title}, captured in photo mode.`;
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description },
    twitter: { title, description },
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
        <div className="game-hero__caption">
          <h1 className="game-hero__title">{game.title}</h1>
          <p className="game-hero__meta">
            {game.developer} · {game.year} ·{" "}
            {String(game.shots.length).padStart(2, "0")} shots
          </p>
        </div>
        <HeroScrollHint />
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

      {/* previous / next gallery */}
      <nav className="game-nav container--wide" aria-label="Galleries">
        {prev ? (
          <Link href={`/photos/${prev.slug}/`} className="game-nav__step">
            <span className="label">← Previous gallery</span>
            <span className="game-nav__title">
              <span className="game-nav__arrow" aria-hidden="true" />
              <strong>{prev.title}</strong>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/photos/${next.slug}/`}
            className="game-nav__step game-nav__step--next"
          >
            <span className="label">Next gallery →</span>
            <span className="game-nav__title">
              <strong>{next.title}</strong>
              <span className="game-nav__arrow" aria-hidden="true" />
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
