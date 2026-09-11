"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

export const THEME_STORAGE_KEY = "stem-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to "light" on both server and first client render to avoid a
  // hydration mismatch; the real value is synced from the <html> attribute
  // (set by the pre-hydration script in layout.tsx) right after mount.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const attr = document.documentElement.dataset.theme;
      if (attr === "dark" || attr === "light") {
        setTheme(attr);
      } else {
        document.documentElement.dataset.theme = "light";
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable — ignore */
      }
      return next;
    });
  };

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
