/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\RegionalProcurementCommandPanel.tsx
 *
 * Timestamp:
 * 17 May 2026 19:10 Sydney
 *
 * PURPOSE:
 * Regional Operational Procurement Command Panel
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  Globe2,
  ShieldCheck,
  Truck,
  Wrench,
  Zap
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// PROCUREMENT MODES
// ============================================================

const PROCUREMENT_MODES = [

  {
    title: "AU PRIORITY",

    description:
      "Prioritise Australian operational suppliers",

    value:
      "ACTIVE",

    accent:
      tacticalColors.success,

    icon:
      ShieldCheck
  },

  {
    title: "NEW ZEALAND READY",

    description:
      "Cross-region procurement architecture enabled",

    value:
      "STAGED",

    accent:
      tacticalColors.accentBlue,

    icon:
      Globe2
  },

  {
    title: "EXPEDITION CRITICAL",

    description:
      "Operational survivability prioritisation enabled",

    value:
      "ACTIVE",

    accent:
      tacticalColors.danger,

    icon:
      Truck
  },

  {
    title: "OEM PROCUREMENT",

    description:
      "OEM-first procurement weighting enabled",

    value:
      "ACTIVE",

    accent:
      tacticalColors.warning,

    icon:
      Wrench
  },

  {
    title: "AI ORCHESTRATION",

    description:
      "AI supplier intelligence active",

    value:
      "ONLINE",

    accent:
      tacticalColors.accentBlue,

    icon:
      Zap
  }
]

// ============================================================
// COMPONENT
// ============================================================

export default function RegionalProcurementCommandPanel(){

  return (

    <div className="mt-6">

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              text-xs
              font-semibold
              tracking-[0.18em]
            "

            style={{
              color:
                tacticalColors.accentBlue
            }}
          >
            REGIONAL PROCUREMENT COMMAND
          </div>

          <div
            className="
              mt-2
              text-sm
            "

            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            Multi-region operational procurement orchestration
          </div>

        </div>

        <div
          className="
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
          "

          style={{

            borderColor:
              tacticalColors.border,

            color:
              tacticalColors.textSecondary
          }}
        >
          AUSTRALIA PRIMARY REGION
        </div>

      </div>

      {/* ==================================================== */}
      {/* GRID */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-4
          lg:grid-cols-5
        "
      >

        {PROCUREMENT_MODES.map((item)=>{

          const Icon = item.icon

          return (

            <motion.div

              key={item.title}

              whileHover={{
                y: -2
              }}

              className="
                rounded-2xl
                border
                p-5
              "

              style={{

                background:
                  tacticalColors.surfaceElevated,

                borderColor:
                  tacticalColors.border,

                boxShadow:
                  `0 0 24px ${item.accent}14`
              }}
            >

              {/* ============================================ */}
              {/* TOP */}
              {/* ============================================ */}

              <div
                className="
                  mb-4
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                  "

                  style={{
                    background:
                      `${item.accent}18`
                  }}
                >

                  <Icon
                    size={18}
                    color={item.accent}
                  />

                </div>

                <div
                  className="
                    rounded-full
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    tracking-[0.16em]
                  "

                  style={{

                    background:
                      `${item.accent}18`,

                    color:
                      item.accent
                  }}
                >
                  {item.value}
                </div>

              </div>

              {/* ============================================ */}
              {/* TITLE */}
              {/* ============================================ */}

              <div
                className="
                  text-sm
                  font-bold
                "

                style={{
                  color:
                    tacticalColors.textPrimary
                }}
              >
                {item.title}
              </div>

              {/* ============================================ */}
              {/* DESCRIPTION */}
              {/* ============================================ */}

              <div
                className="
                  mt-2
                  text-xs
                  leading-relaxed
                "

                style={{
                  color:
                    tacticalColors.textMuted
                }}
              >
                {item.description}
              </div>

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}