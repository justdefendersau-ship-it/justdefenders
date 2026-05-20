// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\unifiedVehicleIntelligence.ts
// Timestamp: 14 May 2026 23:40 Sydney

import {
  generatePredictiveInsights,
  DefenderGeneration,
  PredictiveOwnershipInsight
} from "./predictiveOwnership"

import {
  calculateConfidence
} from "./confidenceEngine"

export interface UnifiedVehicleIntelligenceInput {

  vehicle: string

  mileage: number
}

export interface UnifiedVehicleIntelligenceOutput {

  vehicle: string

  mileage: number

  generation: DefenderGeneration

  predictiveInsights:
    PredictiveOwnershipInsight[]

  confidence: number
}

function resolveGeneration(
  vehicle: string
): DefenderGeneration {

  const normalized =
    vehicle.toLowerCase()

  if (
    normalized.includes("td5")
  ) {

    return "TD5"
  }

  if (
    normalized.includes("300tdi")
  ) {

    return "300Tdi"
  }

  return "Puma"
}

export function orchestrateVehicleIntelligence(
  vehicle: string,
  mileage: number,
  _serviceHistory: unknown[] = []
): UnifiedVehicleIntelligenceOutput {

  const generation =
    resolveGeneration(vehicle)

  const predictiveInsights =
    generatePredictiveInsights({

      generation,

      currentKm: mileage
    })

  const confidenceRaw =
    calculateConfidence({

      communityMentions: 0.81,

      historicalAccuracy: 0.84
    })

  /**
   * Force numeric compatibility
   */
  const confidence =
    typeof confidenceRaw === "number"
      ? confidenceRaw
      : Number(
          (
            confidenceRaw as {
              confidence?: number
              score?: number
              overall?: number
            }
          ).confidence ??
          (
            confidenceRaw as {
              score?: number
            }
          ).score ??
          (
            confidenceRaw as {
              overall?: number
            }
          ).overall ??
          0
        )

  return {

    vehicle,

    mileage,

    generation,

    predictiveInsights,

    confidence
  }
}

export function buildUnifiedVehicleIntelligence(
  input: UnifiedVehicleIntelligenceInput
): UnifiedVehicleIntelligenceOutput {

  return orchestrateVehicleIntelligence(

    input.vehicle,

    input.mileage,

    []
  )
}