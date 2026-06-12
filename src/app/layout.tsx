import type { Metadata } from "next";
import {
  Zilla_Slab,
  Cutive,
  Instrument_Sans,
  IBM_Plex_Mono,
  Archivo_Black,
} from "next/font/google";
import { SITE } from "@/lib/content";
import PhotoTransition from "@/components/PhotoTransition";
import SmoothAnchors from "@/components/SmoothAnchors";
import PointerActive from "@/components/PointerActive";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/portfolio.css";
import "./styles/photos.css";
import "./styles/lightbox.css";

// Slab serif headlines + typewriter accent, after joseocando.com.
const display = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
});

const accent = Cutive({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: "400",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

// Heavy grotesque caps for the photo wing's titles.
const heavy = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-heavy",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  icons: { icon: "/icon-light.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${accent.variable} ${body.variable} ${mono.variable} ${heavy.variable}`}
        suppressHydrationWarning
      >
        <PhotoTransition />
        <SmoothAnchors />
        <PointerActive />
        {children}
      </body>
    </html>
  );
}
