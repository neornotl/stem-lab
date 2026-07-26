"use client";
import { useRef, useState, useEffect } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionWrapper({ id, children, className, noPadding }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!hydrated || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight + 50;
    if (isAboveFold) {
      setInView(true);
    } else {
      setInView(false);
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hydrated]);

  const show = !hydrated || inView;

  return (
    <section
      id={id}
      className={cn("relative", !noPadding && "py-20 md:py-28", className)}
    >
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {children}
      </div>
    </section>
  );
}
