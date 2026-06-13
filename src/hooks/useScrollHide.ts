import { useEffect, useState } from "react";

/** True while scrolling down past `threshold`, false on scroll up (rAF-throttled). */
export function useScrollHide(threshold: number) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    function update() {
      raf = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > threshold);
        lastY = y;
      }
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return hidden;
}
