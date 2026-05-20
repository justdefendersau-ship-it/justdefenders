/* =====================================================
   JustDefenders ©
   File:
   /lib/engines/missionIntelligenceEngine.ts

   Timestamp:
   11 May 2026 15:15 (Sydney)

   PURPOSE:
   AI mission intelligence orchestration
===================================================== */

export interface MissionAssessment {

  missionId:string

  threatLevel:string

  recommendation:string

  escalationScore:number
}

export function assessMissionRisk(
  risk:number,
  activity:number
):MissionAssessment{

  let threatLevel =
  "LOW"

  let recommendation =
  "Continue monitoring."

  let escalationScore =
  risk + activity

  if(
    escalationScore > 120
  ){

    threatLevel =
    "CRITICAL"

    recommendation =
    "Escalate to command immediately."
  }
  else if(
    escalationScore > 80
  ){

    threatLevel =
    "HIGH"

    recommendation =
    "Increase surveillance and telemetry ingestion."
  }

  return {

    missionId:
    crypto.randomUUID(),

    threatLevel,

    recommendation,

    escalationScore
  }
}
