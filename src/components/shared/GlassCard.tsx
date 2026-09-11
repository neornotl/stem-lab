"use client";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { useDevice } from "@/context/DeviceContext";
import { useHydrated } from "@/hooks/useHydrated";
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
  const hydrated = useHydrated();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!hydrated || !ref.current) return;
    setInView(false); // start hidden after hydration
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hydrated]);

  // SSR / pre-hydration: always visible
  // Post-hydration + in view: visible with animation
  // Post-hydration + not in view: hidden (animates in when scrolled)
  const show = !hydrated || inView;

  return (
    <div
      ref={ref}
      className={cn(
        "relative glass-card p-6 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hudBrackets && hud !== "minimal" && "hud-brackets",
        hover && "glass-card-hover",
        show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-[0.97]",
        className
      )}
      style={{
        transitionDelay: show ? `${delay * 1000}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
