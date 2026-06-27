```typescript
/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\VehicleConfiguration.ts
 *
 * Timestamp:
 * 26 June 2026 14:30 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Configuration domain model.
 *
 * M3.5.3
 * Sprint 1 – Digital Twin Domain Models
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Represents the current physical configuration of a vehicle.
 *
 * Unlike VehicleIdentity, this model changes throughout the
 * lifetime of the vehicle as components are upgraded,
 * replaced or modified.
 *
 * ============================================================
 */

export type DrivetrainType =

  | "4X4"
  | "AWD"
  | "2WD"
  | "UNKNOWN"

export interface VehicleConfiguration {

  /**
   * Current engine fitted.
   *
   * May differ from factory engine.
   */
  currentEngine: string

  /**
   * Current gearbox.
   */
  currentGearbox: string

  /**
   * Transfer case.
   */
  transferCase?: string

  /**
   * Front differential.
   */
  frontDifferential?: string

  /**
   * Rear differential.
   */
  rearDifferential?: string

  /**
   * Drivetrain type.
   */
  drivetrain: DrivetrainType

  /**
   * Suspension description.
   */
  suspension?: string

  /**
   * Wheel specification.
   */
  wheels?: string

  /**
   * Tyre specification.
   */
  tyres?: string

  /**
   * Winch fitted.
   */
  winch?: boolean

  /**
   * Bull bar description.
   */
  bullBar?: string

  /**
   * Roof rack description.
   */
  roofRack?: string

  /**
   * Long range fuel tank.
   */
  longRangeFuelTank?: boolean

  /**
   * Snorkel fitted.
   */
  snorkel?: boolean

  /**
   * Auxiliary battery system.
   */
  dualBatterySystem?: boolean

  /**
   * Accessories currently fitted.
   */
  accessories: string[]

  /**
   * Recorded vehicle modifications.
   */
  modifications: string[]

  /**
   * Free-form engineering notes.
   */
  notes?: string

}
```
