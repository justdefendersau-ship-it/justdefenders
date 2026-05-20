/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalStatusBadge.tsx
 *
 * Timestamp:
 * 17 May 2026 06:50 Sydney
 *
 * PURPOSE:
 * Tactical Operational Status Badge
 * ============================================================
 */

"use client"

import TacticalPulse
from "./TacticalPulse"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface TacticalStatusBadgeProps {

  label: string

  status?:
    | "healthy"
    | "warning"
    | "critical"
    | "info"

  pulse?: boolean
}

// ============================================================
// STATUS MAP
// ============================================================

const statusMap = {

  healthy: {

    background:
      "rgba(31,193,107,0.10)",

    border:
      "rgba(31,193,107,0.18)",

    color:
      tacticalColors.success
  },

  warning: {

    background:
      "rgba(255,176,32,0.10)",

    border:
      "rgba(255,176,32,0.18)",

    color:
      tacticalColors.warning
  },

  critical: {

    background:
      "rgba(255,90,90,0.10)",

    border:
      "rgba(255,90,90,0.18)",

    color:
      tacticalColors.danger
  },

  info: {

    background:
      "rgba(79,124,255,0.10)",

    border:
      "rgba(79,124,255,0.18)",

    color:
      tacticalColors.accentBlue
  }
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalStatusBadge({

  label,

  status = "info",

  pulse = false

}: TacticalStatusBadgeProps) {

  const styles = statusMap[status]

  return (

    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2
        text-xs
        font-semibold
        uppercase
        tracking-[0.14em]
        backdrop-blur-xl
      "
      style={{

        background:
          styles.background,

        borderColor:
          styles.border,

        color:
          styles.color
      }}
    >

      {pulse && (

        <TacticalPulse

          size={7}

          color={styles.color}

          opacity={0.8}
        />
      )}

      {label}

    </div>
  )
}