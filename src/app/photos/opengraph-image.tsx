import { ImageResponse } from "next/og";
import { GAMES } from "@/lib/content";
import { getGamesWithShots } from "@/lib/photos";
import { ogFont, ogBackground } from "@/og/shared";

export const dynamic = "force-static";
export const alt = "Virtual Photography";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heavy = ogFont("ArchivoBlack-Regular.ttf");
const mono = ogFont("IBMPlexMono-Regular.ttf");

export default function Image() {
  const games = getGamesWithShots();
  const shots = games.reduce((n, g) => n + g.shots.length, 0);
  const strips = GAMES.map((g) => ogBackground(g.slug)).filter(Boolean) as string[];
  const slice = Math.ceil(1200 / strips.length);

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
          padding: "72px 72px 56px",
          background: "#0c0c0d",
          color: "#ededeb",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          {strips.map((src, i) => (
            <img key={i} src={src} width={slice} height={630} style={{ objectFit: "cover" }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(12,12,13,0.45) 0%, rgba(12,12,13,0.5) 45%, rgba(12,12,13,0.95) 100%)",
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
          Sohaib Irfan
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Archivo Black",
              fontSize: 72,
              lineHeight: 1.0,
              textTransform: "uppercase",
            }}
          >
            Virtual Photography
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 26,
              letterSpacing: "0.06em",
              color: "rgba(237,237,235,0.7)",
              marginTop: 18,
            }}
          >
            {`${games.length} galleries · ${shots} shots`}
          </div>
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
