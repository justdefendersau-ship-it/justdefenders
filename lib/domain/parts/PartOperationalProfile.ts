/* ============================================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\parts\PartOperationalProfile.ts
 *
 * Timestamp:
 * 29 June 2026 21:20 Sydney
 *
 * Work Package:
 * WP-001A.4
 *
 * Purpose:
 * Defines the canonical operational characteristics of a Defender component.
 *
 * The Operational Profile describes stable engineering and maintenance
 * knowledge about a component. It intentionally excludes dynamic
 * Operational Intelligence generated from evidence, telemetry,
 * community observations or owner history.
 *
 * This model provides the knowledge foundation upon which Operational
 * Intelligence can later calculate recommendations.
 *
 * JustDefenders Operational Intelligence Platform
 * ============================================================================
 */

export enum OperationalCriticality {

    LOW = "LOW",

    MODERATE = "MODERATE",

    HIGH = "HIGH",

    CRITICAL = "CRITICAL"
}

export enum OperationalClassification {

    SAFETY_CRITICAL = "SAFETY_CRITICAL",

    EXPEDITION_CRITICAL = "EXPEDITION_CRITICAL",

    RELIABILITY_CRITICAL = "RELIABILITY_CRITICAL",

    MAINTENANCE_ITEM = "MAINTENANCE_ITEM",

    SERVICE_ITEM = "SERVICE_ITEM",

    CONSUMABLE = "CONSUMABLE",

    ACCESSORY = "ACCESSORY",

    COSMETIC = "COSMETIC"
}

export enum InspectionIntervalType {

    DISTANCE = "DISTANCE",

    TIME = "TIME",

    BOTH = "BOTH",

    CONDITION_BASED = "CONDITION_BASED"
}

export interface InspectionInterval {

    type: InspectionIntervalType

    kilometres?: number

    months?: number

    notes?: string
}

export interface ServiceInterval {

    kilometres?: number

    months?: number

    notes?: string
}

export interface KnownFailureMode {

    name: string

    description: string

    commonSymptoms: string[]

    preventativeActions?: string[]

    references?: string[]
}

export interface OperationalNote {

    title: string

    description: string

    references?: string[]
}

export interface PartOperationalProfile {

    /**
     * Immutable profile identifier.
     */
    id: string

    /**
     * Canonical Part identifier.
     */
    canonicalPartId: string

    /**
     * Operational classifications.
     *
     * A part may belong to multiple classifications.
     */
    classifications: OperationalClassification[]

    /**
     * Overall operational importance.
     */
    operationalCriticality: OperationalCriticality

    /**
     * Should owners consider carrying this part on remote trips?
     */
    recommendedExpeditionSpare: boolean

    /**
     * Recommended inspection interval.
     */
    inspectionInterval?: InspectionInterval

    /**
     * Recommended replacement interval.
     */
    replacementInterval?: ServiceInterval

    /**
     * Typical engineering failure modes.
     */
    knownFailureModes?: KnownFailureMode[]

    /**
     * Operational symptoms commonly observed.
     */
    commonSymptoms?: string[]

    /**
     * Preventative maintenance recommendations.
     */
    preventativeMaintenance?: string[]

    /**
     * Installation considerations.
     */
    installationNotes?: OperationalNote[]

    /**
     * Operational observations.
     *
     * Stable engineering guidance only.
     */
    operationalNotes?: OperationalNote[]

    /**
     * Expedition-specific guidance.
     */
    expeditionNotes?: OperationalNote[]

    /**
     * Workshop references.
     *
     * Examples:
     * - RAVE
     * - Haynes
     * - Land Rover Workshop Manual
     */
    workshopReferences?: string[]

    /**
     * Related Knowledge Register references.
     */
    knowledgeReferences?: string[]

    /**
     * Related Architecture Decision Records.
     */
    architectureReferences?: string[]
}