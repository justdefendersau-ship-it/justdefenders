/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\PartResultCard.tsx
 *
 * Timestamp:
 * 20 May 2026 09:45 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Intelligence Result Card
 *
 * IMPORTANT:
 * Full clean replacement with:
 * - Live Repco federation
 * - Tactical supplier rendering
 * - Correct React hierarchy
 * - Stable JSX structure
 * ============================================================
 */

"use client"

import React, {

  useEffect,
  useState

} from "react"

import {
  ShieldCheck,
  Truck,
  Wrench,
  BadgeDollarSign,
  Sparkles
} from "lucide-react"

import TacticalSupplierCard
from "@/components/ui/tactical/TacticalSupplierCard"

import TacticalCard
from "@/components/ui/tactical/TacticalCard"

import {
  tacticalColors
} from "@/styles/tokens"

import type {
  EngineResponse
} from "@/lib/contracts/engineResponse"

import {
  ProcurementProduct
} from "@/types/procurement"

import {
  fetchRepcoProducts
} from "@/lib/federation/fetchRepcoProducts"

// ============================================================
// TYPES
// ============================================================

export interface ReasoningContract {

  rationale?: string[]
}

export interface PartData {

  partNumber: string

  description: string

  keyword: string

  compatibility: string[]

  recommendationRibbon: string

  operationalSummary: {

    bestPrice: string

    fastestDelivery: string

    touringGrade: string

    supplierCount: number
  }
}

export interface PartResultCardProps {

  part: PartData

  selectedTouring?: string

  reasoning?: EngineResponse<ReasoningContract>
}

// ============================================================
// COMPONENT
// ============================================================

export default function PartResultCard({

  part,

  selectedTouring,

  reasoning

}: PartResultCardProps) {

  // ==========================================================
  // LIVE FEDERATION
  // ==========================================================

  const [

    liveRepcoProducts,

    setLiveRepcoProducts

  ] = useState<
    ProcurementProduct[]
  >([])

  useEffect(()=>{

    async function loadFederation(){

      const results =
        await fetchRepcoProducts(

          part.partNumber
          ||
          part.description

        )

      setLiveRepcoProducts(
        results
      )
console.log(
  "LIVE REPCO RESULTS",
  results
)
    }

    loadFederation()

  },[
    part.partNumber,
    part.description
  ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <TacticalCard

      glow

      title={part.description}

      subtitle={`Part Number: ${part.partNumber}`}

      icon={
        <Wrench
          size={20}
          color={tacticalColors.accentBlue}
        />
      }

      action={

        <div
          className="
            rounded-full
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
          "
          style={{

            background:
              "rgba(79,124,255,0.14)",

            color:
              tacticalColors.accentBlue
          }}
        >
          {part.recommendationRibbon}
        </div>
      }
    >

      {/* ================================================= */}
      {/* PROCUREMENT SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* Best Price */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              items-center
              gap-2
            "
          >

            <BadgeDollarSign
              size={15}
              color={tacticalColors.success}
            />

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
              Best Price
            </div>
          </div>

          <div
            className="
              mt-3
              text-2xl
              font-bold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {part.operationalSummary.bestPrice}
          </div>
        </div>

        {/* Delivery */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              items-center
              gap-2
            "
          >

            <Truck
              size={15}
              color={tacticalColors.accentBlue}
            />

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
              Fastest Delivery
            </div>
          </div>

          <div
            className="
              mt-3
              text-2xl
              font-bold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {part.operationalSummary.fastestDelivery}
          </div>
        </div>

        {/* Touring Grade */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              items-center
              gap-2
            "
          >

            <ShieldCheck
              size={15}
              color={tacticalColors.success}
            />

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
              Touring Grade
            </div>
          </div>

          <div
            className="
              mt-3
              text-2xl
              font-bold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {part.operationalSummary.touringGrade}
          </div>
        </div>

        {/* Supplier Count */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              items-center
              gap-2
            "
          >

            <Sparkles
              size={15}
              color={tacticalColors.accentAmber}
            />

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
              Supplier Coverage
            </div>
          </div>

          <div
            className="
              mt-3
              text-2xl
              font-bold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {part.operationalSummary.supplierCount}
          </div>
        </div>

      </div>

      {/* ================================================= */}
      {/* COMPATIBILITY */}
      {/* ================================================= */}

      <div className="mt-8">

        <div
          className="
            mb-4
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
          "
          style={{
            color:
              tacticalColors.textMuted
          }}
        >
          Vehicle Compatibility
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          {part.compatibility.map(

            (
              item: string,
              idx: number
            ) => (

              <div

                key={idx}

                className="
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                "

                style={{

                  background:
                    "rgba(79,124,255,0.14)",

                  color:
                    tacticalColors.accentBlue,

                  border:
                    `1px solid rgba(79,124,255,0.24)`
                }}
              >
                {item}
              </div>
            )
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* TOURING PROFILE */}
      {/* ================================================= */}

      {selectedTouring && (

        <div
          className="
            mt-8
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
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
            "
            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            Active Touring Profile
          </div>

          <div
            className="
              mt-3
              text-lg
              font-semibold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {selectedTouring}
          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* SUPPLIER INTELLIGENCE */}
      {/* ================================================= */}

      <div className="mt-8">

        <div
          className="
            mb-5
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
          "
          style={{
            color:
              tacticalColors.textMuted
          }}
        >
          Procurement Intelligence
        </div>

        <div
          className="
            grid
            gap-5
          "
        >

          {
            liveRepcoProducts.map(
              (
                product,
                index
              ) => (

                <TacticalSupplierCard

                  key={
                    product.sku ||
                    product.title
                  }

                  supplierName={
                    product.supplier
                  }

                  partName={
                    product.title
                  }

price={

  String(

    product.clubPrice
    ??

    ""
  )
}

                  availability={
                    product.inStock

                      ? "In Stock"

                      : "Unavailable"
                  }

                  eta="
                  Live Supplier Feed
                  "

                  location="
                  Federated Supplier
                  "

                  trusted

                  verified

                  riskLevel={

                    product.procurementScore &&
                    product.procurementScore > 35

                      ? "low"

                      : "medium"
                  }

                  fitmentConfidence={

                    product.compatibilityScore
                    ||
                    92
                  }

                  recommendation={

                    product.expeditionReady

                      ?

                      "Operationally suitable for expedition and remote-area deployment."

                      :

                      "Suitable for standard Defender operational procurement."
                  }

                />
              )
            )
          }

        </div>

      </div>

      {/* ================================================= */}
      {/* AI RATIONALE */}
      {/* ================================================= */}

      {!!reasoning?.data?.[0]?.rationale?.length && (

        <div
          className="
            mt-8
            rounded-2xl
            border
            p-5
          "
          style={{

            background:
              "rgba(79,124,255,0.06)",

            borderColor:
              "rgba(79,124,255,0.20)"
          }}
        >

          <div
            className="
              mb-4
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
            "
            style={{
              color:
                tacticalColors.accentBlue
            }}
          >
            AI Operational Rationale
          </div>

          <ul
            className="
              space-y-3
            "
          >

            {reasoning.data[0].rationale.map(

              (
                item: string,
                idx: number
              ) => (

                <li

                  key={idx}

                  className="
                    text-sm
                    leading-relaxed
                  "

                  style={{
                    color:
                      tacticalColors.textSecondary
                  }}
                >
                  • {item}
                </li>
              )
            )}

          </ul>

        </div>
      )}

    </TacticalCard>
  )
}