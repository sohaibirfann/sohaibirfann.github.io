"use client";

import { useEffect, useRef } from "react";

interface ParallaxShotProps {
  src: string;
  alt: string;
  /** How far the image counter-translates, as a fraction of its own
   *  height. The image is oversized by 2× this (see .plx-img) so the
   *  frame never runs out of picture. */
  strength?: number;
  eager?: boolean;
}

/** An image inside an overflow-hidden frame that counter-translates
 *  with scroll, so the frame slides over a quasi-stationary picture —
 *  the echosmoker gallery effect. The parent element is the window:
 *  give it overflow:hidden and a size. */
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
      // -1 when the frame sits below the viewport, +1 above it
      const p = (vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2);
      // translateY is relative to the image's own (oversized) height —
      // rescale so the travel never exceeds the overscan margin. Negative
      // so scrolling down pans the image up, revealing more of its bottom.
      const travel = (strength / (1 + 2 * strength)) * 100;
      img!.style.transform = `translateY(${(-p * travel).toFixed(3)}%)`;
    }
    function schedule() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
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
