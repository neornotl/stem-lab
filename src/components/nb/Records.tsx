"use client";
import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useNb, Reveal, SectionHead, Stamp, Tape, ClipDoodle, SparkDoodle } from "./primitives";
import { cn } from "@/lib/utils";

/* ═══════════════ MỤC 04 — FINDINGS (projects) ═══════════════ */
const CAT_TONES = ["bg-[var(--nb-blue)]", "bg-[var(--nb-red)]", "bg-[var(--nb-green)]", "bg-[var(--nb-ink)]"];
const FIND_ROTS = ["-rotate-[0.8deg]", "rotate-[1deg]", "rotate-[0.6deg]", "-rotate-[1.2deg]"];

export function Findings() {
  const { copy } = useNb();
  const f = copy.findings;

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={f.index} label={f.label} page={f.page} />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="nb-display text-3xl font-black text-[var(--nb-ink)] sm:text-4xl">{f.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="nb-hand max-w-xs text-[16px] leading-snug text-[var(--nb-pencil)]">{f.description}</p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {f.items.map((p, i) => (
          <Reveal key={p.no} delay={(i % 2) * 0.12}>
            <article
              className={cn(
                "nb-card group relative p-6 pt-8 transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5",
                FIND_ROTS[i]
              )}
            >
              <ClipDoodle className="absolute -top-4 left-8 h-9 w-6 text-[var(--nb-pencil)]" />
              <div className="flex items-start justify-between gap-4">
                <span className="nb-display text-5xl font-black leading-none text-[var(--nb-paper-deep)] [-webkit-text-stroke:1.5px_var(--nb-ink)]">
                  {p.no}
                </span>
                <span
                  className={cn(
                    "nb-mono -rotate-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--nb-paper-card)]",
                    CAT_TONES[i % CAT_TONES.length]
                  )}
                >
                  {p.category}
                </span>
              </div>
              <h3 className="nb-display mt-3 text-2xl font-bold text-[var(--nb-ink)]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--nb-ink)]/75">{p.desc}</p>
              <div className="nb-mono mt-4 flex items-center gap-2 border-t border-dashed border-[rgba(35,38,47,0.3)] pt-3 text-[10px] uppercase tracking-[0.16em] text-[var(--nb-pencil)]">
                {f.byLabel}: <span className="font-bold text-[var(--nb-blue)]">{f.by}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ MỤC 05 — PROTOCOL (process) ═══════════════ */
export function Protocol() {
  const { copy } = useNb();
  const p = copy.protocol;

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={p.index} label={p.label} page={p.page} />

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="nb-display text-3xl font-black leading-tight text-[var(--nb-ink)] sm:text-4xl">
              {p.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--nb-ink)]/80">{p.description}</p>
            <div className="mt-6 inline-block">
              <Stamp tone="blue" className="!rotate-[-3deg] text-[11px]">
                {p.steps.length} {p.stepLabel.toLowerCase()}
              </Stamp>
            </div>
          </Reveal>
        </div>

        {/* protocol steps */}
        <div className="lg:col-span-8">
          <ol className="relative space-y-7">
            <span
              aria-hidden
              className="absolute bottom-4 left-[21px] top-4 w-0 border-l-2 border-dashed border-[rgba(35,38,47,0.35)]"
            />
            {p.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="relative flex items-start gap-5">
                  <span className="nb-display relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--nb-ink)] bg-[var(--nb-yellow)] text-lg font-black text-[var(--nb-ink)] shadow-[2px_2px_0_rgba(35,38,47,0.2)]">
                    {i + 1}
                  </span>
                  <div className="nb-card nb-card--ruled flex-1 px-5 py-4">
                    <div className="nb-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--nb-red)]">
                      {p.stepLabel} {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="nb-display mt-1 text-lg font-bold text-[var(--nb-ink)]">{step.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--nb-ink)]/75">{step.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MỤC 06 — SIGNUP (registration) ═══════════════ */
type Status = "idle" | "sending" | "done";

export function Signup() {
  const { copy } = useNb();
  const s = copy.signup;
  const f = s.fields;

  const [form, setForm] = useState({
    name: "",
    role: "",
    class: "",
    email: "",
    phone: "",
    interest: "",
    experience: "",
    reason: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = s.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = s.errors.email;
    if (!form.role) errs.role = s.errors.role;
    if (!form.class.trim()) errs.class = s.errors.class;
    if (!form.interest) errs.interest = s.errors.interest;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 900);
  };

  const reset = () => {
    setForm({ name: "", role: "", class: "", email: "", phone: "", interest: "", experience: "", reason: "" });
    setErrors({});
    setStatus("idle");
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={`nb-${k}-err`} role="alert" className="nb-mono mt-1 text-[11px] font-bold uppercase tracking-wide text-[var(--nb-red)]">
        ⚠ {errors[k]}
      </p>
    ) : null;

  return (
    <section id="signup" className="relative z-10 mx-auto max-w-6xl scroll-mt-10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <SectionHead index={s.index} label={s.label} page={s.page} />

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* ── pitch ── */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="nb-display text-3xl font-black leading-tight text-[var(--nb-ink)] sm:text-4xl">
              {s.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--nb-ink)]/80">{s.description}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="nb-card relative mt-8 p-6">
              <Tape className="-top-3 left-10 -rotate-3" />
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--nb-red)] opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--nb-red)]" />
                </span>
                <span className="nb-mono text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--nb-red)]">
                  {s.status}
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--nb-green)]" strokeWidth={2.2} />
                    <span className="text-[14px] leading-relaxed text-[var(--nb-ink)]/85">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="nb-mono mt-5 flex items-center gap-2 border-t border-dashed border-[rgba(35,38,47,0.3)] pt-4 text-[12px] text-[var(--nb-blue)]">
                <Mail className="h-4 w-4" />
                {copy.notes.email}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── the sign-up sheet ── */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div className="nb-card nb-card--ruled nb-card--redtop relative p-6 sm:p-8">
              <div className="nb-mono mb-6 flex items-center justify-between border-b-2 border-[var(--nb-ink)] pb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--nb-ink)]">
                <span>{s.label} — {copy.chrome.volume}</span>
                <SparkDoodle className="h-4 w-4 text-[var(--nb-red)]" />
              </div>

              {status === "done" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <Stamp tone="green" animate className="!rotate-[-8deg] text-base">
                    {s.approved} ✓
                  </Stamp>
                  <h3 className="nb-display mt-6 text-2xl font-black text-[var(--nb-ink)]">{s.success.title}</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-[var(--nb-ink)]/75">{s.success.desc}</p>
                  <button onClick={reset} className="nb-btn nb-btn--ghost mt-7">
                    {s.success.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="nb-label" htmlFor="nb-name">{f.name} *</label>
                    <input id="nb-name" className={cn("nb-field", errors.name && "nb-field--error")} value={form.name} placeholder={s.placeholders.name} onChange={(e) => set("name")(e.target.value)} aria-describedby={errors.name ? "nb-name-err" : undefined} aria-invalid={!!errors.name} />
                    {err("name")}
                  </div>

                  <div>
                    <label className="nb-label" htmlFor="nb-role">{f.role} *</label>
                    <select id="nb-role" className={cn("nb-field", errors.role && "nb-field--error")} value={form.role} onChange={(e) => set("role")(e.target.value)} aria-describedby={errors.role ? "nb-role-err" : undefined} aria-invalid={!!errors.role}>
                      <option value="" disabled>—</option>
                      <option value="student">{f.roleOptions.student}</option>
                      <option value="teacher">{f.roleOptions.teacher}</option>
                      <option value="parent">{f.roleOptions.parent}</option>
                    </select>
                    {err("role")}
                  </div>

                  <div>
                    <label className="nb-label" htmlFor="nb-class">{f.class} *</label>
                    <input id="nb-class" className={cn("nb-field", errors.class && "nb-field--error")} value={form.class} placeholder={s.placeholders.class} onChange={(e) => set("class")(e.target.value)} aria-describedby={errors.class ? "nb-class-err" : undefined} aria-invalid={!!errors.class} />
                    {err("class")}
                  </div>

                  <div>
                    <label className="nb-label" htmlFor="nb-email">{f.email} *</label>
                    <input id="nb-email" type="email" className={cn("nb-field", errors.email && "nb-field--error")} value={form.email} placeholder={s.placeholders.email} onChange={(e) => set("email")(e.target.value)} aria-describedby={errors.email ? "nb-email-err" : undefined} aria-invalid={!!errors.email} />
                    {err("email")}
                  </div>

                  <div>
                    <label className="nb-label" htmlFor="nb-phone">{f.phone}</label>
                    <input id="nb-phone" className="nb-field" value={form.phone} placeholder={s.placeholders.phone} onChange={(e) => set("phone")(e.target.value)} />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="nb-label" htmlFor="nb-interest">{f.interest} *</label>
                    <select id="nb-interest" className={cn("nb-field", errors.interest && "nb-field--error")} value={form.interest} onChange={(e) => set("interest")(e.target.value)} aria-describedby={errors.interest ? "nb-interest-err" : undefined} aria-invalid={!!errors.interest}>
                      <option value="" disabled>{s.placeholders.interest}</option>
                      {f.interestOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {err("interest")}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="nb-label" htmlFor="nb-exp">{f.experience}</label>
                    <textarea id="nb-exp" rows={2} className="nb-field resize-none" value={form.experience} placeholder={s.placeholders.experience} onChange={(e) => set("experience")(e.target.value)} />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="nb-label" htmlFor="nb-reason">{f.reason}</label>
                    <textarea id="nb-reason" rows={3} className="nb-field resize-none" value={form.reason} placeholder={s.placeholders.reason} onChange={(e) => set("reason")(e.target.value)} />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                    <button type="submit" className="nb-btn" disabled={status === "sending"}>
                      {status === "sending" ? f.submitting : f.submit}
                    </button>
                    <span className="nb-mono text-[10px] uppercase tracking-[0.16em] text-[var(--nb-pencil)]">
                      * {s.required}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
