/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\operationalProcurementRankingEngine.ts
 *
 * Timestamp:
 * 17 May 2026 22:00 Sydney
 *
 * PURPOSE:
 * Operational Procurement Ranking Engine
 *
 * STRATEGY:
 * AI-assisted expedition procurement scoring
 *
 * RESPONSIBILITIES:
 * - operational scoring
 * - OEM prioritisation
 * - expedition survivability
 * - logistics weighting
 * - regional prioritisation
 * - procurement trust analysis
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export interface ProcurementRankingInput {

  supplierName: string

  operationalPriority: number

  expeditionScore: number

  logisticsScore: number

  procurementConfidence: number

  regionalFulfilmentScore?: number

  expeditionCritical?: boolean

  oemPriority?: boolean

  internationalSupplier?: boolean
}

export interface ProcurementRankingResult {

  finalScore: number

  riskLevel:
    | "LOW"
    | "MEDIUM"
    | "HIGH"

  recommendation:
    | "PRIORITY"
    | "APPROVED"
    | "REVIEW"
    | "AVOID"

  reasoning: string[]
}

// ============================================================
// RANKING ENGINE
// ============================================================

export function calculateOperationalProcurementRanking(
  input: ProcurementRankingInput
): ProcurementRankingResult {

  // ==========================================================
  // BASE
  // ==========================================================

  let score = 0

  const reasoning: string[] = []

  // ==========================================================
  // OPERATIONAL PRIORITY
  // ==========================================================

  score += (
    input.operationalPriority * 0.30
  )

  reasoning.push(
    `Operational Priority ${input.operationalPriority}`
  )

  // ==========================================================
  // EXPEDITION SCORE
  // ==========================================================

  score += (
    input.expeditionScore * 0.25
  )

  reasoning.push(
    `Expedition Score ${input.expeditionScore}`
  )

  // ==========================================================
  // LOGISTICS
  // ==========================================================

  score += (
    input.logisticsScore * 0.20
  )

  reasoning.push(
    `Logistics Score ${input.logisticsScore}`
  )

  // ==========================================================
  // OEM CONFIDENCE
  // ==========================================================

  score += (
    input.procurementConfidence * 0.20
  )

  reasoning.push(
    `OEM Confidence ${input.procurementConfidence}`
  )

  // ==========================================================
  // REGIONAL FULFILMENT
  // ==========================================================

  if(
    input.regionalFulfilmentScore
  ){

    score += (
      input.regionalFulfilmentScore * 0.05
    )

    reasoning.push(
      `Regional Fulfilment ${input.regionalFulfilmentScore}`
    )
  }

  // ==========================================================
  // EXPEDITION CRITICAL BOOST
  // ==========================================================

  if(
    input.expeditionCritical
  ){

    score += 4

    reasoning.push(
      "Expedition critical procurement"
    )
  }

  // ==========================================================
  // OEM PRIORITY BOOST
  // ==========================================================

  if(
    input.oemPriority
  ){

    score += 3

    reasoning.push(
      "OEM procurement prioritised"
    )
  }

  // ==========================================================
  // INTERNATIONAL PENALTY
  // ==========================================================

  if(
    input.internationalSupplier
  ){

    score -= 5

    reasoning.push(
      "International logistics penalty"
    )
  }

  // ==========================================================
  // NORMALISE
  // ==========================================================

  const finalScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(score)
    )
  )

  // ==========================================================
  // RISK
  // ==========================================================

  let riskLevel:
    | "LOW"
    | "MEDIUM"
    | "HIGH"

  if(
    finalScore >= 88
  ){

    riskLevel = "LOW"

  } else if(
    finalScore >= 70
  ){

    riskLevel = "MEDIUM"

  } else {

    riskLevel = "HIGH"
  }

  // ==========================================================
  // RECOMMENDATION
  // ==========================================================

  let recommendation:
    | "PRIORITY"
    | "APPROVED"
    | "REVIEW"
    | "AVOID"

  if(
    finalScore >= 92
  ){

    recommendation = "PRIORITY"

  } else if(
    finalScore >= 80
  ){

    recommendation = "APPROVED"

  } else if(
    finalScore >= 65
  ){

    recommendation = "REVIEW"

  } else {

    recommendation = "AVOID"
  }

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    finalScore,

    riskLevel,

    recommendation,

    reasoning
  }
}