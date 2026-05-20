/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionSingularity.ts

   Timestamp:
   14 May 2026 04:00 (Sydney)

   PURPOSE:
   Expedition singularity contract
===================================================== */

export interface ExpeditionSingularityContract {

  singularityId:string

  singularityDomain:string

  singularityState?:

    | "ascending"
    | "harmonising"
    | "autonomous"
    | "critical"

  singularityDensity?:number

  cognitionSingularity?:number

  transcendenceContinuity?:number

  aiSingularityConfidence?:number

  singularityThreats?:string[]

  autonomousSingularityActions?:string[]

  singularityPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
