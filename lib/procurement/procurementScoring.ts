/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\procurementScoring.ts
 *
 * Timestamp:
 * 19 May 2026 14:10 Sydney
 *
 * PURPOSE:
 * Procurement Intelligence Scoring
 * ============================================================
 */

import {
  VehicleConfiguration
} from "@/contexts/VehicleConfigurationContext"

export function calculateProcurementScore(
  configuration: VehicleConfiguration
){

  let score = 85

  // ==========================================================
  // AU PRIORITY
  // ==========================================================

  if(
    configuration.market === "Australia"
  ){

    score += 5
  }

  // ==========================================================
  // EXPEDITION
  // ==========================================================

  if(configuration.expedition){

    score += 5
  }

  // ==========================================================
  // ISUZU
  // ==========================================================

  if(

    configuration.currentEngine.includes(
      "4BD1"
    )
  ){

    score += 4
  }

  // ==========================================================
  // MODIFICATIONS
  // ==========================================================

  score -= (
    configuration.modifications.length
  )

  // ==========================================================
  // LIMITS
  // ==========================================================

  if(score > 100){
    score = 100
  }

  if(score < 60){
    score = 60
  }

  return score
}