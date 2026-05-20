/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/fleetConvoyOrchestration.ts

   Timestamp:
   13 May 2026 01:45 (Sydney)

   PURPOSE:
   Fleet convoy orchestration contract
===================================================== */

export interface FleetConvoyOrchestrationContract {

  convoyId:string

  convoyName:string

  operationalRegion:string

  convoyState?:

    | "optimal"
    | "adaptive"
    | "elevated"
    | "critical"

  activeVehicles?:number

  survivabilityIndex?:number

  telemetryIntegrity?:number

  recoveryReadiness?:number

  aiCoordinationConfidence?:number

  convoyThreats?:string[]

  autonomousActions?:string[]

  convoyObjectives?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
