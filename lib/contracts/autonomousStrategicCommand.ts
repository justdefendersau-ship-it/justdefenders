/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousStrategicCommand.ts

   Timestamp:
   12 May 2026 13:00 (Sydney)

   PURPOSE:
   Autonomous strategic command intelligence contract
===================================================== */

export interface AutonomousStrategicCommandContract {

  commandId: string

  commandRegion: string

  strategicCommandState?:

    | "synchronised"
    | "adaptive"
    | "escalated"
    | "autonomous"

  aiCommandConfidence?: number

  missionSynchronisationIndex?: number

  operationalGovernanceIndex?: number

  survivabilityAlignmentIndex?: number

  logisticsCoordinationIndex?: number

  strategicThreats?: string[]

  autonomousCommandActions?: string[]

  predictiveGovernanceActions?: string[]

  neuralForecasts?: string[]

  synchronisedAt?: string
}
