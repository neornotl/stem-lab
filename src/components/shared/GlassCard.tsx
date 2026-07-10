"use client";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { useDevice } from "@/context/DeviceContext";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  hudBrackets?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  hudBrackets = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { hud } = useDevice();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative glass-card p-6 transition-all",
        hudBrackets && hud !== "minimal" && "hud-brackets",
        hover && "glass-card-hover",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-5 scale-[0.97]",
        className
      )}
      style={{
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: visible ? `${delay * 1000}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
