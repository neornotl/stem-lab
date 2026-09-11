"use client";
import { useRef, useState, useEffect, type CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Animated counter (mono, left-aligned) ── */
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 48;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / total) * target));
      if (frame >= total) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="px-6 py-6 md:py-7">
      <div className="font-mono text-3xl md:text-4xl font-semibold text-cyan tabular-nums">
        {count}
        <span className="text-orange">+</span>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim mt-1.5">
        {label}
      </div>
    </div>
  );
}

/* ── Terminal console panel ── */
const SYS_ROWS: { label: string; value: string; tone: "ok" | "warn" }[] = [
  { label: "robotics", value: "ONLINE", tone: "ok" },
  { label: "ai-core", value: "ONLINE", tone: "ok" },
  { label: "iot-mesh", value: "ONLINE", tone: "ok" },
  { label: "vision", value: "ONLINE", tone: "ok" },
  { label: "members", value: "50+ ACTIVE", tone: "warn" },
  { label: "next-session", value: "SAT 08:00", tone: "warn" },
];

function LabConsole({ reduced }: { reduced: boolean }) {
  const rowVariants: Variants = reduced
    ? {}
    : {
        hidden: { opacity: 0, x: -10 },
        show: (i: number) => ({
          opacity: 1,
          x: 0,
          transition: { delay: 0.5 + i * 0.12, duration: 0.4, ease: "easeOut" },
        }),
      };

  return (
    <div className="relative">
      {/* Rotating dial behind */}
      <div
        aria-hidden
        className="absolute -top-10 -right-8 w-44 h-44 rounded-full border border-dashed border-cyan/25 spin-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-8 -left-6 w-24 h-24 rounded-full border border-orange/25 pointer-events-none"
      />

      <div className="relative glass-card tick-corners overflow-hidden font-mono text-[13px]">
        {/* subtle scan sweep */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cyan/10 to-transparent pointer-events-none"
          style={{ animation: "console-scan 5.5s ease-in-out infinite" }}
        />
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border bg-bg-secondary/60">
          <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
          <span className="ml-3 text-text-dim text-xs tracking-wider">stem-lab — status</span>
          <span className="ml-auto led" aria-hidden />
        </div>

        {/* Body */}
        <div className="p-5 space-y-2.5">
          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-text-muted"
          >
            <span className="text-orange">~/stem-lab</span> $ ./status --all
          </motion.p>

          {SYS_ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              custom={i}
              variants={rowVariants}
              initial={reduced ? undefined : "hidden"}
              animate="show"
              className="flex items-center gap-3"
            >
              <ChevronRight className="w-3 h-3 text-cyan shrink-0" />
              <span className="text-text-muted">{row.label}</span>
              <span className="flex-1 border-b border-dashed border-glass-border" />
              <span className={row.tone === "ok" ? "text-mint" : "text-orange"}>{row.value}</span>
            </motion.div>
          ))}

          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-1 flex items-center gap-2"
          >
            <span className="led led-orange" aria-hidden />
            <span className="text-orange tracking-wider">RECRUITING</span>
            <span className="caret-blink" aria-hidden />
          </motion.p>
        </div>
      </div>
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();

  const tickerWords = t.activities.items.map((i) => i.title);

  return (
    <section id="hero" className="relative min-h-dvh flex flex-col overflow-hidden">
      {/* ── Ambient background: blueprint grid + corner tints ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 blueprint-grid text-text-dim opacity-[0.07]" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange/10 blur-3xl" />
      </div>

      {/* ── Main split ── */}
      <div className="relative flex-1 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-14">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left — statement */}
            <motion.div
              variants={reduced ? undefined : container}
              initial={reduced ? undefined : "hidden"}
              animate="show"
              className="lg:col-span-7"
            >
              {/* Status chip */}
              <motion.div variants={reduced ? undefined : item} className="inline-flex items-center gap-2.5 mb-7">
                <span className="led" aria-hidden />
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-cyan">
                  {t.hero.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={reduced ? undefined : item}
                className="font-heading font-bold tracking-tight leading-[1.04] text-text text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5rem]"
              >
                {t.hero.title}
                <span className="text-orange">.</span>
              </motion.h1>

              <motion.p
                variants={reduced ? undefined : item}
                className="mt-5 font-heading text-xl sm:text-2xl text-cyan font-medium"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.p
                variants={reduced ? undefined : item}
                className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed max-w-xl"
              >
                {t.hero.description}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={reduced ? undefined : item} className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href="#register"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-orange text-[#0b1220] font-semibold text-base hover:bg-orange-dim transition-colors btn-sweep shadow-glow-violet"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#activities"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-cyan/50 text-cyan font-semibold text-base hover:bg-cyan/10 transition-colors"
                >
                  {t.hero.ctaSecondary}
                </a>
              </motion.div>
            </motion.div>

            {/* Right — lab console */}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <LabConsole reduced={reduced} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative border-y border-glass-border bg-bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-glass-border">
            <AnimatedCounter target={50} label={t.hero.stats.members} />
            <AnimatedCounter target={20} label={t.hero.stats.projects} />
            <AnimatedCounter target={7} label={t.hero.stats.areas} />
            <AnimatedCounter target={15} label={t.hero.stats.events} />
          </div>
        </div>
      </div>

      {/* ── Marquee ticker of activity areas ── */}
      <div className="relative overflow-hidden py-4 border-b border-glass-border">
        <div className="marquee" style={{ "--marquee-duration": "30s" } as CSSProperties}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
              {tickerWords.map((w) => (
                <span
                  key={`${dup}-${w}`}
                  className="flex items-center gap-6 pr-6 font-mono text-xs uppercase tracking-[0.25em] text-text-dim whitespace-nowrap"
                >
                  {w}
                  <span className="text-orange">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
