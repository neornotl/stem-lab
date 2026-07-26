"use client";

import Link from "next/link";
import { LanguageProvider, useLang } from "@/context/LanguageContext";
import { nbTranslations } from "@/lib/notebook-i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

function MemberCard({
  person,
  cardLabel,
  index,
}: {
  person: { name: string; role: string; desc: string };
  cardLabel: string;
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  const rotations = [-1.5, 1, -0.5, 1.5];
  const tapeColors = ["var(--nb-tape)", "var(--nb-tape-blue)", "var(--nb-tape-red)", "var(--nb-tape)"];

  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="nb-card relative p-6 pt-8"
      style={{ transform: `rotate(${rotations[index % 4]}deg)` }}
      tabIndex={0}
      role="button"
      aria-label={person.name}
    >
      {/* Tape */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 rotate-[-2deg] opacity-80"
        style={{ background: tapeColors[index % 4] }}
      />

      {/* Lab pass badge */}
      <span className="nb-mono text-[10px] font-bold uppercase tracking-widest text-[var(--nb-blue)]">
        {cardLabel}
      </span>

      {/* Role */}
      <p className="nb-hand mt-3 text-lg font-bold text-[var(--nb-red)]">{person.role}</p>

      {/* Name */}
      <h3 className="nb-display mt-1 text-2xl font-black text-[var(--nb-ink)]">{person.name}</h3>

      {/* Description */}
      <p className="nb-body mt-3 text-sm leading-relaxed text-[var(--nb-pencil)]">{person.desc}</p>

      {/* Decorative stamp */}
      <span
        aria-hidden="true"
        className="nb-mono absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[var(--nb-blue)]/30"
      >
        STEM
      </span>
    </motion.article>
  );
}

function MembersContent() {
  const { lang } = useLang();
  const s = nbTranslations[lang].members;
  const masthead = nbTranslations[lang].masthead;

  return (
    <div className="nb-root min-h-screen">
      <div className="nb-page">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b-2 border-[var(--nb-ink)] pb-3">
          <Link
            href="/lab"
            className="nb-mono text-xs font-bold uppercase tracking-widest text-[var(--nb-blue)] hover:underline"
          >
            ← {s.backLink}
          </Link>
          <span className="nb-mono text-[10px] uppercase tracking-widest text-[var(--nb-pencil)]">
            {masthead.title}
          </span>
        </div>

        {/* Section head */}
        <div className="mt-10 flex items-center gap-3">
          <span className="nb-mono text-xs font-bold uppercase tracking-widest text-[var(--nb-red)]">
            {s.index} — {s.label} — {s.page}
          </span>
          <span aria-hidden="true" className="flex-1 border-t border-dashed border-[var(--nb-pencil)]/40" />
        </div>

        {/* Title */}
        <h1 className="nb-display mt-6 text-4xl font-black text-[var(--nb-ink)] md:text-5xl">
          {s.title}
        </h1>
        <p className="nb-body mt-3 max-w-xl text-base text-[var(--nb-pencil)]">{s.description}</p>

        {/* Members grid */}
        <main id="nb-main" className="mt-10 grid gap-8 sm:grid-cols-2">
          {s.people.map((person, i) => (
            <MemberCard
              key={person.name}
              person={person}
              cardLabel={s.cardLabel}
              index={i}
            />
          ))}
        </main>

        {/* Footer note */}
        <p className="nb-hand mt-12 text-center text-sm text-[var(--nb-pencil)]">
          {nbTranslations[lang].backcover.nextVolume}
        </p>
      </div>
    </div>
  );
}

export default function MembersPage() {
  return (
    <LanguageProvider>
      <MembersContent />
    </LanguageProvider>
  );
}
