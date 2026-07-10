"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import GlowOrb from "@/components/decorative/GlowOrb";
import {
  Bot, BrainCircuit, Code2, Wifi, FlaskConical, PenTool, Rocket,
} from "lucide-react";

const icons = [Bot, BrainCircuit, Code2, Wifi, FlaskConical, PenTool, Rocket];
const colors = ["cyan", "violet", "mint", "cyan", "violet", "mint", "cyan"] as const;

export default function ActivityAreaSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="activities" className="relative overflow-hidden">
      <GlowOrb color="violet" className="top-0 -left-40" size={400} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t.activities.subtitle}
          title={t.activities.title}
          description={t.activities.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {t.activities.items.map((item, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <GlassCard key={i} delay={i * 0.06} hudBrackets className="group">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    color === "cyan"
                      ? "bg-cyan/10 border border-cyan/20 group-hover:bg-cyan/20"
                      : color === "violet"
                      ? "bg-violet/10 border border-violet/20 group-hover:bg-violet/20"
                      : "bg-mint/10 border border-mint/20 group-hover:bg-mint/20"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      color === "cyan" ? "text-cyan" : color === "violet" ? "text-violet" : "text-mint"
                    }`}
                  />
                </div>
                <h3 className="font-semibold font-[family-name:var(--font-heading)] text-text mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
