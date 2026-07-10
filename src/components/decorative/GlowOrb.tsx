"use client";
import { useDevice } from "@/context/DeviceContext";
import { cn } from "@/lib/utils";

interface Props {
  color: "cyan" | "violet" | "mint";
  className?: string;
  size?: number;
}

const colorMap = {
  cyan: "bg-cyan/20",
  violet: "bg-violet/20",
  mint: "bg-mint/15",
};

export default function GlowOrb({ color, className, size = 300 }: Props) {
  const { hud } = useDevice();
  if (hud === "minimal") return null;

  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl opacity-40 pointer-events-none",
        colorMap[color],
        hud === "simplified" ? "opacity-25" : "opacity-40",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
