"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  Bot, BrainCircuit, Code2, Wifi, FlaskConical, PenTool, Rocket, ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Bot, BrainCircuit, Code2, Wifi, FlaskConical, PenTool, Rocket];
const accents = ["cyan", "orange", "cyan", "orange", "cyan", "orange", "cyan"] as const;

/* Bento spans across the 7 areas (4-col grid on lg) */
const spans = [
  "lg:col-span-2 lg:row-span-2", // Robotics — featured
  "lg:col-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
];

export default function ActivityAreaSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="activities" className="relative overflow-hidden bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          index="02"
          subtitle={t.activities.subtitle}
          title={t.activities.title}
          description={t.activities.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(150px,auto)] gap-4 sm:gap-5">
          {t.activities.items.map((item, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            const featured = i === 0;
            const isCyan = accent === "cyan";
            return (
              <div
                key={i}
                className={cn(
                  "group relative glass-card glass-card-hover p-6 flex flex-col overflow-hidden",
                  spans[i]
                )}
              >
                {/* featured dot-grid backdrop */}
                {featured && (
                  <div
                    aria-hidden
                    className="absolute inset-0 dot-grid text-cyan opacity-[0.12] pointer-events-none"
                  />
                )}

                <div className="relative flex items-start justify-between mb-auto">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-md border transition-colors",
                      featured ? "w-14 h-14" : "w-11 h-11",
                      isCyan
                        ? "bg-cyan/10 border-cyan/25 group-hover:bg-cyan/20"
                        : "bg-orange/10 border-orange/25 group-hover:bg-orange/20"
                    )}
                  >
                    <Icon className={cn(featured ? "w-7 h-7" : "w-5 h-5", isCyan ? "text-cyan" : "text-orange")} />
                  </div>
                  <span className="font-mono text-xs text-text-dim tabular-nums group-hover:text-orange transition-colors">
                    0{i + 1}
                  </span>
                </div>

                <div className="relative mt-6">
                  {featured && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-orange mb-2">
                      <span className="led led-orange" aria-hidden /> core
                    </span>
                  )}
                  <h3
                    className={cn(
                      "font-heading font-semibold text-text flex items-center gap-2",
                      featured ? "text-2xl" : "text-base mb-1.5"
                    )}
                  >
                    {item.title}
                    <ArrowUpRight className="w-4 h-4 text-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className={cn("text-text-muted leading-relaxed", featured ? "text-sm mt-2 max-w-sm" : "text-sm")}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
