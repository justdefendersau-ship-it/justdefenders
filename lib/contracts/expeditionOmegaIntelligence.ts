/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionOmegaIntelligence.ts

   Timestamp:
   14 May 2026 03:15 (Sydney)

   PURPOSE:
   Expedition Omega intelligence contract
===================================================== */

export interface ExpeditionOmegaIntelligenceContract {

  omegaId:string

  omegaDomain:string

  omegaState?:

    | "converging"
    | "harmonising"
    | "autonomous"
    | "critical"

  omegaDensity?:number

  cognitionHarmony?:number

  survivabilityOmega?:number

  aiOmegaConfidence?:number

  omegaThreats?:string[]

  autonomousOmegaActions?:string[]

  omegaPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
