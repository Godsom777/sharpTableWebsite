"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"

// The WebGL shader is purely decorative, so load it after first paint and only in the browser.
// Until it arrives the card shows a static dark gradient, and the text is readable either way.
const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.Warp),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
    ),
  }
)

export interface Feature {
  title: string
  description: string
  icon: React.ReactNode
  subtitle?: string
  highlights?: string[]
  metric?: string
  metricLabel?: string
}

const defaultFeatures: Feature[] = [
  {
    title: "Stop cancelled-bill theft",
    description:
      "Every cancelled bill, discount and voided table is recorded with who did it and when. Voids after printing need a manager's PIN.",
    subtitle: "Stop cashier slippage and unauthorised table cancellations.",
    highlights: [
      "Manager PIN or supervisor sign-off required for post-print voids",
      "Real-time alerts triggered when cancellation or discount thresholds are crossed",
      "Tamper-proof audit ledger with permanent timestamps and staff IDs",
      "Automatic shift reconciliation comparing kitchen prints against payments captured",
    ],
    metric: "100% Traceable",
    metricLabel: "Every cancellation carries operator ID & timestamp",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Run the kitchen from your phone",
    description:
      "Mark dishes as sold out, change prices and send orders to the right kitchen screen instantly, from your phone.",
    subtitle: "Keep floor staff, bartenders and the kitchen line in sync.",
    highlights: [
      "Mark a dish sold out and it disappears from every menu instantly",
      "Color-coded kitchen ticket timers (green < 10m, yellow 10-15m, red > 20m)",
      "Smart split-routing: grill, hot line, pantry, and bar receive segregated orders",
      "Offline cache preserves kitchen sync during network hiccups",
    ],
    metric: "< 2.5s Sync",
    metricLabel: "From server tap to kitchen display screen",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Take paid orders on WhatsApp",
    description:
      "Customers order and pay inside WhatsApp, and the order goes straight to your kitchen. No delivery-app commission.",
    subtitle: "Turn customer WhatsApp chats into paid kitchen orders.",
    highlights: [
      "Automated interactive catalog delivered directly in customer chat thread",
      "Direct Paystack integration with automated receipt and confirmation ping",
      "Tickets route cleanly into kitchen display with delivery/table metadata",
      "0% 3rd-party platform commission — keep 100% of customer spend",
    ],
    metric: "0% Commission",
    metricLabel: "Direct customer relationship with zero aggregator cut",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Know where your stock goes",
    description:
      "Ingredients are deducted as each dish sells, so you see low stock before it runs out and spot over-portioning before the shift ends.",
    subtitle: "Portion control and real-time stock depletion by recipe.",
    highlights: [
      "Automatic gram/milliliter ingredient deduction with each menu order sold",
      "Low-stock alerts before prime cuts, seafood, or premium spirits run out",
      "Variance report compares physical closing stock against theoretical consumption",
      "Supplier cost tracking highlights margin erosion as commodity prices fluctuate",
    ],
    metric: "Gram-Level",
    metricLabel: "Recipe ingredient depletion tied to bill settlements",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "See every branch at once",
    description:
      "Compare sales, costs and profit across all your branches on one screen, without waiting for anyone's report.",
    subtitle: "Every branch on one screen",
    highlights: [
      "Live consolidated sales, revenue run-rates, and profit margins by location",
      "Central menu control with customizable branch-level pricing and tax rules",
      "Stock transfer logs between venues with sender/receiver sign-off",
      "Standardized operational reporting without manual spreadsheet consolidation",
    ],
    metric: "Unified View",
    metricLabel: "All branches compared side-by-side in real time",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Give each staff member the right access",
    description:
      "Cashiers, waiters, managers and accountants each see only what they need. Only you see revenue, payouts and settings.",
    subtitle: "Protect financial secrets and eliminate operational vulnerability.",
    highlights: [
      "Cashiers access only active guest tabs and payment settlement screens",
      "Floor captains can transfer tables and combine bills with audit records",
      "Inventory staff log deliveries and waste without viewing executive revenue",
      "Owners retain complete master authority, bank payout routing, and audit logs",
    ],
    metric: "Scoped Access",
    metricLabel: "Zero unnecessary financial exposure to floor staff",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
]

interface FeaturesCardsProps {
  features?: Feature[]
  title?: string
  subtitle?: string
  badge?: string
}

export default function FeaturesCards({
  features = defaultFeatures,
  title = "Everything you need to run the floor, the kitchen and the till",
  subtitle = "Built to stop money going missing, keep service moving, and show you exactly what happened on every shift.",
  badge = "Core Capabilities",
}: FeaturesCardsProps) {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const getShaderConfig = (index: number) => {
    const configs = [
      {
        proportion: 0.3,
        softness: 0.8,
        distortion: 0.15,
        swirl: 0.6,
        swirlIterations: 8,
        shape: "checks" as const,
        shapeScale: 0.08,
        colors: ["hsl(280, 100%, 30%)", "hsl(320, 100%, 60%)", "hsl(340, 90%, 40%)", "hsl(300, 100%, 70%)"],
      },
      {
        proportion: 0.4,
        softness: 1.2,
        distortion: 0.2,
        swirl: 0.9,
        swirlIterations: 12,
        shape: "stripes" as const,
        shapeScale: 0.12,
        colors: ["hsl(200, 100%, 25%)", "hsl(180, 100%, 65%)", "hsl(160, 90%, 35%)", "hsl(190, 100%, 75%)"],
      },
      {
        proportion: 0.35,
        softness: 0.9,
        distortion: 0.18,
        swirl: 0.75,
        swirlIterations: 10,
        shape: "edge" as const,
        shapeScale: 0.1,
        colors: ["hsl(45, 100%, 35%)", "hsl(35, 100%, 55%)", "hsl(25, 95%, 45%)", "hsl(50, 100%, 65%)"],
      },
      {
        proportion: 0.45,
        softness: 1.1,
        distortion: 0.22,
        swirl: 0.85,
        swirlIterations: 11,
        shape: "stripes" as const,
        shapeScale: 0.09,
        colors: ["hsl(140, 100%, 25%)", "hsl(160, 100%, 50%)", "hsl(120, 90%, 35%)", "hsl(150, 100%, 65%)"],
      },
      {
        proportion: 0.3,
        softness: 0.85,
        distortion: 0.16,
        swirl: 0.65,
        swirlIterations: 9,
        shape: "checks" as const,
        shapeScale: 0.11,
        colors: ["hsl(260, 100%, 35%)", "hsl(280, 100%, 60%)", "hsl(240, 90%, 45%)", "hsl(270, 100%, 70%)"],
      },
      {
        proportion: 0.4,
        softness: 1.0,
        distortion: 0.19,
        swirl: 0.8,
        swirlIterations: 10,
        shape: "stripes" as const,
        shapeScale: 0.09,
        colors: ["hsl(10, 100%, 35%)", "hsl(30, 100%, 60%)", "hsl(350, 90%, 45%)", "hsl(20, 100%, 65%)"],
      },
    ]
    return configs[index % configs.length]
  }

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {badge}
          </div>
          <h2 className="display-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const shaderConfig = getShaderConfig(index)
            return (
              <div
                key={index}
                onClick={() => setSelectedFeature(feature)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setSelectedFeature(feature)
                  }
                }}
                className="group relative h-[380px] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                {/* Background WebGL Shader */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                  <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={shaderConfig.proportion}
                    softness={shaderConfig.softness}
                    distortion={shaderConfig.distortion}
                    swirl={shaderConfig.swirl}
                    swirlIterations={shaderConfig.swirlIterations}
                    shape={shaderConfig.shape}
                    shapeScale={shaderConfig.shapeScale}
                    scale={1}
                    rotation={0}
                    speed={prefersReducedMotion ? 0 : 0.8}
                    colors={shaderConfig.colors}
                  />
                </div>

                {/* Dark Luxury Overlay */}
                <div className="relative z-10 p-7 sm:p-8 rounded-3xl h-full flex flex-col justify-between bg-black/75 backdrop-blur-[2px] border border-white/10 group-hover:bg-black/65 transition-colors duration-500">
                  <div>
                    <div className="mb-6 p-3.5 rounded-2xl bg-white/10 w-fit border border-white/15 backdrop-blur-md filter drop-shadow-md group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-tight group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>

                    <p className="leading-relaxed text-zinc-300 text-sm sm:text-base font-normal">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center text-sm font-semibold text-amber-300 group-hover:text-white transition-colors">
                    <span className="mr-2">Explore capability</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Feature Deep-Dive Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  {selectedFeature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {selectedFeature.title}
                  </h3>
                  {selectedFeature.subtitle && (
                    <p className="text-sm text-amber-300/90 font-medium mt-1">
                      {selectedFeature.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedFeature.description}
              </p>

              {/* Operational Highlights */}
              {selectedFeature.highlights && selectedFeature.highlights.length > 0 && (
                <div className="mb-6 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                    Operational Controls & Architecture
                  </div>
                  <ul className="space-y-2.5">
                    {selectedFeature.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-200">
                        <span className="text-amber-400 font-bold mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metric Tag */}
              {selectedFeature.metric && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">{selectedFeature.metricLabel}</div>
                    <div className="text-lg font-extrabold text-amber-300">{selectedFeature.metric}</div>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-bold bg-amber-500/20 px-2.5 py-1 rounded-full">
                    Active Control
                  </div>
                </div>
              )}

              {/* Modal CTAs */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/pricing"
                  onClick={() => setSelectedFeature(null)}
                  className="px-6 py-2.5 rounded-full text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  See Pricing & Plans
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
