/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/unifiedExpeditionNexus.ts

   Timestamp:
   14 May 2026 01:45 (Sydney)

   PURPOSE:
   Unified expedition nexus contract
===================================================== */

export interface UnifiedExpeditionNexusContract {

  nexusId:string

  nexusDomain:string

  nexusState?:

    | "synchronising"
    | "harmonising"
    | "autonomous"
    | "critical"

  federationIntegrity?:number

  cognitionConvergence?:number

  survivabilityContinuity?:number

  aiNexusConfidence?:number

  nexusThreats?:string[]

  autonomousNexusActions?:string[]

  federationPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
