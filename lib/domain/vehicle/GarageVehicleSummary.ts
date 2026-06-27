```typescript
/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\GarageVehicleSummary.ts
 *
 * Timestamp:
 * 26 June 2026 15:30 Sydney
 *
 * PURPOSE:
 * Canonical Garage Vehicle Summary view model.
 *
 * M3.5.3
 * Sprint 2 – Garage View Model
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Lightweight projection of the Digital Twin for use by
 * Garage user interface components.
 *
 * This model intentionally exposes only the information
 * required by the Garage dashboard and should not contain
 * the full Digital Twin.
 *
 * ============================================================
 */

export interface GarageVehicleSummary {

  /**
   * Internal identifier.
   */
  id: string

  /**
   * Vehicle Identification Number.
   */
  vin: string

  /**
   * Friendly display name.
   *
   * Example:
   * Td5 110 1999
   */
  displayName: string

  /**
   * Vehicle model.
   */
  model: string

  /**
   * Production year.
   */
  year: number

  /**
   * Current engine.
   */
  engine: string

  /**
   * Operational status.
   */
  status: string

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
   * Remaining distance until next service.
   */
  nextServiceKm?: number

  /**
   * Estimated fuel range.
   */
  fuelRangeKm?: number

  /**
   * Vehicle health score.
   */
  healthScore: number

  /**
   * Indicates whether this is the currently
   * selected Digital Twin.
   */
  selected: boolean

}
```
