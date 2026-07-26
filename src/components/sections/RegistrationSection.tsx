"use client";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  Send, CheckCircle2, Loader2, User, Mail, Phone, FileText, MessageSquare, Target,
} from "lucide-react";

export default function RegistrationSection() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const f = t.registration.fields;
  const p = t.registration.placeholders;
  const err = t.registration.errors;

  const validate = (fd: FormData): boolean => {
    const e: Record<string, string> = {};
    if (!fd.get("name")?.toString().trim()) e.name = err.name;
    if (!fd.get("email")?.toString().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = err.email;
    if (!fd.get("role")) e.role = err.role;
    if (!fd.get("interest")) e.interest = err.interest;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (!validate(fd)) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-bg-elevated border border-glass-border rounded-md px-4 py-3 text-text placeholder-text-dim text-sm focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all";
  const labelClass = "block font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted mb-1.5";

  return (
    <SectionWrapper id="register" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left — pitch */}
          <div className="lg:col-span-5">
            <SectionTitle
              index="07"
              subtitle={t.registration.subtitle}
              title={t.registration.title}
              description={t.registration.description}
              className="mb-8"
            />
            <div className="glass-card tick-corners p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="led led-orange" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-orange">
                  {t.registration.pitch.status}
                </span>
              </div>
              <ul className="space-y-3.5">
                {t.registration.pitch.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-mint mt-0.5 shrink-0" />
                    <span className="text-text-muted text-sm leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-glass-border flex items-center gap-2.5 text-sm text-text-muted">
                <Mail className="w-4 h-4 text-cyan shrink-0" />
                {t.footer.email}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduced ? {} : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card tick-corners p-10 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-mint mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-text mb-2">
                    {t.registration.success.title}
                  </h3>
                  <p className="text-text-muted mb-6">{t.registration.success.desc}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-md border border-cyan/50 text-cyan text-sm font-medium hover:bg-cyan/10 transition-colors"
                  >
                    {t.registration.success.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduced ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? {} : { opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="glass-card p-6 md:p-8 space-y-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="reg-name" className={labelClass}>
                      {f.name} <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-text-dim" />
                      <input id="reg-name" name="name" type="text" placeholder={p.name} className={`${inputClass} pl-10`} />
                    </div>
                    {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Role + Class */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-role" className={labelClass}>
                        {f.role} <span className="text-error">*</span>
                      </label>
                      <select id="reg-role" name="role" className={inputClass} defaultValue="">
                        <option value="" disabled>{f.role}</option>
                        <option value="student">{f.roleOptions.student}</option>
                        <option value="teacher">{f.roleOptions.teacher}</option>
                        <option value="parent">{f.roleOptions.parent}</option>
                      </select>
                      {errors.role && <p className="text-error text-xs mt-1">{errors.role}</p>}
                    </div>
                    <div>
                      <label htmlFor="reg-class" className={labelClass}>{f.class}</label>
                      <input id="reg-class" name="class" type="text" placeholder={p.class} className={inputClass} />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reg-email" className={labelClass}>
                        {f.email} <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-text-dim" />
                        <input id="reg-email" name="email" type="email" placeholder={p.email} className={`${inputClass} pl-10`} />
                      </div>
                      {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="reg-phone" className={labelClass}>{f.phone}</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-text-dim" />
                        <input id="reg-phone" name="phone" type="tel" placeholder={p.phone} className={`${inputClass} pl-10`} />
                      </div>
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="reg-interest" className={labelClass}>
                      {f.interest} <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-3.5 w-4 h-4 text-text-dim" />
                      <select id="reg-interest" name="interest" className={`${inputClass} pl-10`} defaultValue="">
                        <option value="" disabled>{p.interest}</option>
                        {t.registration.fields.interestOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    {errors.interest && <p className="text-error text-xs mt-1">{errors.interest}</p>}
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="reg-experience" className={labelClass}>{f.experience}</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3.5 w-4 h-4 text-text-dim" />
                      <textarea id="reg-experience" name="experience" rows={3} placeholder={p.experience} className={`${inputClass} pl-10 resize-none`} />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label htmlFor="reg-reason" className={labelClass}>{f.reason}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-text-dim" />
                      <textarea id="reg-reason" name="reason" rows={3} placeholder={p.reason} className={`${inputClass} pl-10 resize-none`} />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={reduced ? undefined : { scale: 1.01 }}
                    whileTap={reduced ? undefined : { scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-orange text-[#0b1220] font-semibold text-base hover:bg-orange-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed btn-sweep shadow-glow-violet"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {f.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {f.submit}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
