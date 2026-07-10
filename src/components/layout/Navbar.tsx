"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useDevice } from "@/context/DeviceContext";
import { cn } from "@/lib/utils";

const navLinks = (t: ReturnType<typeof useLang>["t"]) => [
  { href: "#about", label: t.nav.about },
  { href: "#activities", label: t.nav.activities },
  { href: "#audience", label: t.nav.audience },
  { href: "#featured", label: t.nav.featured },
  { href: "#projects", label: t.nav.projects },
  { href: "#process", label: t.nav.process },
  { href: "#faq", label: t.nav.faq },
];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const { isMobile } = useDevice();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks(t).map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [t]);

  const links = navLinks(t);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[85] transition-all duration-300",
          scrolled
            ? "bg-bg-deep/80 backdrop-blur-xl border-b border-glass-border shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                <span className="text-bg-deep font-bold text-sm font-[family-name:var(--font-heading)]">S</span>
              </div>
              <span className="font-[family-name:var(--font-heading)] font-semibold text-lg text-text hidden sm:block">
                STEM<span className="text-cyan"> Club</span>
              </span>
            </a>

            {/* Desktop Nav */}
            {!isMobile && (
              <div className="flex items-center gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors relative",
                      activeSection === link.href.slice(1)
                        ? "text-cyan"
                        : "text-text-muted hover:text-text hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {activeSection === link.href.slice(1) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                ))}
              </div>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-muted hover:text-cyan rounded-lg border border-glass-border hover:border-cyan/30 transition-all"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === "vi" ? "EN" : "VI"}
              </button>

              {/* CTA */}
              {!isMobile && (
                <a
                  href="#register"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan to-violet text-bg-deep hover:shadow-glow-cyan transition-shadow btn-sweep"
                >
                  {t.nav.join}
                </a>
              )}

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 text-text-muted hover:text-text"
                  aria-label="Menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-deep/95 backdrop-blur-2xl pt-20 px-6"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 text-lg font-medium rounded-xl transition-colors",
                    activeSection === link.href.slice(1)
                      ? "text-cyan bg-cyan/10"
                      : "text-text-muted hover:text-text hover:bg-white/5"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-4 py-3 text-lg font-semibold text-center rounded-xl bg-gradient-to-r from-cyan to-violet text-bg-deep"
              >
                {t.nav.join}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
