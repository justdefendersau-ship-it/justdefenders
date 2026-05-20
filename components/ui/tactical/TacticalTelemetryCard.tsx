/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalTelemetryCard.tsx
 *
 * Timestamp:
 * 17 May 2026 06:35 Sydney
 *
 * PURPOSE:
 * Tactical Operational Telemetry Surface
 * ============================================================
 */

"use client"

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip
} from "recharts"

import TacticalCard
from "./TacticalCard"

import TacticalPulse
from "./TacticalPulse"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// MOCK DATA
// ============================================================

const telemetryData = [

  { day: "Mon", value: 68 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 70 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 92 },
  { day: "Sun", value: 94 }
]

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalTelemetryCard() {

  return (

    <TacticalCard

      title="
      Operational Telemetry
      "

      subtitle="
      Real-time readiness + procurement analytics
      "

      glow
    >

      {/* ================================================= */}
      {/* HEADER STATUS */}
      {/* ================================================= */}

      <div
        className="
          mb-8
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

          <TacticalPulse
            size={10}
          />

          <div
            className="
              text-sm
              font-medium
            "
            style={{
              color:
                tacticalColors.textSecondary
            }}
          >
            Live operational intelligence active
          </div>
        </div>

        <div
          className="
            rounded-full
            border
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.14em]
          "
          style={{

            background:
              "rgba(31,193,107,0.10)",

            borderColor:
              "rgba(31,193,107,0.18)",

            color:
              tacticalColors.success
          }}
        >
          Stable
        </div>
      </div>

      {/* ================================================= */}
      {/* METRIC */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-end
          justify-between
        "
      >

        <div>

          <div
            className="
              text-5xl
              font-bold
              tracking-tight
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            94%
          </div>

          <div
            className="
              mt-2
              text-sm
            "
            style={{
              color:
                tacticalColors.textSecondary
            }}
          >
            Expedition readiness confidence
          </div>
        </div>

        <div
          className="
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold
          "
          style={{

            background:
              "rgba(31,193,107,0.14)",

            color:
              tacticalColors.success
          }}
        >
          +12.4%
        </div>
      </div>

      {/* ================================================= */}
      {/* CHART */}
      {/* ================================================= */}

      <div
        className="
          mt-8
          h-[240px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={telemetryData}
          >

            <Tooltip
              contentStyle={{

                background:
                  tacticalColors.surface,

                border:
                  `1px solid ${tacticalColors.border}`,

                borderRadius: "16px",

                color:
                  tacticalColors.textPrimary
              }}
            />

            <Line

              type="monotone"

              dataKey="value"

              stroke={tacticalColors.accentBlue}

              strokeWidth={3}

              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <div
        className="
          mt-6
          grid
          grid-cols-3
          gap-4
        "
      >

        {[
          {
            label: "Supplier Stability",
            value: "91%"
          },

          {
            label: "Fleet Readiness",
            value: "94%"
          },

          {
            label: "Operational Risk",
            value: "Low"
          }
        ].map((item, idx)=>(

          <div

            key={idx}

            className="
              rounded-2xl
              border
              p-4
            "

            style={{

              background:
                "rgba(255,255,255,0.03)",

              borderColor:
                "rgba(255,255,255,0.05)"
            }}
          >

            <div
              className="
                text-xs
                uppercase
                tracking-[0.14em]
              "
              style={{
                color:
                  tacticalColors.textMuted
              }}
            >
              {item.label}
            </div>

            <div
              className="
                mt-3
                text-lg
                font-bold
              "
              style={{
                color:
                  tacticalColors.textPrimary
                }}
            >
              {item.value}
            </div>

          </div>
        ))}

      </div>

    </TacticalCard>
  )
}