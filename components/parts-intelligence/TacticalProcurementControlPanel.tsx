/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\TacticalProcurementControlPanel.tsx
 *
 * Timestamp:
 * 17 May 2026 18:05 Sydney
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  Globe,
  Shield,
  ShieldCheck,
  Truck,
  Wrench
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalProcurementControlPanel(){

  const controls = [

    {
      title: "AU PRIORITY",
      description:
        "Prioritise Australian operational suppliers",

      enabled: true,

      icon: ShieldCheck,

      accent: tacticalColors.success
    },

    {
      title: "INTERNATIONAL SEARCH",
      description:
        "Escalate procurement outside Australia",

      enabled: false,

      icon: Globe,

      accent: tacticalColors.accentBlue
    },

    {
      title: "OEM PRIORITY",
      description:
        "Prefer OEM expedition-grade components",

      enabled: true,

      icon: Shield,

      accent: tacticalColors.warning
    },

    {
      title: "EXPEDITION CRITICAL",
      description:
        "Prioritise operational reliability",

      enabled: true,

      icon: Truck,

      accent: tacticalColors.danger
    },

    {
      title: "AFTERMARKET ENABLED",
      description:
        "Include approved aftermarket suppliers",

      enabled: true,

      icon: Wrench,

      accent: tacticalColors.accentBlue
    }
  ]

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
            PROCUREMENT CONTROL
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
            Tactical operational procurement orchestration
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
          AUSTRALIAN OPERATIONAL MODE
        </div>

      </div>

      {/* ==================================================== */}
      {/* CONTROLS */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-4
          lg:grid-cols-5
        "
      >

        {controls.map((item)=>{

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
                p-4
              "

              style={{

                background:
                  tacticalColors.surfaceElevated,

                borderColor:
                  tacticalColors.border,

                boxShadow:
                  `0 0 20px ${item.accent}12`
              }}
            >

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
                    tracking-[0.14em]
                  "

                  style={{

                    background:
                      item.enabled
                        ? `${tacticalColors.success}18`
                        : `${tacticalColors.danger}18`,

                    color:
                      item.enabled
                        ? tacticalColors.success
                        : tacticalColors.danger
                  }}
                >
                  {item.enabled
                    ? "ACTIVE"
                    : "OFF"}
                </div>

              </div>

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