/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousRecoveryPlanning.ts

   Timestamp:
   12 May 2026 08:30 (Sydney)

   PURPOSE:
   Autonomous expedition recovery planning contract
===================================================== */

export interface AutonomousRecoveryPlanningContract {

  recoveryPlanId: string

  expeditionRoute: string

  contingencyLevel?:

    | "standard"
    | "elevated"
    | "critical"
    | "survivability"

  recoveryComplexity?: number

  survivabilityScore?: number

  evacuationProbability?: number

  environmentalSeverity?: number

  nearestSupportDistanceKm?: number

  recoveryAssets?: string[]

  contingencyActions?: string[]

  autonomousRecommendations?: string[]

  predictiveThreats?: string[]

  synchronisedAt?: string
}
