"use client";
import { useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Bot,
  Brain,
  Code2,
  Wifi,
  FlaskConical,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useNb, Reveal, SectionHead, Tape, SparkDoodle } from "./primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/* ————— marker highlight that sweeps in on scroll ————— */
function Marker({ children, blue = false }: { children: ReactNode; blue?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={cn("nb-hl", blue && "nb-hl--blue", inView && "nb-hl-on")}>
      {children}
    </span>
  );
}

/* ————— hand-drawn checked box ————— */
function Check() {
  return (
    <span className="nb-check" aria-hidden>
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
        <path
          d="M2.5 7.5 L5.5 10.5 L11.5 3.5"
          stroke="var(--nb-green)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ═══════════════ MỤC 01 — HYPOTHESIS (about) ═══════════════ */
export function Hypothesis() {
  const { copy } = useNb();
  const h = copy.hypothesis;
  const tops = ["nb-card--redtop", "nb-card--bluetop", "nb-card--greentop"];
  const rots = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];
  const offsets = ["", "lg:mt-8", "lg:mt-3"];

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={h.index} label={h.label} page={h.page} />

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="nb-display text-3xl font-black leading-tight text-[var(--nb-ink)] sm:text-4xl">
              {h.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="nb-display mt-5 text-xl font-medium leading-relaxed text-[var(--nb-ink)] sm:text-2xl">
              {h.statementA}
              <Marker>{h.statementHl}</Marker>
              {h.statementB}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl leading-relaxed text-[var(--nb-ink)]/80">{h.description}</p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-6 inline-flex items-center gap-2">
              <span className="nb-stamp nb-stamp--green !rotate-[-3deg] text-[11px]">{h.marginNote}</span>
            </div>
          </Reveal>
        </div>

        {/* index cards */}
        <div className="lg:col-span-5">
          <div className="space-y-6">
            {h.cards.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.12} rotate={0}>
                <div
                  className={cn(
                    "nb-card nb-card--ruled relative p-5 pl-6 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1",
                    tops[i],
                    rots[i],
                    offsets[i]
                  )}
                >
                  <Tape className="-top-3 right-8 rotate-3" />
                  <div className="flex items-start gap-4">
                    <span className="nb-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--nb-ink)] bg-[var(--nb-yellow)] text-lg font-black text-[var(--nb-ink)]">
                      {c.no}
                    </span>
                    <div>
                      <h3 className="nb-display text-lg font-bold text-[var(--nb-ink)]">{c.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--nb-ink)]/75">{c.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MỤC 02 — EXPERIMENTS (activities) ═══════════════ */
const EXP_ICONS: LucideIcon[] = [Bot, Brain, Code2, Wifi, FlaskConical, PenTool, Rocket];
const EXP_ROTS = ["-rotate-[1.2deg]", "rotate-[0.8deg]", "-rotate-[0.6deg]", "rotate-[1.4deg]", "-rotate-[1deg]", "rotate-[0.6deg]", "-rotate-[1.4deg]"];
const EXP_OFFSETS = ["", "lg:mt-6", "lg:mt-2", "", "lg:mt-8", "lg:mt-4", ""];

export function Experiments() {
  const { copy } = useNb();
  const e = copy.experiments;

  return (
    <section id="experiments" className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={e.index} label={e.label} page={e.page} />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="nb-display text-3xl font-black text-[var(--nb-ink)] sm:text-4xl">{e.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="nb-hand max-w-xs text-[16px] leading-snug text-[var(--nb-pencil)]">{e.description}</p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {e.items.map((item, i) => {
          const Icon = EXP_ICONS[i % EXP_ICONS.length];
          return (
            <Reveal key={item.code} delay={(i % 3) * 0.1}>
              <div
                className={cn(
                  "nb-card nb-card--ruled group relative p-5 transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[4px_6px_0_rgba(35,38,47,0.14),0_18px_34px_rgba(35,38,47,0.12)]",
                  EXP_ROTS[i],
                  EXP_OFFSETS[i]
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="nb-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--nb-red)]">
                    {item.code}
                  </span>
                  <SparkDoodle className="h-4 w-4 text-[var(--nb-yellow)] opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--nb-ink)] bg-[var(--nb-blue-soft)] text-[var(--nb-blue)] transition-colors group-hover:bg-[var(--nb-blue)] group-hover:text-[var(--nb-paper-card)]">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="nb-display mt-4 text-xl font-bold text-[var(--nb-ink)]">{item.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--nb-ink)]/75">{item.desc}</p>
                <div className="nb-mono mt-4 flex items-center gap-2 border-t border-dashed border-[rgba(35,38,47,0.3)] pt-3 text-[10px] uppercase tracking-[0.16em] text-[var(--nb-pencil)]">
                  {e.resultLabel}:
                  <span className="font-bold text-[var(--nb-green)]">{e.result} ✓</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════ MỤC 03 — SUBJECTS (audience) ═══════════════ */
export function Subjects() {
  const { copy } = useNb();
  const s = copy.subjects;
  const reduced = usePrefersReducedMotion();
  const keys = ["students", "teachers", "parents"] as const;
  const [active, setActive] = useState<(typeof keys)[number]>("students");
  const tab = s.tabs[active];

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={s.index} label={s.label} page={s.page} />

      <Reveal>
        <h2 className="nb-display mt-8 text-3xl font-black text-[var(--nb-ink)] sm:text-4xl">{s.title}</h2>
        <p className="nb-hand mt-2 text-[16px] text-[var(--nb-pencil)]">{s.description}</p>
      </Reveal>

      {/* folder tabs */}
      <Reveal delay={0.12}>
        <div className="mt-10">
          <div className="flex flex-wrap gap-1.5">
            {keys.map((k) => {
              const isActive = k === active;
              return (
                <button
                  key={k}
                  onClick={() => setActive(k)}
                  className={cn(
                    "nb-mono -mb-[2px] rounded-t-lg border-2 border-b-0 border-[var(--nb-ink)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-all",
                    isActive
                      ? "z-10 bg-[var(--nb-paper-card)] text-[var(--nb-red)]"
                      : "bg-[var(--nb-paper-deep)] text-[var(--nb-pencil)] hover:bg-[var(--nb-paper-card)] hover:text-[var(--nb-ink)]"
                  )}
                >
                  {s.tabs[k].label}
                </button>
              );
            })}
          </div>

          {/* specimen card */}
          <div className="relative border-2 border-[var(--nb-ink)] bg-[var(--nb-paper-card)] p-6 shadow-[4px_5px_0_rgba(35,38,47,0.15)] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? undefined : { opacity: 0, y: 14 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="nb-display text-2xl font-bold text-[var(--nb-ink)]">{tab.label}</h3>
                  <span className="nb-stamp nb-stamp--blue !rotate-[2deg] text-[10px]">{tab.tag}</span>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {tab.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check />
                      <span className="text-[14px] leading-relaxed text-[var(--nb-ink)]/85">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
