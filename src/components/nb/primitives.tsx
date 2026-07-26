"use client";
import { type ReactNode, type CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { nbTranslations } from "@/lib/notebook-i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/* ————— notebook copy + language ————— */
export function useNb() {
  const { lang, toggle } = useLang();
  const copy = nbTranslations[lang];
  return { lang, copy, toggle };
}

/* ————— scroll reveal wrapper ————— */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  rotate = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotate?: number;
  once?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y, rotate: rotate - 2 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ————— rubber stamp ————— */
export function Stamp({
  children,
  tone = "red",
  className,
  animate = false,
  style,
}: {
  children: ReactNode;
  tone?: "red" | "green" | "blue";
  className?: string;
  animate?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "nb-stamp",
        tone === "green" && "nb-stamp--green",
        tone === "blue" && "nb-stamp--blue",
        animate && "nb-stamp-in",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ————— masking tape strip ————— */
export function Tape({ className, style }: { className?: string; style?: CSSProperties }) {
  return <span aria-hidden className={cn("nb-tape", className)} style={style} />;
}

/* ————— section header: "MỤC 0X — LABEL" + ruled line + page ————— */
export function SectionHead({
  index,
  label,
  page,
  className,
}: {
  index: string;
  label: string;
  page: string;
  className?: string;
}) {
  return (
    <div className={cn("nb-sechead", className)}>
      <span className="nb-eyebrow whitespace-nowrap">
        {index} <span className="text-[var(--nb-red)]">—</span> {label}
      </span>
      <span className="nb-sechead-rule" aria-hidden />
      <span className="nb-sechead-pg whitespace-nowrap">{page}</span>
    </div>
  );
}

/* ————— hand-drawn scribble underline (draws itself) ————— */
export function Scribble({ className, delay = 0.2 }: { className?: string; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className={cn("block w-full", className)}
      fill="none"
    >
      <motion.path
        d="M3 9 Q 24 3 46 8 T 90 8 T 134 8 T 178 8 T 217 7"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ————— doodle: sketchy robot ————— */
export function RobotDoodle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 132"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M60 20 L60 9" />
      <circle cx="60" cy="6" r="3.4" />
      <rect x="34" y="20" width="52" height="40" rx="7" />
      <circle cx="48" cy="38" r="4" fill="currentColor" stroke="none" />
      <circle cx="72" cy="38" r="4" fill="currentColor" stroke="none" />
      <path d="M48 50 Q 60 56 72 50" />
      <path d="M60 60 L60 68" />
      <rect x="30" y="68" width="60" height="42" rx="7" />
      <circle cx="60" cy="86" r="5.5" />
      <path d="M30 76 L16 86" />
      <path d="M90 76 L104 86" />
      <circle cx="14" cy="88" r="3.4" />
      <circle cx="106" cy="88" r="3.4" />
      <circle cx="44" cy="118" r="8" />
      <circle cx="76" cy="118" r="8" />
    </svg>
  );
}

/* ————— doodle: hand-drawn curved arrow ————— */
export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 84 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8 Q 32 4 50 20 Q 64 32 68 48" />
      <path d="M57 41 L68 49 L71 36" />
    </svg>
  );
}

/* ————— doodle: spark / starburst ————— */
export function SparkDoodle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 28 28"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M14 3 L14 25" />
      <path d="M3 14 L25 14" />
      <path d="M6.5 6.5 L21.5 21.5" />
      <path d="M21.5 6.5 L6.5 21.5" />
    </svg>
  );
}

/* ————— doodle: paperclip ————— */
export function ClipDoodle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 12 L7 32 Q 7 37 12 37 Q 17 37 17 32 L17 8 Q 17 3 12 3 Q 7 3 7 8" />
      <path d="M11 12 L11 30" />
    </svg>
  );
}

/* ————— stagger container variants (shared) ————— */
export const nbStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const nbItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
