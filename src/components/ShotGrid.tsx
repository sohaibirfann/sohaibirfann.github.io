"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import type { Shot } from "@/lib/photos";

interface ShotGridProps {
  title: string;
  shots: Shot[];
}

/** Interleave landscape (ar ≥ 1) and portrait shots, spreading the
 *  minority evenly through the majority so rows don't clump. */
function weaveByOrientation(shots: Shot[]): Shot[] {
  const land = shots.filter((s) => s.ar >= 1);
  const port = shots.filter((s) => s.ar < 1);
  if (!land.length || !port.length) return shots;

  const out: Shot[] = [];
  let li = 0;
  let pi = 0;
  while (li < land.length || pi < port.length) {
    // place whichever bucket is furthest behind its even spacing
    const landPos = li < land.length ? (li + 0.5) / land.length : Infinity;
    const portPos = pi < port.length ? (pi + 0.5) / port.length : Infinity;
    if (landPos <= portPos) out.push(land[li++]);
    else out.push(port[pi++]);
  }
  return out;
}

/** Justified gallery with a keyboard-navigable lightbox (← → / Esc). */
export default function ShotGrid({ title, shots: rawShots }: ShotGridProps) {
  const shots = useMemo(() => weaveByOrientation(rawShots), [rawShots]);
  const [open, setOpen] = useState<number | null>(null);
  // shots whose full-size image has loaded — revisiting one skips the spinner
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const isOpen = open !== null;

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

  // lock scroll, move focus into the lightbox, restore it to the thumbnail
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [isOpen]);

  // keyboard: Esc closes, arrows step, Tab stays trapped in the dialog
  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return setOpen(null);
      if (e.key === "ArrowRight") return step(1);
      if (e.key === "ArrowLeft") return step(-1);
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      const focusable = dialog?.querySelectorAll<HTMLElement>("button");
      if (!dialog || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Open shot ${i + 1} of ${shots.length}`}
            >
              <img
                src={shot.thumb}
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
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
            <button
              className="lightbox__btn"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="lightbox__stage" onClick={() => setOpen(null)}>
            {!loaded.has(open) && (
              <div className="lightbox__spinner" aria-hidden="true" />
            )}
            <img
              key={open}
              src={shots[open].thumb}
              alt={`${title} — shot ${open + 1}`}
              className={loaded.has(open) ? "is-loaded" : ""}
              onLoad={() =>
                setLoaded((prev) =>
                  prev.has(open) ? prev : new Set(prev).add(open),
                )
              }
            />
          </div>
          <div className="lightbox__nav-bar">
            <button
              className="lightbox__nav lightbox__nav--prev"
              aria-label="Previous shot"
              onClick={() => step(-1)}
              disabled={open === 0}
            />
            <button
              className="lightbox__nav lightbox__nav--next"
              aria-label="Next shot"
              onClick={() => step(1)}
              disabled={open === shots.length - 1}
            />
          </div>
        </div>
      )}
    </>
  );
}
