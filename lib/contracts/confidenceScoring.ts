/* =====================================================
   JustDefenders ©
   Confidence Scoring Contract
===================================================== */

export interface ConfidenceScoringContract {

  confidence: number

  contributingFactors: {

    factor: string

    weighting: number

    explanation?: string

  }[]

  recommendationStrength?:

    | "strong"
    | "moderate"
    | "weak"

  confidenceSummary?: string
}
