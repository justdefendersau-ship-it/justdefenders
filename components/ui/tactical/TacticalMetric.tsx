/**
 * ============================================================
 * JustDefenders ©
 * File: C:\dev\justdefenders\frontend\components\ui\tactical\TacticalMetric.tsx
 * Timestamp: 17 May 2026 00:40 Sydney
 * Tactical KPI / Metric Component
 * ============================================================
 */

"use client"

import {
  motion
} from "framer-motion"

import {
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react"

import {
  ReactNode
} from "react"

import {
  tacticalColors,
  tacticalShadows
} from "@/styles/tokens"

interface TacticalMetricProps {

  label: string

  value: string | number

  icon?: ReactNode

  trend?: number

  trendLabel?: string

  status?: "healthy" | "warning" | "critical" | "info"

  glow?: boolean

  compact?: boolean
}

export default function TacticalMetric({

  label,

  value,

  icon,

  trend,

  trendLabel,

  status = "info",

  glow = false,

  compact = false

}: TacticalMetricProps) {

  const statusColorMap = {

    healthy:
      tacticalColors.success,

    warning:
      tacticalColors.warning,

    critical:
      tacticalColors.critical,

    info:
      tacticalColors.accentBlue
  }

  const statusColor =
    statusColorMap[status]

  const isPositive =
    trend !== undefined
      ? trend >= 0
      : true

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.2
      }}

      whileHover={{
        y: -2
      }}

      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        p-5
        backdrop-blur-md
        transition-all
        duration-200
      `}

      style={{

        background:
          tacticalColors.surface,

        borderColor:
          tacticalColors.border,

        boxShadow:
          glow
            ? tacticalShadows.glowBlue
            : tacticalShadows.card
      }}
    >

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
            "
            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            {label}
          </p>

          <div
            className={`
              mt-3
              font-bold
              tracking-tight
              ${compact
                ? "text-2xl"
                : "text-4xl"}
            `}
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {value}
          </div>
        </div>

        {icon && (

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
            "
            style={{

              background:
                tacticalColors.surfaceElevated,

              border:
                `1px solid ${tacticalColors.border}`,

              color:
                statusColor
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* TREND */}
      {/* ===================================================== */}

      {(trend !== undefined || trendLabel) && (

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
          "
        >

          {trend !== undefined && (

            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                px-2.5
                py-1
                text-xs
                font-semibold
              "
              style={{

                background:
                  isPositive
                    ? "rgba(31,193,107,0.12)"
                    : "rgba(255,90,90,0.12)",

                color:
                  isPositive
                    ? tacticalColors.success
                    : tacticalColors.danger
              }}
            >

              {isPositive
                ? (
                  <ArrowUpRight size={14} />
                )
                : (
                  <ArrowDownRight size={14} />
                )
              }

              {Math.abs(trend)}%
            </div>
          )}

          {trendLabel && (

            <span
              className="
                text-sm
              "
              style={{
                color:
                  tacticalColors.textSecondary
              }}
            >
              {trendLabel}
            </span>
          )}
        </div>
      )}

      {/* ===================================================== */}
      {/* STATUS BAR */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[3px]
          w-full
        "
        style={{
          background:
            statusColor
        }}
      />

      {/* ===================================================== */}
      {/* TACTICAL OVERLAY */}
      {/* ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          background:
            "radial-gradient(circle at top right, #4F7CFF, transparent 55%)"
        }}
      />
    </motion.div>
  )
}