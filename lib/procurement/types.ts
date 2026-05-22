/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\types.ts
 *
 * Timestamp:
 * 22 May 2026 09:42 Sydney
 *
 * PURPOSE:
 * Procurement + Federation Types
 *
 * STRATEGY:
 * PASS 30B — Federation Telemetry Stabilization
 *
 * OBJECTIVES:
 * - normalize federation telemetry
 * - normalize supplier health states
 * - improve operational diagnostics
 * - improve Alpha telemetry continuity
 * - stabilize federation contracts
 *
 * ============================================================
 */

// ============================================================
// SUPPLIER HEALTH
// ============================================================

export type SupplierHealth =

  | "HEALTHY"
  | "DEGRADED"
  | "TIMEOUT"

// ============================================================
// STOCK STATUS
// ============================================================

export type StockStatus =

  | "IN_STOCK"
  | "LOW_STOCK"
  | "OUT_OF_STOCK"

// ============================================================
// SUPPLIER
// ============================================================

export interface SupplierInformation {

  supplierId: string

  supplierName: string

  supplierType: string

  region: string

  website: string

  verified: boolean

  expeditionReady: boolean

  federationEnabled: boolean
}

// ============================================================
// TELEMETRY
// ============================================================

export interface FederationTelemetry {

  latencyMs: number

  fetchedAt: string

  health: SupplierHealth

  retries: number

  cacheHit: boolean

  federationNode: string

  timeoutTriggered?: boolean

  lastSuccessfulFetch?: string
}

// ============================================================
// NORMALIZED PRODUCT
// ============================================================

export interface NormalizedSupplierProduct {

  supplier: SupplierInformation

  telemetry: FederationTelemetry

  oemPartNumber: string

  supplierSku: string

  brand: string

  title: string

  description: string

  price: number

  currency: string

  stockStatus: StockStatus

  stockLevel: number

  deliveryEstimate: string

  fitmentScore: number

  procurementScore: number

  expeditionScore: number

  confidenceScore: number

  supersededBy: string[]

  interchangeableWith: string[]

  sourceUrl: string

  tags: string[]
}

// ============================================================
// FEDERATION AUDIT EVENT
// ============================================================

export interface FederationAuditEvent {

  supplierId: string

  supplierName: string

  success: boolean

  latencyMs: number

  timestamp: string

  health: SupplierHealth

  error?: string
}