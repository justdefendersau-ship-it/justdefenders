/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/compatibilityConfidence.ts

   Timestamp:
   11 May 2026 13:45 (Sydney)

   PURPOSE:
   Compatibility confidence scoring contract
===================================================== */

export interface CompatibilityConfidenceContract {

  partNumber: string

  vehicleModel: string

  route?: string

  compatibilityConfidence: number

  oemConfidence?: number

  touringConfidence?: number

  fitmentWarnings?: string[]

  supportingFactors?: string[]

  operationalRecommendation?:

    | "approved"
    | "recommended"
    | "review"
    | "not_recommended"
}
