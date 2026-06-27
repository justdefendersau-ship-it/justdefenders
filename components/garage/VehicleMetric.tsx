/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\components\garage\VehicleMetric.tsx
 *
 * Timestamp:
 * 26 June 2026 13:30 Sydney
 *
 * PURPOSE:
 * Reusable Garage metric component.
 *
 * M3.5.1
 * Digital Twin Refactor
 *
 * CHANGE SUMMARY
 * - Extracted from app/garage/page.tsx
 * - Zero functional changes
 * - Zero visual changes
 * - Canonical reusable Garage component
 * ============================================================
 */

import React from "react"

export interface VehicleMetricProps {

  icon: React.ReactNode

  label: string

  value: string

  accent:
    | "cyan"
    | "green"
    | "amber"

}

export default function VehicleMetric({

  icon,
  label,
  value,
  accent

}: VehicleMetricProps) {

  return (

    <div
      className="
        rounded-[22px]
        border
        border-slate-800
        bg-[#07101F]
        p-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div
          className={`

            ${

              accent === "green"

                ? "text-[#4ADE80]"

                : accent === "amber"

                  ? "text-[#F59E0B]"

                  : "text-[#38BDF8]"
            }
          `}
        >

          {icon}

        </div>

        <div
          className="
            text-[24px]
            font-black
            tracking-[-0.05em]
            text-white
          "
        >

          {value}

        </div>

      </div>

      <div
        className="
          mt-4
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-slate-500
        "
      >

        {label}

      </div>

    </div>

  )

}