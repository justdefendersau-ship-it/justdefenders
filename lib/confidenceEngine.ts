// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\confidenceEngine.ts
// Timestamp: 14 May 2026 16:30 Sydney

/**
 * JustDefenders Confidence Engine
 * --------------------------------
 * Centralised compatibility + supplier confidence scoring.
 *
 * IMPORTANT:
 * - Named exports ONLY
 * - No default exports
 * - Runtime-safe
 * - Federation-safe
 * - Mobile-safe
 */

export interface ConfidenceReason {
  code: string
  message: string
  weight: number
}

export interface ConfidenceInput {

  /**
   * Source metadata
   */
  source?: string

  /**
   * Community intelligence weighting
   */
  communityMentions?: number

  /**
   * Supplier reliability weighting
   */
  supplierReliability?: number

  /**
   * Historical intelligence weighting
   */
  historicalAccuracy?: number

  /**
   * Harvested intelligence confidence
   */
  harvestedConfidence?: number

  /**
   * VIN validation
   */
  vinMatch?: boolean

  /**
   * Exact part validation
   */
  exactPartMatch?: boolean

  /**
   * Trusted supplier weighting
   */
  supplierTrusted?: boolean

  /**
   * Image validation
   */
  imageVerified?: boolean

  /**
   * Stock availability
   */
  stockAvailable?: boolean

  /**
   * Compatibility validation
   */
  compatibilityVerified?: boolean

  /**
   * OEM validation
   */
  oemMatch?: boolean

  /**
   * Historical match validation
   */
  historicalSuccess?: boolean

  /**
   * Regional match validation
   */
  regionalMatch?: boolean

  /**
   * Supplier rating weighting
   */
  supplierRating?: number

  /**
   * Compatibility score weighting
   */
  compatibilityScore?: number
}

export interface ConfidenceResult {
  score: number
  confidence: number
  rating: "LOW" | "MEDIUM" | "HIGH"
  reasons: ConfidenceReason[]
  recommended: boolean
}

const DEFAULT_SUPPLIER_RATING = 3

const DEFAULT_COMPATIBILITY_SCORE = 50

function clamp(
  value: number,
  min: number,
  max: number
): number {

  return Math.max(
    min,
    Math.min(max, value)
  )
}

function normaliseSupplierRating(
  rating?: number
): number {

  const value =
    rating ??
    DEFAULT_SUPPLIER_RATING

  return clamp(
    value,
    0,
    5
  )
}

function normaliseCompatibilityScore(
  score?: number
): number {

  const value =
    score ??
    DEFAULT_COMPATIBILITY_SCORE

  return clamp(
    value,
    0,
    100
  )
}

/**
 * Main confidence scoring engine
 */
