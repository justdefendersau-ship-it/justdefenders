/* ============================================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\parts\PartRelationship.ts
 *
 * Timestamp:
 * 29 June 2026 20:55 Sydney
 *
 * Work Package:
 * WP-001A.3
 *
 * Purpose:
 * Defines canonical relationships between Defender components.
 *
 * Relationships transform individual parts into an interconnected
 * knowledge graph, enabling Operational Intelligence to recommend
 * associated components, procedures and maintenance activities.
 *
 * This model intentionally stores stable relationships only.
 * Dynamic recommendation scores, community confidence and supplier
 * preferences belong within the Operational Intelligence layer.
 *
 * JustDefenders Operational Intelligence Platform
 * ============================================================================
 */

export enum RelationshipType {

  /**
   * Normally replaced together.
   */
  ASSOCIATED = "ASSOCIATED",

  /**
   * Mandatory companion part.
   */
  REQUIRED = "REQUIRED",

  /**
   * Optional but recommended.
   */
  RECOMMENDED = "RECOMMENDED",

  /**
   * Consumable used during installation.
   */
  CONSUMABLE = "CONSUMABLE",

  /**
   * Installation tool.
   */
  REQUIRED_TOOL = "REQUIRED_TOOL",

  /**
   * Supersedes another component.
   */
  SUPERSEDES = "SUPERSEDES",

  /**
   * Superseded by another component.
   */
  SUPERSEDED_BY = "SUPERSEDED_BY",

  /**
   * OEM equivalent.
   */
  OEM_EQUIVALENT = "OEM_EQUIVALENT",

  /**
   * Genuine Land Rover equivalent.
   */
  GENUINE_EQUIVALENT = "GENUINE_EQUIVALENT",

  /**
   * Aftermarket equivalent.
   */
  AFTERMARKET_EQUIVALENT = "AFTERMARKET_EQUIVALENT",

  /**
   * Used within a service kit.
   */
  SERVICE_KIT_MEMBER = "SERVICE_KIT_MEMBER",

  /**
   * Parent assembly.
   */
  PARENT_ASSEMBLY = "PARENT_ASSEMBLY",

  /**
   * Child component.
   */
  CHILD_COMPONENT = "CHILD_COMPONENT",

  /**
   * Related workshop procedure.
   */
  WORKSHOP_PROCEDURE = "WORKSHOP_PROCEDURE"
}

export enum RelationshipStrength {

  /**
   * Always true.
   */
  MANDATORY = "MANDATORY",

  /**
   * Strong recommendation.
   */
  STRONGLY_RECOMMENDED = "STRONGLY_RECOMMENDED",

  /**
   * Situational.
   */
  CONDITIONAL = "CONDITIONAL",

  /**
   * Informational only.
   */
  INFORMATIONAL = "INFORMATIONAL"
}

/**
 * Defines a stable relationship between two canonical entities.
 *
 * Relationships are intentionally generic so they may reference:
 *
 * • Canonical Parts
 * • Workshop Procedures
 * • Tools
 * • Service Kits
 * • Knowledge Articles
 *
 * without changing the core domain model.
 */
export interface PartRelationship {

  /**
   * Immutable relationship identifier.
   */
  id: string

  /**
   * Canonical source object.
   *
   * Normally a Canonical Part ID.
   */
  sourceId: string

  /**
   * Canonical destination object.
   */
  targetId: string

  /**
   * Relationship classification.
   */
  relationshipType: RelationshipType

  /**
   * Relationship importance.
   */
  strength: RelationshipStrength

  /**
   * Indicates whether this relationship is directional.
   *
   * Example:
   *
   * Water Pump
   * →
   * Requires Coolant
   *
   * does not imply
   *
   * Coolant
   * →
   * Requires Water Pump
   */
  directional: boolean

  /**
   * Human-readable explanation.
   */
  description?: string

  /**
   * Engineering notes.
   */
  notes?: string[]

  /**
   * References supporting this relationship.
   *
   * Examples:
   *
   * • Workshop Manual
   * • Parts Catalogue
   * • Engineering Bulletin
   * • Technical Bulletin
   */
  references?: string[]
}