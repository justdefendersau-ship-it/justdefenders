// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\logic\scoringEngine.ts
// Timestamp: 14 May 2026 22:20 Sydney

export interface VehicleProfile {

  engine?: string

  year?: number

  model?: string
}

export interface SupplierResult {

  supplier: string

  partNumber: string

  price?: number

  confidence?: number

  deliveryDays?: number

  compatibilityScore?: number
}

export interface RankedSupplierResult
  extends SupplierResult {

  finalScore: number
}

export interface ScoreResultsOutput {

  ranked: RankedSupplierResult[]

  best: RankedSupplierResult | null
}

export function scoreResults(
  results: SupplierResult[],
  vehicle: VehicleProfile
): ScoreResultsOutput {

  /**
   * Empty protection
   */
  if (
    !results ||
    results.length === 0
  ) {

    return {

      ranked: [],

      best: null
    }
  }

  const ranked =
    results.map(
      (
        item: SupplierResult
      ): RankedSupplierResult => {

        let finalScore = 0

        /**
         * Confidence weighting
         */
        finalScore +=
          item.confidence ?? 0

        /**
         * Compatibility weighting
         */
        finalScore +=
          item.compatibilityScore ?? 0

        /**
         * Delivery weighting
         */
        if (
          typeof item.deliveryDays ===
          "number"
        ) {

          finalScore +=
            Math.max(
              0,
              20 - item.deliveryDays
            )
        }

        /**
         * Vehicle-aware weighting
         */
        if (
          vehicle.engine &&
          vehicle.model
        ) {

          finalScore += 5
        }

        return {

          ...item,

          finalScore
        }
      }
    )

  ranked.sort(
    (
      a: RankedSupplierResult,
      b: RankedSupplierResult
    ) =>
      b.finalScore - a.finalScore
  )

  return {

    ranked,

    best:
      ranked.length > 0
        ? ranked[0]
        : null
  }
}