/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalMissionStatusBar.tsx
 *
 * Timestamp:
 * 17 May 2026 17:00 Sydney
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  Activity,
  Battery,
  Cpu,
  Globe,
  ShieldCheck,
  Thermometer
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// STATUS ITEMS
// ============================================================

const STATUS = [

  {
    label: "MISSION STATUS",
    value: "ACTIVE",
    icon: ShieldCheck,
    accent: tacticalColors.success
  },

  {
    label: "THERMAL STATE",
    value: "NORMAL",
    icon: Thermometer,
    accent: tacticalColors.warning
  },

  {
    label: "AI ENGINE",
    value: "ONLINE",
    icon: Cpu,
    accent: tacticalColors.accentBlue
  },

  {
    label: "REMOTE TELEMETRY",
    value: "CONNECTED",
    icon: Globe,
    accent: tacticalColors.success
  },

  {
    label: "POWER SYSTEM",
    value: "94%",
    icon: Battery,
    accent: tacticalColors.success
  },

  {
    label: "LIVE OPS",
    value: "STREAMING",
    icon: Activity,
    accent: tacticalColors.danger
  }
]

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalMissionStatusBar(){

  return (

    <div
      className="
        mt-6
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-6
      "
    >

      {STATUS.map((item)=>{

        const Icon = item.icon

        return (

          <motion.div

            key={item.label}

            whileHover={{
              y: -2
            }}

            className="
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
                `0 0 20px ${item.accent}16`
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
                  text-[10px]
                  font-semibold
                  tracking-[0.18em]
                "

                style={{
                  color:
                    tacticalColors.textMuted
                }}
              >
                {item.label}
              </div>

              <motion.div

                animate={{
                  opacity: [0.4, 1, 0.4]
                }}

                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >

                <Icon
                  size={16}
                  color={item.accent}
                />

              </motion.div>

            </div>

            <div
              className="
                text-lg
                font-bold
              "

              style={{
                color:
                  item.accent
              }}
            >
              {item.value}
            </div>

          </motion.div>
        )
      })}

    </div>
  )
}
