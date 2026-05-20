/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\buildSupplierTable.ts
 *
 * Timestamp:
 * 20 May 2026 12:10 Sydney
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

  federationPrice: number

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
  // GROUP BY SUPPLIER
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

    const expeditionReady =

      supplierProducts.some(

        p => p.expeditionReady
      )

    const operationalStock =

      supplierProducts.some(

        p => p.inStock
      )

    const procurementScore =

      Math.max(

        ...supplierProducts.map(

          p =>

            p.procurementScore
            || 0
        )
      )

    tacticalSuppliers.push({

      supplierName,

      location:
        "Federated Supplier",

      operationalStock,

      expeditionReady,

      verifiedSupplier:
        true,

      procurementScore,

      federationPrice:
        0,

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