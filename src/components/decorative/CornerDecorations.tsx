"use client";
import { useDevice } from "@/context/DeviceContext";

export default function CornerDecorations() {
  const { hud } = useDevice();
  if (hud === "minimal") return null;

  const opacity = hud === "full" ? 0.25 : 0.12;

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]">
      {/* Top-left */}
      <svg
        className="absolute top-4 left-4"
        width="48" height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ opacity }}
      >
        <path d="M0 16L0 0L16 0" stroke="rgba(0,212,255,0.6)" strokeWidth="1" />
        <circle cx="0" cy="0" r="2" fill="rgba(0,212,255,0.4)" />
      </svg>

      {/* Top-right */}
      <svg
        className="absolute top-4 right-4"
        width="48" height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ opacity }}
      >
        <path d="M48 16L48 0L32 0" stroke="rgba(0,212,255,0.6)" strokeWidth="1" />
        <circle cx="48" cy="0" r="2" fill="rgba(0,212,255,0.4)" />
      </svg>

      {/* Bottom-left */}
      <svg
        className="absolute bottom-4 left-4"
        width="48" height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ opacity }}
      >
        <path d="M0 32L0 48L16 48" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
        <circle cx="0" cy="48" r="2" fill="rgba(139,92,246,0.4)" />
      </svg>

      {/* Bottom-right */}
      <svg
        className="absolute bottom-4 right-4"
        width="48" height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ opacity }}
      >
        <path d="M48 32L48 48L32 48" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
        <circle cx="48" cy="48" r="2" fill="rgba(139,92,246,0.4)" />
      </svg>
    </div>
  );
}
