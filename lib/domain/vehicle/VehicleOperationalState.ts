/**
 * ============================================================
 * JustDefendersÂ©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\VehicleOperationalState.ts
 *
 * Timestamp:
 * 26 June 2026 14:45 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Operational State domain model.
 *
 * M3.5.3
 * Sprint 1 â€“ Digital Twin Domain Models
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Represents the current operational condition of a vehicle.
 *
 * This model contains dynamic values that change throughout the
 * lifetime of the vehicle and are updated through normal use,
 * servicing and operational activities.
 *
 * ============================================================
 */

export type OperationalStatus =

  | "ACTIVE"
  | "IN_SERVICE"
  | "UNDER_REPAIR"
  | "OFFLINE"
  | "ARCHIVED"

export interface VehicleOperationalState {

  /**
   * Current odometer reading (km).
   */
  odometerKm: number

  /**
   * Registration number.
   */
  registration?: string

  /**
   * Registration expiry date.
   */
  registrationExpiry?: string

  /**
   * Current operational status.
   */
  status: OperationalStatus

  /**
   * Operational readiness score.
   */
  readiness: number

  /**
   * Expedition readiness score.
   */
  expeditionReadiness: number

  /**
   * Survivability score.
   */
  survivability: number

  /**
   * Current fuel range (km).
   */
  fuelRangeKm?: number

  /**
   * Estimated distance until next scheduled service.
   */
  nextServiceKm?: number

  /**
   * Date of last completed service.
   */
  lastServiceDate?: string

  /**
   * Date of next scheduled service.
   */
  nextServiceDate?: string

  /**
   * Vehicle last active timestamp.
   */
  lastSeen?: string

  /**
   * Whether the vehicle is currently archived.
   */
  archived: boolean

  /**
   * Operational notes.
   */
  notes?: string

}
