/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\types.ts
 *
 * Timestamp:
 * 21 May 2026 16:12 Sydney
 *
 * PURPOSE:
 * Shared Supplier Federation Types
 *
 * STRATEGY:
 * PASS 24 — Real Supplier Ingestion Expansion
 *
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export interface RawSupplierProduct {

  supplier: string

  brand: string

  title: string

  sku: string

  category: string

  url: string

  price: number

  inStock: boolean

  expeditionReady: boolean

  procurementScore: number

  fitmentScore: number

  deliveryEstimate: string
}