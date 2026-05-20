/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/autonomousFleetIntelligence.ts

   Timestamp:
   12 May 2026 05:30 (Sydney)

   PURPOSE:
   Autonomous fleet intelligence contract
===================================================== */

export interface AutonomousFleetIntelligenceContract {

  fleetIntelligenceId: string

  fleetName: string

  activeVehicles?: number

  expeditionRegion?: string

  autonomyState?:

    | "stable"
    | "coordinating"
    | "escalated"
    | "critical"

  fleetHealthScore?: number

  predictiveRiskIndex?: number

  operationalLoadIndex?: number

  synchronisationConfidence?: number

  fleetTelemetrySignals?: string[]

  autonomousActions?: string[]

  operationalRecommendations?: string[]

  synchronisedAt?: string
}
