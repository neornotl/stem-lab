"use client";
import { useDevice } from "@/context/DeviceContext";
import { cn } from "@/lib/utils";

export default function GridPattern({ className }: { className?: string }) {
  const { hud } = useDevice();
  if (hud === "minimal") return null;

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        hud === "simplified" ? "opacity-[0.015]" : "opacity-[0.03]",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  );
}
