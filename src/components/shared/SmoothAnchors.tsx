"use client";

import { useEffect } from "react";
import { plainAnchorClick } from "@/lib/anchor";

/** Smooth-scrolls same-page anchor links without a global scroll-behavior
 *  (which would animate scroll-to-top on every navigation). */
export default function SmoothAnchors() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      const hit = plainAnchorClick(e);
      if (!hit) return;
      const url = new URL(hit.href, location.href);
      if (url.origin !== location.origin || !url.hash) return;
      if (url.pathname !== location.pathname) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      history.pushState(null, "", url.hash);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
