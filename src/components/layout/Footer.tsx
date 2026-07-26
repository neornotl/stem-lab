"use client";
import { useLang } from "@/context/LanguageContext";
import { Mail, MessageCircle, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border bg-bg-secondary/60 overflow-hidden">
      {/* subtle blueprint grid */}
      <div aria-hidden className="absolute inset-0 blueprint-grid text-text-dim opacity-[0.05] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan to-orange flex items-center justify-center">
                <span className="text-[#0b1220] font-bold text-sm font-heading">S</span>
              </div>
              <span className="font-heading font-semibold text-lg tracking-tight">
                CLB <span className="text-cyan">STEM-AI-ROBOTIC</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-4 max-w-sm">
              {t.footer.description}
            </p>
            <p className="font-mono text-xs text-text-dim tracking-wider">{t.footer.school}</p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "#about", label: t.nav.about },
                { href: "#activities", label: t.nav.activities },
                { href: "#projects", label: t.nav.projects },
                { href: "#faq", label: t.nav.faq },
                { href: "#register", label: t.nav.join },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-cyan text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:stemclub@example.com"
                  className="flex items-center gap-2.5 text-text-muted hover:text-cyan text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan" />
                  <span className="font-mono">{t.footer.email}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-text-muted hover:text-cyan text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-cyan" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-text-muted hover:text-cyan text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-cyan" />
                  Zalo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-dim">
            &copy; {year} CLB STEM-AI-ROBOTIC. {t.footer.rights}
          </p>
          <p className="font-mono text-xs text-text-dim flex items-center gap-1.5">
            {t.footer.madeWith} <Heart className="w-3 h-3 text-orange fill-orange" />
          </p>
        </div>
      </div>
    </footer>
  );
}
