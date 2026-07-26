"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDevice } from "@/context/DeviceContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function CustomCursor() {
  const { isDesktop } = useDevice();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring follower for the ring
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.5 });

  // Slower spring for the outer glow
  const glowX = useSpring(cursorX, { damping: 15, stiffness: 120, mass: 1 });
  const glowY = useSpring(cursorY, { damping: 15, stiffness: 120, mass: 1 });

  useEffect(() => {
    // Don't hijack cursor for reduced-motion users or non-desktop
    if (!isDesktop || reduced) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);
    const over = (e: MouseEvent) => {
      setInteractive(!!(e.target as HTMLElement)?.closest?.("button, a, input, select, textarea, [role='button'], label"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    // Hide default cursor only while custom cursor is active
    document.documentElement.classList.add("custom-cursor-active");
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-active");
      document.documentElement.style.cursor = "";
    };
  }, [isDesktop, reduced, cursorX, cursorY, visible]);

  if (!isDesktop || reduced) return null;

  return (
    <>
      {/* Outer glow aura */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`rounded-full transition-all duration-500 ${
            clicking
              ? "w-40 h-40 bg-cyan/[0.04]"
              : "w-28 h-28 bg-cyan/[0.03]"
          } blur-2xl`}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            clicking
              ? "w-8 h-8 border-cyan/60 bg-cyan/5"
              : interactive
              ? "w-6 h-6 border-cyan/70 bg-cyan/10"
              : "w-10 h-10 border-cyan/30"
          }`}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            clicking
              ? "w-1.5 h-1.5 bg-text shadow-glow-cyan"
              : interactive
              ? "w-1.5 h-1.5 bg-cyan shadow-glow-cyan"
              : "w-1 h-1 bg-cyan shadow-glow-cyan"
          }`}
        />
      </motion.div>
    </>
  );
}
