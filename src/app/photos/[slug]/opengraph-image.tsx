import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { GAMES } from "@/lib/content";
import { getGame } from "@/lib/photos";

export const dynamic = "force-static";
export const alt = "Virtual Photography";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

const fontDir = path.join(process.cwd(), "src/og/fonts");
const heavy = fs.readFileSync(path.join(fontDir, "ArchivoBlack-Regular.ttf"));
const mono = fs.readFileSync(path.join(fontDir, "IBMPlexMono-Regular.ttf"));

// public/og/<slug>.jpg is rendered by scripts/thumbs.mjs at build time.
function heroDataUri(slug: string) {
  const file = path.join(process.cwd(), "public", "og", `${slug}.jpg`);
  if (!fs.existsSync(file)) return null;
  return `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  const bg = heroDataUri(slug);

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
          padding: "72px",
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Archivo Black",
              fontSize: 96,
              lineHeight: 1.0,
              textTransform: "uppercase",
            }}
          >
            {game?.title ?? "Virtual Photography"}
          </div>
          {game && (
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: 26,
                letterSpacing: "0.06em",
                color: "rgba(237,237,235,0.7)",
                marginTop: 18,
              }}
            >
              {`${game.developer} · ${game.year}`}
            </div>
          )}
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
