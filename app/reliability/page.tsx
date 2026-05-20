// ====================================================================
// JustDefenders ©
// File: /frontend/app/reliability/page.tsx
// Timestamp: 16 May 2026 18:10 Sydney
// ====================================================================

"use client"

import {
  useEffect,
  useState
} from "react"

import CanonicalDashboardShell
from "../../components/layout/CanonicalDashboardShell"

interface ReliabilityOverview {

  reliabilityDensity: number
  expeditionCriticalFailures: number
  overallReliability: number
  predictiveFailures: number
  reliabilityReports: number
  failureHotspots: string[]
}

export default function ReliabilityPage() {

  const [
    overview,
    setOverview
  ] = useState<ReliabilityOverview | null>(null)

  useEffect(() => {

    async function loadOverview() {

      const response =
        await fetch(
          "/api/reliability/overview"
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
        Reliability Intelligence
      "

      subtitle="
        Defender expedition reliability
        and operational failure analytics.
      "
    >

      <div
        className="
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
            border-cyan-500/20
            bg-cyan-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Reliability Density
          </div>

          <div className="mt-6 text-7xl font-black text-cyan-400">
            {overview?.reliabilityDensity ?? "--"}
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
            Expedition Critical
          </div>

          <div className="mt-6 text-7xl font-black text-red-400">
            {overview?.expeditionCriticalFailures ?? "--"}
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
            Overall Reliability
          </div>

          <div className="mt-6 text-7xl font-black text-green-400">
            {overview?.overallReliability ?? "--"}%
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
            Predictive Failures
          </div>

          <div className="mt-6 text-7xl font-black text-yellow-400">
            {overview?.predictiveFailures ?? "--"}
          </div>

        </div>

      </div>

      <div
        className="
          mt-10
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950/70
          p-8
        "
      >

        <div className="text-4xl font-black text-white">
          Expedition Failure Hotspots
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {
            overview?.failureHotspots?.map(
              (
                hotspot,
                index
              ) => (

                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-950/20
                    p-6
                  "
                >

                  <div className="text-2xl font-black text-red-400">
                    {hotspot}
                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </CanonicalDashboardShell>
  )
}