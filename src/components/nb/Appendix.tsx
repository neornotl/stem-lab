"use client";
import { ArrowUp, Mail } from "lucide-react";
import {
  useNb,
  Reveal,
  SectionHead,
  Tape,
  ArrowDoodle,
  RobotDoodle,
  SparkDoodle,
} from "./primitives";
import { faqVi, faqEn } from "@/data/faq";
import { cn } from "@/lib/utils";

/* ═══════════════ MỤC 07 — NOTES (FAQ sticky-note wall) ═══════════════ */
const STICKY_ROTS = [
  "-rotate-[1.4deg]",
  "rotate-[1deg]",
  "-rotate-[0.7deg]",
  "rotate-[1.6deg]",
  "-rotate-[1deg]",
  "rotate-[0.8deg]",
];
const PIN_COLORS = ["bg-[var(--nb-red)]", "bg-[var(--nb-blue)]", "bg-[var(--nb-green)]"];

export function Notes() {
  const { copy, lang } = useNb();
  const n = copy.notes;
  const faqs = lang === "vi" ? faqVi : faqEn;

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={n.index} label={n.label} page={n.page} />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="nb-display text-3xl font-black text-[var(--nb-ink)] sm:text-4xl">{n.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="nb-hand max-w-xs text-[16px] leading-snug text-[var(--nb-pencil)]">{n.description}</p>
        </Reveal>
      </div>

      {/* — the sticky-note wall — */}
      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={(i % 3) * 0.08} className="mb-6 break-inside-avoid">
            <div
              className={cn(
                "nb-sticky nb-wiggle-hover relative block w-full p-5 pt-8 transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5",
                STICKY_ROTS[i % STICKY_ROTS.length]
              )}
            >
              {/* push pin */}
              <span
                aria-hidden
                className={cn(
                  "absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[var(--nb-ink)] shadow-[1px_2px_0_rgba(35,38,47,0.25)]",
                  PIN_COLORS[i % PIN_COLORS.length]
                )}
              />
              <div className="flex items-start gap-2.5">
                <span className="nb-display mt-0.5 text-xl font-black leading-none text-[var(--nb-red)]">?</span>
                <h3 className="nb-hand text-[16px] font-bold leading-snug text-[var(--nb-ink)]">{f.q}</h3>
              </div>
              <p className="mt-3 border-t border-dashed border-[rgba(35,38,47,0.3)] pt-2.5 text-[13.5px] leading-relaxed text-[var(--nb-ink)]/80">
                {f.a}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* — still have questions? — */}
      <Reveal delay={0.1}>
        <div className="nb-card nb-card--ruled nb-card--bluetop relative mx-auto mt-14 max-w-2xl p-7 sm:p-8">
          <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="relative shrink-0">
              <ArrowDoodle className="absolute -right-9 -top-7 hidden h-12 w-14 text-[var(--nb-red)] sm:block" />
              <span className="nb-display flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--nb-ink)] bg-[var(--nb-yellow)] text-[var(--nb-ink)]">
                <Mail className="h-6 w-6" strokeWidth={1.8} />
              </span>
            </div>
            <div className="flex-1">
              <h3 className="nb-display text-xl font-bold text-[var(--nb-ink)]">{n.more}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-[var(--nb-ink)]/75">{n.moreDesc}</p>
              <a
                href={`mailto:${n.email}`}
                className="nb-mono mt-2 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--nb-blue)] underline decoration-dashed underline-offset-4 transition-colors hover:text-[var(--nb-red)]"
              >
                {n.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════ BACK COVER (footer) ═══════════════ */
export function BackCover() {
  const { copy } = useNb();
  const b = copy.backcover;

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 mt-10 border-t-[6px] border-double border-[var(--nb-red)] bg-[var(--nb-ink)] text-[var(--nb-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col items-center text-center">
          {/* end mark flanked by rules + robot */}
          <Reveal>
            <div className="flex items-center gap-5" aria-hidden>
              <span className="h-px w-16 bg-[var(--nb-paper)]/40 sm:w-24" />
              <RobotDoodle className="nb-float h-14 w-14 text-[var(--nb-yellow)]" />
              <span className="h-px w-16 bg-[var(--nb-paper)]/40 sm:w-24" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="nb-display mt-6 text-3xl font-black tracking-tight text-[var(--nb-paper)] sm:text-4xl">
              {b.end}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--nb-paper)]/70">{b.description}</p>
          </Reveal>

          {/* next-volume teaser, as a yellow sticky on the dark cover */}
          <Reveal delay={0.24} rotate={2}>
            <span className="nb-sticky nb-wiggle-hover mt-8 inline-flex items-center gap-2 px-5 py-2.5 text-[var(--nb-ink)]">
              <SparkDoodle className="h-4 w-4 text-[var(--nb-red)]" />
              <span className="nb-hand text-[15px] font-bold">{b.nextVolume}</span>
            </span>
          </Reveal>

          <div aria-hidden className="my-10 w-full border-t border-dashed border-[var(--nb-paper)]/25" />

          {/* contact line */}
          <Reveal delay={0.1}>
            <div className="nb-mono flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[13px] uppercase tracking-[0.16em] text-[var(--nb-paper)]/85">
              <span>{b.school}</span>
              <a
                href={`mailto:${b.email}`}
                className="inline-flex items-center gap-2 text-[var(--nb-yellow)] transition-colors hover:text-[var(--nb-paper)]"
              >
                <Mail className="h-4 w-4" />
                {b.email}
              </a>
            </div>
          </Reveal>

          {/* bottom line */}
          <div className="mt-10 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="nb-mono text-[11px] uppercase tracking-[0.16em] text-[var(--nb-paper)]/70">
              © 2026 · {b.rights}
            </span>
            <span className="nb-hand text-[15px] text-[var(--nb-paper)]/70">{b.madeWith} ✎</span>
            <button
              onClick={toTop}
              aria-label="Back to top"
              className="nb-mono inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 border-2 border-[var(--nb-paper)]/40 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--nb-paper)]/80 transition-all hover:-translate-y-0.5 hover:border-[var(--nb-yellow)] hover:text-[var(--nb-yellow)]"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
