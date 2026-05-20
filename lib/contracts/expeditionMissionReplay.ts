/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionMissionReplay.ts

   Timestamp:
   13 May 2026 04:45 (Sydney)

   PURPOSE:
   Expedition mission replay contract
===================================================== */

export interface ExpeditionMissionReplayContract {

  replayId:string

  expeditionName:string

  operationalRegion:string

  replayState?:

    | "archived"
    | "reconstructing"
    | "active"
    | "critical-analysis"

  missionDurationHours?:number

  survivabilityScore?:number

  telemetryEvents?:number

  aiReplayConfidence?:number

  missionThreats?:string[]

  reconstructedEvents?:string[]

  replayInsights?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
