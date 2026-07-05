/* ============================================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\parts\CanonicalPartFactory.ts
 *
 * Created:
 * 29 June 2026
 *
 * Purpose:
 * Creates fully validated CanonicalPart aggregate roots used throughout
 * the JustDefenders Operational Intelligence Platform.
 *
 * Work Package:
 * WP-002A
 *
 * Author:
 * OpenAI GPT-5.5
 *
 * ============================================================================
 */
import {
    CanonicalPart,
    CanonicalPartClassification,
    CanonicalPartIdentity,
    CanonicalMetadata,
    CanonicalPartReferences,
    CanonicalRecordStatus,
    PartLifecycleStatus
} from "./CanonicalPart"

import {
    IdentifierAuthority,
    IdentifierStatus,
    PartIdentifier,
    PartIdentifierType
} from "./PartIdentifier"

import {
    CompatibilityStatus,
    MarketRegion,
    PartCompatibility
} from "./PartCompatibility"

import {
    PartRelationship,
    RelationshipStrength,
    RelationshipType
} from "./PartRelationship"

import {
    OperationalClassification,
    OperationalCriticality,
    PartOperationalProfile
} from "./PartOperationalProfile"

/**
 * Generates ISO-8601 timestamps.
 */
function now(): string {

    return new Date().toISOString()

}

/**
 * Generates deterministic IDs during Alpha.
 *
 * NOTE:
 * These will later be replaced by the Canonical
 * Identifier Service.
 */
function createId(
    prefix: string,
    value: string
): string {

    return `${prefix}-${value}`

}

export class CanonicalPartFactory {

    /**
     * Creates canonical metadata.
     */
    public static createMetadata(
        id: string,
        status: CanonicalRecordStatus = CanonicalRecordStatus.VALIDATED,
        source = "Manual Curation"
    ): CanonicalMetadata {

        const timestamp = now()

        return {
            id,
            schemaVersion: 1,
            version: 1,
            createdAt: timestamp,
            updatedAt: timestamp,
            source,
            status
        }

    }

    /**
     * Creates the human-readable identity.
     */
    public static createIdentity(
        canonicalPartNumber: string,
        preferredName: string,
        description: string,
        shortName?: string
    ): CanonicalPartIdentity {

        return {
            canonicalPartNumber,
            preferredName,
            description,
            shortName
        }

    }

    /**
     * Creates engineering classification.
     */
    public static createClassification(
        vehicleSystem: string,
        category: string,
        lifecycle: PartLifecycleStatus = PartLifecycleStatus.CURRENT,
        subcategory?: string
    ): CanonicalPartClassification {

        return {
            vehicleSystem,
            category,
            subcategory,
            lifecycle
        }

    }

    /**
     * Creates a searchable identifier.
     */
    public static createIdentifier(

        authority: IdentifierAuthority,

        type: PartIdentifierType,

        value: string,

        status: IdentifierStatus = IdentifierStatus.ACTIVE

    ): PartIdentifier {

        return {

    id: createId("PID", value),

    authority,

    type,

    value,

    status

}

    }

}