"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LegalModal, useLegalModal } from "@/components/LegalModal";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  --foreground: #ffffff;
  --background: #000000;
  --primary: #f59e0b;
  --secondary: #d97706;
  --destructive: #ef4444;
  --muted-foreground: #9ca3af;
  --border: rgba(255, 255, 255, 0.1);

  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground) 5%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 10%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 25%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 25%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, #f59e0b 20%, transparent) 0%, 
    color-mix(in oklch, #d97706 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Primary Amber Accent Pill */
.footer-accent-pill {
  background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
  color: #000000 !important;
  font-weight: 700;
  box-shadow: 0 10px 30px -10px rgba(245, 158, 11, 0.4);
  border: 1px solid rgba(245, 158, 11, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-accent-pill:hover {
  background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
  box-shadow: 0 20px 40px -10px rgba(245, 158, 11, 0.6);
  transform: translateY(-2px);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 8%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, color-mix(in oklch, var(--foreground) 60%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px color-mix(in oklch, #f59e0b 20%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MARQUEE ITEM
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-8 md:space-x-12 px-6">
    <span>Zero Leakage</span> <span className="text-amber-500/80">✦</span>
    <span>Real-Time Oversight</span> <span className="text-amber-500/80">✦</span>
    <span>Automated Reconciliation</span> <span className="text-amber-500/80">✦</span>
    <span>WhatsApp Alerts</span> <span className="text-amber-500/80">✦</span>
    <span>Multi-Branch Control</span> <span className="text-amber-500/80">✦</span>
    <span>Instant Daily Audits</span> <span className="text-amber-500/80">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export interface CinematicFooterProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenTermsOfService?: () => void;
  className?: string;
}

export function CinematicFooter({
  onOpenPrivacyPolicy,
  onOpenTermsOfService,
  className,
}: CinematicFooterProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHotelsPage = pathname === '/for-hotels';

  // Fallback internal Legal Modal state if handlers are not supplied
  const legalModal = useLegalModal();
  const handleOpenPrivacy = onOpenPrivacyPolicy || legalModal.openPrivacyPolicy;
  const handleOpenTerms = onOpenTermsOfService || legalModal.openTermsOfService;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.82, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow with clip-path so that its fixed contents
        are ONLY revealed within its bounding box at the bottom of the page.
      */}
      <div
        ref={wrapperRef}
        className={cn("relative min-h-[90vh] md:min-h-screen w-full", className)}
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex min-h-[90vh] md:h-screen w-full flex-col justify-between overflow-hidden bg-black text-white cinematic-footer-wrapper">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-black tracking-tighter"
          >
            SHARPTABLE
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-8 md:top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-black/70 backdrop-blur-md py-3.5 z-10 -rotate-1 md:-rotate-2 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content: "Run the restaurant. We'll keep the orders together." */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-24 md:mt-20 w-full max-w-5xl mx-auto text-center">
            <div ref={headingRef} className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              <h2
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif footer-text-glow tracking-tight leading-[1.08]"
                style={{ fontFamily: "var(--font-display, 'DM Serif Display', serif)" }}
              >
                {isHotelsPage ? "Run the hotel." : "Run the restaurant."}
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-normal">
                {isHotelsPage
                  ? "We'll keep the revenue and operations together."
                  : "We'll keep the orders together."}
              </p>
            </div>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary CTAs */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as={Link}
                  href="/pricing"
                  className="footer-accent-pill px-8 md:px-10 py-4 md:py-4.5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group shadow-lg text-black"
                >
                  Get started
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticButton>
                
                <MagneticButton
                  as={Link}
                  href="/#mechanism"
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-4.5 rounded-full text-white font-semibold text-sm md:text-base flex items-center gap-3 group"
                >
                  See how it works
                  <svg
                    className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </MagneticButton>
              </div>

              {/* Trust Signal Line */}
              <p className="text-xs md:text-sm text-neutral-500 tracking-wide font-medium">
                No setup fees · Cancel anytime · Live in under 24 hours
              </p>

              {/* Secondary Navigation & Legal Links */}
              <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 md:gap-6 w-full mt-2">
                <MagneticButton
                  as="button"
                  onClick={handleOpenPrivacy}
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-neutral-400 font-medium text-xs md:text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </MagneticButton>
                <MagneticButton
                  as="button"
                  onClick={handleOpenTerms}
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-neutral-400 font-medium text-xs md:text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/support"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-neutral-400 font-medium text-xs md:text-sm hover:text-white transition-colors"
                >
                  Support
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="mailto:info@sharptable.com.ng"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-neutral-400 font-medium text-xs md:text-sm hover:text-white transition-colors"
                >
                  Contact
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-6 md:pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            {/* Copyright */}
            <div className="text-neutral-500 text-[11px] md:text-xs font-semibold tracking-wider uppercase order-2 md:order-1 text-center md:text-left">
              © {new Date().getFullYear()} SharpTable Tech. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-5 py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <span className="text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-amber-500">❤</span>
              <span className="text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-bold text-xs md:text-sm tracking-normal ml-0.5">SharpTable</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full footer-glass-pill flex items-center justify-center text-neutral-400 hover:text-white group order-3"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>

      {/* Embedded LegalModal if not provided externally */}
      {!onOpenPrivacyPolicy && !onOpenTermsOfService && (
        <LegalModal
          isOpen={legalModal.isOpen}
          onClose={legalModal.closeModal}
          type={legalModal.type}
        />
      )}
    </>
  );
}

export default CinematicFooter;
