/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\TelemetryVisualizationLayer.tsx
 *
 * Timestamp:
 * 24 May 2026 15:16 Sydney
 *
 * PURPOSE:
 * Telemetry Visualization Layer
 *
 * STRATEGY:
 * PASS 46 / PASS 47 Production Stabilization
 *
 * OBJECTIVES:
 * - production-safe telemetry rendering
 * - operational federation visualization
 * - tactical procurement telemetry
 * - expedition-grade dashboard analytics
 * - stable deployment-safe metrics
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  Globe,
  Radar,
  Wifi

} from "lucide-react"

import {

  useMemo

} from "react"

import {

  useFederationSearch

} from "@/contexts/FederationSearchContext"

// ============================================================
// COMPONENT
// ============================================================

export default function TelemetryVisualizationLayer(){

  // ==========================================================
  // FEDERATION
  // ==========================================================

  const federation =
    useFederationSearch()

  // ==========================================================
  // SAFE VALUES
  // ==========================================================

  const results =
    federation?.results ?? []

  // ==========================================================
  // METRICS
  // ==========================================================

  const telemetry =
    useMemo(() => {

      const activeSuppliers =
        results.length

      const averageLatency =
        activeSuppliers > 0

          ?

          Math.round(

            results.reduce(

              (
                accumulator,
                current
              ) => {

                return (
                  accumulator
                  +
                  (
                    current?.latencyMs
                    ??
                    0
                  )
                )

              },

              0
            )
            /
            activeSuppliers
          )

          :

          0

      const healthySuppliers =
        results.filter(

          result =>

            result?.health
            ===
            "HEALTHY"

        ).length

      const degradedSuppliers =
        results.filter(

          result =>

            result?.health
            ===
            "DEGRADED"

        ).length

      return {

        activeSuppliers,

        averageLatency,

        healthySuppliers,

        degradedSuppliers
      }

    }, [results])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        grid
        gap-5

        md:grid-cols-2

        xl:grid-cols-4
      "
    >

      <TelemetryPanel

        icon={Radar}

        label="Federation Nodes"

        value={`${telemetry.activeSuppliers}`}

        description="
          Tactical supplier federation endpoints
          currently active within operational
          procurement orchestration.
        "

        color="
          text-cyan-300
        "
      />

      <TelemetryPanel

        icon={Wifi}

        label="Average Latency"

        value={`${telemetry.averageLatency}ms`}

        description="
          Real-time operational telemetry latency
          across active supplier federation systems.
        "

        color="
          text-emerald-300
        "
      />

      <TelemetryPanel

        icon={Activity}

        label="Healthy Systems"

        value={`${telemetry.healthySuppliers}`}

        description="
          Federation systems currently operating
          within tactical operational thresholds.
        "

        color="
          text-amber-300
        "
      />

      <TelemetryPanel

        icon={Globe}

        label="Degraded Systems"

        value={`${telemetry.degradedSuppliers}`}

        description="
          Federation systems reporting elevated
          operational latency or reduced telemetry.
        "

        color="
          text-violet-300
        "
      />

    </div>
  )
}

// ============================================================
// PANEL
// ============================================================

function TelemetryPanel({

  icon: Icon,
  label,
  value,
  description,
  color

}: {

  icon: any

  label: string

  value: string

  description: string

  color: string

}){

  return (

    <div
      className="
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
        p-5
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div
          className="
            text-[11px]
            font-black
            uppercase
            tracking-[0.2em]
            text-slate-500
          "
        >
          {label}
        </div>

        <div
          className="
            rounded-full
            border
            border-slate-700
            bg-[#020817]
            p-3
          "
        >

          <Icon
            className={`
              h-5
              w-5
              ${color}
            `}
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* VALUE */}
      {/* ==================================================== */}

      <div
        className={`

          mt-5
          text-[34px]
          font-black
          tracking-[-0.08em]

          ${color}
        `}
      >
        {value}
      </div>

      {/* ==================================================== */}
      {/* DESCRIPTION */}
      {/* ==================================================== */}

      <div
        className="
          mt-4
          text-[14px]
          leading-relaxed
          text-slate-400
        "
      >
        {description}
      </div>

    </div>
  )
}