/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/predictiveSurvivalIntelligence.ts

   Timestamp:
   12 May 2026 10:45 (Sydney)

   PURPOSE:
   Predictive survival intelligence contract
===================================================== */

export interface PredictiveSurvivalIntelligenceContract {

  survivalId: string

  expeditionRegion: string

  survivalState?:

    | "stable"
    | "elevated"
    | "critical"
    | "survivability"

  environmentalExposure?: number

  waterSecurity?: number

  thermalRisk?: number

  communicationsResilience?: number

  extractionProbability?: number

  survivabilityWindowHours?: number

  environmentalThreats?: string[]

  survivalRecommendations?: string[]

  emergencyProtocols?: string[]

  aiSurvivalForecast?: string[]

  synchronisedAt?: string
}
