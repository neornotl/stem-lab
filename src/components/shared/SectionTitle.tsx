"use client";
import GradientText from "./GradientText";

interface Props {
  subtitle: string;
  title: string;
  description?: string;
}

export default function SectionTitle({ subtitle, title, description }: Props) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-mono)]">
        {subtitle}
      </p>
      <GradientText
        as="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4"
      >
        {title}
      </GradientText>
      {description && (
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
    </div>
  );
}
