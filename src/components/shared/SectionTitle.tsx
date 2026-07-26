"use client";
import { cn } from "@/lib/utils";

interface Props {
  subtitle: string;
  title: string;
  description?: string;
  /** Mono index shown before the eyebrow, e.g. "02" */
  index?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  index,
  align = "left",
  className,
}: Props) {
  const centered = align === "center";
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      {/* Eyebrow — mono, technical */}
      <p
        className={cn(
          "inline-flex items-center gap-3 font-mono text-xs font-medium tracking-[0.22em] uppercase text-cyan mb-4",
          centered && "justify-center"
        )}
      >
        {index && <span className="text-orange">{index}</span>}
        <span className={cn("h-px w-8 bg-orange/70", centered && "hidden")} />
        {subtitle}
      </p>

      {/* Title — solid ink, tight, no gradient */}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-text leading-[1.12] mb-4">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-text-muted text-base md:text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
