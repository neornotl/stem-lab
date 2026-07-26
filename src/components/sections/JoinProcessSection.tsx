"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  Search, FileText, ListChecks, Handshake, FolderKanban, Presentation,
} from "lucide-react";

const stepIcons = [Search, FileText, ListChecks, Handshake, FolderKanban, Presentation];

export default function JoinProcessSection() {
  const { t } = useLang();
  const steps = t.process.steps;

  return (
    <SectionWrapper id="process" className="relative overflow-hidden bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — heading */}
          <div className="lg:col-span-4">
            <SectionTitle
              index="06"
              subtitle={t.process.subtitle}
              title={t.process.title}
              description={t.process.description}
              className="mb-0"
            />
          </div>

          {/* Right — vertical timeline */}
          <div className="lg:col-span-8">
            <ol>
              {steps.map((step, i) => {
                const Icon = stepIcons[i];
                const last = i === steps.length - 1;
                return (
                  <li key={i} className="relative pl-16 pb-10 last:pb-0">
                    {/* rail */}
                    {!last && (
                      <span
                        aria-hidden
                        className="absolute left-[21px] top-12 bottom-0 w-px bg-glass-border"
                      />
                    )}
                    {/* node */}
                    <span className="absolute left-0 top-0 w-11 h-11 rounded-md border border-orange/30 bg-bg-elevated flex items-center justify-center font-mono text-sm font-semibold text-orange tabular-nums shadow-card">
                      0{i + 1}
                    </span>
                    <div className="flex items-center gap-2.5 mb-1 pt-1">
                      <Icon className="w-4 h-4 text-cyan shrink-0" />
                      <h3 className="font-heading font-semibold text-text text-base md:text-lg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed max-w-md">{step.desc}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
