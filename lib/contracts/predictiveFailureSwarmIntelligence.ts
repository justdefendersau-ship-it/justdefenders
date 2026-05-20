/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/predictiveFailureSwarmIntelligence.ts

   Timestamp:
   13 May 2026 06:15 (Sydney)

   PURPOSE:
   Predictive failure swarm intelligence contract
===================================================== */

export interface PredictiveFailureSwarmIntelligenceContract {

  swarmId:string

  componentFamily:string

  failureState?:

    | "stable"
    | "watch"
    | "escalating"
    | "critical"

  affectedFleetVehicles?:number

  anomalyConfidence?:number

  predictedFailureHours?:number

  survivabilityImpact?:number

  preventativeSuccessProbability?:number

  aiSwarmConfidence?:number

  anomalyThreats?:string[]

  autonomousActions?:string[]

  preventativeRecommendations?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
