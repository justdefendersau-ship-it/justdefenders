/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionIncidentResponse.ts

   Timestamp:
   12 May 2026 10:00 (Sydney)

   PURPOSE:
   Expedition incident response intelligence contract
===================================================== */

export interface ExpeditionIncidentResponseContract {

  incidentId: string

  incidentName: string

  expeditionRoute?: string

  incidentSeverity?:

    | "minor"
    | "major"
    | "critical"
    | "catastrophic"

  affectedVehicles?: number

  affectedPersonnel?: number

  survivabilityIndex?: number

  responseReadiness?: number

  communicationsIntegrity?: number

  evacuationComplexity?: number

  activeIncidentThreats?: string[]

  emergencyActions?: string[]

  responseRecommendations?: string[]

  commandEscalations?: string[]

  synchronisedAt?: string
}
