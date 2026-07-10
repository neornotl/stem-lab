"use client";
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import { useDevice } from "@/context/DeviceContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import GlowOrb from "@/components/decorative/GlowOrb";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqVi, faqEn } from "@/data/faq";
import { cn } from "@/lib/utils";

function FaqItem({
  faq,
  isOpen,
  onClick,
  index,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={contentRef}
      className={cn(
        "glass-card overflow-hidden transition-all duration-600",
        isOpen ? "border-cyan/20" : "",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: visible ? `${index * 30}ms` : "0ms",
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-5 text-left group"
        aria-expanded={isOpen}
      >
        <HelpCircle
          className={cn(
            "w-5 h-5 shrink-0 transition-colors duration-200",
            isOpen ? "text-cyan" : "text-text-dim group-hover:text-cyan"
          )}
        />
        <span
          className={cn(
            "flex-1 text-sm md:text-base font-medium transition-colors duration-200",
            isOpen ? "text-text" : "text-text-muted group-hover:text-text"
          )}
        >
          {faq.q}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 transition-all duration-300",
            isOpen ? "text-cyan rotate-180" : "text-text-dim"
          )}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 500}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-5 pl-12">
          <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { t, lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = lang === "vi" ? faqVi : faqEn;

  return (
    <SectionWrapper id="faq" className="relative overflow-hidden">
      <GlowOrb color="mint" className="top-20 -left-40" size={350} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle={t.faq.subtitle}
          title={t.faq.title}
          description={t.faq.description}
        />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={`${lang}-${i}`}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
