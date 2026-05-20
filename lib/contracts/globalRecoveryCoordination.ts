/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/globalRecoveryCoordination.ts

   Timestamp:
   12 May 2026 07:45 (Sydney)

   PURPOSE:
   Global expedition recovery coordination contract
===================================================== */

export interface GlobalRecoveryCoordinationContract {

  recoveryId: string

  recoveryMissionName: string

  expeditionRegion?: string

  recoveryState?:

    | "standby"
    | "active"
    | "escalated"
    | "critical"

  affectedVehicles?: number

  affectedPersonnel?: number

  recoveryReadiness?: number

  communicationsIntegrity?: number

  environmentalSeverity?: number

  nearestRecoveryDistanceKm?: number

  activeRecoveryThreats?: string[]

  recoveryActions?: string[]

  recoveryRecommendations?: string[]

  synchronisedAt?: string
}
