
/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\getSupplierDetail.ts
 * ============================================================
 */
interface SupplierPart {

  brand: string

  sku: string

  oem: number

  status: string
}

interface SupplierDetail {

  slug: string

  name: string

  fitment: number

  confidence: string

  region: string

  dispatch: string

  tier: string

  logo: string

  parts: SupplierPart[]
}

// ============================================================
// MOCK SUPPLIERS
// ============================================================

const suppliers:
  SupplierDetail[] = [

  {
    slug: "repco",

    name: "Repco",

    fitment: 94,

    confidence:
      "High Confidence",

    region:
      "AU East",

    dispatch:
      "2d Dispatch",

    tier:
      "Tier 1",

    logo:
      "/suppliers/repco.png",

    parts: [

      {
        brand: "Ryco",

        sku: "Z89A",

        oem: 94,

        status:
          "Expedition Ready"
      },

      {
        brand: "Repco",

        sku: "ROF15A",

        oem: 91,

        status:
          "Expedition Ready"
      }
    ]
  },

  {
    slug: "burson",

    name:
      "Burson Auto Parts",

    fitment: 92,

    confidence:
      "High Confidence",

    region:
      "AU East",

    dispatch:
      "2d Dispatch",

    tier:
      "Tier 1",

    logo:
      "/suppliers/burson.png",

    parts: [

      {
        brand: "WIX",

        sku: "WL7070",

        oem: 92,

        status:
          "Expedition Ready"
      },

      {
        brand: "Sakura",

        sku: "C-1011",

        oem: 88,

        status:
          "Expedition Ready"
      }
    ]
  }
]

// ============================================================
// GET SUPPLIER
// ============================================================

export function getSupplierDetail(

  slug: string

){

  return suppliers.find(

    supplier =>

      supplier.slug
      ===
      slug.toLowerCase()
  )
}