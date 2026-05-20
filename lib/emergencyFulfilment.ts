/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\emergencyFulfilment.ts

   Timestamp:
   2026-05-07 10:00

   Purpose:
   - Emergency fulfilment intelligence
   - Availability-first marketplace logic
   - Proximity-aware ranking
===================================================== */

export type SupplierLogistics = {

  supplier: string

  suburb: string

  state: string

  country: string

  latitude: number

  longitude: number

  pickupAvailable: boolean

  sameDayDispatch: boolean

  emergencySupport: boolean

  emergencyScore: number
}

// =====================================================
// PHYSICAL LOCATIONS
// =====================================================

export const SUPPLIER_LOGISTICS: SupplierLogistics[] = [

  // =====================================================
  // AUSTRALIA
  // =====================================================

  {
    supplier:"All Four x 4 Spares",

    suburb:"Kotara",

    state:"NSW",

    country:"Australia",

    latitude:-32.942,

    longitude:151.691,

    pickupAvailable:true,

    sameDayDispatch:true,

    emergencySupport:true,

    emergencyScore:0.92
  },

  {
    supplier:"MR Automotive",

    suburb:"Redcliffe",

    state:"QLD",

    country:"Australia",

    latitude:-27.230,

    longitude:153.112,

    pickupAvailable:true,

    sameDayDispatch:true,

    emergencySupport:true,

    emergencyScore:0.95
  },

  {
    supplier:"Karcraft",

    suburb:"Silverwater",

    state:"NSW",

    country:"Australia",

    latitude:-33.834,

    longitude:151.048,

    pickupAvailable:true,

    sameDayDispatch:true,

    emergencySupport:true,

    emergencyScore:0.94
  },

  // =====================================================
  // UK
  // =====================================================

  {
    supplier:"Paddock Spares",

    suburb:"Matlock",

    state:"Derbyshire",

    country:"United Kingdom",

    latitude:53.136,

    longitude:-1.555,

    pickupAvailable:false,

    sameDayDispatch:false,

    emergencySupport:false,

    emergencyScore:0.35
  },

  {
    supplier:"LR Direct",

    suburb:"London",

    state:"England",

    country:"United Kingdom",

    latitude:51.507,

    longitude:-0.127,

    pickupAvailable:false,

    sameDayDispatch:false,

    emergencySupport:false,

    emergencyScore:0.40
  }
]

// =====================================================
// PART TYPES
// =====================================================

export type PartVariant = {

  type: string

  priority: number

  description: string
}

// =====================================================
// PART VARIANTS
// =====================================================

export function getPartVariants(
  part:string
): PartVariant[] {

  // =====================================================
  // COMMON MAINTENANCE ITEMS
  // =====================================================

  if(
    part.includes("ERR") ||
    part.includes("FILTER")
  ){

    return [

      {
        type:"OEM",
        priority:0.90,
        description:
          "Original equipment specification"
      },

      {
        type:"Compatible",
        priority:0.95,
        description:
          "Compatible replacement part"
      },

      {
        type:"Aftermarket",
        priority:0.98,
        description:
          "Heavy-duty / upgraded aftermarket option"
      }
    ]
  }

  // =====================================================
  // DEFAULT
  // =====================================================

  return [

    {
      type:"OEM",
      priority:1,
      description:
        "Original equipment"
    }
  ]
}

// =====================================================
// LOOKUP
// =====================================================

export function getSupplierLogistics(
  supplier:string
){

  return SUPPLIER_LOGISTICS.find(

    s => s.supplier === supplier

  ) || null
}

// =====================================================
// DISTANCE
// =====================================================

export function estimateDistanceScore(
  supplier:string
){

  const logistics =
    getSupplierLogistics(
      supplier
    )

  if(!logistics){

    return 0.50
  }

  // =====================================================
  // AUSTRALIA BONUS
  // =====================================================

  if(logistics.country === "Australia"){

    return 0.95
  }

  // =====================================================
  // UK PENALTY
  // =====================================================

  return 0.45
}

// =====================================================
// EMERGENCY SCORING
// =====================================================

export function calculateEmergencyScore(

  supplier:string,

  availability:boolean,

  baseScore:number
){

  const logistics =
    getSupplierLogistics(
      supplier
    )

  if(!logistics){

    return baseScore
  }

  let score =
    baseScore

  // =====================================================
  // AVAILABILITY FIRST
  // =====================================================

  if(availability){

    score += 0.50
  }

  // =====================================================
  // SAME DAY
  // =====================================================

  if(logistics.sameDayDispatch){

    score += 0.35
  }

  // =====================================================
  // PICKUP
  // =====================================================

  if(logistics.pickupAvailable){

    score += 0.45
  }

  // =====================================================
  // EMERGENCY SUPPORT
  // =====================================================

  score +=
    logistics.emergencyScore

  // =====================================================
  // PROXIMITY
  // =====================================================

  score +=
    estimateDistanceScore(
      supplier
    )

  return score
}
