"use client";
import { useEffect, type ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";

/**
 * Wraps the /lab notebook page.
 *
 * The root layout paints the body with the main site's theme, so while the
 * notebook is mounted we repaint the body in paper tones and restore the
 * previous values on unmount (navigating back to "/").
 */
export default function NbShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const body = document.body;
    const prevBg = body.style.background;
    const prevColor = body.style.color;
    body.style.background = "#f8f6ee";
    body.style.color = "#23262f";
    return () => {
      body.style.background = prevBg;
      body.style.color = prevColor;
    };
  }, []);

  return <LanguageProvider>{children}</LanguageProvider>;
}
