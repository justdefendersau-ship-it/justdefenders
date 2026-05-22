/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\oem\procurementScoring.ts
 *
 * Timestamp:
 * 21 May 2026 22:08 Sydney
 *
 * PURPOSE:
 * Procurement Intelligence Scoring
 *
 * STRATEGY:
 * PASS 27C — OEM Cross-Reference Intelligence
 *
 * ============================================================
 */

interface ProcurementScoringInput {

  fitmentScore: number

  confidenceScore: number

  expeditionScore: number

  supplierVerified: boolean

  stockLevel?: number
}

export function calculateProcurementScore(

  input: ProcurementScoringInput

){

  let score = 0

  score += input.fitmentScore * 0.35

  score += input.confidenceScore * 0.30

  score += input.expeditionScore * 0.20

  if (

    input.supplierVerified

  ){

    score += 10
  }

  if (

    input.stockLevel &&
    input.stockLevel > 5

  ){

    score += 5
  }

  return Math.round(score)
}