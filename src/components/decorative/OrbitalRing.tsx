"use client";
import { useDevice } from "@/context/DeviceContext";

export default function OrbitalRing({ className }: { className?: string }) {
  const { hud } = useDevice();
  if (hud !== "full") return null;

  return (
    <svg
      className={`absolute pointer-events-none ${className ?? ""}`}
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
    >
      {/* Outer ring */}
      <circle
        cx="300" cy="300" r="280"
        stroke="rgba(0,212,255,0.06)"
        strokeWidth="1"
        strokeDasharray="8 12"
        style={{ animation: "orbit 60s linear infinite" }}
      />
      {/* Middle ring */}
      <circle
        cx="300" cy="300" r="200"
        stroke="rgba(139,92,246,0.05)"
        strokeWidth="1"
        strokeDasharray="4 16"
        style={{ animation: "orbit 45s linear infinite reverse" }}
      />
      {/* Inner ring */}
      <circle
        cx="300" cy="300" r="120"
        stroke="rgba(167,243,208,0.04)"
        strokeWidth="1"
        strokeDasharray="2 20"
        style={{ animation: "orbit 30s linear infinite" }}
      />
      {/* Orbital dots */}
      <circle cx="300" cy="20" r="3" fill="rgba(0,212,255,0.3)" style={{ animation: "orbit 60s linear infinite" }} />
      <circle cx="500" cy="300" r="2" fill="rgba(139,92,246,0.3)" style={{ animation: "orbit 45s linear infinite reverse" }} />
      <circle cx="300" cy="420" r="2.5" fill="rgba(167,243,208,0.25)" style={{ animation: "orbit 30s linear infinite" }} />
    </svg>
  );
}
