"use client";
import { useDevice } from "@/context/DeviceContext";

export default function CircuitLines({ className }: { className?: string }) {
  const { hud } = useDevice();
  if (hud !== "full") return null;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none fx-dark-only ${className ?? ""}`}
      fill="none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      {/* Horizontal circuit lines */}
      <line
        x1="0" y1="200" x2="400" y2="200"
        stroke="rgba(0,212,255,0.06)" strokeWidth="1"
        strokeDasharray="4 8"
        style={{ animation: "dash-flow 20s linear infinite" }}
      />
      <line
        x1="800" y1="400" x2="1200" y2="400"
        stroke="rgba(139,92,246,0.06)" strokeWidth="1"
        strokeDasharray="4 8"
        style={{ animation: "dash-flow 25s linear infinite" }}
      />
      <line
        x1="200" y1="600" x2="600" y2="600"
        stroke="rgba(0,212,255,0.04)" strokeWidth="1"
        strokeDasharray="4 8"
        style={{ animation: "dash-flow 30s linear infinite" }}
      />

      {/* Circuit nodes */}
      <circle cx="400" cy="200" r="3" fill="rgba(0,212,255,0.1)" />
      <circle cx="800" cy="400" r="3" fill="rgba(139,92,246,0.1)" />
      <circle cx="600" cy="600" r="3" fill="rgba(0,212,255,0.08)" />

      {/* Vertical branch */}
      <line
        x1="400" y1="200" x2="400" y2="350"
        stroke="rgba(0,212,255,0.04)" strokeWidth="1"
        strokeDasharray="3 6"
      />
      <line
        x1="800" y1="300" x2="800" y2="400"
        stroke="rgba(139,92,246,0.04)" strokeWidth="1"
        strokeDasharray="3 6"
      />
    </svg>
  );
}
