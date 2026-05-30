// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\readinessEngine.ts
//
// Timestamp:
// 27 May 2026 13:10 Sydney
//
// PURPOSE:
// Fleet Operational State Engine.
// ====================================================================

import {

  OperationalState

}
from "./operationalStateModel"

// ====================================================================
// ENGINE
// ====================================================================

export function calculateOperationalState(

  input:any

):OperationalState{

  const overdueServices =
    input.overdueServices || 0

  const activeAlerts =
    input.activeAlerts || 0

  const survivabilityAlerts =
    input.survivabilityAlerts || 0

  const maintenanceEvents =
    input.maintenanceEvents || 0

  // ================================================================
  // READINESS
  // ================================================================

  let operationalReadiness =
    100

  operationalReadiness -=
    overdueServices * 8

  operationalReadiness -=
    activeAlerts * 5

  // ================================================================
  // EXPEDITION
  // ================================================================

  let expeditionReadiness =
    operationalReadiness

  expeditionReadiness -=
    survivabilityAlerts * 10

  // ================================================================
  // SURVIVABILITY
  // ================================================================

  let survivabilityScore =
    100

  survivabilityScore -=
    survivabilityAlerts * 15

  // ================================================================
  // CONFIDENCE
  // ================================================================

  let serviceConfidence =
    100

  if(
    maintenanceEvents < 10
  ){

    serviceConfidence -= 30
  }

  // ================================================================
  // FAILURE EXPOSURE
  // ================================================================

  let failureExposure:
    "LOW" |
    "MEDIUM" |
    "HIGH" =
      "LOW"

  if(
    overdueServices > 3
  ){

    failureExposure =
      "MEDIUM"
  }

  if(
    survivabilityAlerts > 2
  ){

    failureExposure =
      "HIGH"
  }

  // ================================================================
  // MAINTENANCE BURDEN
  // ================================================================

  let maintenanceBurden:
    "LOW" |
    "MEDIUM" |
    "HIGH" =
      "LOW"

  if(
    overdueServices > 2
  ){

    maintenanceBurden =
      "MEDIUM"
  }

  if(
    overdueServices > 5
  ){

    maintenanceBurden =
      "HIGH"
  }

  // ================================================================
  // STATUS
  // ================================================================

  let operationalStatus:
    "GREEN" |
    "AMBER" |
    "RED" =
      "GREEN"

  if(
    operationalReadiness < 75
  ){

    operationalStatus =
      "AMBER"
  }

  if(
    operationalReadiness < 50
  ){

    operationalStatus =
      "RED"
  }

  // ================================================================
  // CLAMP
  // ================================================================

  operationalReadiness =
    Math.max(
      0,
      operationalReadiness
    )

  expeditionReadiness =
    Math.max(
      0,
      expeditionReadiness
    )

  survivabilityScore =
    Math.max(
      0,
      survivabilityScore
    )

  serviceConfidence =
    Math.max(
      0,
      serviceConfidence
    )

  // ================================================================
  // OUTPUT
  // ================================================================

  return {

    vin:
      input.vin,

    timestamp:
      new Date().toISOString(),

    operationalReadiness,

    expeditionReadiness,

    survivabilityScore,

    maintenanceBurden,

    failureExposure,

    serviceConfidence,

    operationalStatus,

    overdueServices,

    activeAlerts,

    telemetryConfidence:
      85,

    maintenanceEvents,

    fuelDataConfidence:
      90,

    survivabilityAlerts
  }
}