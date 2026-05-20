/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\regionalSupplierIntelligence.ts

   Timestamp:
   2026-05-07 09:30

   Purpose:
   - Regional supplier intelligence
   - Shipping-aware marketplace logic
   - AU-first optimisation
===================================================== */

export type SupplierMeta = {

  supplier: string

  country: string

  region: string

  shippingDays: number

  shippingCost: number

  reliability: number

  supportsBulkOrders: boolean

  consumableStrength: number

  rarePartStrength: number

  preferredCategories: string[]
}

// =====================================================
// SUPPLIER METADATA
// =====================================================

export const SUPPLIER_META: SupplierMeta[] = [

  // =====================================================
  // AUSTRALIA
  // =====================================================

  {
    supplier:"All Four x 4 Spares",

    country:"Australia",

    region:"AU",

    shippingDays:3,

    shippingCost:15,

    reliability:0.82,

    supportsBulkOrders:true,

    consumableStrength:0.95,

    rarePartStrength:0.55,

    preferredCategories:[
      "filters",
      "service",
      "brakes",
      "oils",
      "bearings"
    ]
  },

  {
    supplier:"MR Automotive",

    country:"Australia",

    region:"AU",

    shippingDays:3,

    shippingCost:18,

    reliability:0.92,

    supportsBulkOrders:true,

    consumableStrength:0.90,

    rarePartStrength:0.72,

    preferredCategories:[
      "defender",
      "service",
      "driveline"
    ]
  },

  {
    supplier:"Karcraft",

    country:"Australia",

    region:"AU",

    shippingDays:4,

    shippingCost:20,

    reliability:0.88,

    supportsBulkOrders:true,

    consumableStrength:0.87,

    rarePartStrength:0.74,

    preferredCategories:[
      "service",
      "suspension",
      "engine"
    ]
  },

  // =====================================================
  // UNITED KINGDOM
  // =====================================================

  {
    supplier:"Paddock Spares",

    country:"United Kingdom",

    region:"UK",

    shippingDays:12,

    shippingCost:90,

    reliability:0.96,

    supportsBulkOrders:true,

    consumableStrength:0.50,

    rarePartStrength:0.98,

    preferredCategories:[
      "rare",
      "restoration",
      "trim",
      "legacy"
    ]
  },

  {
    supplier:"LR Direct",

    country:"United Kingdom",

    region:"UK",

    shippingDays:10,

    shippingCost:85,

    reliability:0.95,

    supportsBulkOrders:true,

    consumableStrength:0.55,

    rarePartStrength:0.97,

    preferredCategories:[
      "oem",
      "rare",
      "electrical"
    ]
  },

  {
    supplier:"Britcar",

    country:"United Kingdom",

    region:"UK",

    shippingDays:11,

    shippingCost:88,

    reliability:0.91,

    supportsBulkOrders:true,

    consumableStrength:0.58,

    rarePartStrength:0.92,

    preferredCategories:[
      "legacy",
      "restoration"
    ]
  }
]

// =====================================================
// LOOKUP
// =====================================================

export function getSupplierMeta(
  supplier:string
){

  return SUPPLIER_META.find(

    s => s.supplier === supplier

  ) || null
}

// =====================================================
// PART CATEGORY DETECTION
// =====================================================

export function detectPartCategory(
  part:string
){

  const p =
    part.toUpperCase()

  // =====================================================
  // CONSUMABLES
  // =====================================================

  if(
    p.includes("FILTER") ||
    p.includes("OIL") ||
    p.includes("ERR") ||
    p.includes("SERVICE")
  ){

    return "consumable"
  }

  // =====================================================
  // RARE
  // =====================================================

  if(
    p.includes("TRIM") ||
    p.includes("PANEL") ||
    p.includes("LEGACY")
  ){

    return "rare"
  }

  // =====================================================
  // DEFAULT
  // =====================================================

  return "general"
}

// =====================================================
// REGIONAL SCORING
// =====================================================

export function calculateRegionalScore(

  supplier:string,

  part:string,

  baseScore:number

){

  const meta =
    getSupplierMeta(supplier)

  if(!meta){

    return baseScore
  }

  const category =
    detectPartCategory(part)

  let regionalBoost = 1

  // =====================================================
  // CONSUMABLES
  // =====================================================

  if(category === "consumable"){

    // AU suppliers strongly preferred

    if(meta.region === "AU"){

      regionalBoost +=
        meta.consumableStrength

    } else {

      // UK shipping penalty

      regionalBoost -= 0.35
    }
  }

  // =====================================================
  // RARE PARTS
  // =====================================================

  if(category === "rare"){

    if(meta.region === "UK"){

      regionalBoost +=
        meta.rarePartStrength
    }
  }

  // =====================================================
  // SHIPPING PENALTY
  // =====================================================

  regionalBoost -=
    meta.shippingCost / 1000

  // =====================================================
  // RELIABILITY
  // =====================================================

  regionalBoost +=
    meta.reliability * 0.25

  // =====================================================
  // BULK ORDER BONUS
  // =====================================================

  if(meta.supportsBulkOrders){

    regionalBoost += 0.10
  }

  return baseScore * regionalBoost
}
