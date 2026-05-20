/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousExpeditionGovernance.ts

   Timestamp:
   12 May 2026 15:15 (Sydney)

   PURPOSE:
   Autonomous expedition governance intelligence contract
===================================================== */

export interface AutonomousExpeditionGovernanceContract {

  governanceId: string

  expeditionRegion: string

  governanceState?:

    | "stable"
    | "adaptive"
    | "escalated"
    | "autonomous"

  aiGovernanceConfidence?: number

  operationalComplianceIndex?: number

  survivabilityGovernanceIndex?: number

  logisticsGovernanceIndex?: number

  telemetryGovernanceIndex?: number

  policyEscalationProbability?: number

  governanceThreats?: string[]

  governanceActions?: string[]

  policyRecommendations?: string[]

  autonomousForecasts?: string[]

  synchronisedAt?: string
}
