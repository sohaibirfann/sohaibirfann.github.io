"use client";

import { useEffect, useState } from "react";

/** Scroll hint that fades away for good once the user starts scrolling. */
export default function HeroScrollHint() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (gone) return;
    function onScroll() {
      if (window.scrollY > 40) setGone(true);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [gone]);

  return (
    <span
      className={`game-hero__scroll${gone ? " is-gone" : ""}`}
      aria-hidden="true"
    >
      <span className="label">Scroll</span>
      <span className="game-hero__scroll-track" />
    </span>
  );
}
