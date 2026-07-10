"use client";
import { useState, useCallback, type RefObject } from "react";

interface MousePos {
  x: number;
  y: number;
}

export function useMousePosition(ref: RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [ref]
  );

  return { pos, handleMouseMove };
}
