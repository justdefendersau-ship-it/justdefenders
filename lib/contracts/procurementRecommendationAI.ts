/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/procurementRecommendationAI.ts

   Timestamp:
   11 May 2026 22:00 (Sydney)

   PURPOSE:
   Procurement recommendation intelligence contract
===================================================== */

export interface ProcurementRecommendationAIContract {

  recommendationId: string

  vehicleModel: string

  expeditionRoute?: string

  recommendedParts: string[]

  recommendedSupplier?: string

  recommendationReasoning?: string[]

  operationalPriority?:

    | "critical"
    | "recommended"
    | "optional"

  procurementConfidence?: number

  readinessImpact?: number

  estimatedBudget?: number

  recommendationStatus?:

    | "draft"
    | "recommended"
    | "approved"

  generatedAt?: string
}
