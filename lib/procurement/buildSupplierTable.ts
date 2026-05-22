/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\buildSupplierTable.ts
 *
 * Timestamp:
 * 20 May 2026 18:02 Sydney
 *
 * PURPOSE:
 * Tactical supplier federation intelligence builder
 *
 * STRATEGY:
 * PASS 5 — Operational Procurement Intelligence
 *
 * - Add dispatch intelligence
 * - Add supplier tiering
 * - Add operational regions
 * - Add procurement velocity
 * - Preserve federation orchestration
 *
 * IMPORTANT:
 * This file powers:
 * - TacticalSupplierResultsTable
 * - federation intelligence
 * - operational procurement scoring
 * - expedition readiness
 * ============================================================
 */

interface ProcurementProduct {

  supplier: string

  title: string

  brand?: string

  sku?: string

  category?: string

  url?: string

  expeditionReady?: boolean

  inStock?: boolean

  procurementScore?: number
}

interface TacticalSupplier {

  supplierName: string

  location: string

  operationalStock: boolean

  expeditionReady: boolean

  verifiedSupplier: boolean

  procurementScore: number

  federationPrice: number | null

  federationStatus: string

  confidence: string

  supplierType: string

  dispatchEstimate: string

  stockRegion: string

  supplierTier: string

  procurementVelocity: string

  products: ProcurementProduct[]
}

// ============================================================
// BUILD SUPPLIER TABLE
// ============================================================

export function buildSupplierTable(

  products: ProcurementProduct[]

): TacticalSupplier[] {

  if (
    !products ||
    products.length === 0
  ) {

    return []
  }

  // ==========================================================
  // GROUP PRODUCTS
  // ==========================================================

  const supplierMap =
    new Map<
      string,
      ProcurementProduct[]
    >()

  for (
    const product of products
  ) {

    const key =
      product.supplier

    if (
      !supplierMap.has(key)
    ) {

      supplierMap.set(
        key,
        []
      )
    }

    supplierMap
      .get(key)
      ?.push(product)
  }

  // ==========================================================
  // BUILD SUPPLIERS
  // ==========================================================

  const tacticalSuppliers:
    TacticalSupplier[] = []

  for (

    const [

      supplierName,
      supplierProducts

    ] of supplierMap

  ) {

    // ========================================================
    // PROCUREMENT STATE
    // ========================================================

    const expeditionReady =

      supplierProducts.some(

        p => p.expeditionReady
      )

    const operationalStock =

      supplierProducts.some(

        p => p.inStock
      )

    // ========================================================
    // SCORE
    // ========================================================

    const procurementScore =

      Math.max(

        ...supplierProducts.map(

          p =>

            p.procurementScore
            || 0
        )
      )

    // ========================================================
    // CONFIDENCE
    // ========================================================

    let confidence =
      "Moderate Confidence"

    if (
      procurementScore >= 90
    ) {

      confidence =
        "High Confidence"
    }

    if (
      procurementScore >= 96
    ) {

      confidence =
        "Operationally Verified"
    }

    // ========================================================
    // SUPPLIER TYPE
    // ========================================================

    let supplierType =
      "Federated Supplier"

    const lowerSupplier =

      supplierName
        .toLowerCase()

    if (

      lowerSupplier.includes(
        "repco"
      )

    ) {

      supplierType =
        "AU National Retailer"
    }

    if (

      lowerSupplier.includes(
        "rover"
      )

    ) {

      supplierType =
        "Land Rover Specialist"
    }

    // ========================================================
    // FEDERATION STATUS
    // ========================================================

    let federationStatus =
      "Live Federation"

    if (
      expeditionReady
    ) {

      federationStatus =
        "Expedition Ready"
    }

    // ========================================================
    // OPERATIONAL INTELLIGENCE
    // ========================================================

    let dispatchEstimate =
      "2d Dispatch"

    let stockRegion =
      "AU East"

    let supplierTier =
      "Tier 1"

    let procurementVelocity =
      "High Velocity"

    if (
      lowerSupplier.includes(
        "rover"
      )
    ) {

      dispatchEstimate =
        "5d Import"

      stockRegion =
        "UK + AU"

      supplierTier =
        "Specialist"

      procurementVelocity =
        "Medium Velocity"
    }

    // ========================================================
    // BUILD SUPPLIER
    // ========================================================

    tacticalSuppliers.push({

      supplierName,

      location:
        supplierType,

      operationalStock,

      expeditionReady,

      verifiedSupplier:
        true,

      procurementScore,

      federationPrice:
        null,

      federationStatus,

      confidence,

      supplierType,

      dispatchEstimate,

      stockRegion,

      supplierTier,

      procurementVelocity,

      products:
        supplierProducts
    })
  }

  // ==========================================================
  // SORT
  // ==========================================================

  tacticalSuppliers.sort(

    (
      a,
      b
    ) =>

      b.procurementScore
      -
      a.procurementScore
  )

  return tacticalSuppliers
}