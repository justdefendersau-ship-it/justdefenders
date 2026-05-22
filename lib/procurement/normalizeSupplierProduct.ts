/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\normalizeSupplierProduct.ts
 *
 * Timestamp:
 * 21 May 2026 11:52 Sydney
 *
 * PURPOSE:
 * Supplier Product Normalization
 *
 * STRATEGY:
 * PASS 18A — Live Supplier Ingestion Foundation
 *
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export interface SupplierProduct {

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

// ============================================================
// NORMALIZER
// ============================================================

export function normalizeSupplierProduct({

  supplier,

  brand,

  title,

  sku,

  category,

  url,

  price,

  inStock,

  expeditionReady,

  procurementScore,

  fitmentScore,

  deliveryEstimate

}: SupplierProduct): SupplierProduct {

  return {

    supplier:
      supplier || "Unknown Supplier",

    brand:
      brand || "Unknown",

    title:
      title || "Unknown Product",

    sku:
      sku || "N/A",

    category:
      category || "General",

    url:
      url || "#",

    price:
      price || 0,

    inStock:
      Boolean(inStock),

    expeditionReady:
      Boolean(expeditionReady),

    procurementScore:
      procurementScore || 50,

    fitmentScore:
      fitmentScore || 50,

    deliveryEstimate:
      deliveryEstimate || "Unknown"
  }
}