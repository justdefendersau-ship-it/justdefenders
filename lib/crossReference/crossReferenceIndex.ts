/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\crossReference\crossReferenceIndex.ts
 *
 * Timestamp:
 * 20 May 2026 11:00 Sydney
 *
 * PURPOSE:
 * Defender Cross-Reference Procurement Intelligence
 *
 * Converts OEM Land Rover part numbers into:
 * - Repco equivalents
 * - Ryco equivalents
 * - Expedition-grade alternatives
 * - Supplier-searchable equivalents
 * ============================================================
 */

export interface CrossReferenceResult {

  oem: string

  equivalents: string[]

  expeditionPreferred?: string[]

  notes?: string[]
}

// ============================================================
// CROSS REFERENCE INDEX
// ============================================================

const CROSS_REFERENCE_INDEX:
  Record<
    string,
    CrossReferenceResult
  > = {

  // ==========================================================
  // OIL FILTERS
  // ==========================================================

  ERR3340: {

    oem:
      "ERR3340",

    equivalents: [

      "ROF15A",
      "ROF15A-S",
      "Z89A",
      "Z9"
    ],

    expeditionPreferred: [

      "Z9",
      "ROF15A-S"
    ],

    notes: [

      "Repco equivalent is ROF15A",

      "ROF15A-S is premium synthetic-blend version",

      "Ryco Z89A is standard cross-reference equivalent",

      "Ryco Z9 is larger capacity expedition-preferred variant",

      "Z9 may contact front differential on some oil cooler configurations"
    ]
  }
}

// ============================================================
// LOOKUP
// ============================================================

export function resolveCrossReference(

  searchTerm: string

): CrossReferenceResult | null {

  const normalized =

    searchTerm
      .trim()
      .toUpperCase()

  return (
    CROSS_REFERENCE_INDEX[
      normalized
    ] || null
  )
}