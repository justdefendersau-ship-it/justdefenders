// ====================================================================
// JustDefenders ©
// File: /frontend/app/garage/page.tsx
// Timestamp: 16 May 2026 16:35 Sydney
// ====================================================================

"use client"

import {
  useEffect,
  useState
} from "react"

import CanonicalDashboardShell
from "../../components/layout/CanonicalDashboardShell"

interface GarageOverview {

  generation: string
  telemetryCapability: string
  operationalProfile: string
  expeditionReadiness: number
  operationalRisk: string
  maintenanceHistory: number
  telemetryDensity: number
  predictiveEvents: number
}

export default function GaragePage() {

  const [
    overview,
    setOverview
  ] = useState<GarageOverview | null>(null)

  useEffect(() => {

    async function loadOverview() {

      const response =
        await fetch(
          "/api/garage/overview"
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
        Expedition Intelligence
      "

      subtitle="
        Defender-native operational
        readiness and expedition risk.
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
          ACTIVE DEFENDER PLATFORM
        </div>

        <div className="mt-6 text-6xl font-black text-white">
          {overview?.generation}
        </div>

        <div className="mt-4 text-2xl font-bold text-cyan-400">
          {overview?.telemetryCapability}
        </div>

        <div className="mt-6 max-w-4xl text-lg text-zinc-400">
          {overview?.operationalProfile}
        </div>

      </div>

      <div
        className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

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
            Expedition Readiness
          </div>

          <div className="mt-6 text-7xl font-black text-white">
            {overview?.expeditionReadiness ?? "--"}%
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-amber-500/20
            bg-amber-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            Operational Risk
          </div>

          <div className="mt-6 text-6xl font-black text-yellow-400">
            {overview?.operationalRisk ?? "--"}
          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-950/70
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Maintenance Density
          </div>

          <div className="mt-6 text-6xl font-black text-white">
            {overview?.maintenanceHistory ?? "--"}
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
            Predictive Events
          </div>

          <div className="mt-6 text-6xl font-black text-cyan-400">
            {overview?.predictiveEvents ?? "--"}
          </div>

        </div>

      </div>

    </CanonicalDashboardShell>
  )
}