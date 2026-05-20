/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalInsightStrip.tsx
 *
 * Timestamp:
 * 17 May 2026 11:00 Sydney
 *
 * PURPOSE:
 * Tactical Operational Insight Feed
 * ============================================================
 */

"use client"

import {
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Truck
} from "lucide-react"

import {
  motion,
  AnimatePresence
} from "framer-motion"

import TacticalPulse
from "./TacticalPulse"

import useRotatingInsights
from "@/hooks/useRotatingInsights"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// INSIGHTS
// ============================================================

const insights = [

  {
    icon:
      <Sparkles
        size={16}
        color={tacticalColors.accentBlue}
      />,

    title:
      "AI Procurement Recommendation",

    description:
      "Defender Direct AU currently provides the highest expedition readiness score for Td5 cooling systems."
  },

  {
    icon:
      <AlertTriangle
        size={16}
        color={tacticalColors.warning}
      />,

    title:
      "Operational Advisory",

    description:
      "Remote-area touring demand has increased lead times for wheel bearing kits by 18%."
  },

  {
    icon:
      <ShieldCheck
        size={16}
        color={tacticalColors.success}
      />,

    title:
      "Readiness Status",

    description:
      "Current expedition preparation score exceeds recommended touring threshold."
  },

  {
    icon:
      <Truck
        size={16}
        color={tacticalColors.accentAmber}
      />,

    title:
      "Logistics Update",

    description:
      "Queensland supplier routing currently delivering fastest east-coast expedition dispatch."
  }
]

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalInsightStrip() {

  const {

    activeInsight,

    activeIndex

  } = useRotatingInsights(
    insights,
    4500
  )

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        px-6
        py-5
        backdrop-blur-2xl
      "
      style={{

        background:
          "linear-gradient(to right, rgba(18,26,43,0.80), rgba(11,17,32,0.72))",

        borderColor:
          "rgba(255,255,255,0.05)"
      }}
    >

      {/* ================================================= */}
      {/* GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          top-[-100px]
          right-[-100px]
          h-[220px]
          w-[220px]
          rounded-full
          blur-3xl
          opacity-[0.08]
        "
        style={{
          background:
            tacticalColors.accentBlue
        }}
      />

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="relative z-10">

        <AnimatePresence
          mode="wait"
        >

          <motion.div

            key={activeIndex}

            initial={{
              opacity: 0,
              y: 8
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            exit={{
              opacity: 0,
              y: -8
            }}

            transition={{
              duration: 0.28
            }}

            className="
              flex
              flex-col
              gap-5
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            {/* ========================================= */}
            {/* LEFT */}
            {/* ========================================= */}

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  mt-1
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  background:
                    "rgba(255,255,255,0.04)"
                }}
              >
                {activeInsight.icon}
              </div>

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <TacticalPulse
                    size={7}
                  />

                  <div
                    className="
                      text-sm
                      font-semibold
                    "
                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {activeInsight.title}
                  </div>

                </div>

                <div
                  className="
                    mt-3
                    max-w-4xl
                    text-sm
                    leading-relaxed
                  "
                  style={{
                    color:
                      tacticalColors.textSecondary
                    }}
                >
                  {activeInsight.description}
                </div>

              </div>
            </div>

            {/* ========================================= */}
            {/* STATUS */}
            {/* ========================================= */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              {insights.map((_, idx)=>(

                <div

                  key={idx}

                  className="
                    h-2.5
                    rounded-full
                    transition-all
                    duration-500
                  "

                  style={{

                    width:
                      idx === activeIndex
                        ? 36
                        : 10,

                    background:
                      idx === activeIndex
                        ? tacticalColors.accentBlue
                        : "rgba(255,255,255,0.12)"
                  }}
                />
              ))}

            </div>

          </motion.div>

        </AnimatePresence>

      </div>
    </div>
  )
}