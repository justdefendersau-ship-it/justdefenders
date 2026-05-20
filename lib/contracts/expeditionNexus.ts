/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionNexus.ts

   Timestamp:
   14 May 2026 13:00 (Sydney)

   PURPOSE:
   Expedition nexus contract
===================================================== */

export interface ExpeditionNexusContract {

  nexusId:string

  nexusDomain:string

  nexusState?:

    | "stabilising"
    | "harmonising"
    | "autonomous"
    | "critical"

  nexusDensity?:number

  cognitionNexus?:number

  survivabilityNexus?:number

  aiNexusConfidence?:number

  nexusThreats?:string[]

  autonomousNexusActions?:string[]

  nexusPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
