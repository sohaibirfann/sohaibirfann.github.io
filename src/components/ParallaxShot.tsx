"use client";

import { useEffect, useRef } from "react";

interface ParallaxShotProps {
  src: string;
  alt: string;
  /** Counter-translation as a fraction of the image's height; the image
   *  is oversized to match so the frame never runs out of picture. */
  strength?: number;
  eager?: boolean;
}

/** Image in an overflow-hidden frame that counter-translates with scroll.
 *  The parent is the window — give it overflow:hidden and a size. */
export default function ParallaxShot({
  src,
  alt,
  strength = 0.1,
  eager = false,
}: ParallaxShotProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    const frame = img?.parentElement;
    if (!img || !frame) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function update() {
      raf = 0;
      const r = frame!.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      // -1 below the viewport, +1 above it
      const p = (vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2);
      // negative so scrolling down pans the image up, revealing its bottom
      const travel = (strength / (1 + 2 * strength)) * 100;
      img!.style.transform = `translate3d(0, ${(-p * travel).toFixed(3)}%, 0)`;
    }
    function schedule() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    // heavy heroes often decode after first paint — reposition once loaded
    img.addEventListener("load", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      img.removeEventListener("load", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="plx-img"
      style={{ height: `${100 + strength * 200}%`, top: `${-strength * 100}%` }}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
