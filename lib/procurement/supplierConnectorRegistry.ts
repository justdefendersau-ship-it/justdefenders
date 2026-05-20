/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\supplierConnectorRegistry.ts
 *
 * Timestamp:
 * 17 May 2026 22:35 Sydney
 *
 * PURPOSE:
 * Supplier Connector Registry
 *
 * STRATEGY:
 * Live procurement ingestion architecture
 *
 * IMPORTANT:
 * Validation systems like:
 * - LR Workshop
 * - TOPIx
 * - Microcat
 *
 * are NOT supplier connectors.
 *
 * They belong to:
 * validation + canonical intelligence layers.
 * ============================================================
 */

export interface SupplierConnector {

  id: string

  supplierName: string

  country: string

  region: string

  connectorType:
    | "scraper"
    | "api"
    | "hybrid"

  active: boolean

  procurementEnabled: boolean

  validationAuthority: boolean

  ingestionPriority: number

  logisticsPriority: number

  expeditionPriority: number

  supportsLiveInventory: boolean

  supportsPricing: boolean

  supportsShippingEstimates: boolean

  supportsPartSearch: boolean

  notes: string[]
}

// ============================================================
// SUPPLIER CONNECTOR REGISTRY
// ============================================================

export const SUPPLIER_CONNECTOR_REGISTRY:
SupplierConnector[] = [

  // ==========================================================
  // AUSTRALIA
  // ==========================================================

  {
    id: "british-offroad",

    supplierName:
      "British Off Road",

    country: "AU",

    region: "QLD",

    connectorType:
      "scraper",

    active: true,

    procurementEnabled: true,

    validationAuthority: false,

    ingestionPriority: 98,

    logisticsPriority: 94,

    expeditionPriority: 98,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsShippingEstimates: false,

    supportsPartSearch: true,

    notes: [
      "High expedition relevance",
      "Strong Defender focus",
      "AU operational priority"
    ]
  },

  {
    id: "mr-automotive",

    supplierName:
      "M.R. Automotive",

    country: "AU",

    region: "QLD",

    connectorType:
      "scraper",

    active: true,

    procurementEnabled: true,

    validationAuthority: false,

    ingestionPriority: 100,

    logisticsPriority: 97,

    expeditionPriority: 99,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsShippingEstimates: true,

    supportsPartSearch: true,

    notes: [
      "Critical Puma/TDCi supplier",
      "High operational trust",
      "Expedition capable"
    ]
  },

  {
    id: "allfourx4",

    supplierName:
      "All Four x 4 Spares",

    country: "AU",

    region: "NSW",

    connectorType:
      "scraper",

    active: true,

    procurementEnabled: true,

    validationAuthority: false,

    ingestionPriority: 95,

    logisticsPriority: 92,

    expeditionPriority: 94,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsShippingEstimates: false,

    supportsPartSearch: true,

    notes: [
      "Strong used parts inventory",
      "Operational Defender coverage"
    ]
  },

  {
    id: "rovacraft",

    supplierName:
      "Rovacraft",

    country: "AU",

    region: "National",

    connectorType:
      "hybrid",

    active: true,

    procurementEnabled: true,

    validationAuthority: false,

    ingestionPriority: 96,

    logisticsPriority: 96,

    expeditionPriority: 91,

    supportsLiveInventory: true,

    supportsPricing: true,

    supportsShippingEstimates: true,

    supportsPartSearch: true,

    notes: [
      "National distribution",
      "Strong logistics coverage"
    ]
  },

  // ==========================================================
  // VALIDATION AUTHORITIES
  // ==========================================================

  {
    id: "lr-workshop",

    supplierName:
      "LR Workshop",

    country: "Global",

    region: "Global",

    connectorType:
      "hybrid",

    active: true,

    procurementEnabled: false,

    validationAuthority: true,

    ingestionPriority: 100,

    logisticsPriority: 0,

    expeditionPriority: 95,

    supportsLiveInventory: false,

    supportsPricing: false,

    supportsShippingEstimates: false,

    supportsPartSearch: true,

    notes: [
      "Canonical parts validation",
      "Part diagrams",
      "Assembly intelligence",
      "Source-of-truth validation layer"
    ]
  }
]