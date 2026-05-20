// ====================================================================
// JustDefenders ©
// File: /frontend/app/executive/page.tsx
// Timestamp: 16 May 2026 18:45 Sydney
// ====================================================================

"use client"

import {
  useEffect,
  useState
} from "react"

import CanonicalDashboardShell
from "../../components/layout/CanonicalDashboardShell"

interface ExecutiveOverview {

  operationalVehicles: number
  telemetryDensity: number
  maintenanceDensity: number
  predictiveFailures: number
  pricingDensity: number
  reliabilityDensity: number
  operationalPosture: string
}

export default function ExecutivePage() {

  const [
    overview,
    setOverview
  ] = useState<ExecutiveOverview | null>(null)

  useEffect(() => {

    async function loadOverview() {

      const response =
        await fetch(
          "/api/executive/overview"
        )

      const data =
        await response.json()

      setOverview(data)
    }

    loadOverview()

  }, [])

  return (

    <CanonicalDashboardShell

      title="
        Executive Operations
      "

      subtitle="
        Unified Defender operational
        intelligence command centre.
      "
    >

      <div
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950/70
          p-10
        "
      >

        <div className="text-xs uppercase tracking-[0.3em] text-green-400">
          OPERATIONAL POSTURE
        </div>

        <div className="mt-6 text-7xl font-black text-white">
          {overview?.operationalPosture ?? "--"}
        </div>

      </div>

      <div
        className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        <div
          className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Operational Vehicles
          </div>

          <div className="mt-6 text-7xl font-black text-cyan-400">
            {overview?.operationalVehicles ?? "--"}
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-green-500/20
            bg-green-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-green-400">
            Telemetry Density
          </div>

          <div className="mt-6 text-7xl font-black text-green-400">
            {overview?.telemetryDensity ?? "--"}
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-yellow-500/20
            bg-yellow-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            Maintenance Density
          </div>

          <div className="mt-6 text-7xl font-black text-yellow-400">
            {overview?.maintenanceDensity ?? "--"}
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-red-500/20
            bg-red-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-red-400">
            Predictive Failures
          </div>

          <div className="mt-6 text-7xl font-black text-red-400">
            {overview?.predictiveFailures ?? "--"}
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Pricing Density
          </div>

          <div className="mt-6 text-7xl font-black text-cyan-400">
            {overview?.pricingDensity ?? "--"}
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-green-500/20
            bg-green-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-green-400">
            Reliability Density
          </div>

          <div className="mt-6 text-7xl font-black text-green-400">
            {overview?.reliabilityDensity ?? "--"}
          </div>

        </div>

      </div>

    </CanonicalDashboardShell>
  )
}