/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/operationalDigitalTwin.ts

   Timestamp:
   12 May 2026 02:30 (Sydney)

   PURPOSE:
   Operational digital twin intelligence contract
===================================================== */

export interface OperationalDigitalTwinContract {

  twinId: string

  vehicleModel: string

  expeditionRoute?: string

  operationalState?:

    | "stable"
    | "elevated_load"
    | "degraded"
    | "critical"

  drivetrainHealth?: number

  coolingSystemHealth?: number

  suspensionHealth?: number

  electricalSystemHealth?: number

  environmentalLoad?: number

  predictiveRiskScore?: number

  telemetrySignals?: string[]

  operationalRecommendations?: string[]

  synchronisedAt?: string
}
