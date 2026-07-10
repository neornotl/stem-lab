"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useDevice } from "@/context/DeviceContext";
import GridPattern from "@/components/decorative/GridPattern";
import GlowOrb from "@/components/decorative/GlowOrb";
import CircuitLines from "@/components/decorative/CircuitLines";
import GradientText from "@/components/shared/GradientText";
import { cn } from "@/lib/utils";

/* ── Floating orbs (CSS animation, no Framer initial opacity:0) ── */
function FloatingOrb({
  delay, x, y, size, color,
}: {
  delay: number; x: string; y: string; size: number; color: string;
}) {
  const { hud } = useDevice();
  if (hud === "minimal") return null;
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animation: `float-slow ${8 + delay * 2}s ease-in-out ${delay}s infinite`,
        opacity: hud === "full" ? 0.5 : 0.25,
      }}
    />
  );
}

/* ── Animated counter (pure CSS + minimal JS, no Framer opacity:0) ── */
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / total) * target));
      if (frame >= total) clearInterval(timer);
    }, 33);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text-cyan">
        {count}+
      </div>
      <div className="text-text-muted text-sm mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLang();
  const { isMobile } = useDevice();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    /* tiny delay so SSR renders fully visible, then CSS transition kicks in */
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <GridPattern />
        <CircuitLines />
      </motion.div>

      {/* Ambient orbs */}
      <FloatingOrb delay={0} x="10%" y="20%" size={400} color="rgba(0,212,255,0.12)" />
      <FloatingOrb delay={2} x="70%" y="10%" size={350} color="rgba(139,92,246,0.1)" />
      <FloatingOrb delay={4} x="50%" y="60%" size={300} color="rgba(167,243,208,0.08)" />
      <FloatingOrb delay={1} x="80%" y="70%" size={250} color="rgba(0,212,255,0.06)" />
      <FloatingOrb delay={3} x="20%" y="80%" size={280} color="rgba(139,92,246,0.06)" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,212,255,0.08),transparent)]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5 mb-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <Sparkles className="w-4 h-4 text-cyan" />
          <span className="text-cyan text-sm font-medium font-[family-name:var(--font-mono)]">
            {t.hero.badge}
          </span>
        </div>

        {/* Title */}
        <h1 className={cn(
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-heading)] mb-6 leading-tight transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <GradientText>{t.hero.title}</GradientText>
        </h1>

        {/* Subtitle */}
        <p className={cn(
          "text-xl md:text-2xl text-text-muted font-light mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          {t.hero.subtitle}
        </p>

        {/* Description */}
        <p className={cn(
          "text-text-muted/80 max-w-2xl mx-auto mb-10 text-base md:text-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[400ms]",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <a
            href="#register"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan to-violet text-bg-deep font-semibold text-lg hover:shadow-glow-cyan transition-shadow btn-sweep"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#activities"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-cyan/40 text-cyan font-semibold text-lg hover:bg-cyan/10 transition-colors"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Stats */}
        <div className={cn(
          "mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <AnimatedCounter target={50} label={t.hero.stats.members} />
          <AnimatedCounter target={20} label={t.hero.stats.projects} />
          <AnimatedCounter target={7} label={t.hero.stats.areas} />
          <AnimatedCounter target={15} label={t.hero.stats.events} />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-deep to-transparent" />
    </section>
  );
}
