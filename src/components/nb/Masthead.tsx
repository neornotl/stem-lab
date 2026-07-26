"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Languages, Home } from "lucide-react";
import {
  useNb,
  Reveal,
  Stamp,
  Tape,
  Scribble,
  RobotDoodle,
  ArrowDoodle,
  SparkDoodle,
} from "./primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ————— count-up reading ————— */
function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && !started && setStarted(true),
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let f = 0;
    const total = 40;
    const t = setInterval(() => {
      f++;
      setVal(Math.round((f / total) * target));
      if (f >= total) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [started, target]);

  return <span ref={ref}>{val}</span>;
}

/* ————— fixed corner controls (language + home) ————— */
function NbControls() {
  const { copy, toggle } = useNb();
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      <button
        onClick={toggle}
        className="nb-mono flex min-h-[44px] items-center gap-1.5 border-2 border-[var(--nb-ink)] bg-[var(--nb-paper-card)] px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] shadow-[2px_3px_0_rgba(35,38,47,0.2)] transition-transform hover:-translate-y-0.5 hover:rotate-[-1deg]"
        aria-label="Toggle language"
      >
        <Languages className="h-3.5 w-3.5" />
        {copy.chrome.langToggle}
      </button>
      <Link
        href="/"
        className="nb-mono flex min-h-[44px] items-center gap-1.5 border-2 border-[var(--nb-ink)] bg-[var(--nb-yellow)] px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] shadow-[2px_3px_0_rgba(35,38,47,0.2)] transition-transform hover:-translate-y-0.5 hover:rotate-[1deg]"
      >
        <Home className="h-3.5 w-3.5" />
        {copy.chrome.backHome}
      </Link>
    </div>
  );
}

