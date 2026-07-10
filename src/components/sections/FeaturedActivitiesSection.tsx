"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import GlowOrb from "@/components/decorative/GlowOrb";
import {
  Wrench, Trophy, Users, GraduationCap, Presentation, Handshake,
} from "lucide-react";

const icons = [Wrench, Trophy, Users, GraduationCap, Presentation, Handshake];
const accents = ["cyan", "violet", "mint", "cyan", "violet", "mint"] as const;

export default function FeaturedActivitiesSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="featured" className="relative">
      <GlowOrb color="cyan" className="top-20 -left-40" size={350} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t.featured.subtitle}
          title={t.featured.title}
          description={t.featured.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.featured.items.map((item, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            return (
              <GlassCard key={i} delay={i * 0.08} hudBrackets className="group">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      accent === "cyan"
                        ? "bg-cyan/10 border border-cyan/20"
                        : accent === "violet"
                        ? "bg-violet/10 border border-violet/20"
                        : "bg-mint/10 border border-mint/20"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        accent === "cyan" ? "text-cyan" : accent === "violet" ? "text-violet" : "text-mint"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold font-[family-name:var(--font-heading)] text-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
