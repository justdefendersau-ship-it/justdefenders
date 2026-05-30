// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\cvil\canonicalVehicleIntelligenceModel.ts
//
// Timestamp:
// 27 May 2026 18:00 Sydney
//
// PURPOSE:
// Canonical Vehicle Intelligence Layer model.
// ====================================================================

export interface CanonicalVehicleIntelligence {

  // ================================================================
  // IDENTITY
  // ================================================================

  vin:string

  timestamp:string

  // ================================================================
  // OPERATIONAL STATE
  // ================================================================

  operationalReadiness:number

  expeditionReadiness:number

  survivabilityScore:number

  operationalStatus:
    "GREEN" |
    "AMBER" |
    "RED"

  // ================================================================
  // PREDICTIVE
  // ================================================================

  forecastRisk:string

  degradationRate:number

  adaptiveRisk:string

  operationalVolatility:string

  // ================================================================
  // MAINTENANCE
  // ================================================================

  overdueServices:number

  maintenanceBurden:string

  maintenanceEvents:number

  // ================================================================
  // SURVIVABILITY
  // ================================================================

  survivabilityAlerts:number

  survivabilityInstability:string

  expeditionEscalation:boolean

  // ================================================================
  // CONFIDENCE
  // ================================================================

  telemetryConfidence:number

  fuelDataConfidence:number

  serviceConfidence:number

  // ================================================================
  // ADVISORIES
  // ================================================================

  advisories:any[]
}