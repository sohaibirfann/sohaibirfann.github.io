import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="wing wing--gallery notfound">
      <Link href="/" className="notfound__brand">
        {SITE.shortName}
      </Link>

      <div className="notfound__inner">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">This page wandered off.</h1>
        <p className="notfound__lede">
          The link may be broken, or the page may have moved on without it.
        </p>
        <div className="notfound__links">
          <Link href="/" className="m-link">
            ← Back home
          </Link>
          <Link href="/photos/" className="m-link">
            Virtual Photography →
          </Link>
        </div>
      </div>
    </div>
  );
}
