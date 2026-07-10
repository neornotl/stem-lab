"use client";
import { useLang } from "@/context/LanguageContext";
import { useDevice } from "@/context/DeviceContext";
import { Mail, MessageCircle, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  const { hud } = useDevice();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border bg-bg-secondary/50">
      {hud !== "minimal" && (
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                <span className="text-bg-deep font-bold text-sm font-[family-name:var(--font-heading)]">S</span>
              </div>
              <span className="font-[family-name:var(--font-heading)] font-semibold text-lg">
                STEM<span className="text-cyan"> Club</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              {t.footer.description}
            </p>
            <p className="text-text-dim text-xs">{t.footer.school}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider text-cyan mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
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
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider text-cyan mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:stemclub@example.com"
                  className="flex items-center gap-2 text-text-muted hover:text-cyan text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t.footer.email}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-text-muted hover:text-cyan text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-text-muted hover:text-cyan text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Zalo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs">
            &copy; {year} STEM Innovation Club. {t.footer.rights}
          </p>
          <p className="text-text-dim text-xs flex items-center gap-1">
            {t.footer.madeWith} <Heart className="w-3 h-3 text-violet fill-violet" />
          </p>
        </div>
      </div>
    </footer>
  );
}
