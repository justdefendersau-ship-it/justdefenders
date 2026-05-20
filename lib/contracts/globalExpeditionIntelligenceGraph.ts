/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/globalExpeditionIntelligenceGraph.ts

   Timestamp:
   12 May 2026 13:45 (Sydney)

   PURPOSE:
   Global expedition intelligence graph contract
===================================================== */

export interface GlobalExpeditionIntelligenceGraphContract {

  graphId: string

  expeditionRegion: string

  graphState?:

    | "connected"
    | "adaptive"
    | "escalated"
    | "critical"

  connectedEntities?: number

  operationalDependencies?: number

  survivabilityRelationships?: number

  telemetryRelationships?: number

  logisticsRelationships?: number

  predictiveCorrelationConfidence?: number

  graphThreats?: string[]

  dependencyForecasts?: string[]

  graphRecommendations?: string[]

  neuralRelationships?: string[]

  synchronisedAt?: string
}
