/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\TacticalUIRefinementLayer.tsx
 *
 * Timestamp:
 * 24 May 2026 14:56 Sydney
 *
 * PURPOSE:
 * Tactical UI Refinement Layer
 *
 * STRATEGY:
 * PASS 46 / PASS 47 Production Stabilization
 *
 * OBJECTIVES:
 * - production-safe federation rendering
 * - operational telemetry refinement
 * - mobile tactical orchestration
 * - stable federation state handling
 * - expedition-grade dashboard polish
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  Gauge,
  Radar,
  ShieldCheck

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

export default function TacticalUIRefinementLayer(){

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

  const loading =
    federation?.loading ?? false

  // ==========================================================
  // DERIVED METRICS
  // ==========================================================

  const metrics =
    useMemo(() => {

      const federationActive =
        results.length

      const federationLatency =
        federationActive > 0

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
            federationActive
          )

          :

          0

      const healthyCount =
        results.filter(

          result =>

            result?.health
            ===
            "HEALTHY"

        ).length

      return {

        federationActive,

        federationLatency,

        healthyCount
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

        lg:grid-cols-4
      "
    >

      {/* ==================================================== */}
      {/* LATENCY */}
      {/* ==================================================== */}

      <TelemetryCard

        icon={Gauge}

        label="Federation Latency"

        value={`${metrics.federationLatency}ms`}

        description="
          Average tactical procurement federation
          response telemetry.
        "

        color="
          text-cyan-300
        "
      />

      {/* ==================================================== */}
      {/* ACTIVE */}
      {/* ==================================================== */}

      <TelemetryCard

        icon={Radar}

        label="Active Federation"

        value={`${metrics.federationActive}`}

        description="
          Operational supplier federation endpoints
          currently synchronized.
        "

        color="
          text-emerald-300
        "
      />

      {/* ==================================================== */}
      {/* HEALTH */}
      {/* ==================================================== */}

      <TelemetryCard

        icon={ShieldCheck}

        label="Healthy Suppliers"

        value={`${metrics.healthyCount}`}

        description="
          Tactical supplier systems reporting
          healthy operational telemetry.
        "

        color="
          text-amber-300
        "
      />

      {/* ==================================================== */}
      {/* STATUS */}
      {/* ==================================================== */}

      <TelemetryCard

        icon={Activity}

        label="Operational Status"

        value={
          loading
            ?
            "SYNCING"
            :
            "ONLINE"
        }

        description="
          Real-time tactical procurement federation
          orchestration status.
        "

        color="
          text-violet-300
        "
      />

    </div>
  )
}

// ============================================================
// TELEMETRY CARD
// ============================================================

function TelemetryCard({

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