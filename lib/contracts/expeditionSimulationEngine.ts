/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionSimulationEngine.ts

   Timestamp:
   13 May 2026 11:30 (Sydney)

   PURPOSE:
   Expedition simulation engine contract
===================================================== */

export interface ExpeditionSimulationEngineContract {

  simulationId:string

  missionName:string

  simulationState?:

    | "forecasting"
    | "branching"
    | "adaptive"
    | "critical"

  simulationIterations?:number

  survivabilityProbability?:number

  terrainRisk?:number

  weatherComplexity?:number

  aiSimulationConfidence?:number

  simulationEvents?:string[]

  autonomousRecommendations?:string[]

  branchOutcomes?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
