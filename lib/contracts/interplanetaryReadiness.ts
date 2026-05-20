/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/interplanetaryReadiness.ts

   Timestamp:
   13 May 2026 16:00 (Sydney)

   PURPOSE:
   Interplanetary readiness contract
===================================================== */

export interface InterplanetaryReadinessContract {

  readinessId:string

  planetaryZone:string

  readinessState?:

    | "modelling"
    | "adaptive"
    | "autonomous"
    | "critical"

  environmentalComplexity?:number

  survivabilityReadiness?:number

  gravityVariance?:number

  aiMissionConfidence?:number

  environmentalThreats?:string[]

  autonomousPreparations?:string[]

  planetaryPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
