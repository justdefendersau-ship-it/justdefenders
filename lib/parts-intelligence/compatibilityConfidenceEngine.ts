// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\parts-intelligence\compatibilityConfidenceEngine.ts
// Timestamp: 14 May 2026 15:50 Sydney

import {
  partsKnowledgeSeed
} from "./partsKnowledgeSeed"

export interface CompatibilityPart {
  id?: string

  partNumber: string

  name?: string

  category?: string

  manufacturer?: string

  /**
   * Legacy OEM compatibility
   */
  oem?: boolean

  /**
   * Preferred modern OEM naming
   */
  oemEquivalent?: boolean

  compatibleVehicles?: string[]

  compatibleRoutes?: string[]

  operationalNotes?: string[]

  recommendedUse?: string

  confidence: number
}

export interface CompatibilityConfidenceInput {

  /**
   * Legacy contract support
   */
  partNumber?: string

  /**
   * Legacy contract support
   */
  vehicleModel?: string

  /**
   * Modern contract support
   */
  vehicle?: string

  /**
   * Optional route profile
   */
  route?: string

  /**
   * Direct part injection support
   */
  part?: CompatibilityPart
}

export interface CompatibilityConfidenceResult {
  score: number
  compatible: boolean
  reasons: string[]
  matchedPart?: CompatibilityPart
}

/**
 * Internal scoring engine
 */
function calculateScore(
  part: CompatibilityPart,
  vehicle: string,
  route?: string
): CompatibilityConfidenceResult {

  let score = 0

  const reasons: string[] = []

  /**
   * Vehicle compatibility
   */
  if (
    part.compatibleVehicles?.includes(
      vehicle
    )
  ) {

    score += 0.5

    reasons.push(
      "Vehicle compatibility confirmed"
    )
  }

  /**
   * Route compatibility
   */
  if (
    route &&
    part.compatibleRoutes?.includes(
      route
    )
  ) {

    score += 0.2

    reasons.push(
      "Route suitability confirmed"
    )
  }

  /**
   * OEM weighting
   */
  if (
    part.oem === true ||
    part.oemEquivalent === true
  ) {

    score += 0.05

    reasons.push(
      "OEM equivalent component"
    )
  }

  /**
   * Knowledge confidence weighting
   */
  score += (
    part.confidence / 100
  ) * 0.25

  reasons.push(
    `Knowledge confidence ${part.confidence}%`
  )

  /**
   * Clamp max
   */
  if (score > 1) {
    score = 1
  }

  return {

    score,

    compatible: score >= 0.6,

    reasons,

    matchedPart: part
  }
}

/**
 * Primary evaluator
 */
export function evaluateCompatibilityConfidence(
  input: CompatibilityConfidenceInput
): CompatibilityConfidenceResult {

  const resolvedVehicle =
    input.vehicleModel ??
    input.vehicle ??
    ""

  /**
   * Direct part mode
   */
  if (input.part) {

    return calculateScore(
      input.part,
      resolvedVehicle,
      input.route
    )
  }

  /**
   * Part lookup mode
   */
  const matchedPart =
    partsKnowledgeSeed.find(
      (part) =>
        part.partNumber === input.partNumber
    )

  if (!matchedPart) {

    return {

      score: 0,

      compatible: false,

      reasons: [
        "Part not found in knowledge seed"
      ]
    }
  }

  return calculateScore(
    matchedPart,
    resolvedVehicle,
    input.route
  )
}

/**
 * Modern alias
 */
export function calculateCompatibilityConfidence(
  input: CompatibilityConfidenceInput
): CompatibilityConfidenceResult {

  return evaluateCompatibilityConfidence(
    input
  )
}