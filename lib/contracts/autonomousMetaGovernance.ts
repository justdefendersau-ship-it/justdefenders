/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousMetaGovernance.ts

   Timestamp:
   13 May 2026 18:15 (Sydney)

   PURPOSE:
   Autonomous meta-governance contract
===================================================== */

export interface AutonomousMetaGovernanceContract {

  governanceId:string

  governanceDomain:string

  governanceState?:

    | "auditing"
    | "orchestrating"
    | "autonomous"
    | "critical"

  complianceIntegrity?:number

  survivabilityEthicsIndex?:number

  aiGovernanceConsensus?:number

  governanceConfidence?:number

  governanceThreats?:string[]

  autonomousGovernanceActions?:string[]

  orchestrationPatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
