"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ─── Types ─── */
interface TrailPoint {
  x: number;
  y: number;
  t: number; // timestamp
}
interface InkBlot {
  x: number;
  y: number;
  t: number;
  seed: number;
}
interface HoverCircle {
  x: number;
  y: number;
  w: number;
  h: number;
  progress: number; // 0→1 draw progress
  seed: number;
}

const TRAIL_LIFETIME = 900; // ms before trail fully fades
const BLOT_LIFETIME = 700; // ms for ink blot to fade
const CIRCLE_DRAW_MS = 350; // ms to sketch the circle
const INK_BLUE = "43, 80, 200"; // --nb-blue
const STAMP_RED = "200, 55, 45"; // --nb-red

/**
 * Notebook fountain-pen cursor.
 *
 * • Pen nib SVG follows the pointer with a slight tilt based on velocity.
 * • A fading ballpoint-blue ink trail is drawn on a full-screen canvas.
 * • Clicking drops an ink blot splatter.
 * • Hovering interactive elements sketches a hand-drawn red circle.
 *
 * Gated behind pointer:fine + prefers-reduced-motion.
 */
export default function NotebookCursor() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mutable state (no re-renders)
  const trail = useRef<TrailPoint[]>([]);
  const blots = useRef<InkBlot[]>([]);
  const circle = useRef<HoverCircle | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const active = useRef(false);

  /* ─── Sketchy circle path (wobbly ellipse) ─── */
  const drawSketchCircle = useCallback(
    (ctx: CanvasRenderingContext2D, c: HoverCircle, now: number) => {
      const elapsed = now - c.progress;
      const t = Math.min(elapsed / CIRCLE_DRAW_MS, 1);
      const rx = c.w / 2 + 8;
      const ry = c.h / 2 + 8;
      const steps = 40;
      const end = Math.floor(steps * t);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${STAMP_RED}, ${0.7 * (1 - Math.max(0, (elapsed - 1200) / 500))})`;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      for (let i = 0; i <= end; i++) {
        const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
        // Wobble for hand-drawn feel
        const wobble =
          Math.sin(angle * 3 + c.seed) * 2.5 +
          Math.cos(angle * 5 + c.seed * 2) * 1.5;
        const px = c.x + Math.cos(angle) * (rx + wobble);
        const py = c.y + Math.sin(angle) * (ry + wobble * 0.7);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Remove after fully drawn + fade
      if (elapsed > 1700) circle.current = null;
    },
    []
  );

  /* ─── Ink blot splatter ─── */
  const drawBlot = useCallback(
    (ctx: CanvasRenderingContext2D, b: InkBlot, now: number) => {
      const elapsed = now - b.t;
      const life = elapsed / BLOT_LIFETIME;
      if (life > 1) return false;

      const alpha = 0.6 * (1 - life);
      const scale = 0.5 + life * 0.5;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.scale(scale, scale);
      ctx.fillStyle = `rgba(${INK_BLUE}, ${alpha})`;

      // Main blob
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 4, b.seed, 0, Math.PI * 2);
      ctx.fill();

      // Satellite splatters
      for (let i = 0; i < 4; i++) {
        const angle = b.seed + (i * Math.PI) / 2;
        const dist = 7 + Math.sin(b.seed * (i + 1)) * 3;
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * dist,
          Math.sin(angle) * dist,
          1.5 + Math.random() * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();
      return true;
    },
    []
  );

  /* ─── Main animation loop ─── */
  const tick = useCallback(
    function animate(now: number) {
      const canvas = canvasRef.current;
      const pen = penRef.current;
      if (!canvas || !pen) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Resize canvas to viewport
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Draw ink trail ──
      const pts = trail.current;
      // Remove expired points
      while (pts.length > 0 && now - pts[0].t > TRAIL_LIFETIME) pts.shift();

      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i++) {
          const age = (now - pts[i].t) / TRAIL_LIFETIME;
          const alpha = 0.45 * (1 - age);
          const width = 2.2 * (1 - age * 0.6);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${INK_BLUE}, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
        }
      }

      // ── Draw ink blots ──
      blots.current = blots.current.filter((b) => drawBlot(ctx, b, now));

      // ── Draw hover circle ──
      if (circle.current) drawSketchCircle(ctx, circle.current, now);

      // ── Position pen nib ──
      const { x, y } = pos.current;
      const dx = x - prevPos.current.x;
      const tilt = Math.max(-25, Math.min(25, dx * 1.2));
      pen.style.transform = `translate(${x}px, ${y}px) rotate(${tilt - 30}deg)`;
      pen.style.opacity = active.current ? "1" : "0";
      prevPos.current = { x, y };

      rafRef.current = requestAnimationFrame(animate);
    },
    [drawBlot, drawSketchCircle]
  );

  /* ─── Setup listeners ─── */
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || reduced) return;

    active.current = true;
    document.body.classList.add("nb-custom-cursor");
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      // Cap trail length
      if (trail.current.length > 80) trail.current.shift();
    };

    const onDown = (e: MouseEvent) => {
      blots.current.push({
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
        seed: Math.random() * Math.PI * 2,
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "button, a, input, select, textarea, [role='button'], label, .nb-btn"
      );
      if (target) {
        const rect = target.getBoundingClientRect();
        circle.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          w: rect.width,
          h: rect.height,
          progress: performance.now(),
          seed: Math.random() * 10,
        };
      }
    };

    const onLeave = () => {
      active.current = false;
    };
    const onEnter = () => {
      active.current = true;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("nb-custom-cursor");
    };
  }, [reduced, tick]);

  if (reduced) return null;

  return (
    <>
      {/* Ink trail + effects canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998]"
      />

      {/* Fountain pen nib */}
      <div
        ref={penRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-200"
        style={{ willChange: "transform" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: "translate(-2px, -22px)" }}
        >
          {/* Pen nib shape */}
          <path
            d="M12 2 L14.5 14 L12 22 L9.5 14 Z"
            fill="var(--nb-ink, #23262f)"
            stroke="var(--nb-blue, #2b50c8)"
            strokeWidth="0.5"
          />
          {/* Nib slit */}
          <line
            x1="12"
            y1="6"
            x2="12"
            y2="18"
            stroke="var(--nb-blue, #2b50c8)"
            strokeWidth="0.6"
            opacity="0.7"
          />
          {/* Ink tip */}
          <circle cx="12" cy="21" r="1.2" fill="var(--nb-blue, #2b50c8)" />
        </svg>
      </div>
    </>
  );
}
