"use client";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  Wrench, Trophy, Users, GraduationCap, Presentation, Handshake, ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Wrench, Trophy, Users, GraduationCap, Presentation, Handshake];
const accents = ["cyan", "orange", "orange", "cyan", "orange", "cyan"] as const;

export default function FeaturedActivitiesSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="featured" className="relative bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          index="04"
          subtitle={t.featured.subtitle}
          title={t.featured.title}
          description={t.featured.description}
        />

        <div className="grid md:grid-cols-2 gap-4">
          {t.featured.items.map((item, i) => {
            const Icon = icons[i];
            const isCyan = accents[i] === "cyan";
            return (
              <div
                key={i}
                className="group glass-card glass-card-hover p-5 sm:p-6 flex items-start gap-4 sm:gap-5"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-md border flex items-center justify-center shrink-0 transition-colors",
                    isCyan
                      ? "bg-cyan/10 border-cyan/25 group-hover:bg-cyan/20"
                      : "bg-orange/10 border-orange/25 group-hover:bg-orange/20"
                  )}
                >
                  <Icon className={cn("w-6 h-6", isCyan ? "text-cyan" : "text-orange")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading font-semibold text-text flex items-center gap-2">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 text-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="font-mono text-xs text-text-dim tabular-nums group-hover:text-orange transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
