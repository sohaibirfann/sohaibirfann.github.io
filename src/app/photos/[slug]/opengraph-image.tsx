import { ImageResponse } from "next/og";
import { GAMES } from "@/lib/content";
import { getGame } from "@/lib/photos";
import { ogFont, ogBackground } from "@/og/shared";

export const dynamic = "force-static";
export const alt = "Virtual Photography";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

const heavy = ogFont("ArchivoBlack-Regular.ttf");
const mono = ogFont("IBMPlexMono-Regular.ttf");

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  const bg = ogBackground(slug);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 72px 52px",
          background: "#0c0c0d",
          color: "#ededeb",
        }}
      >
        {bg && (
          <img
            src={bg}
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(12,12,13,0.15) 0%, rgba(12,12,13,0.55) 55%, rgba(12,12,13,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 72,
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(237,237,235,0.7)",
          }}
        >
          Virtual Photography
        </div>

        <div
          style={{
            fontFamily: "Archivo Black",
            fontSize: 72,
            lineHeight: 1.0,
            textTransform: "uppercase",
          }}
        >
          {game?.title ?? "Virtual Photography"}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo Black", data: heavy, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
