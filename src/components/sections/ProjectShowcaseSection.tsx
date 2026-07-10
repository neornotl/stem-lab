"use client";
import { useRef } from "react";
import { useLang } from "@/context/LanguageContext";
import { useMousePosition } from "@/hooks/useMousePosition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlowOrb from "@/components/decorative/GlowOrb";
import { Bot, Wifi, BrainCircuit, FlaskConical, ExternalLink } from "lucide-react";

const projectIcons = [Bot, Wifi, BrainCircuit, FlaskConical];
const projectColors = ["cyan", "violet", "mint", "cyan"] as const;

export default function ProjectShowcaseSection() {
  const { t } = useLang();

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden">
      <GlowOrb color="violet" className="-bottom-20 -left-40" size={400} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t.projects.subtitle}
          title={t.projects.title}
          description={t.projects.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.projects.items.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: { title: string; category: string; desc: string };
  index: number;
}) {
  const ref = useRef(null);
  const { t } = useLang();
  const { pos, handleMouseMove } = useMousePosition(ref);
  const Icon = projectIcons[index];
  const color = projectColors[index];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative glass-card glass-card-hover overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
    >
      {/* Mouse glow */}
      <div
        className="absolute w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          left: pos.x - 96,
          top: pos.y - 96,
          background:
            color === "cyan"
              ? "radial-gradient(circle, rgba(0,212,255,0.1), transparent 70%)"
              : color === "violet"
              ? "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)"
              : "radial-gradient(circle, rgba(167,243,208,0.08), transparent 70%)",
        }}
      />

      <div className="relative p-6">
        <span
          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${
            color === "cyan"
              ? "bg-cyan/10 text-cyan border border-cyan/20"
              : color === "violet"
              ? "bg-violet/10 text-violet border border-violet/20"
              : "bg-mint/10 text-mint border border-mint/20"
          }`}
        >
          {project.category}
        </span>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
            color === "cyan"
              ? "bg-cyan/10"
              : color === "violet"
              ? "bg-violet/10"
              : "bg-mint/10"
          }`}
        >
          <Icon
            className={`w-7 h-7 ${
              color === "cyan" ? "text-cyan" : color === "violet" ? "text-violet" : "text-mint"
            }`}
          />
        </div>

        <h3 className="font-semibold font-[family-name:var(--font-heading)] text-text mb-2">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {project.desc}
        </p>

        <div className="flex items-center gap-1.5 text-text-dim text-xs group-hover:text-cyan transition-colors">
          <span>{t.projects.placeholder}</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>

      {/* HUD brackets on hover */}
      {color === "cyan" && (
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan/0 group-hover:border-cyan/40 transition-colors duration-300" />
      )}
      {color === "cyan" && (
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan/0 group-hover:border-cyan/40 transition-colors duration-300" />
      )}
    </div>
  );
}
