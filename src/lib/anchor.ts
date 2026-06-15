/** The internal <a> a plain left-click landed on, with its raw href — or
 *  null for modified clicks, clicks outside an anchor, or anchors without an
 *  href. Callers add their own checks (target=_blank, hash, origin, …). */
export function plainAnchorClick(
  e: MouseEvent,
): { anchor: HTMLAnchorElement; href: string } | null {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
    return null;
  const anchor = (e.target as HTMLElement).closest("a");
  if (!anchor) return null;
  const href = anchor.getAttribute("href");
  return href ? { anchor, href } : null;
}
