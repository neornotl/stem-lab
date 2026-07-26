"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import { Bot, Wifi, BrainCircuit, FlaskConical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const projectIcons = [Bot, Wifi, BrainCircuit, FlaskConical];
const accents = ["cyan", "orange", "orange", "cyan"] as const;

export default function ProjectShowcaseSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          index="05"
          subtitle={t.projects.subtitle}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {t.projects.items.map((project, i) => {
            const Icon = projectIcons[i];
            const isCyan = accents[i] === "cyan";
            return (
              <div
                key={i}
                className="group glass-card glass-card-hover overflow-hidden flex flex-col"
              >
                {/* Spec header strip */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-glass-border bg-bg-secondary/50">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-sm border",
                      isCyan
                        ? "text-cyan border-cyan/30 bg-cyan/10"
                        : "text-orange border-orange/30 bg-orange/10"
                    )}
                  >
                    {project.category}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-text-dim tracking-wider">
                    <span className="led" aria-hidden />
                    {t.projects.placeholder}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-13 h-13 w-[52px] h-[52px] rounded-md border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                        isCyan ? "bg-cyan/10 border-cyan/25" : "bg-orange/10 border-orange/25"
                      )}
                    >
                      <Icon className={cn("w-6 h-6", isCyan ? "text-cyan" : "text-orange")} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-text mb-1.5">
                        {project.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">{project.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Spec footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-glass-border">
                  <span className="font-mono text-xs text-text-dim tabular-nums">
                    PRJ-00{i + 1}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-text-dim group-hover:text-cyan transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
