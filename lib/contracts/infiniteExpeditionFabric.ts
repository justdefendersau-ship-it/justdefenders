/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/infiniteExpeditionFabric.ts

   Timestamp:
   13 May 2026 22:00 (Sydney)

   PURPOSE:
   Infinite expedition fabric contract
===================================================== */

export interface InfiniteExpeditionFabricContract {

  fabricId:string

  fabricDomain:string

  fabricState?:

    | "streaming"
    | "harmonising"
    | "autonomous"
    | "critical"

  persistentStreams?:number

  cognitionHarmony?:number

  survivabilityContinuity?:number

  aiFabricConfidence?:number

  fabricThreats?:string[]

  autonomousFabricActions?:string[]

  harmonicPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
