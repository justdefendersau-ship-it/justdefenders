// ====================================================================
// JustDefenders ©
// File: /frontend/app/suppliers/page.tsx
// Timestamp: 16 May 2026 17:40 Sydney
// ====================================================================

"use client"

import {
  useEffect,
  useState
} from "react"

import CanonicalDashboardShell
from "../../components/layout/CanonicalDashboardShell"

interface SupplierOverview {

  supplierCount: number
  pricingDensity: number
  australianSuppliers: number
  pricingStability: string
  supplierReliability: number
  expeditionCriticalSuppliers: number
}

export default function SuppliersPage() {

  const [
    overview,
    setOverview
  ] = useState<SupplierOverview | null>(null)

  useEffect(() => {

    async function loadOverview() {

      const response =
        await fetch(
          "/api/suppliers/overview"
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
        Supplier Intelligence
      "

      subtitle="
        Expedition-critical operational
        sourcing intelligence.
      "
    >

      <div
        className="
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
            border-zinc-800
            bg-zinc-950/70
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Supplier Network
          </div>

          <div className="mt-6 text-7xl font-black text-white">
            {overview?.supplierCount ?? "--"}
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
            AU Supplier Priority
          </div>

          <div className="mt-6 text-7xl font-black text-green-400">
            {overview?.australianSuppliers ?? "--"}
          </div>

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
            border-yellow-500/20
            bg-yellow-950/20
            p-8
          "
        >

          <div className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            Pricing Stability
          </div>

          <div className="mt-6 text-5xl font-black text-yellow-400">
            {overview?.pricingStability ?? "--"}
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
            Reliability Score
          </div>

          <div className="mt-6 text-6xl font-black text-cyan-400">
            {overview?.supplierReliability ?? "--"}%
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

          <div className="mt-6 text-6xl font-black text-red-400">
            {overview?.expeditionCriticalSuppliers ?? "--"}
          </div>

        </div>

      </div>

    </CanonicalDashboardShell>
  )
}