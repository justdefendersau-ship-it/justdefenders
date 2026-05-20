/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\operationalProcurementOrchestrator.ts
 *
 * Timestamp:
 * 18 May 2026 01:35 Sydney
 *
 * PURPOSE:
 * Tactical Operational Procurement Orchestrator
 *
 * STRATEGY:
 * Core procurement intelligence orchestration layer
 *
 * RESPONSIBILITIES:
 * - query normalisation
 * - operational classification
 * - supplier federation
 * - regional prioritisation
 * - expedition scoring
 * - procurement ranking
 * - AI procurement reasoning
 *
 * NOTE:
 * This orchestrator intentionally references:
 * - canonical vehicle registry
 * - regional supplier graph
 * - procurement intelligence layers
 *
 * It MUST NOT create duplicate vehicle datasets.
 * ============================================================
 */

import {
  REGIONAL_OPERATIONAL_SUPPLIERS
} from "@/lib/procurement/regionalOperationalSuppliers"

import {
  calculateOperationalProcurementRanking
} from "@/lib/procurement/operationalProcurementRankingEngine"

// ============================================================
// TYPES
// ============================================================

export interface ProcurementSearchRequest {

  query: string

  vehicleId?: string

  country?: string

  expeditionCritical?: boolean

  oemPriority?: boolean

  internationalEnabled?: boolean
}

export interface ProcurementSearchResult {

  supplierId: string

  supplierName: string

  region: string

  country: string

  operationalScore: number

  expeditionScore: number

  procurementConfidence: number

  logisticsScore: number

  rankingScore: number

  riskLevel: string

  recommendation: string

  matchedCategories: string[]

  reasoning: string[]
}

// ============================================================
// QUERY NORMALISATION
// ============================================================

function normaliseQuery(
  query: string
){

  return query
    .trim()
    .toLowerCase()
}

// ============================================================
// CLASSIFICATION
// ============================================================

function classifyOperationalIntent(
  query: string
){

  const q = query.toLowerCase()

  return {

    drivetrain:
      q.includes("td5")
        ? "TD5"
        : q.includes("2.2")
        ? "PUMA_22"
        : q.includes("2.4")
        ? "PUMA_24"
        : q.includes("300tdi")
        ? "300TDI"
        : q.includes("200tdi")
        ? "200TDI"
        : "UNKNOWN",

    expeditionCritical:
      q.includes("cooling")
      || q.includes("hose")
      || q.includes("turbo")
      || q.includes("fuel")
      || q.includes("brake")
      || q.includes("clutch"),

    category:
      q.includes("turbo")
        ? "Forced Induction"
        : q.includes("hose")
        ? "Cooling"
        : q.includes("brake")
        ? "Braking"
        : q.includes("fuel")
        ? "Fuel System"
        : "General"
  }
}

// ============================================================
// SUPPLIER MATCHING
// ============================================================

function buildSupplierResults(
  request: ProcurementSearchRequest
): ProcurementSearchResult[] {

  const query =
    normaliseQuery(
      request.query
    )

  const intelligence =
    classifyOperationalIntent(
      query
    )

  return REGIONAL_OPERATIONAL_SUPPLIERS

    .filter((supplier)=>{

      // ======================================================
      // COUNTRY FILTER
      // ======================================================

      if(
        !request.internationalEnabled
      ){

        if(
          supplier.country !== (
            request.country || "AU"
          )
        ){
          return false
        }
      }

      return true
    })

    .map((supplier)=>{

      // ======================================================
      // BASE SCORES
      // ======================================================

      let operationalScore =
        supplier.operationalPriority

      let expeditionScore =
        supplier.expeditionCapable
          ? 95
          : 65

      let logisticsScore =
        supplier.logisticsScore

      let procurementConfidence =
        supplier.oemPriority

      // ======================================================
      // OEM BOOST
      // ======================================================

      if(
        request.oemPriority
      ){
        procurementConfidence += 6
      }

      // ======================================================
      // EXPEDITION BOOST
      // ======================================================

      if(
        request.expeditionCritical
        || intelligence.expeditionCritical
      ){

        expeditionScore += 4
      }

      // ======================================================
      // CATEGORY MATCHING
      // ======================================================

      const matchedCategories =
        supplier.categories.filter(
          (category)=>{

            return query.includes(
              category.toLowerCase()
            )
          }
        )

      // ======================================================
      // AI RANKING ENGINE
      // ======================================================

      const ranking =
        calculateOperationalProcurementRanking({

          supplierName:
            supplier.name,

          operationalPriority:
            operationalScore,

          expeditionScore,

          logisticsScore,

          procurementConfidence,

          regionalFulfilmentScore:
            supplier.regionalFulfilmentScore,

          expeditionCritical:
            intelligence.expeditionCritical,

          oemPriority:
            request.oemPriority,

          internationalSupplier:
            supplier.country !== (
              request.country || "AU"
            )
        })

      // ======================================================
      // RETURN
      // ======================================================

      return {

        supplierId:
          supplier.id,

        supplierName:
          supplier.name,

        region:
          supplier.region,

        country:
          supplier.country,

        operationalScore,

        expeditionScore,

        procurementConfidence,

        logisticsScore,

        rankingScore:
          ranking.finalScore,

        riskLevel:
          ranking.riskLevel,

        recommendation:
          ranking.recommendation,

        matchedCategories,

        reasoning:
          ranking.reasoning
      }
    })

    // ========================================================
    // SORT
    // ========================================================

    .sort((a,b)=>{

      return (
        b.rankingScore
        -
        a.rankingScore
      )
    })
}

// ============================================================
// ORCHESTRATOR
// ============================================================

export async function orchestrateOperationalProcurement(
  request: ProcurementSearchRequest
){

  // ==========================================================
  // NORMALISE
  // ==========================================================

  const query =
    normaliseQuery(
      request.query
    )

  // ==========================================================
  // BUILD RESULTS
  // ==========================================================

  const suppliers =
    buildSupplierResults({

      ...request,

      query
    })

  // ==========================================================
  // RESPONSE
  // ==========================================================

  return {

    success: true,

    query,

    generatedAt:
      new Date().toISOString(),

    intelligence:
      classifyOperationalIntent(
        query
      ),

    suppliers
  }
}