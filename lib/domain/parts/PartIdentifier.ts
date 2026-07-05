/* ============================================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\parts\PartIdentifier.ts
 *
 * Timestamp:
 * 29 June 2026 20:15 Sydney
 *
 * Work Package:
 * WP-001A.1
 *
 * Purpose:
 * Defines the canonical identifier model for Defender components.
 *
 * A physical Defender component may be referenced by many identifiers over
 * its lifetime. The Part Identifier model preserves those identifiers and
 * enables the "Search Starts Anywhere" philosophy.
 *
 * The model intentionally contains only stable identifier information.
 * Dynamic intelligence, confidence scoring and search analytics belong to
 * the Operational Intelligence layer.
 *
 * JustDefenders Operational Intelligence Platform
 * ============================================================================
 */

export enum PartIdentifierType {
  CANONICAL = "CANONICAL",

  LAND_ROVER = "LAND_ROVER",
  LAND_ROVER_SUPERSEDED = "LAND_ROVER_SUPERSEDED",

  OEM = "OEM",

  AFTERMARKET = "AFTERMARKET",

  SUPPLIER = "SUPPLIER",

  BARCODE = "BARCODE",

  QR_CODE = "QR_CODE",

  VIN_ASSOCIATED = "VIN_ASSOCIATED",

  OCR = "OCR",

  WORKSHOP_TERM = "WORKSHOP_TERM",

  COMMUNITY_TERM = "COMMUNITY_TERM",

  NATURAL_LANGUAGE = "NATURAL_LANGUAGE"
}

export enum IdentifierAuthority {

  JUSTDEFENDERS = "JUSTDEFENDERS",

  LAND_ROVER = "LAND_ROVER",

  OEM_MANUFACTURER = "OEM_MANUFACTURER",

  AFTERMARKET_MANUFACTURER = "AFTERMARKET_MANUFACTURER",

  SUPPLIER = "SUPPLIER",

  COMMUNITY = "COMMUNITY",

  USER = "USER"
}

export enum IdentifierStatus {

  ACTIVE = "ACTIVE",

  SUPERSEDED = "SUPERSEDED",

  DEPRECATED = "DEPRECATED",

  HISTORICAL = "HISTORICAL"
}

/**
 * Canonical metadata describing a single recognised identifier.
 *
 * One physical part may legitimately possess many identifiers originating
 * from different manufacturers, suppliers or community sources.
 */
export interface PartIdentifier {

  /**
   * Immutable identifier record ID.
   */
  id: string

  /**
   * Identifier classification.
   */
  type: PartIdentifierType

  /**
   * Organisation responsible for this identifier.
   */
  authority: IdentifierAuthority

  /**
   * Actual identifier value.
   *
   * Examples:
   *
   * ERR1234
   * STC4382
   * SET37
   * BOSCH0986...
   */
  value: string

  /**
   * Optional manufacturer or supplier name.
   *
   * Examples:
   *
   * Timken
   * Bosch
   * SKF
   * Bearmach
   * Britpart
   */
  organisation?: string

  /**
   * Human readable description.
   */
  description?: string

  /**
   * Current lifecycle state.
   */
  status: IdentifierStatus

  /**
   * Indicates whether this identifier is the preferred identifier for
   * its authority.
   */
  preferred?: boolean

  /**
   * Indicates that this identifier remains searchable but should redirect
   * to another preferred identifier.
   */
  supersededBy?: string

  /**
   * Free-form aliases recognised by search.
   *
   * Examples:
   *
   * "front hub bearing"
   * "wheel bearing"
   * "outer bearing"
   */
  aliases?: string[]

  /**
   * Additional notes for future knowledge acquisition.
   */
  notes?: string[]

  /**
   * Date first introduced into the canonical knowledge base.
   */
  introducedAt?: string

  /**
   * Date this identifier was retired (if applicable).
   */
  retiredAt?: string
}