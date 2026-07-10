"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import { Beaker, Lightbulb, Users } from "lucide-react";
import GlowOrb from "@/components/decorative/GlowOrb";

const icons = [Beaker, Lightbulb, Users];

export default function AboutSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="about" className="relative">
      <GlowOrb color="cyan" className="-top-40 -right-40" size={500} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle={t.about.subtitle} title={t.about.title} description={t.about.description} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.about.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <GlassCard key={i} delay={i * 0.12} hudBrackets>
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-cyan" />
                </div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] text-text mb-3">
                  {card.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {card.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