export default function Masthead() {
  const { copy } = useNb();
  const m = copy.masthead;

  return (
    <section className="relative">
      <NbControls />

      {/* ═══ lab-form header strip ═══ */}
      <div className="relative z-10 border-b-2 border-[var(--nb-ink)] bg-[var(--nb-paper-card)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 divide-x divide-[rgba(35,38,47,0.25)] border-x border-[rgba(35,38,47,0.25)] md:grid-cols-[1.8fr_1fr_1.5fr_1fr]">
            <div className="px-4 py-3">
              <div className="nb-mono text-[10px] uppercase tracking-[0.2em] text-[var(--nb-pencil)]">
                {copy.chrome.formLabel}
              </div>
              <div className="nb-display text-lg font-bold leading-tight text-[var(--nb-ink)]">
                {copy.chrome.club}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="nb-mono text-[10px] uppercase tracking-[0.2em] text-[var(--nb-pencil)]">
                {copy.chrome.volume}
              </div>
              <div className="nb-mono text-sm font-bold text-[var(--nb-red)]">★ 2026</div>
            </div>
            <div className="hidden px-4 py-3 md:block">
              <div className="nb-mono text-[10px] uppercase tracking-[0.2em] text-[var(--nb-pencil)]">
                {copy.chrome.field}
              </div>
              <div className="nb-hand text-sm font-medium text-[var(--nb-blue)]">
                {m.subtitle}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="nb-mono text-[10px] uppercase tracking-[0.2em] text-[var(--nb-pencil)]">
                {copy.chrome.date}
              </div>
              <div className="nb-mono text-sm font-bold text-[var(--nb-green)]">● {m.entry}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ cover spread ═══ */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-8 lg:px-12 lg:pt-16">
        {/* ambient: coffee ring + sparks */}
        <div aria-hidden className="nb-coffee right-[8%] top-6 hidden h-40 w-40 lg:block" />
        <SparkDoodle aria-hidden className="nb-float absolute left-[46%] top-4 hidden h-6 w-6 text-[var(--nb-red)] lg:block" />

        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* ── left: the written entry ── */}
          <div className="relative lg:col-span-7">
            <Reveal>
              <div className="nb-mono flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--nb-red)]">
                <SparkDoodle className="h-4 w-4" />
                {m.entry}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="nb-display mt-4 text-[2.7rem] font-black leading-[0.98] tracking-tight text-[var(--nb-ink)] sm:text-6xl lg:text-[4.6rem]">
                {m.title}
                <span className="text-[var(--nb-red)]">.</span>
              </h1>
              <div className="mt-1 max-w-md text-[var(--nb-blue)]">
                <Scribble />
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="nb-hand mt-5 inline-block -rotate-1 text-2xl font-medium text-[var(--nb-blue)] sm:text-[1.7rem]">
                “{m.subtitle}”
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="nb-mono mt-4 text-[13px] text-[var(--nb-pencil)]">
                {m.typed.replace(/_$/, "")}
                <span className="nb-caret" aria-hidden />
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--nb-ink)]/85 sm:text-base">
                {m.description}
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#signup" className="nb-btn">
                  {m.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#experiments" className="nb-btn nb-btn--ghost">
                  {m.ctaSecondary}
                </a>
              </div>
            </Reveal>

            {/* data readout table */}
            <Reveal delay={0.4}>
              <div className="mt-10 max-w-xl border-2 border-[var(--nb-ink)] bg-[var(--nb-paper-card)] shadow-[3px_4px_0_rgba(35,38,47,0.15)]">
                <div className="flex items-center justify-between border-b-2 border-[var(--nb-ink)] bg-[var(--nb-paper-deep)] px-4 py-2">
                  <span className="nb-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--nb-ink)]">
                    {m.readoutTitle}
                  </span>
                  <span className="nb-hand text-[13px] text-[var(--nb-pencil)]">± 0.1</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[rgba(35,38,47,0.2)] md:grid-cols-4">
                  {m.stats.map((s) => (
                    <div key={s.label} className="px-4 py-4">
                      <div className="nb-display text-3xl font-bold text-[var(--nb-blue)]">
                        <CountUp target={s.value} />
                        <span className="text-[var(--nb-red)]">{s.suffix}</span>
                      </div>
                      <div className="nb-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--nb-pencil)]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── right: taped polaroid + stamp + margin note ── */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto mt-2 max-w-[300px] lg:mt-8">
              {/* polaroid */}
              <Reveal rotate={2.5} y={34}>
                <div className="nb-polaroid group relative transition-transform duration-500 hover:rotate-0">
                  <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
                  <div className="flex aspect-square items-center justify-center border border-[rgba(35,38,47,0.12)] bg-[linear-gradient(rgba(47,84,168,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(47,84,168,0.06)_1px,transparent_1px)] bg-[size:18px_18px]">
                    <RobotDoodle className="nb-float h-40 w-40 text-[var(--nb-ink)] transition-colors group-hover:text-[var(--nb-blue)]" />
                  </div>
                  <p className="nb-hand absolute inset-x-0 bottom-3 px-3 text-center text-[15px] leading-tight text-[var(--nb-pencil)]">
                    {m.polaroidCaption}
                  </p>
                </div>
              </Reveal>

              {/* recruiting stamp */}
              <div className="absolute -left-8 -top-6 z-10 hidden sm:block">
                <Stamp animate tone="red" style={{ animationDelay: "0.7s" } as CSSProperties}>
                  <span className="text-[13px] leading-none">
                    {m.stamp}
                    <span className="mt-0.5 block text-[9px] font-normal tracking-[0.14em]">
                      {m.stampSub}
                    </span>
                  </span>
                </Stamp>
              </div>

              {/* margin note + arrow */}
              <Reveal delay={0.5} className="absolute -bottom-16 -right-2 hidden w-40 rotate-3 sm:block">
                <div className="relative">
                  <ArrowDoodle className="absolute -left-10 -top-9 h-12 w-14 -scale-x-100 text-[var(--nb-red)]" />
                  <p className="nb-hand text-[16px] leading-snug text-[var(--nb-red)]">
                    {m.marginNote}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ tape ticker ═══ */}
      <div className="nb-ticker relative z-10 py-3" aria-hidden>
        <div className="nb-ticker-track" style={{ "--nb-ticker-duration": "28s" } as CSSProperties}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {m.ticker.map((w) => (
                <span
                  key={`${dup}-${w}`}
                  className="nb-mono flex items-center gap-6 whitespace-nowrap pr-6 text-[12px] font-bold uppercase tracking-[0.28em]"
                >
                  {w}
                  <span className="text-[var(--nb-yellow)]">✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
