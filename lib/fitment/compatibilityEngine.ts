/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\fitment\compatibilityEngine.ts
 *
 * Timestamp:
 * 19 May 2026 14:10 Sydney
 *
 * PURPOSE:
 * Compatibility Reasoning Engine
 * ============================================================
 */

import {
  VehicleConfiguration
} from "@/contexts/VehicleConfigurationContext"

export function calculateCompatibility(
  configuration: VehicleConfiguration
){

  let score = 100

  // ==========================================================
  // ENGINE SWAP
  // ==========================================================

  if(

    configuration.originalEngine
    !==
    configuration.currentEngine
  ){

    score -= 10
  }

  // ==========================================================
  // MILITARY
  // ==========================================================

  if(configuration.military){

    score -= 5
  }

  // ==========================================================
  // EXPEDITION
  // ==========================================================

  if(configuration.expedition){

    score -= 3
  }

  // ==========================================================
  // MODIFICATIONS
  // ==========================================================

  score -= (
    configuration.modifications.length * 2
  )

  // ==========================================================
  // LOWER BOUND
  // ==========================================================

  if(score < 60){
    score = 60
  }

  return score
}