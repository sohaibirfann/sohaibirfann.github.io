import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getGamesWithShots } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Virtual Photography",
  description:
    "Screenshots taken seriously — virtual photography from inside the games I keep coming back to.",
};

export default function PhotosIndex() {
  const games = getGamesWithShots();

  return (
    <>
      <section className="photos-hero container--wide">
        <Reveal>
          <span className="label">virtual photography</span>
        </Reveal>
      </section>

      <section className="container--wide game-grid">
        {games.map((game, i) => (
          <Link
            key={game.slug}
            href={`/photos/${game.slug}/`}
            className="game-card"
          >
            {game.coverThumb && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={game.coverThumb} alt={`${game.title} — cover shot`} />
            )}
            <Reveal
              as="span"
              className="game-card__name"
              delay={Math.min(0.15 + (i % 3) * 0.1, 0.45)}
            >
              {game.title}
            </Reveal>
          </Link>
        ))}
      </section>
    </>
  );
}
