/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\vehicle\VehicleIdentity.ts
 *
 * Timestamp:
 * 26 June 2026 14:15 Sydney
 *
 * PURPOSE:
 * Canonical Vehicle Identity domain model.
 *
 * M3.5.3
 * Sprint 1 – Digital Twin Domain Models
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Establishes the immutable identity of a vehicle.
 *
 * This model represents the factory-built identity of the
 * vehicle and should remain stable throughout the lifetime
 * of the Digital Twin.
 *
 * Configuration changes (engine swaps, gearbox changes,
 * suspension upgrades etc.) are intentionally excluded and
 * belong within VehicleConfiguration.
 *
 * ============================================================
 */

export type VehicleStatus =

  | "ACTIVE"
  | "ARCHIVED"
  | "SOLD"
  | "UNKNOWN"

export type VehicleMarket =

  | "AU"
  | "NZ"
  | "UK"
  | "EU"
  | "NA"
  | "ROW"

export type VehicleBodyStyle =

  | "NINETY"
  | "ONE_TEN"
  | "ONE_THIRTY"
  | "DEFENDER"

export interface VehicleIdentity {

  /**
   * Internal database identifier.
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
   * Factory model designation.
   *
   * Examples:
   * One Ten
   * Ninety
   * Defender 110
   */
  model: string

  /**
   * Factory production year.
   */
  year?: number

  /**
   * Factory body style.
   */
  bodyStyle: VehicleBodyStyle

  /**
   * Original factory engine.
   *
   * This NEVER changes.
   */
  factoryEngine: string

  /**
   * Original factory gearbox.
   */
  factoryGearbox: string

  /**
   * Market originally supplied to.
   */
  market: VehicleMarket

  /**
   * Factory build date.
   */
  buildDate?: string

  /**
   * Registration country.
   */
  country?: string

  /**
   * Current operational status.
   */
  status: VehicleStatus

}