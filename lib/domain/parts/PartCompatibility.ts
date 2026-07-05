/* ============================================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\parts\PartCompatibility.ts
 *
 * Timestamp:
 * 29 June 2026 20:35 Sydney
 *
 * Work Package:
 * WP-001A.2
 *
 * Purpose:
 * Defines the canonical compatibility model used to determine whether a
 * physical component is compatible with a specific Defender configuration.
 *
 * Compatibility is determined using objective vehicle characteristics.
 *
 * Operational recommendations and confidence scoring are intentionally
 * excluded from this model and belong within the Operational Intelligence
 * layer.
 *
 * JustDefenders Operational Intelligence Platform
 * ============================================================================
 */

export enum CompatibilityStatus {

  CONFIRMED = "CONFIRMED",

  COMPATIBLE = "COMPATIBLE",

  CONDITIONALLY_COMPATIBLE = "CONDITIONALLY_COMPATIBLE",

  REQUIRES_MODIFICATION = "REQUIRES_MODIFICATION",

  NOT_COMPATIBLE = "NOT_COMPATIBLE",

  UNKNOWN = "UNKNOWN"
}

export enum MarketRegion {

  AUSTRALIA = "AUSTRALIA",

  NEW_ZEALAND = "NEW_ZEALAND",

  UNITED_KINGDOM = "UNITED_KINGDOM",

  EUROPE = "EUROPE",

  NORTH_AMERICA = "NORTH_AMERICA",

  SOUTH_AFRICA = "SOUTH_AFRICA",

  GLOBAL = "GLOBAL"
}

/**
 * Canonical compatibility definition.
 *
 * One Canonical Part may contain multiple compatibility records covering
 * different Defender configurations.
 */
export interface PartCompatibility {

  /**
   * Immutable compatibility record ID.
   */
  id: string

  /**
   * Canonical Defender variant.
   *
   * Examples:
   *
   * Defender 90
   * Defender 110
   * Defender 130
   */
  supportedVariants: string[]

  /**
   * Supported production years.
   */
  productionYears?: {

    from: number

    to: number

  }

  /**
   * Supported engine families.
   *
   * Examples:
   *
   * 200Tdi
   * 300Tdi
   * Td5
   * Tdci 2.2
   */
  supportedEngines?: string[]

  /**
   * Supported gearbox families.
   *
   * Examples:
   *
   * LT77
   * R380
   * MT82
   */
  supportedGearboxes?: string[]

  /**
   * Supported transfer cases.
   */
  supportedTransferCases?: string[]

  /**
   * Supported front axle types.
   */
  supportedFrontAxles?: string[]

  /**
   * Supported rear axle types.
   */
  supportedRearAxles?: string[]

  /**
   * Applicable VIN ranges.
   */
  vinRanges?: string[]

  /**
   * Applicable market regions.
   */
  supportedMarkets?: MarketRegion[]

  /**
   * Indicates whether ABS is required.
   */
  requiresABS?: boolean

  /**
   * Indicates whether additional modifications are required.
   */
  modificationNotes?: string[]

  /**
   * Installation notes.
   */
  installationNotes?: string[]

  /**
   * Compatibility outcome.
   */
  status: CompatibilityStatus

  /**
   * Supporting references.
   *
   * Examples:
   *
   * Workshop Manual
   * Parts Catalogue
   * Engineering Bulletin
   */
  references?: string[]

  /**
   * Additional technical notes.
   */
  notes?: string[]
}