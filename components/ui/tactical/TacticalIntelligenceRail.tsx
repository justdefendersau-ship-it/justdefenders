/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalIntelligenceRail.tsx
 *
 * Timestamp:
 * 17 May 2026 16:15 Sydney
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  Activity,
  AlertTriangle,
  Brain,
  Shield,
  Truck
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

const EVENTS = [

  {
    id: 1,
    level: "success",
    category: "EXPEDITION",
    title: "EXPEDITION READINESS 92%",
    icon: Shield
  },

  {
    id: 2,
    level: "warning",
    category: "MAINTENANCE",
    title: "TURBO HOSE SERVICE WINDOW",
    icon: AlertTriangle
  },

  {
    id: 3,
    level: "critical",
    category: "TELEMETRY",
    title: "FUEL EFFICIENCY DROP DETECTED",
    icon: Activity
  },

  {
    id: 4,
    level: "info",
    category: "PROCUREMENT",
    title: "AU STOCK SHIFT — OEM FILTERS",
    icon: Truck
  },

  {
    id: 5,
    level: "success",
    category: "AI",
    title: "AI PROCUREMENT ENGINE SYNCHRONISED",
    icon: Brain
  }
]

function getAccent(level: string){

  switch(level){

    case "critical":
      return tacticalColors.danger

    case "warning":
      return tacticalColors.warning

    case "success":
      return tacticalColors.success

    default:
      return tacticalColors.accentBlue
  }
}

export default function TacticalIntelligenceRail(){

  return (

    <div
      className="
        mt-6
        overflow-x-auto
      "
    >

      <div
        className="
          flex
          gap-4
          pb-2
        "
      >

        {EVENTS.map((event)=>{

          const Icon = event.icon

          const accent = getAccent(
            event.level
          )

          return (

            <motion.div
              key={event.id}

              whileHover={{
                y: -2
              }}

              className="
                min-w-[320px]
                rounded-2xl
                border
                p-4
              "

              style={{

                background:
                  tacticalColors.surfaceElevated,

                borderColor:
                  tacticalColors.border,

                boxShadow:
                  `0 0 24px ${accent}22`
              }}
            >

              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                    "

                    style={{
                      background:
                        `${accent}18`
                    }}
                  >

                    <Icon
                      size={18}
                      color={accent}
                    />

                  </div>

                  <div>

                    <div
                      className="
                        text-xs
                        font-semibold
                        tracking-[0.18em]
                      "

                      style={{
                        color: accent
                      }}
                    >
                      {event.category}
                    </div>

                    <div
                      className="
                        mt-1
                        text-xs
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      LIVE OPERATIONAL FEED
                    </div>

                  </div>

                </div>

                <motion.div

                  animate={{
                    opacity: [0.4, 1, 0.4]
                  }}

                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}

                  className="
                    h-2
                    w-2
                    rounded-full
                  "

                  style={{
                    background: accent
                  }}
                />

              </div>

              <div
                className="
                  text-sm
                  font-semibold
                  leading-relaxed
                "

                style={{
                  color:
                    tacticalColors.textPrimary
                }}
              >
                {event.title}
              </div>

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}