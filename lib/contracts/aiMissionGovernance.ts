/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/aiMissionGovernance.ts

   Timestamp:
   13 May 2026 08:30 (Sydney)

   PURPOSE:
   AI mission governance contract
===================================================== */

export interface AIMissionGovernanceContract {

  governanceId:string

  missionName:string

  governanceState?:

    | "monitoring"
    | "advisory"
    | "intervention"
    | "critical"

  convoyRisk?:number

  survivabilityProbability?:number

  aiAuthorityConfidence?:number

  strategicEscalationLevel?:number

  operationalThreats?:string[]

  autonomousDirectives?:string[]

  governanceActions?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
