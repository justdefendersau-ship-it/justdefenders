/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/fleetOperational.ts

   Timestamp:
   11 May 2026 19:00 (Sydney)

   PURPOSE:
   Fleet operational intelligence contract
===================================================== */

export interface FleetOperationalContract {

  fleetId: string

  fleetName: string

  vehicles: string[]

  operationalStatus?:

    | "ready"
    | "maintenance_required"
    | "critical"

  expeditionRoutes?: string[]

  readinessScore?: number

  criticalParts?: string[]

  supplierCoverage?: string[]

  workshopCoverage?: string[]

  operationalWarnings?: string[]

  createdAt?: string
}
