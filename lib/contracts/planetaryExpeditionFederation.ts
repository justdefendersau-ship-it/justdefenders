/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/planetaryExpeditionFederation.ts

   Timestamp:
   13 May 2026 13:00 (Sydney)

   PURPOSE:
   Planetary expedition federation contract
===================================================== */

export interface PlanetaryExpeditionFederationContract {

  federationId:string

  federationRegion:string

  federationState?:

    | "synchronised"
    | "adaptive"
    | "escalating"
    | "critical"

  activeConvoys?:number

  globalTelemetryStreams?:number

  survivabilityIndex?:number

  orbitalCoverage?:number

  aiFederationConfidence?:number

  federationThreats?:string[]

  autonomousActions?:string[]

  orbitalSystems?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
