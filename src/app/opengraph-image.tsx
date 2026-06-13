import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "@/lib/content";

export const dynamic = "force-static";
export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = path.join(process.cwd(), "src/og/fonts");
const slab = fs.readFileSync(path.join(fontDir, "ZillaSlab-SemiBold.ttf"));
const mono = fs.readFileSync(path.join(fontDir, "IBMPlexMono-Regular.ttf"));

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(160deg, #f8f7f1 0%, #ebeae1 100%)",
          color: "#232220",
          fontFamily: "IBM Plex Mono",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#7b786c",
          }}
        >
          sohaibirfann.github.io
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Zilla Slab", fontSize: 116, lineHeight: 1.05 }}>
            {SITE.name}
          </div>
          <div style={{ fontSize: 34, color: "#6e6a52", marginTop: 12 }}>
            {SITE.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#7b786c",
            borderTop: "1px solid rgba(58,57,53,0.18)",
            paddingTop: 28,
          }}
        >
          RAG pipelines, AI agents, and backend systems in Python.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zilla Slab", data: slab, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
