/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\types\procurement.ts
 *
 * Timestamp:
 * 19 May 2026 20:50 Sydney
 *
 * PURPOSE:
 * Procurement Federation Types
 * ============================================================
 */

export type SupplierName =

  | "Repco"
  | "Supercheap"
  | "LRDirect"
  | "eBay"

// ============================================================
// PROCUREMENT PRODUCT
// ============================================================

export type ProcurementProduct = {

  supplier: SupplierName

  title: string

  brand?: string

  sku?: string

  url?: string

  category?: string

  standardPrice?: number

  clubPrice?: number

  tradePrice?: number

  rating?: number

  reviewCount?: number

  inStock?: boolean

  expeditionReady?: boolean

  procurementScore?: number

  compatibilityScore?: number

  vehicleCompatibility?: string[]

  deliveryEstimate?: string
}