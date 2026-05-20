/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/predictiveLogisticsOptimisation.ts

   Timestamp:
   12 May 2026 04:45 (Sydney)

   PURPOSE:
   Predictive expedition logistics optimisation contract
===================================================== */

export interface PredictiveLogisticsOptimisationContract {

  logisticsId: string

  expeditionRoute: string

  logisticsState?:

    | "stable"
    | "elevated"
    | "strained"
    | "critical"

  fuelReservePercentage?: number

  waterReservePercentage?: number

  foodReservePercentage?: number

  sparePartsCoverage?: number

  communicationsCoverage?: number

  environmentalDifficulty?: number

  projectedResupplyWindowKm?: number

  optimisationRecommendations?: string[]

  escalationTriggers?: string[]

  logisticsConfidence?: number

  synchronisedAt?: string
}
