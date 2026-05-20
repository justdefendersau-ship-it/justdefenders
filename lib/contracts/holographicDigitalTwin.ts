/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/holographicDigitalTwin.ts

   Timestamp:
   13 May 2026 09:15 (Sydney)

   PURPOSE:
   Holographic digital twin contract
===================================================== */

export interface HolographicDigitalTwinContract {

  twinId:string

  convoyName:string

  holographicState?:

    | "stable"
    | "interactive"
    | "adaptive"
    | "critical"

  activeVehicles?:number

  telemetryStreams?:number

  terrainComplexity?:number

  thermalStress?:number

  aiTwinConfidence?:number

  holographicEvents?:string[]

  autonomousActions?:string[]

  twinInsights?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
