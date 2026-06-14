import type { Metadata } from "next";
import {
  Zilla_Slab,
  Cutive,
  Instrument_Sans,
  IBM_Plex_Mono,
  Archivo_Black,
} from "next/font/google";
import { SITE } from "@/lib/content";
import PhotoTransition from "@/components/photos/PhotoTransition";
import SmoothAnchors from "@/components/shared/SmoothAnchors";
import PointerActive from "@/components/shared/PointerActive";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/portfolio.css";
import "./styles/projects-skills.css";
import "./styles/photos-chrome.css";
import "./styles/photos-index.css";
import "./styles/photos-gallery.css";
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

const shareBio = `${SITE.tagline.split(" — ")[0]}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://sohaibirfann.github.io"),
  title: SITE.name,
  description: SITE.tagline,
  icons: { icon: "/icon-light.png" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    title: SITE.name,
    description: shareBio,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: shareBio,
  },
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
