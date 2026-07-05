/* ============================================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\parts\CanonicalPart.ts
 *
 * Timestamp:
 * 29 June 2026 21:45 Sydney
 *
 * Work Package:
 * WP-001A.5
 *
 * Purpose:
 * Defines the Canonical Part aggregate root for the JustDefenders Parts
 * Domain.
 *
 * The Canonical Part represents the single authoritative knowledge record
 * for one physical Defender component.
 *
 * It is intentionally independent of suppliers, pricing, inventory,
 * telemetry and user-specific operational history.
 *
 * Those concerns belong to their respective bounded contexts.
 *
 * Every subsystem references the Canonical Part:
 *
 * • Parts Intelligence
 * • Procurement Intelligence
 * • Supplier Intelligence
 * • Digital Twin
 * • Operational Intelligence
 * • Evidence
 * • Knowledge Acquisition
 * * JustDefenders Operational Intelligence Platform
 * ============================================================================
 */

import type { PartCompatibility } from "./PartCompatibility"
import type { PartIdentifier } from "./PartIdentifier"
import type { PartOperationalProfile } from "./PartOperationalProfile"
import type { PartRelationship } from "./PartRelationship"

/**
 * Lifecycle state of the canonical engineering definition.
 */
export enum PartLifecycleStatus {

    CURRENT = "CURRENT",

    SUPERSEDED = "SUPERSEDED",

    OBSOLETE = "OBSOLETE",

    HISTORICAL = "HISTORICAL"
}

/**
 * Canonical record maturity.
 *
 * Draft
 * ↓
 * Validated
 * ↓
 * Community Validated
 * ↓
 * Archived
 */
export enum CanonicalRecordStatus {

    DRAFT = "DRAFT",

    VALIDATED = "VALIDATED",

    COMMUNITY_VALIDATED = "COMMUNITY_VALIDATED",

    ARCHIVED = "ARCHIVED"
}

/**
 * Canonical metadata common to future domain models.
 */
export interface CanonicalMetadata {

    /**
     * Immutable JustDefenders identifier.
     *
     * Example:
     *
     * PART-000000123
     */
    id: string

    /**
     * Schema version.
     */
    schemaVersion: number

    /**
     * Canonical record version.
     */
    version: number

    /**
     * ISO 8601 timestamp.
     */
    createdAt: string

    /**
     * ISO 8601 timestamp.
     */
    updatedAt: string

    /**
     * Canonical source.
     *
     * Examples:
     *
     * Manual Curation
     * Knowledge Acquisition
     * Migration
     */
    source: string

    /**
     * Canonical validation state.
     */
    status: CanonicalRecordStatus
}

/**
 * Human-readable identity.
 */
export interface CanonicalPartIdentity {

    /**
     * Canonical JustDefenders part number.
     */
    canonicalPartNumber: string

    /**
     * Preferred display name.
     */
    preferredName: string

    /**
     * Optional abbreviated name.
     */
    shortName?: string

    /**
     * Engineering description.
     */
    description: string
}

/**
 * Stable engineering classification.
 */
export interface CanonicalPartClassification {

    /**
     * Vehicle system.
     *
     * Cooling
     * Engine
     * Fuel
     * Brakes
     * Suspension
     */
    vehicleSystem: string

    /**
     * Canonical category.
     */
    category: string

    /**
     * Optional subcategory.
     */
    subcategory?: string

    /**
     * Current engineering lifecycle.
     */
    lifecycle: PartLifecycleStatus
}

/**
 * Stable references.
 *
 * These are references only.
 * Content lives elsewhere.
 */
export interface CanonicalPartReferences {

    workshopManuals?: string[]

    technicalBulletins?: string[]

    knowledgeRegisters?: string[]

    architectureDecisionRecords?: string[]

    knowledgeArticles?: string[]

    mediaReferences?: string[]
}

/**
 * Aggregate Root
 *
 * Everything known about one physical Defender component.
 *
 * Dynamic runtime information intentionally does NOT belong here.
 */
export interface CanonicalPart {

    /**
     * Common metadata.
     */
    metadata: CanonicalMetadata

    /**
     * Human identity.
     */
    identity: CanonicalPartIdentity

    /**
     * Stable engineering classification.
     */
    classification: CanonicalPartClassification

    /**
     * Searchable identifiers.
     */
    identifiers: PartIdentifier[]

    /**
     * Vehicle compatibility.
     */
    compatibility: PartCompatibility[]

    /**
     * Engineering relationships.
     */
    relationships: PartRelationship[]

    /**
     * Stable operational engineering profile.
     */
    operationalProfile: PartOperationalProfile

    /**
     * External references.
     */
    references?: CanonicalPartReferences
}