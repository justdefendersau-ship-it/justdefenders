/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionMissionControl.ts

   Timestamp:
   12 May 2026 06:15 (Sydney)

   PURPOSE:
   Expedition mission control intelligence contract
===================================================== */

export interface ExpeditionMissionControlContract {

  missionId: string

  missionName: string

  expeditionRoutes?: string[]

  activeVehicles?: number

  activePersonnel?: number

  missionState?:

    | "nominal"
    | "monitoring"
    | "escalated"
    | "critical"

  operationalReadiness?: number

  telemetryIntegrity?: number

  logisticsReadiness?: number

  environmentalSeverity?: number

  activeEscalations?: string[]

  missionRecommendations?: string[]

  commandActions?: string[]

  synchronisedAt?: string
}
