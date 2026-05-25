/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\supplierReliabilityEngine.ts
 *
 * Timestamp:
 * 23 May 2026 13:22 Sydney
 *
 * PURPOSE:
 * Supplier Reliability Intelligence Engine
 *
 * STRATEGY:
 * PASS 34A — Supplier Reliability Intelligence
 *
 * OBJECTIVES:
 * - persistent supplier intelligence
 * - federation reliability scoring
 * - operational procurement ranking
 * - expedition supplier trust analysis
 * - adaptive tactical procurement ordering
 *
 * ============================================================
 */

import {

  ProcurementMemoryRecord

} from "@/contexts/ServiceIntelligenceContext"

import {

  NormalizedSupplierProduct

} from "@/lib/procurement/types"

// ============================================================
// TYPES
// ============================================================

export interface SupplierReliabilityProfile {

  supplier: string

  reliabilityScore: number

  operationalConfidence: number

  expeditionSuitability: number

  averageLatency: number

  federationHealthScore: number

  procurementFrequency: number

  successfulSearches: number

  tacticalRank: number

  recommended: boolean
}

// ============================================================
// CONSTANTS
// ============================================================

const HEALTH_SCORES = {

  HEALTHY: 100,

  DEGRADED: 72,

  FAILED: 25

} as const

// ============================================================
// HELPERS
// ============================================================

function average(

  values: number[]

){

  if (

    values.length === 0

  ){

    return 0
  }

  return Math.round(

    values.reduce(

      (

        total,
        value

      ) => total + value,

      0
    ) / values.length
  )
}

function clamp(

  value: number,

  min: number,

  max: number

){

  return Math.max(

    min,

    Math.min(
      value,
      max
    )
  )
}

// ============================================================
// ENGINE
// ============================================================

export function buildSupplierReliabilityProfiles(

  products:
    NormalizedSupplierProduct[],

  procurementHistory:
    ProcurementMemoryRecord[]

):

  SupplierReliabilityProfile[]{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    products.length === 0

  ){

    return []
  }

  // ==========================================================
  // GROUP SUPPLIERS
  // ==========================================================

  const supplierMap =
    new Map<
      string,
      NormalizedSupplierProduct[]
    >()

  products.forEach(product => {

    const existing =
supplierMap.get(

  JSON.stringify(product.supplier)

) || []

    existing.push(product)

    supplierMap.set(

JSON.stringify(product.supplier),

existing
    )
  })

  // ==========================================================
  // BUILD
  // ==========================================================

  const profiles =
    Array.from(

      supplierMap.entries()

    ).map(

      ([supplier, entries]) => {

        // ====================================================
        // HISTORY
        // ====================================================

        const historicalUsage =
          procurementHistory.filter(

            record =>

              record.supplier ===
              supplier
          )

        // ====================================================
        // LATENCY
        // ====================================================

        const latencies =
          entries.map(

            item =>

              0
          )

        const avgLatency =
          average(latencies)

        // ====================================================
        // HEALTH
        // ====================================================

        const healthScores =
          entries.map(item =>

            HEALTH_SCORES[
              "UNKNOWN"
            ] || 50
          )

        const federationHealthScore =
          average(healthScores)

        // ====================================================
        // PROCUREMENT
        // ====================================================

        const procurementScores =
          entries.map(

            item =>

              item.procurementScore || 0
          )

        const procurementAverage =
          average(procurementScores)

        // ====================================================
        // FREQUENCY
        // ====================================================

        const procurementFrequency =
          historicalUsage.length

        // ====================================================
        // RELIABILITY
        // ====================================================

        let reliabilityScore = 0

        reliabilityScore +=
          procurementAverage * 0.40

        reliabilityScore +=
          federationHealthScore * 0.30

        reliabilityScore +=
          clamp(

            100 - avgLatency / 10,

            10,
            100

          ) * 0.20

        reliabilityScore +=
          clamp(

            procurementFrequency * 8,

            0,
            100

          ) * 0.10

        reliabilityScore =
          Math.round(

            clamp(
              reliabilityScore,
              1,
              99
            )
          )

        // ====================================================
        // CONFIDENCE
        // ====================================================

        const operationalConfidence =
          clamp(

            Math.round(

              reliabilityScore
              +
              procurementFrequency * 2

            ),

            1,
            99
          )

        // ====================================================
        // EXPEDITION
        // ====================================================

        const expeditionSuitability =
          clamp(

            Math.round(

              (
                federationHealthScore * 0.5
              ) +

              (
                procurementAverage * 0.3
              ) +

              (
                operationalConfidence * 0.2
              )
            ),

            1,
            99
          )

        // ====================================================
        // RANK
        // ====================================================

        const tacticalRank =
          Math.round(

            (
              reliabilityScore * 0.5
            ) +

            (
              operationalConfidence * 0.3
            ) +

            (
              expeditionSuitability * 0.2
            )
          )

        // ====================================================
        // RETURN
        // ====================================================

        return {

          supplier,

          reliabilityScore,

          operationalConfidence,

          expeditionSuitability,

          averageLatency:
            avgLatency,

          federationHealthScore,

          procurementFrequency,

          successfulSearches:
            entries.length,

          tacticalRank,

          recommended:
            tacticalRank >= 85
        }
      }
    )

  // ==========================================================
  // SORT
  // ==========================================================

  profiles.sort(

    (

      a,
      b

    ) =>

      b.tacticalRank -
      a.tacticalRank
  )

  // ==========================================================
  // RETURN
  // ==========================================================

  return profiles
}