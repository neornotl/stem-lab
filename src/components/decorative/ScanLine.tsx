"use client";
import { useDevice } from "@/context/DeviceContext";

export default function ScanLine() {
  const { hud } = useDevice();
  if (hud !== "full") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-[0.04]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 30%, rgba(0,212,255,0.8) 50%, rgba(0,212,255,0.5) 70%, transparent 100%)",
          animation: "scan-line 8s linear infinite",
        }}
      />
      {/* CRT-like subtle scanlines overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)",
        }}
      />
    </div>
  );
}
