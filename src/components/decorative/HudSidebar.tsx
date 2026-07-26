"use client";
import { useState, useEffect } from "react";
import { useDevice } from "@/context/DeviceContext";

export default function HudSidebar() {
  const { hud } = useDevice();
  const [scrollPct, setScrollPct] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const interval = setInterval(tick, 1000);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  if (hud === "minimal") return null;

  const opacity = hud === "full" ? 0.5 : 0.25;

  return (
    <>
      {/* Left side — scroll progress bar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[90] pointer-events-none hidden lg:flex flex-col items-center gap-2">
        <div className="w-px h-32 bg-text-dim/20 relative overflow-hidden rounded-full">
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan to-violet rounded-full transition-all duration-300"
            style={{ height: `${scrollPct}%`, opacity }}
          />
        </div>
        <span
          className="text-[10px] font-[family-name:var(--font-mono)] text-cyan"
          style={{ opacity }}
        >
          {scrollPct}%
        </span>
      </div>

      {/* Right side — system info */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[90] pointer-events-none hidden lg:flex flex-col items-end gap-3"
        style={{ opacity }}
      >
        <div className="text-[10px] font-[family-name:var(--font-mono)] text-text-dim tracking-wider">
          SYS.TIME
        </div>
        <div className="text-[10px] font-[family-name:var(--font-mono)] text-cyan">
          {time}
        </div>
        <div className="w-8 h-px bg-text-dim/25" />
        <div className="text-[10px] font-[family-name:var(--font-mono)] text-text-dim tracking-wider">
          STEM
        </div>
        <div className="text-[10px] font-[family-name:var(--font-mono)] text-violet">
          v1.0
        </div>
        <div className="w-8 h-px bg-text-dim/25" />
        <div className="flex gap-0.5 items-end">
          {[10, 14, 8, 12, 6].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-cyan/40"
              style={{
                height: `${h}px`,
                opacity: i < 3 ? 0.8 : 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
