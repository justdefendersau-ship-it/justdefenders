/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/infiniteSurvivabilityLoop.ts

   Timestamp:
   13 May 2026 19:45 (Sydney)

   PURPOSE:
   Infinite survivability loop contract
===================================================== */

export interface InfiniteSurvivabilityLoopContract {

  loopId:string

  survivabilityDomain:string

  loopState?:

    | "cycling"
    | "reinforcing"
    | "autonomous"
    | "critical"

  optimisationCycles?:number

  adaptiveLearningRate?:number

  survivabilityContinuity?:number

  aiLoopConfidence?:number

  loopThreats?:string[]

  autonomousLoopActions?:string[]

  reinforcementPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
