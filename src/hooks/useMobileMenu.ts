import { useEffect, useState } from "react";

/** Mobile menu state: open/close with exit animation, scroll-lock + Escape. */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  function closeMenu() {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return { open, closing, openMenu: () => setOpen(true), closeMenu };
}
