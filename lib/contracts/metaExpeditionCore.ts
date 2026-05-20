/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/metaExpeditionCore.ts

   Timestamp:
   14 May 2026 08:30 (Sydney)

   PURPOSE:
   Meta expedition core contract
===================================================== */

export interface MetaExpeditionCoreContract {

  metaId:string

  metaDomain:string

  metaState?:

    | "converging"
    | "harmonising"
    | "autonomous"
    | "critical"

  metaDensity?:number

  cognitionAwareness?:number

  survivabilityMeta?:number

  aiMetaConfidence?:number

  metaThreats?:string[]

  autonomousMetaActions?:string[]

  metaPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
