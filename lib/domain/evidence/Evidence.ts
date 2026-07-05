/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\domain\evidence\Evidence.ts
 *
 * Timestamp:
 * 28 June 2026 Sydney
 *
 * PURPOSE:
 * Canonical Evidence domain model.
 *
 * M3.9.9.1
 * Digital Evidence Platform
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Represents a single piece of evidence associated with one
 * or more platform entities.
 *
 * Evidence is intentionally platform-wide and is not limited
 * to vehicles.
 *
 * ============================================================
 */

import type { EvidenceCategory } from "./EvidenceCategory"
import type { EvidenceType } from "./EvidenceType"


export interface Evidence {

    /**
     * Unique identifier.
     */
    id: string

    /**
     * Human readable title.
     */
    title: string

    /**
     * Evidence category.
     */
    category: EvidenceCategory

    /**
     * Evidence type.
     *
     * Example:
     * PDF
     * IMAGE
     * VIDEO
     * AUDIO
     */
    type: EvidenceType

    /**
     * UTC creation timestamp.
     */
    createdAt: string

    /**
     * Optional description.
     */
    description?: string

}