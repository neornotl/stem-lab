"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import { Beaker, Lightbulb, Users, ArrowUpRight } from "lucide-react";

const icons = [Beaker, Lightbulb, Users];

export default function AboutSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="about" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — statement */}
          <div className="lg:col-span-5">
            <SectionTitle
              index="01"
              subtitle={t.about.subtitle}
              title={t.about.title}
              description={t.about.description}
              className="mb-8 lg:mb-0"
            />
            <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-text-dim tracking-widest uppercase">
              <span className="led" aria-hidden />
              STEM · AI · ROBOTIC
            </div>
          </div>

          {/* Right — numbered value props */}
          <div className="lg:col-span-7">
            <div className="border-y border-glass-border divide-y divide-glass-border">
              {t.about.cards.map((card, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={i}
                    className="group flex items-start gap-5 sm:gap-7 py-8 transition-colors hover:bg-glass-bg"
                  >
                    <span className="font-mono text-sm font-semibold text-text-dim group-hover:text-orange transition-colors pt-1 tabular-nums">
                      0{i + 1}
                    </span>
                    <div className="w-11 h-11 rounded-md bg-cyan/10 border border-cyan/25 flex items-center justify-center shrink-0 group-hover:bg-cyan/20 transition-colors">
                      <Icon className="w-5 h-5 text-cyan" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-lg text-text mb-1.5 flex items-center gap-2">
                        {card.title}
                        <ArrowUpRight className="w-4 h-4 text-orange opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
