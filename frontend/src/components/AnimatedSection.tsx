"use client";

import { useInView } from "@/hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  const animations = {
    "fade-up": "opacity-0 translate-y-8",
    "fade-in": "opacity-0",
    "slide-left": "opacity-0 -translate-x-8",
    "slide-right": "opacity-0 translate-x-8",
  };

  const animationsVisible = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-in": "opacity-100",
    "slide-left": "opacity-100 translate-x-0",
    "slide-right": "opacity-100 translate-x-0",
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-all duration-700 ease-out ${className} ${
        isInView ? animationsVisible[animation] : animations[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}
