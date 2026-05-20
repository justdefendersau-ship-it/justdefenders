// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\types\garage.ts
// Timestamp: 15 May 2026 16:05 Sydney
// ====================================================================

export interface GarageVehicle {

  id: string

  make: string

  model: string

  year: number

  vin?: string

  operationalStatus:
    | "healthy"
    | "warning"
    | "critical"

  expeditionReady: boolean

  reliabilityScore: number
}

export interface GarageDashboardResponse {

  operationalVehicles:
    GarageVehicle[]

  totalVehicles: number

  totalMaintenanceRecords: number

  expeditionReadyVehicles: number
}