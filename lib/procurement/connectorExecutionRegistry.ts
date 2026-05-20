/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\connectorExecutionRegistry.ts
 *
 * Timestamp:
 * 17 May 2026 23:20 Sydney
 *
 * PURPOSE:
 * Procurement Connector Execution Registry
 *
 * STRATEGY:
 * Central orchestration registry for:
 * - live procurement connectors
 * - supplier ingestion execution
 * - connector routing
 * - federation orchestration
 *
 * NOTE:
 * Validation authorities are intentionally excluded.
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export interface ConnectorExecutionDefinition {

  id: string

  supplierName: string

  executionMode:
    | "scraper"
    | "api"
    | "hybrid"

  procurementClass:
    | "oem"
    | "aftermarket"
    | "marketplace"
    | "recovery"

  active: boolean

  executionPriority: number

  supportsLiveInventory: boolean

  supportsPricing: boolean

  supportsOperationalScoring: boolean

  supportsExpeditionRanking: boolean

  rateLimitPerMinute: number

  cachingEnabled: boolean

  notes: string[]
}

// ============================================================
// CONNECTOR EXECUTION REGISTRY
// ============================================================

export const CONNECTOR_EXECUTION_REGISTRY:
ConnectorExecutionDefinition[] = [

  // ==========================================================
  // REPco
  // ==========================================================

  {
    id: "repco",

    supplierName: "Repco",

    executionMode: "scraper",

    procurementClass: "aftermarket",

    active: true,

    executionPriority: 88,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsOperationalScoring: true,

    supportsExpeditionRanking: true,

    rateLimitPerMinute: 30,

    cachingEnabled: true,

    notes: [
      "Validated ingestion source",
      "Mainstream AU retail",
      "Emergency procurement capable"
    ]
  },

  // ==========================================================
  // SUPERCHEAP AUTO
  // ==========================================================

  {
    id: "supercheap-auto",

    supplierName: "Supercheap Auto",

    executionMode: "scraper",

    procurementClass: "aftermarket",

    active: true,

    executionPriority: 82,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsOperationalScoring: true,

    supportsExpeditionRanking: false,

    rateLimitPerMinute: 30,

    cachingEnabled: true,

    notes: [
      "Consumer retail layer",
      "Emergency procurement capable",
      "Rapid AU availability"
    ]
  },

  // ==========================================================
  // EBAY
  // ==========================================================

  {
    id: "ebay",

    supplierName: "eBay",

    executionMode: "hybrid",

    procurementClass: "recovery",

    active: true,

    executionPriority: 96,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsOperationalScoring: true,

    supportsExpeditionRanking: true,

    rateLimitPerMinute: 20,

    cachingEnabled: true,

    notes: [
      "Recovery procurement layer",
      "Discontinued inventory",
      "Rare Defender components",
      "Hard-to-source operational recovery"
    ]
  }
]