/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\supplierPerformancePersistence.ts
 *
 * Timestamp:
 * 23 May 2026 14:02 Sydney
 *
 * PURPOSE:
 * Supplier Performance Persistence Engine
 *
 * STRATEGY:
 * PASS 34A.2 — Supplier Performance Persistence
 *
 * OBJECTIVES:
 * - persistent supplier intelligence
 * - operational procurement learning
 * - federation telemetry persistence
 * - tactical supplier memory
 * - expedition procurement adaptation
 *
 * ============================================================
 */

"use client"

import {

  SupplierReliabilityProfile

} from "@/lib/intelligence/supplierReliabilityEngine"

// ============================================================
// TYPES
// ============================================================

export interface PersistentSupplierPerformance {

  supplier: string

  reliabilityScore: number

  operationalConfidence: number

  expeditionSuitability: number

  federationHealthScore: number

  averageLatency: number

  procurementFrequency: number

  successfulSearches: number

  tacticalRank: number

  recommended: boolean

  totalSessions: number

  lastUpdated: string
}

// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY =
  "justdefenders_supplier_performance"

// ============================================================
// LOAD
// ============================================================

export function loadSupplierPerformance():

  PersistentSupplierPerformance[]{

  try {

    const raw =
      localStorage.getItem(
        STORAGE_KEY
      )

    if (

      !raw

    ){

      return []
    }

    const parsed =
      JSON.parse(raw)

    if (

      !Array.isArray(parsed)

    ){

      return []
    }

    return parsed

  } catch (

    exception

  ){

    console.error(
      exception
    )

    return []
  }
}

// ============================================================
// SAVE
// ============================================================

export function saveSupplierPerformance(

  profiles:
    SupplierReliabilityProfile[]

){

  try {

    // ========================================================
    // EXISTING
    // ========================================================

    const existing =
      loadSupplierPerformance()

    const existingMap =
      new Map(

        existing.map(

          item => [

            item.supplier,

            item
          ]
        )
      )

    // ========================================================
    // MERGE
    // ========================================================

    const merged:
      PersistentSupplierPerformance[] =

      profiles.map(profile => {

        const historical =
          existingMap.get(
            profile.supplier
          )

        // ====================================================
        // NEW
        // ====================================================

        if (

          !historical

        ){

          return {

            supplier:
              profile.supplier,

            reliabilityScore:
              profile.reliabilityScore,

            operationalConfidence:
              profile.operationalConfidence,

            expeditionSuitability:
              profile.expeditionSuitability,

            federationHealthScore:
              profile.federationHealthScore,

            averageLatency:
              profile.averageLatency,

            procurementFrequency:
              profile.procurementFrequency,

            successfulSearches:
              profile.successfulSearches,

            tacticalRank:
              profile.tacticalRank,

            recommended:
              profile.recommended,

            totalSessions: 1,

            lastUpdated:
              new Date().toISOString()
          }
        }

        // ====================================================
        // AVERAGING
        // ====================================================

        const sessions =
          historical?.totalSessions || 0 + 1

        function smooth(

          previous: number,

          current: number

        ){

return Math.round(

  (previous * (historical?.totalSessions || 0)) + current

)
        }

        // ====================================================
        // RETURN
        // ====================================================

        return {

          supplier:
            profile.supplier,

          reliabilityScore:
            smooth(

              historical.reliabilityScore,

              profile.reliabilityScore
            ),

          operationalConfidence:
            smooth(

              historical.operationalConfidence,

              profile.operationalConfidence
            ),

          expeditionSuitability:
            smooth(

              historical.expeditionSuitability,

              profile.expeditionSuitability
            ),

          federationHealthScore:
            smooth(

              historical.federationHealthScore,

              profile.federationHealthScore
            ),

          averageLatency:
            smooth(

              historical.averageLatency,

              profile.averageLatency
            ),

          procurementFrequency:

            historical.procurementFrequency
            +
            profile.procurementFrequency,

          successfulSearches:

            historical.successfulSearches
            +
            profile.successfulSearches,

          tacticalRank:
            smooth(

              historical.tacticalRank,

              profile.tacticalRank
            ),

          recommended:
            profile.recommended,

          totalSessions:
            sessions,

          lastUpdated:
            new Date().toISOString()
        }
      })

    // ========================================================
    // SORT
    // ========================================================

    merged.sort(

      (

        a,
        b

      ) =>

        b.tacticalRank -
        a.tacticalRank
    )

    // ========================================================
    // SAVE
    // ========================================================

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(merged)
    )

  } catch (

    exception

  ){

    console.error(
      exception
    )
  }
}