/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionDigitalTwinUniverse.ts

   Timestamp:
   12 May 2026 14:30 (Sydney)

   PURPOSE:
   Expedition digital twin universe contract
===================================================== */

export interface ExpeditionDigitalTwinUniverseContract {

  twinId: string

  expeditionRegion: string

  twinState?:

    | "mirrored"
    | "adaptive"
    | "predictive"
    | "autonomous"

  operationalMirrorAccuracy?: number

  survivabilitySimulationAccuracy?: number

  logisticsSimulationAccuracy?: number

  telemetrySimulationAccuracy?: number

  behaviouralPredictionAccuracy?: number

  autonomousSimulationConfidence?: number

  simulationThreats?: string[]

  predictiveScenarios?: string[]

  twinRecommendations?: string[]

  neuralTwinForecasts?: string[]

  synchronisedAt?: string
}
