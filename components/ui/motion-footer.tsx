"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { LegalModal, useLegalModal } from "@/components/LegalModal";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  "Zero Leakage",
  "Real-Time Oversight",
  "Automated Reconciliation",
  "WhatsApp Alerts",
  "Multi-Branch Control",
  "Instant Daily Audits",
];

export interface CinematicFooterProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenTermsOfService?: () => void;
  className?: string;
}

const pill = "min-h-11 rounded-full px-4 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white";

export function CinematicFooter({ onOpenPrivacyPolicy, onOpenTermsOfService, className }: CinematicFooterProps = {}) {
  const pathname = usePathname();
  const isHotelsPage = pathname === "/for-hotels";
  const legalModal = useLegalModal();
  const openPrivacy = onOpenPrivacyPolicy || legalModal.openPrivacyPolicy;
  const openTerms = onOpenTermsOfService || legalModal.openTermsOfService;

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <footer className={cn("relative overflow-hidden border-t border-white/10 bg-navy-900 text-white", className)}>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(245,197,24,0.12), transparent 60%)" }} />
        <ul className="relative flex flex-wrap justify-center gap-x-5 gap-y-2 border-b border-white/10 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {HIGHLIGHTS.map((h) => (
            <li key={h} className="flex items-center gap-2"><span className="text-brand-yellow" aria-hidden>✦</span>{h}</li>
          ))}
        </ul>

        <div className="container relative max-w-4xl py-14 text-center md:py-24">
          <Reveal>
            <h2 className="display-serif mb-4 text-4xl leading-[1.08] sm:text-6xl md:text-7xl">
              {isHotelsPage ? "Run the hotel." : "See what's really happening at your branches."}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {isHotelsPage
                ? "We'll keep the revenue and operations together."
                : "Set up takes about 30 minutes. Your customers don't need to download anything."}
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/pricing">Get started <ArrowRight aria-hidden /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="whitespace-normal border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white">
                {isHotelsPage ? (
                  <Link href="/#mechanism">See how it works <ChevronDown aria-hidden /></Link>
                ) : (
                  <a href="mailto:info@sharptable.com.ng">Talk to us: info@sharptable.com.ng</a>
                )}
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">No setup fees · Cancel anytime</p>
          </Reveal>

          <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-1">
            <Button variant="ghost" className={pill} onClick={openPrivacy}>Privacy Policy</Button>
            <Button variant="ghost" className={pill} onClick={openTerms}>Terms of Service</Button>
            <Button asChild variant="ghost" className={pill}><Link href="/support">Support</Link></Button>
            <Button asChild variant="ghost" className={pill}><a href="mailto:info@sharptable.com.ng">Contact</a></Button>
          </nav>
        </div>

        <div className="container relative flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 md:flex-row">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} SharpTable Tech. All rights reserved.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Crafted with <span className="text-brand-yellow">❤</span> by <span className="normal-case tracking-normal text-white">SharpTable</span>
          </p>
          <Button variant="ghost" size="icon" onClick={scrollToTop} aria-label="Back to top" className="border border-white/15 text-white hover:bg-white/5 hover:text-white">
            <ArrowUp aria-hidden />
          </Button>
        </div>
      </footer>

      {!onOpenPrivacyPolicy && !onOpenTermsOfService && (
        <LegalModal isOpen={legalModal.isOpen} onClose={legalModal.closeModal} type={legalModal.type} />
      )}
    </>
  );
}

export default CinematicFooter;
