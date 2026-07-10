"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlowOrb from "@/components/decorative/GlowOrb";
import { GraduationCap, BookOpen, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tabIcons = [GraduationCap, BookOpen, Heart];
const tabKeys = ["students", "teachers", "parents"] as const;

export default function AudienceSection() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = t.audience.tabs;

  return (
    <SectionWrapper id="audience" className="relative overflow-hidden">
      <GlowOrb color="mint" className="-top-20 -right-60" size={400} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t.audience.subtitle}
          title={t.audience.title}
          description={t.audience.description}
        />

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-glass-border">
            {tabKeys.map((key, i) => {
              const Icon = tabIcons[i];
              const tab = tabs[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    activeTab === i ? "text-bg-deep" : "text-text-muted hover:text-text"
                  )}
                >
                  {activeTab === i && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan to-violet rounded-xl" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-10">
          <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text mb-6">
            {tabs[tabKeys[activeTab]].title}
          </h3>
          <ul className="space-y-4">
            {tabs[tabKeys[activeTab]].points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-cyan mt-0.5 shrink-0" />
                <span className="text-text-muted leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
