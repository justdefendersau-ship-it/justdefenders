/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/globalExpeditionIntelligence.ts

   Timestamp:
   12 May 2026 01:45 (Sydney)

   PURPOSE:
   Global expedition operational intelligence contract
===================================================== */

export interface GlobalExpeditionIntelligenceContract {

  expeditionId: string

  expeditionRegion: string

  expeditionRoute: string

  environmentalRiskLevel?:

    | "low"
    | "moderate"
    | "high"
    | "extreme"

  operationalComplexity?: number

  borderCrossings?: number

  logisticsDifficulty?: number

  supplierCoverageScore?: number

  workshopCoverageScore?: number

  environmentalThreats?: string[]

  operationalRecommendations?: string[]

  requiredExpeditionSystems?: string[]

  calculatedAt?: string
}
