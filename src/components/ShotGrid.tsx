"use client";

import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";
import type { Shot } from "@/lib/photos";

interface ShotGridProps {
  title: string;
  shots: Shot[];
}

/** Justified gallery: rows of mixed-aspect shots that fill the full
 *  width (flex-grow proportional to aspect ratio), with a keyboard-
 *  navigable lightbox. ← → to move, Esc to close. */
export default function ShotGrid({ title, shots }: ShotGridProps) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((current) => {
        if (current === null) return current;
        const next = current + dir;
        return next < 0 || next >= shots.length ? current : next;
      });
    },
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className="shot-grid">
        {shots.map((shot, i) => (
          <Reveal
            key={shot.src}
            delay={Math.min((i % 4) * 0.05, 0.2)}
            style={{
              aspectRatio: `${shot.ar}`,
              flex: `${(shot.ar * 100).toFixed(2)} 1 ${(shot.ar * 24).toFixed(2)}rem`,
            }}
          >
            <button
              onClick={() => setOpen(i)}
              aria-label={`Open shot ${i + 1} of ${shots.length}`}
            >
              <img
                src={shot.src}
                alt={`${title} — shot ${i + 1} of ${shots.length}`}
                loading={i < 6 ? "eager" : "lazy"}
              />
            </button>
          </Reveal>
        ))}
        {/* spacer keeps the last row from over-stretching */}
        <i className="shot-grid__spacer" aria-hidden="true" />
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-label={`${title} — shot ${open + 1} of ${shots.length}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="lightbox__bar">
            <span className="label">
              {title} · {String(open + 1).padStart(2, "0")} /{" "}
              {String(shots.length).padStart(2, "0")}
            </span>
            <button className="lightbox__btn" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
          {open > 0 && (
            <button
              className="lightbox__nav lightbox__nav--prev"
              aria-label="Previous shot"
              onClick={() => step(-1)}
            >
              ←
            </button>
          )}
          {open < shots.length - 1 && (
            <button
              className="lightbox__nav lightbox__nav--next"
              aria-label="Next shot"
              onClick={() => step(1)}
            >
              →
            </button>
          )}
          <img src={shots[open].src} alt={`${title} — shot ${open + 1}`} />
        </div>
      )}
    </>
  );
}
