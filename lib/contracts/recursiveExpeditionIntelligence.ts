/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/recursiveExpeditionIntelligence.ts

   Timestamp:
   14 May 2026 10:45 (Sydney)

   PURPOSE:
   Recursive expedition intelligence contract
===================================================== */

export interface RecursiveExpeditionIntelligenceContract {

  recursiveId:string

  recursiveDomain:string

  recursiveState?:

    | "recursive"
    | "harmonising"
    | "autonomous"
    | "critical"

  recursiveDensity?:number

  cognitionRecursive?:number

  survivabilityRecursive?:number

  aiRecursiveConfidence?:number

  recursiveThreats?:string[]

  autonomousRecursiveActions?:string[]

  recursivePatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
