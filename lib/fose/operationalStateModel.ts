// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\operationalStateModel.ts
//
// Timestamp:
// 27 May 2026 13:10 Sydney
//
// PURPOSE:
// Canonical Fleet Operational State Engine model.
// ====================================================================

export interface OperationalState {

  vin:string

  timestamp:string

  operationalReadiness:number

  expeditionReadiness:number

  survivabilityScore:number

  maintenanceBurden:
    "LOW" |
    "MEDIUM" |
    "HIGH"

  failureExposure:
    "LOW" |
    "MEDIUM" |
    "HIGH"

  serviceConfidence:number

  operationalStatus:
    "GREEN" |
    "AMBER" |
    "RED"

  overdueServices:number

  activeAlerts:number

  telemetryConfidence:number

  maintenanceEvents:number

  fuelDataConfidence:number

  survivabilityAlerts:number
}