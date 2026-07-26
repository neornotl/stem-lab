"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Notebook-themed custom cursor: a small ink pen dot that follows the mouse
 * within the notebook pages. Only activates on fine-pointer desktop devices
 * and respects prefers-reduced-motion.
 */
export default function NotebookCursor() {
  const reduced = usePrefersReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!finePointer || reduced) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.body.classList.add("nb-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("nb-custom-cursor");
    };
  }, [finePointer, reduced]);

  if (!finePointer || reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      {/* Ink pen dot */}
      <div
        className="h-2.5 w-2.5 rounded-full"
        style={{
          background: "var(--nb-blue)",
          boxShadow: "0 0 0 2px rgba(43, 80, 200, 0.2)",
        }}
      />
    </div>
  );
}
