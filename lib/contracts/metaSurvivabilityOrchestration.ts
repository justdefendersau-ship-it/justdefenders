/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/metaSurvivabilityOrchestration.ts

   Timestamp:
   14 May 2026 01:00 (Sydney)

   PURPOSE:
   Meta survivability orchestration contract
===================================================== */

export interface MetaSurvivabilityOrchestrationContract {

  orchestrationId:string

  orchestrationDomain:string

  orchestrationState?:

    | "balancing"
    | "harmonising"
    | "autonomous"
    | "critical"

  orchestrationDensity?:number

  resilienceHarmony?:number

  survivabilityContinuity?:number

  aiOrchestrationConfidence?:number

  orchestrationThreats?:string[]

  autonomousOrchestrationActions?:string[]

  orchestrationPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
