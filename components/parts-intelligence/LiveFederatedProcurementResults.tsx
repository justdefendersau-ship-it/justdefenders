/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\LiveFederatedProcurementResults.tsx
 *
 * Timestamp:
 * 18 May 2026 02:50 Sydney
 *
 * PURPOSE:
 * Live Federated Procurement Results
 *
 * STRATEGY:
 * Real procurement federation visualisation layer
 * ============================================================
 */

"use client"

import { useState } from "react"

import {
  Globe2,
  Search,
  ShieldCheck,
  Truck
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface ProcurementResult {

  connectorId: string

  supplierName: string

  procurementClass: string

  title: string

  estimatedPrice: number

  currency: string

  availability: string

  logisticsEstimate: string

  operationalScore: number

  rankingScore: number

  riskLevel: string

  recommendation: string

  reasoning: string[]

  listingUrl?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function LiveFederatedProcurementResults(){

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
  ] = useState<ProcurementResult[]>([])

  // ==========================================================
  // SEARCH
  // ==========================================================

  async function executeSearch(){

    try {

      setLoading(true)

      const response =
        await fetch(

          "/api/procurement/live-federation",

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

              recoverySearchEnabled: true
            })
          }
        )

      const data =
        await response.json()

      setResults(
        data.federation.results || []
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

    <div className="mt-8">

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
            LIVE FEDERATED PROCUREMENT
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
            Real-time operational procurement federation
          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* SEARCH */}
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

        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
          "
        >

          <input

            value={query}

            onChange={(event)=>{

              setQuery(
                event.target.value
              )
            }}

            placeholder="
            Search live Defender procurement...
            "

            className="
              flex-1
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
              ? "FEDERATING..."
              : "LIVE SEARCH"}

          </button>

        </div>

        {/* ================================================== */}
        {/* BADGES */}
        {/* ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-3
          "
        >

          <Badge
            icon={<Globe2 size={14} />}
            label="MULTI-CONNECTOR"
          />

          <Badge
            icon={<Truck size={14} />}
            label="RECOVERY PROCUREMENT"
          />

          <Badge
            icon={<ShieldCheck size={14} />}
            label="EXPEDITION SCORING"
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* RESULTS */}
      {/* ==================================================== */}

      <div className="mt-6 space-y-4">

        {results.map((result)=>{

          return (

            <div

              key={`${result.connectorId}-${result.title}`}

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
                    {result.title}
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
                    {result.supplierName}
                    {" • "}
                    {result.procurementClass}
                  </div>

                </div>

                <div
                  className="
                    text-right
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-black
                    "

                    style={{
                      color:
                        tacticalColors.success
                    }}
                  >
                    ${result.estimatedPrice}
                  </div>

                  <div
                    className="
                      mt-1
                      text-xs
                    "

                    style={{
                      color:
                        tacticalColors.textMuted
                    }}
                  >
                    {result.currency}
                  </div>

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

                <Metric
                  label="OPS"
                  value={
                    result.operationalScore
                  }
                />

                <Metric
                  label="RANK"
                  value={
                    result.rankingScore
                  }
                />

                <Metric
                  label="RISK"
                  value={
                    result.riskLevel
                  }
                />

                <Metric
                  label="LOGISTICS"
                  value={
                    result.logisticsEstimate
                  }
                />

              </div>

              {/* ============================================ */}
              {/* AVAILABILITY */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <StatusPill
                  label={
                    result.availability
                  }
                />

                <StatusPill
                  label={
                    result.recommendation
                  }
                />

              </div>

              {/* ============================================ */}
              {/* REASONING */}
              {/* ============================================ */}

              <div className="mt-5">

                <div
                  className="
                    mb-2
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

                  {result.reasoning.map((reason)=>{

                    return (

                      <div

                        key={reason}

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
                        {reason}
                      </div>
                    )
                  })}

                </div>

              </div>

              {/* ============================================ */}
              {/* LINK */}
              {/* ============================================ */}

              {result.listingUrl && (

                <div className="mt-5">

                  <a

                    href={
                      result.listingUrl
                    }

                    target="_blank"

                    rel="noreferrer"

                    className="
                      text-sm
                      font-semibold
                    "

                    style={{
                      color:
                        tacticalColors.accentBlue
                    }}
                  >
                    Open Procurement Source →
                  </a>

                </div>
              )}

            </div>
          )
        })}

      </div>

    </div>
  )
}

// ============================================================
// BADGE
// ============================================================

function Badge({
  icon,
  label
}:{
  icon: React.ReactNode
  label: string
}){

  return (

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

        color:
          tacticalColors.textSecondary
      }}
    >

      {icon}

      {label}

    </div>
  )
}

// ============================================================
// METRIC
// ============================================================

function Metric({
  label,
  value
}:{
  label: string
  value: string | number
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
          tracking-[0.16em]
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
          text-lg
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

// ============================================================
// STATUS PILL
// ============================================================

function StatusPill({
  label
}:{
  label: string
}){

  return (

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
      {label}
    </div>
  )
}