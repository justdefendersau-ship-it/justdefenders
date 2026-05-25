/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\parts\page.tsx
 *
 * Timestamp:
 * 24 May 2026 14:22 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Federation Dashboard
 *
 * STRATEGY:
 * PASS 46 / PASS 47 Production Stabilization
 *
 * OBJECTIVES:
 * - production-safe operational shell
 * - tactical federation rendering
 * - mobile orchestration readiness
 * - expedition-grade procurement UX
 * - responsive operational layout
 * - stable deployment runtime
 *
 * ============================================================
 */

"use client"

import Link from "next/link"

import {

  useMemo,
  useState

} from "react"

import OperationalAppShell from "@/components/layout/OperationalAppShell"

// ============================================================
// TYPES
// ============================================================

interface SupplierCard {

  id: string

  name: string

  health:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  latencyMs: number

  region: string

  expeditionScore: number
}

// ============================================================
// MOCK DATA
// ============================================================

const SUPPLIERS:
  SupplierCard[] = [

    {

      id: "repco",

      name: "Repco",

      health: "HEALTHY",

      latencyMs: 241,

      region: "Australia",

      expeditionScore: 92
    },

    {

      id: "burson",

      name: "Burson Auto Parts",

      health: "HEALTHY",

      latencyMs: 327,

      region: "Australia",

      expeditionScore: 88
    },

    {

      id: "lrdirect",

      name: "LR Direct",

      health: "DEGRADED",

      latencyMs: 611,

      region: "United Kingdom",

      expeditionScore: 95
    }
  ]

// ============================================================
// PAGE
// ============================================================

export default function PartsPage(){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    query,

    setQuery

  ] = useState("")

  // ==========================================================
  // FILTERED
  // ==========================================================

  const filteredSuppliers =
    useMemo(() => {

      const normalized =
        query
          .trim()
          .toLowerCase()

      if(!normalized){

        return SUPPLIERS
      }

      return SUPPLIERS.filter(

        supplier =>

          supplier.name
            .toLowerCase()
            .includes(normalized)

          ||

          supplier.region
            .toLowerCase()
            .includes(normalized)
      )

    }, [query])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <OperationalAppShell

      title="
        Tactical Procurement Federation
      "

      subtitle="
        Expedition-grade operational parts
        intelligence, supplier federation and
        tactical procurement orchestration.
      "
    >

      {/* ==================================================== */}
      {/* OUTER */}
      {/* ==================================================== */}

      <div
        className="
          mx-auto
          max-w-[1800px]
          px-4
          py-6

          lg:px-6
        "
      >

        {/* ================================================== */}
        {/* SEARCH */}
        {/* ================================================== */}

        <div
          className="
            rounded-[28px]
            border
            border-slate-800
            bg-[#07101F]
            p-5
          "
        >

          <div
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.2em]
              text-cyan-400
            "
          >
            Federation Search
          </div>

          <div
            className="
              mt-4
            "
          >

            <input

              value={query}

              onChange={event => {

                setQuery(
                  event.target.value
                )
              }}

              placeholder="
                Search tactical suppliers...
              "

              className="
                w-full
                rounded-[20px]
                border
                border-slate-800
                bg-[#020817]
                px-5
                py-4
                text-[15px]
                text-white
                outline-none
                transition-all
                duration-200

                placeholder:text-slate-600

                focus:border-cyan-700
                focus:ring-2
                focus:ring-cyan-900/40
              "
            />

          </div>

        </div>

        {/* ================================================== */}
        {/* GRID */}
        {/* ================================================== */}

        <div
          className="
            mt-6
            grid
            gap-5

            lg:grid-cols-3
          "
        >

          {

            filteredSuppliers.map(

              supplier => (

                <Link

                  key={supplier.id}

                  href={
                    `/parts/supplier/${supplier.id}`
                  }

                  className="
                    group
                    rounded-[28px]
                    border
                    border-slate-800
                    bg-[#07101F]
                    p-6
                    transition-all
                    duration-200

                    hover:border-cyan-700
                    hover:bg-[#0B162B]
                  "
                >

                  {/* =============================== */}
                  {/* HEADER */}
                  {/* =============================== */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div>

                      <div
                        className="
                          text-[12px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          text-slate-500
                        "
                      >
                        {supplier.region}
                      </div>

                      <div
                        className="
                          mt-3
                          text-[28px]
                          font-black
                          tracking-[-0.08em]
                          text-white
                        "
                      >
                        {supplier.name}
                      </div>

                    </div>

                    {/* =========================== */}
                    {/* STATUS */}
                    {/* =========================== */}

                    <div
                      className={`

                        rounded-full
                        border
                        px-4
                        py-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.16em]

                        ${

                          supplier.health
                          ===
                          "HEALTHY"

                          ?

                          `
                          border-emerald-800
                          bg-emerald-950/20
                          text-emerald-300
                          `

                          :

                          supplier.health
                          ===
                          "DEGRADED"

                          ?

                          `
                          border-amber-800
                          bg-amber-950/20
                          text-amber-300
                          `

                          :

                          `
                          border-red-800
                          bg-red-950/20
                          text-red-300
                          `
                        }
                      `}
                    >

                      {supplier.health}

                    </div>

                  </div>

                  {/* =============================== */}
                  {/* METRICS */}
                  {/* =============================== */}

                  <div
                    className="
                      mt-6
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >

                    <MetricTile

                      label="Latency"

                      value={`${supplier.latencyMs}ms`}

                    />

                    <MetricTile

                      label="Expedition"

                      value={`${supplier.expeditionScore}`}

                    />

                  </div>

                  {/* =============================== */}
                  {/* FOOTER */}
                  {/* =============================== */}

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        text-[13px]
                        text-slate-500
                      "
                    >
                      Tactical supplier intelligence
                    </div>

                    <div
                      className="
                        text-[12px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-cyan-400
                        transition-all
                        duration-200

                        group-hover:translate-x-[2px]
                      "
                    >
                      Open →
                    </div>

                  </div>

                </Link>
              )
            )
          }

        </div>

      </div>

    </OperationalAppShell>
  )
}

// ============================================================
// METRIC TILE
// ============================================================

function MetricTile({

  label,
  value

}: {

  label: string

  value: string

}){

  return (

    <div
      className="
        rounded-[20px]
        border
        border-slate-800
        bg-[#020817]
        p-4
      "
    >

      <div
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-slate-500
        "
      >
        {label}
      </div>

      <div
        className="
          mt-3
          text-[22px]
          font-black
          tracking-[-0.08em]
          text-cyan-300
        "
      >
        {value}
      </div>

    </div>
  )
}