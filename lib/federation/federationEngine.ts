/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\federationEngine.ts
 *
 * Timestamp:
 * 22 May 2026 09:18 Sydney
 *
 * PURPOSE:
 * Federation Procurement Engine
 *
 * STRATEGY:
 * PASS 30B — Federation Telemetry Stabilization
 *
 * OBJECTIVES:
 * - normalize federation health scoring
 * - improve telemetry continuity
 * - improve operational diagnostics
 * - stabilize Alpha federation behavior
 * - improve supplier health consistency
 *
 * ============================================================
 */

import {

  NormalizedSupplierProduct,
  SupplierHealth

} from "@/lib/procurement/types"

import {

  RepcoHarvester

} from "@/lib/harvesters/repco"

import {

  BursonHarvester

} from "@/lib/harvesters/burson"

import {

  LRDirectHarvester

} from "@/lib/harvesters/lrdirect"

import {

  PaddockHarvester

} from "@/lib/harvesters/paddock"

import {

  RimmerBrosHarvester

} from "@/lib/harvesters/rimmerbros"

import {

  MRAutomotiveHarvester

} from "@/lib/harvesters/mrautomotive"

import {

  getFederationCache,
  setFederationCache

} from "./federationCache"

import {

  recordFederationEvent

} from "./federationAudit"

// ============================================================
// HARVESTERS
// ============================================================

const harvesters = [

  new RepcoHarvester(),

  new BursonHarvester(),

  new LRDirectHarvester(),

  new PaddockHarvester(),

  new RimmerBrosHarvester(),

  new MRAutomotiveHarvester()
]

// ============================================================
// CONFIG
// ============================================================

const SUPPLIER_TIMEOUT_MS =
  2200

// ============================================================
// HEALTH NORMALIZATION
// ============================================================

function determineFederationHealth(

  latency: number

): SupplierHealth {

  if (latency < 500){

    return "HEALTHY"
  }

  if (latency < 1200){

    return "DEGRADED"
  }

  return "TIMEOUT"
}

// ============================================================
// FEDERATED SEARCH
// ============================================================

export async function runFederatedSearch(

  query: string

): Promise<NormalizedSupplierProduct[]> {

  const cacheKey =
    `federation:${query}`

  const cached =
    getFederationCache<
      NormalizedSupplierProduct[]
    >(cacheKey)

  // ==========================================================
  // CACHE HIT
  // ==========================================================

  if (cached){

    return cached.map(product => ({

      ...product,

      telemetry: {

        ...product.telemetry,

        cacheHit: true
      }
    }))
  }

  // ==========================================================
  // FEDERATION EXECUTION
  // ==========================================================

  const settledResults =
    await Promise.allSettled(

      harvesters.map(

        async harvester => {

          const start =
            Date.now()

          try {

            const results =
              await harvester.withTimeout(

                harvester.search({

                  query
                }),

                SUPPLIER_TIMEOUT_MS
              )

            const latency =
              Date.now() - start

            const health =
              determineFederationHealth(
                latency
              )

            // ==================================================
            // AUDIT EVENT
            // ==================================================

            recordFederationEvent({

              supplierId:
                harvester.supplierId,

              supplierName:
                harvester.supplierName,

              success: true,

              latencyMs:
                latency,

              timestamp:
                new Date().toISOString(),

              health
            })

            // ==================================================
            // NORMALIZED TELEMETRY
            // ==================================================

            return results.map(

              product => ({

                ...product,

                telemetry: {

                  ...product.telemetry,

                  latencyMs:
                    latency,

                  health,

                  cacheHit:
                    false,

                  timeoutTriggered:
                    false,

                  lastSuccessfulFetch:
                    new Date().toISOString()
                }
              })
            )

          } catch (error){

            const latency =
              Date.now() - start

            // ==================================================
            // FAILURE EVENT
            // ==================================================

            recordFederationEvent({

              supplierId:
                harvester.supplierId,

              supplierName:
                harvester.supplierName,

              success: false,

              latencyMs:
                latency,

              timestamp:
                new Date().toISOString(),

              health:
                "TIMEOUT",

              error:
                error instanceof Error
                ?
                error.message
                :
                "UNKNOWN_ERROR"
            })

            return []
          }
        }
      )
    )

  // ==========================================================
  // NORMALIZED PRODUCT COLLECTION
  // ==========================================================

  const products:
  NormalizedSupplierProduct[] = []

  for (const result of settledResults){

    if (

      result.status === "fulfilled"

    ){

      products.push(
        ...result.value
      )
    }
  }

  // ==========================================================
  // PROCUREMENT RANKING
  // ==========================================================

  const ranked =
    products.sort(

      (a, b) =>

        (
          b.procurementScore +
          b.confidenceScore +
          b.fitmentScore +
          b.expeditionScore
        )

        -

        (
          a.procurementScore +
          a.confidenceScore +
          a.fitmentScore +
          a.expeditionScore
        )
    )

  // ==========================================================
  // CACHE STORE
  // ==========================================================

  setFederationCache(

    cacheKey,

    ranked
  )

  return ranked
}