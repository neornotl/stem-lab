"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import { GraduationCap, BookOpen, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tabIcons = [GraduationCap, BookOpen, Heart];
const tabKeys = ["students", "teachers", "parents"] as const;

export default function AudienceSection() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = t.audience.tabs;
  const ActiveIcon = tabIcons[activeTab];

  return (
    <SectionWrapper id="audience" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          index="03"
          subtitle={t.audience.subtitle}
          title={t.audience.title}
          description={t.audience.description}
        />

        {/* Segmented tabs — left aligned */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabKeys.map((key, i) => {
            const Icon = tabIcons[i];
            const tab = tabs[key];
            const active = activeTab === i;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-md border font-medium text-sm transition-all",
                  active
                    ? "bg-cyan border-cyan text-[#0b1220] shadow-glow-cyan"
                    : "border-glass-border text-text-muted hover:text-text hover:border-glass-border-hover"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="glass-card tick-corners p-7 md:p-10 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-7">
                <div className="w-12 h-12 rounded-md bg-orange/10 border border-orange/25 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-text tracking-tight">
                  {tabs[tabKeys[activeTab]].title}
                </h3>
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                {tabs[tabKeys[activeTab]].points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                    <span className="text-text-muted leading-relaxed text-sm md:text-[15px]">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
