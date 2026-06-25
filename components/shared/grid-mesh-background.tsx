"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A subtle animated grid-mesh that drifts and reacts to scroll velocity —
 * the visual signature tying the hero back to "digital infrastructure"
 * without leaning on a stock gradient blob.
 */
export function GridMeshBackground() {
  const meshRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meshRef.current || !glowRef.current) return;

    const mesh = meshRef.current;
    const glow = glowRef.current;

    gsap.to(mesh, {
      backgroundPosition: "64px 64px",
      duration: 40,
      repeat: -1,
      ease: "none",
    });

    gsap.to(glow, {
      x: "20%",
      y: "10%",
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          gsap.to(mesh, {
            scale: 1 + Math.min(Math.abs(delta) / 800, 0.04),
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          ticking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={meshRef}
        className="absolute inset-0 grid-mesh opacity-60"
        style={{ transformOrigin: "center" }}
      />
      <div
        ref={glowRef}
        className="absolute -top-1/4 -left-1/4 h-[60%] w-[60%] rounded-full bg-indigo-500/20 blur-[120px]"
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ink-900 to-transparent" />
    </div>
  );
}
