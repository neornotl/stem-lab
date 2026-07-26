"use client";
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import { Plus, Mail } from "lucide-react";
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
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [isOpen, faq.a]);

  return (
    <div className="border-b border-glass-border">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "font-mono text-xs font-semibold tabular-nums shrink-0 transition-colors",
            isOpen ? "text-orange" : "text-text-dim group-hover:text-orange"
          )}
        >
          Q{String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 text-sm md:text-base font-medium transition-colors",
            isOpen ? "text-text" : "text-text-muted group-hover:text-text"
          )}
        >
          {faq.q}
        </span>
        <Plus
          className={cn(
            "w-4 h-4 shrink-0 transition-all duration-300",
            isOpen ? "text-orange rotate-45" : "text-text-dim group-hover:text-orange"
          )}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ maxHeight: isOpen ? `${height}px` : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div ref={ref} className="pb-5 pl-12 pr-4">
          <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { t, lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = lang === "vi" ? faqVi : faqEn;

  return (
    <SectionWrapper id="faq" className="relative overflow-hidden bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — heading + contact card */}
          <div className="lg:col-span-4">
            <SectionTitle
              index="08"
              subtitle={t.faq.subtitle}
              title={t.faq.title}
              description={t.faq.description}
              className="mb-8"
            />
            <div className="glass-card tick-corners p-6">
              <h3 className="font-heading font-semibold text-text mb-1.5">{t.faq.more}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{t.faq.moreDesc}</p>
              <a
                href="mailto:stemclub@example.com"
                className="inline-flex items-center gap-2 font-mono text-sm text-cyan hover:text-orange transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t.footer.email}
              </a>
            </div>
          </div>

          {/* Right — indexed accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-glass-border">
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
        </div>
      </div>
    </SectionWrapper>
  );
}
