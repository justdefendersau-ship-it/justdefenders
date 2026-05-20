/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\LiveOperationalProcurementConsole.tsx
 *
 * Timestamp:
 * 17 May 2026 21:35 Sydney
 *
 * PURPOSE:
 * Live Operational Procurement Console
 * ============================================================
 */

"use client"

import { useState } from "react"

import { motion } from "framer-motion"

import {
  Globe2,
  Search,
  ShieldCheck,
  Truck,
  Wrench
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface ProcurementSupplier {

  supplierId: string

  supplierName: string

  region: string

  country: string

  operationalScore: number

  expeditionScore: number

  procurementConfidence: number

  logisticsScore: number

  rankingScore: number

  matchedCategories: string[]

  reasoning: string[]
}

// ============================================================
// COMPONENT
// ============================================================

export default function LiveOperationalProcurementConsole(){

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    query,
    setQuery
  ] = useState("")

  const [
    loading,
    setLoading
  ] = useState(false)

  const [
    results,
    setResults
  ] = useState<ProcurementSupplier[]>([])

  const [
    internationalEnabled,
    setInternationalEnabled
  ] = useState(false)

  // ==========================================================
  // SEARCH
  // ==========================================================

  async function executeSearch(){

    try {

      setLoading(true)

      const response =
        await fetch(

          "/api/procurement/search",

          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              query,

              country: "AU",

              expeditionCritical: true,

              oemPriority: true,

              internationalEnabled
            })
          }
        )

      const data =
        await response.json()

      setResults(
        data.procurement.suppliers || []
      )

    } catch(error){

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="mt-6">

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              text-xs
              font-semibold
              tracking-[0.18em]
            "

            style={{
              color:
                tacticalColors.accentBlue
            }}
          >
            LIVE PROCUREMENT ORCHESTRATION
          </div>

          <div
            className="
              mt-2
              text-sm
            "

            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            Regional operational procurement intelligence
          </div>

        </div>

        <div
          className="
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
          "

          style={{

            borderColor:
              tacticalColors.border,

            color:
              tacticalColors.textSecondary
          }}
        >
          AI PROCUREMENT ACTIVE
        </div>

      </div>

      {/* ==================================================== */}
      {/* SEARCH PANEL */}
      {/* ==================================================== */}

      <div
        className="
          rounded-2xl
          border
          p-5
        "

        style={{

          background:
            tacticalColors.surfaceElevated,

          borderColor:
            tacticalColors.border
        }}
      >

        {/* ================================================== */}
        {/* INPUT */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
          "
        >

          <div className="flex-1">

            <input

              value={query}

              onChange={(event)=>{

                setQuery(
                  event.target.value
                )
              }}

              placeholder="
              Search operational Defender parts...
              "

              className="
                w-full
                rounded-xl
                border
                px-4
                py-4
                outline-none
              "

              style={{

                background:
                  tacticalColors.surface,

                borderColor:
                  tacticalColors.border,

                color:
                  tacticalColors.textPrimary
              }}
            />

          </div>

          <button

            onClick={executeSearch}

            disabled={
              loading || !query
            }

            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-5
              py-4
              font-semibold
            "

            style={{

              background:
                tacticalColors.accentBlue,

              color:
                tacticalColors.textPrimary
            }}
          >

            <Search size={18} />

            {loading
              ? "ORCHESTRATING..."
              : "SEARCH"}

          </button>

        </div>

        {/* ================================================== */}
        {/* TOGGLES */}
        {/* ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-3
          "
        >

          <button

            onClick={()=>{

              setInternationalEnabled(
                !internationalEnabled
              )
            }}

            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-2
              text-xs
              font-semibold
            "

            style={{

              borderColor:
                tacticalColors.border,

              background:
                internationalEnabled
                  ? `${tacticalColors.accentBlue}20`
                  : tacticalColors.surface,

              color:
                tacticalColors.textPrimary
            }}
          >

            <Globe2 size={14} />

            INTERNATIONAL SEARCH

          </button>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-2
              text-xs
              font-semibold
            "

            style={{

              borderColor:
                tacticalColors.border,

              background:
                `${tacticalColors.success}18`,

              color:
                tacticalColors.success
            }}
          >

            <ShieldCheck size={14} />

            OEM PRIORITY

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-2
              text-xs
              font-semibold
            "

            style={{

              borderColor:
                tacticalColors.border,

              background:
                `${tacticalColors.warning}18`,

              color:
                tacticalColors.warning
            }}
          >

            <Truck size={14} />

            EXPEDITION CRITICAL

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-2
              text-xs
              font-semibold
            "

            style={{

              borderColor:
                tacticalColors.border,

              background:
                `${tacticalColors.accentBlue}18`,

              color:
                tacticalColors.accentBlue
            }}
          >

            <Wrench size={14} />

            AI ORCHESTRATION

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* RESULTS */}
      {/* ==================================================== */}

      <div className="mt-6 space-y-4">

        {results.map((supplier)=>{

          return (

            <motion.div

              key={supplier.supplierId}

              whileHover={{
                y: -2
              }}

              className="
                rounded-2xl
                border
                p-5
              "

              style={{

                background:
                  tacticalColors.surfaceElevated,

                borderColor:
                  tacticalColors.border
              }}
            >

              {/* ============================================ */}
              {/* TOP */}
              {/* ============================================ */}

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                "
              >

                <div>

                  <div
                    className="
                      text-lg
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {supplier.supplierName}
                  </div>

                  <div
                    className="
                      mt-1
                      text-sm
                    "

                    style={{
                      color:
                        tacticalColors.textMuted
                    }}
                  >
                    {supplier.region}
                    {" • "}
                    {supplier.country}
                  </div>

                </div>

                <div
                  className="
                    rounded-full
                    px-3
                    py-2
                    text-sm
                    font-bold
                  "

                  style={{

                    background:
                      `${tacticalColors.success}18`,

                    color:
                      tacticalColors.success
                  }}
                >
                  SCORE {supplier.rankingScore}
                </div>

              </div>

              {/* ============================================ */}
              {/* GRID */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  grid
                  gap-4
                  md:grid-cols-4
                "
              >

                <MetricCard
                  label="OPS"
                  value={
                    supplier.operationalScore
                  }
                />

                <MetricCard
                  label="EXPEDITION"
                  value={
                    supplier.expeditionScore
                  }
                />

                <MetricCard
                  label="OEM"
                  value={
                    supplier.procurementConfidence
                  }
                />

                <MetricCard
                  label="LOGISTICS"
                  value={
                    supplier.logisticsScore
                  }
                />

              </div>

              {/* ============================================ */}
              {/* REASONING */}
              {/* ============================================ */}

              <div className="mt-5">

                <div
                  className="
                    mb-3
                    text-xs
                    font-semibold
                    tracking-[0.16em]
                  "

                  style={{
                    color:
                      tacticalColors.textMuted
                  }}
                >
                  PROCUREMENT INTELLIGENCE
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {supplier.reasoning.map((r)=>{

                    return (

                      <div

                        key={r}

                        className="
                          rounded-full
                          border
                          px-2
                          py-1
                          text-[10px]
                          font-semibold
                        "

                        style={{

                          borderColor:
                            tacticalColors.border,

                          color:
                            tacticalColors.textSecondary
                        }}
                      >
                        {r}
                      </div>
                    )
                  })}

                </div>

              </div>

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}

// ============================================================
// METRIC CARD
// ============================================================

function MetricCard({
  label,
  value
}:{
  label: string
  value: number
}){

  return (

    <div
      className="
        rounded-xl
        border
        p-4
      "

      style={{

        background:
          tacticalColors.surface,

        borderColor:
          tacticalColors.border
      }}
    >

      <div
        className="
          text-[10px]
          font-semibold
          tracking-[0.14em]
        "

        style={{
          color:
            tacticalColors.textMuted
        }}
      >
        {label}
      </div>

      <div
        className="
          mt-2
          text-xl
          font-bold
        "

        style={{
          color:
            tacticalColors.textPrimary
        }}
      >
        {value}
      </div>

    </div>
  )
}