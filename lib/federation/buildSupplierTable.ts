/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\buildSupplierTable.ts
 *
 * Timestamp:
 * 20 May 2026 10:15 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Federation Adapter
 *
 * Converts live procurement federation results into:
 * TacticalSupplierResultsTable-compatible schema.
 * ============================================================
 */

import {
  ProcurementProduct
} from "@/types/procurement"

// ============================================================
// TYPES
// ============================================================

export interface TacticalSupplierOption {

  brand: string

  part: string

  oem: number

  standard: number

  club: number

  trade: number

  delivery: string

  fitment: number
}

export interface TacticalSupplier {

  id: string

  name: string

  logo: string

  type: string

  verified: boolean

  price: number

  fitment: number

  procurementScore: number

  options: TacticalSupplierOption[]
}

// ============================================================
// BUILD SUPPLIER TABLE
// ============================================================

export function buildSupplierTable(

  products: ProcurementProduct[]

): TacticalSupplier[] {

  // ==========================================================
  // GROUP PRODUCTS BY SUPPLIER
  // ==========================================================

  const supplierMap = new Map<
    string,
    ProcurementProduct[]
  >()

  for (const product of products) {

    const supplier =
      product.supplier || "Unknown"

    if (!supplierMap.has(supplier)) {

      supplierMap.set(
        supplier,
        []
      )
    }

    supplierMap
      .get(supplier)
      ?.push(product)
  }

  // ==========================================================
  // BUILD TACTICAL SUPPLIERS
  // ==========================================================

  const tacticalSuppliers:
    TacticalSupplier[] = []

  for (

    const [

      supplierName,
      supplierProducts

    ] of supplierMap

  ) {

    const topProduct =
      supplierProducts[0]

    tacticalSuppliers.push({

      id:
        supplierName
          .toLowerCase()
          .replace(/\s+/g, "-"),

      name:
        supplierName,

      logo:
        supplierName
          .toLowerCase()
          .includes("repco")

          ? "/suppliers/repco.png"

          : "/suppliers/default.png",

      type:
        "Physical",

      verified:
        true,

      price:

        topProduct.clubPrice
        ||
        topProduct.standardPrice
        ||
        0,

      fitment:

        topProduct.compatibilityScore
        ||
        92,

      procurementScore:

        topProduct.procurementScore
        ||
        75,

      options:

        supplierProducts.map(

          (
            product
          ) => ({

            brand:

              product.brand
              ||
              "Unknown",

            part:

              product.sku
              ||
              product.title,

            oem:

              product.procurementScore
              ||
              75,

            standard:

              product.standardPrice
              ||
              0,

            club:

              product.clubPrice
              ||
              product.standardPrice
              ||
              0,

            trade:

              product.tradePrice
              ||
              product.clubPrice
              ||
              0,

            delivery:

              product.inStock

                ?

                "Live Stock • Federation"

                :

                "Supplier Check Required",

            fitment:

              product.compatibilityScore
              ||
              92
          })
        )
    })
  }

  // ==========================================================
  // SORT BY PROCUREMENT SCORE
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