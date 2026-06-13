"use client";

import { useEffect } from "react";

/** Adds `pointer-active` to <html> on the first pointer move, so hover styles
 *  don't fire on load when the cursor already sits over an element. */
export default function PointerActive() {
  useEffect(() => {
    function onMove() {
      document.documentElement.classList.add("pointer-active");
      window.removeEventListener("pointermove", onMove);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
