/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/globalExpeditionNeuralIntelligence.ts

   Timestamp:
   12 May 2026 16:00 (Sydney)

   PURPOSE:
   Global expedition neural intelligence contract
===================================================== */

export interface GlobalExpeditionNeuralIntelligenceContract {

  neuralId: string

  expeditionRegion: string

  neuralState?:

    | "learning"
    | "adaptive"
    | "predictive"
    | "autonomous"

  neuralConfidence?: number

  reasoningCorrelationIndex?: number

  operationalLearningIndex?: number

  survivabilityLearningIndex?: number

  logisticsLearningIndex?: number

  telemetryLearningIndex?: number

  neuralThreats?: string[]

  autonomousReasoning?: string[]

  neuralRecommendations?: string[]

  cognitionForecasts?: string[]

  synchronisedAt?: string
}