export function calculateConfidence(
  input: ConfidenceInput = {}
): ConfidenceResult {

  let score = 0

  const reasons: ConfidenceReason[] = []

  /**
   * Community weighting
   */
  if (
    typeof input.communityMentions === "number"
  ) {

    const communityWeight =
      Math.round(
        input.communityMentions * 10
      )

    score += communityWeight

    reasons.push({
      code: "COMMUNITY_WEIGHTING",
      message:
        `Community weighting from ${input.source ?? "community source"}`,
      weight: communityWeight
    })
  }

  /**
   * Supplier reliability weighting
   */
  if (
    typeof input.supplierReliability === "number"
  ) {

    const supplierReliabilityWeight =
      Math.round(
        input.supplierReliability * 10
      )

    score += supplierReliabilityWeight

    reasons.push({
      code: "SUPPLIER_RELIABILITY",
      message:
        "Supplier reliability weighting applied",
      weight: supplierReliabilityWeight
    })
  }

  /**
   * Historical accuracy weighting
   */
  if (
    typeof input.historicalAccuracy === "number"
  ) {

    const historicalWeight =
      Math.round(
        input.historicalAccuracy * 10
      )

    score += historicalWeight

    reasons.push({
      code: "HISTORICAL_ACCURACY",
      message:
        "Historical intelligence weighting applied",
      weight: historicalWeight
    })
  }

  /**
   * Harvested intelligence weighting
   */
  if (
    typeof input.harvestedConfidence === "number"
  ) {

    const harvestedWeight =
      Math.round(
        input.harvestedConfidence * 10
      )

    score += harvestedWeight

    reasons.push({
      code: "HARVESTED_CONFIDENCE",
      message:
        "Harvested intelligence confidence applied",
      weight: harvestedWeight
    })
  }

  /**
   * VIN validation
   */
  if (input.vinMatch) {

    score += 20

    reasons.push({
      code: "VIN_MATCH",
      message: "VIN compatibility verified",
      weight: 20
    })
  }

  /**
   * Exact part validation
   */
  if (input.exactPartMatch) {

    score += 20

    reasons.push({
      code: "EXACT_PART_MATCH",
      message: "Exact part number match detected",
      weight: 20
    })
  }

  /**
   * Compatibility validation
   */
  if (input.compatibilityVerified) {

    score += 15

    reasons.push({
      code: "COMPATIBILITY_VERIFIED",
      message: "Compatibility validation passed",
      weight: 15
    })
  }

  /**
   * OEM validation
   */
  if (input.oemMatch) {

    score += 10

    reasons.push({
      code: "OEM_MATCH",
      message: "OEM cross-reference matched",
      weight: 10
    })
  }

  /**
   * Supplier trust weighting
   */
  if (input.supplierTrusted) {

    score += 10

    reasons.push({
      code: "TRUSTED_SUPPLIER",
      message: "Supplier trust weighting applied",
      weight: 10
    })
  }

  /**
   * Image validation
   */
  if (input.imageVerified) {

    score += 5

    reasons.push({
      code: "IMAGE_VERIFIED",
      message: "Supplier image verified",
      weight: 5
    })
  }

  /**
   * Stock validation
   */
  if (input.stockAvailable) {

    score += 5

    reasons.push({
      code: "STOCK_AVAILABLE",
      message: "Supplier reports stock available",
      weight: 5
    })
  }

  /**
   * Historical weighting
   */
  if (input.historicalSuccess) {

    score += 5

    reasons.push({
      code: "HISTORICAL_SUCCESS",
      message: "Historical successful matches detected",
      weight: 5
    })
  }

  /**
   * Regional weighting
   */
  if (input.regionalMatch) {

    score += 5

    reasons.push({
      code: "REGIONAL_MATCH",
      message: "Regional compatibility confirmed",
      weight: 5
    })
  }

  /**
   * Supplier rating weighting
   */
  const supplierRating =
    normaliseSupplierRating(
      input.supplierRating
    )

  const supplierWeight =
    Math.round(
      (supplierRating / 5) * 5
    )

  score += supplierWeight

  reasons.push({
    code: "SUPPLIER_RATING",
    message:
      `Supplier rating ${supplierRating}/5`,
    weight: supplierWeight
  })

  /**
   * Compatibility weighting
   */
  const compatibilityScore =
    normaliseCompatibilityScore(
      input.compatibilityScore
    )

  const compatibilityWeight =
    Math.round(
      compatibilityScore * 0.05
    )

  score += compatibilityWeight

  reasons.push({
    code: "COMPATIBILITY_SCORE",
    message:
      `Compatibility score ${compatibilityScore}%`,
    weight: compatibilityWeight
  })

  /**
   * Clamp final score
   */
  score = clamp(
    score,
    0,
    100
  )

  let rating:
    | "LOW"
    | "MEDIUM"
    | "HIGH" = "LOW"

  if (score >= 80) {

    rating = "HIGH"

  } else if (score >= 50) {

    rating = "MEDIUM"
  }

  return {

    score,

    confidence: score,

    rating,

    reasons,

    recommended: score >= 70
  }
}

/**
 * Lightweight label helper
 */
export function getConfidenceLabel(
  score: number
): string {

  const safeScore =
    clamp(score, 0, 100)

  if (safeScore >= 80) {
    return "High Confidence"
  }

  if (safeScore >= 50) {
    return "Medium Confidence"
  }

  return "Low Confidence"
}

/**
 * Lightweight UI helper
 */
export function getConfidenceVariant(
  score: number
): "success" | "warning" | "danger" {

  const safeScore =
    clamp(score, 0, 100)

  if (safeScore >= 80) {
    return "success"
  }

  if (safeScore >= 50) {
    return "warning"
  }

  return "danger"
}