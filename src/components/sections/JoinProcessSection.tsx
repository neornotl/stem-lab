"use client";
import { useLang } from "@/context/LanguageContext";
import { useDevice } from "@/context/DeviceContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlowOrb from "@/components/decorative/GlowOrb";
import {
  Search, FileText, ListChecks, Handshake, FolderKanban, Presentation,
} from "lucide-react";

const stepIcons = [Search, FileText, ListChecks, Handshake, FolderKanban, Presentation];

export default function JoinProcessSection() {
  const { t } = useLang();
  const { isMobile } = useDevice();

  return (
    <SectionWrapper id="process" className="relative overflow-hidden">
      <GlowOrb color="cyan" className="-top-20 right-0" size={350} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t.process.subtitle}
          title={t.process.title}
          description={t.process.description}
        />

        <div className="relative max-w-4xl mx-auto">
          {!isMobile && (
            <div className="absolute top-10 left-[calc(10%+24px)] right-[calc(10%+24px)] h-px bg-gradient-to-r from-cyan/30 via-violet/30 to-mint/30" />
          )}

          <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-8 lg:gap-12"}`}>
            {t.process.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center mb-4 shadow-glow-cyan">
                    <Icon className="w-5 h-5 text-bg-deep" />
                  </div>
                  <span className="text-cyan text-xs font-[family-name:var(--font-mono)] mb-2">
                    0{i + 1}
                  </span>
                  <h3 className="font-semibold font-[family-name:var(--font-heading)] text-text mb-1 text-sm md:text-base">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-xs md:text-sm leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
