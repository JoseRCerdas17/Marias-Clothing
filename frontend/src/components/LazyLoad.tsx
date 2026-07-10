'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function LazyLoad({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "100px"
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {isVisible ? children : <div className="min-h-[200px]" />}
    </div>
  );
}
