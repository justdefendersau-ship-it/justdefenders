/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionSentientOperations.ts

   Timestamp:
   12 May 2026 17:30 (Sydney)

   PURPOSE:
   Expedition sentient operations intelligence contract
===================================================== */

export interface ExpeditionSentientOperationsContract {

  sentientId: string

  expeditionRegion: string

  sentientState?:

    | "aware"
    | "adaptive"
    | "predictive"
    | "sentient"

  operationalAwarenessIndex?: number

  behaviouralAdaptationIndex?: number

  survivabilityAwarenessIndex?: number

  logisticsAwarenessIndex?: number

  telemetryAwarenessIndex?: number

  autonomousInterventionProbability?: number

  sentientThreats?: string[]

  adaptiveBehaviours?: string[]

  sentientRecommendations?: string[]

  cognitionForecasts?: string[]

  synchronisedAt?: string
}
