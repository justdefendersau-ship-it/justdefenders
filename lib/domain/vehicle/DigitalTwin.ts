/**
 * ============================================================
 * JustDefendersÂ©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\DigitalTwin.ts
 *
 * Timestamp:
 * 26 June 2026 15:15 Sydney
 *
 * PURPOSE:
 * Canonical Digital Twin aggregate.
 *
 * M3.5.3
 * Sprint 2 â€“ Digital Twin Aggregate
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Aggregates all vehicle domain models into a single
 * canonical Digital Twin.
 *
 * This object represents the authoritative business model
 * for a vehicle throughout the JustDefenders platform.
 *
 * All business modules consume this object rather than
 * individual database entities.
 *
 * ============================================================
 */

import type { VehicleIdentity } from "./VehicleIdentity"
import type { VehicleConfiguration } from "./VehicleConfiguration"
import type { VehicleOperationalState } from "./VehicleOperationalState"
import type { VehicleIntelligence } from "./VehicleIntelligence"

export interface DigitalTwin {

  /**
   * Internal identifier.
   */
  id: string

  /**
   * Vehicle identity.
   */
  identity: VehicleIdentity

  /**
   * Current vehicle configuration.
   */
  configuration: VehicleConfiguration

  /**
   * Current operational state.
   */
  operational: VehicleOperationalState

  /**
   * Derived intelligence.
   */
  intelligence: VehicleIntelligence

  /**
   * Record creation timestamp.
   */
  createdAt: string

  /**
   * Last update timestamp.
   */
  updatedAt: string

  /**
   * Schema version.
   *
   * Allows future migration of the Digital Twin
   * without breaking older records.
   */
  schemaVersion: number

}
