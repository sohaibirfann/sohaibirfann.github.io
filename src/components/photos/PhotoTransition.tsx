"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ENTER_MS = 720;
const HOLD_MS = 200;
const EXIT_MS = 900;

type Phase = "idle" | "arming" | "entering" | "covered" | "exiting";

function normalize(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

/** Dark curtain shown only when entering the photography wing from another
 *  page. Skipped under prefers-reduced-motion. */
export default function PhotoTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const targetRef = useRef<string | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download"))
        return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      if (!url.pathname.startsWith("/photos")) return;
      if (location.pathname.startsWith("/photos")) return;
      if (normalize(url.pathname) === normalize(location.pathname)) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      targetRef.current = url.pathname + url.search + url.hash;
      setPhase("arming");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (phase !== "arming") return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("entering")),
    );
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "entering") return;
    const t = setTimeout(() => {
      setPhase("covered");
      if (targetRef.current) router.push(targetRef.current);
    }, ENTER_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "covered" || !targetRef.current) return;
    if (normalize(pathname) !== normalize(targetRef.current.split(/[?#]/)[0]))
      return;
    const t = setTimeout(() => setPhase("exiting"), HOLD_MS);
    return () => clearTimeout(t);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => {
      setPhase("idle");
      targetRef.current = null;
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <div className={`photo-wipe photo-wipe--${phase}`} aria-hidden="true">
      <div className="photo-wipe__card">
        <strong>Virtual Photography</strong>
      </div>
    </div>
  );
}
