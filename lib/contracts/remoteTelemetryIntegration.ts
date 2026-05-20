/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/remoteTelemetryIntegration.ts

   Timestamp:
   12 May 2026 07:00 (Sydney)

   PURPOSE:
   Real-time remote telemetry integration contract
===================================================== */

export interface RemoteTelemetryIntegrationContract {

  telemetryId: string

  vehicleModel: string

  expeditionRoute?: string

  telemetryState?:

    | "online"
    | "degraded"
    | "offline"
    | "critical"

  gpsSignalStrength?: number

  satelliteLinkQuality?: number

  engineTelemetryIntegrity?: number

  environmentalTelemetryIntegrity?: number

  drivetrainTelemetryIntegrity?: number

  activeTelemetryAlerts?: string[]

  telemetryRecommendations?: string[]

  synchronisationLatencyMs?: number

  telemetryConfidence?: number

  synchronisedAt?: string
}
