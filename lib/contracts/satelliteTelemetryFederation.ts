/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/satelliteTelemetryFederation.ts

   Timestamp:
   13 May 2026 03:15 (Sydney)

   PURPOSE:
   Satellite telemetry federation contract
===================================================== */

export interface SatelliteTelemetryFederationContract {

  federationId:string

  satelliteProvider:string

  orbitClass:string

  federationState?:

    | "optimal"
    | "adaptive"
    | "degraded"
    | "critical"

  signalIntegrity?:number

  orbitalLatencyMs?:number

  terrainVisibility?:number

  survivabilityRouting?:number

  aiFailoverConfidence?:number

  telemetryThreats?:string[]

  autonomousActions?:string[]

  orbitalForecasts?:string[]

  synchronisedAt?:string
}
