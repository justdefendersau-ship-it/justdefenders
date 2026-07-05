/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\evidence\EvidenceReference.ts
 *
 * Timestamp:
 * 28 June 2026 Sydney
 *
 * PURPOSE:
 * Canonical Evidence Reference model.
 *
 * M3.9.9.1
 * Digital Evidence Platform
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Associates a single Evidence record with one or more
 * platform entities.
 *
 * This allows the same evidence item to be linked to
 * multiple records without duplication.
 *
 * ============================================================
 */

export interface EvidenceReference {

    /**
     * Referenced entity type.
     *
     * Examples:
     * Vehicle
     * Maintenance
     * Supplier
     * Part
     * Fuel
     */
    entityType: string

    /**
     * Identifier of the referenced entity.
     */
    entityId: string

    /**
     * Optional relationship description.
     *
     * Example:
     * Primary
     * Supporting
     * Warranty
     * Installation
     */
    relationship?: string

}