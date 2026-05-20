/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/unifiedSurvivabilityAI.ts

   Timestamp:
   13 May 2026 13:45 (Sydney)

   PURPOSE:
   Unified survivability AI contract
===================================================== */

export interface UnifiedSurvivabilityAIContract {

  aiNodeId:string

  globalSector:string

  cognitionState?:

    | "monitoring"
    | "synthesising"
    | "autonomous"
    | "critical"

  activeThreatVectors?:number

  globalSurvivabilityIndex?:number

  predictiveAccuracy?:number

  aiConsensusConfidence?:number

  detectedThreats?:string[]

  autonomousResponses?:string[]

  cognitionPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
