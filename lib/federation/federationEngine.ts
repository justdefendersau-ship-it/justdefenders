/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\federationEngine.ts
 *
 * Timestamp:
 * 22 May 2026 12:42 Sydney
 *
 * PURPOSE:
 * Live Operational Federation Engine
 *
 * STRATEGY:
 * PASS 31B.2 — Real Federation Aggregation
 *
 * OBJECTIVES:
 * - live supplier federation
 * - query-aware procurement execution
 * - real supplier aggregation
 * - federation telemetry normalization
 * - operational procurement realism
 *
 * ============================================================
 */

import {

  
  NormalizedSupplierProduct

} from "@/lib/procurement/types"

import {

  repcoAdapter

} from "@/lib/federation/suppliers/repco"

import {

  bursonAdapter

} from "@/lib/federation/suppliers/burson"

import {

  lrDirectAdapter

} from "@/lib/federation/suppliers/lrdirect"

export interface FederationEvent {

  supplierId: string

  supplierName: string

  success: boolean

  latencyMs: number

  health:
    | "HEALTHY"
    | "DEGRADED"
    | "OFFLINE"

  timestamp: string
}
// ============================================================
// TYPES
// ============================================================

export interface FederationTelemetry {

  supplierId: string

  supplierName: string

  success: boolean

  latencyMs: number

  health:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  timestamp: string
}

// ============================================================
// SUPPLIERS
// ============================================================

const suppliers:
  any[] = [

    repcoAdapter,

    bursonAdapter,

    lrDirectAdapter
  ]

// ============================================================
// HEALTH
// ============================================================

function determineHealth(

  latency: number

):

  FederationTelemetry["health"]{

  if (

    latency <= 450

  ){

    return "HEALTHY"
  }

  if (

    latency <= 800

  ){

    return "DEGRADED"
  }

  return "OFFLINE"
}

// ============================================================
// FEDERATION EXECUTION
// ============================================================

export async function runFederatedSearch(

  query: string

){

  const federationResults =
    await Promise.all(

      suppliers.map(

        async supplier => {

          const started =
            performance.now()

          try {

            // ==================================================
            // SUPPLIER SEARCH
            // ==================================================

            const results =
              await supplier.search(
                query
              )

            const latency =
              Math.round(

                performance.now() -
                started
              )

            const health =
              determineHealth(
                latency
              )

            // ==================================================
            // TELEMETRY
            // ==================================================

            const telemetry:
              FederationTelemetry = {

              supplierId:
                supplier.supplierId,

              supplierName:
                supplier.supplierName,

              success: true,

              latencyMs:
                latency,

              health,

              timestamp:
                new Date().toISOString()
            }

            console.log(

              "[FEDERATION_EVENT]",

              JSON.stringify(
                telemetry
              )
            )

            // ==================================================
            // NORMALIZATION
            // ==================================================

            return results.map(

              product => ({

                ...product,

                federationHealth:
                  health,

                federationLatency:
                  latency
              })
            )

          } catch (error){

            // ==================================================
            // FAILURE
            // ==================================================

            const telemetry:
              FederationTelemetry = {

              supplierId:
                supplier.supplierId,

              supplierName:
                supplier.supplierName,

              success: false,

              latencyMs: 9999,

              health: "OFFLINE",

              timestamp:
                new Date().toISOString()
            }

            console.error(

              "[FEDERATION_FAILURE]",

              JSON.stringify(
                telemetry
              )
            )

            return []
          }
        }
      )
    )

  // ==========================================================
  // MERGE
  // ==========================================================

  const merged:
    NormalizedSupplierProduct[] =

    federationResults.flat()

  // ==========================================================
  // SORT
  // ==========================================================

  merged.sort(

    (

      a,
      b

    ) =>

      b.procurementScore -
      a.procurementScore
  )

  // ==========================================================
  // RETURN
  // ==========================================================

  return merged
}