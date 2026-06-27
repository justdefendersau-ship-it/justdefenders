/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\components\garage\AlertCard.tsx
 *
 * Timestamp:
 * 26 June 2026 13:40 Sydney
 *
 * PURPOSE:
 * Reusable Garage Alert Card.
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

export interface AlertCardProps {

  icon: React.ReactNode

  title: string

  description: string

  severity:
    | "critical"
    | "success"
    | "info"

}

export default function AlertCard({

  icon,
  title,
  description,
  severity

}: AlertCardProps) {

  return (

    <div
      className="
        rounded-[24px]
        border
        border-slate-800
        bg-[#020817]
        p-6
      "
    >

      <div
        className="
          flex
          items-start
          gap-5
        "
      >

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border

            ${

              severity === "critical"

                ? `
                  border-red-800
                  bg-red-950/20
                  text-red-300
                  `

                : severity === "success"

                  ? `
                    border-emerald-800
                    bg-emerald-950/20
                    text-emerald-300
                    `

                  : `
                    border-cyan-800
                    bg-cyan-950/20
                    text-cyan-300
                    `
            }
          `}
        >

          {icon}

        </div>

        <div>

          <div
            className="
              text-[16px]
              font-black
              text-white
            "
          >

            {title}

          </div>

          <div
            className="
              mt-3
              text-[13px]
              leading-relaxed
              text-slate-500
            "
          >

            {description}

          </div>

        </div>

      </div>

    </div>

  )

}