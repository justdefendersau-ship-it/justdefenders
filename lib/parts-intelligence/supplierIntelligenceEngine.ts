/* =====================================================
   JustDefenders ©
   Supplier Intelligence Engine
===================================================== */

import {

  SupplierPartContract

}
from "../contracts/supplierPart"

// =====================================================
// SUPPLIER DATA
// =====================================================

const supplierData:
  SupplierPartContract[] = [

  // ===================================================
  // MR AUTOMOTIVE
  // ===================================================

  {

    id:"SUP-001",

    supplierName:
      "MR Automotive",

    supplierType:
      "Workshop",

    supplierRegion:
      "QLD",

    physicalStore:true,

    onlineOnly:false,

    mapLink:
      "https://maps.google.com",

    partNumber:
      "PCH119890",

    compatibleVehicles:[

      "Defender Td5",
      "Defender Puma 2.2"

    ],

    brand:
      "OEM",

    oemEquivalent:true,

    touringGrade:true,

    stockStatus:
      "in_stock",

    retailPrice:189,

    tradePrice:154,

    estimatedDeliveryDays:1,

    supplierConfidence:0.96,

    routeSuitability:[

      "Cape York",
      "CSR",
      "Gunbarrel"

    ],

    operationalNotes:[

      "Td5 expedition specialist",
      "High remote touring reliability"
    ]
  },

  // ===================================================
  // BRITISH OFF ROAD
  // ===================================================

  {

    id:"SUP-002",

    supplierName:
      "British Off Road",

    supplierType:
      "Aftermarket",

    supplierRegion:
      "QLD",

    physicalStore:true,

    onlineOnly:false,

    mapLink:
      "https://maps.google.com",

    partNumber:
      "RTC3429",

    compatibleVehicles:[

      "Defender Td5",
      "Defender 300Tdi"

    ],

    brand:
      "Timken",

    oemEquivalent:true,

    touringGrade:true,

    stockStatus:
      "in_stock",

    retailPrice:142,

    tradePrice:118,

    estimatedDeliveryDays:2,

    supplierConfidence:0.92,

    routeSuitability:[

      "Cape York",
      "Simpson Desert"

    ],

    operationalNotes:[

      "Strong touring support",
      "Good remote-area inventory"
    ]
  },

  // ===================================================
  // LR DIRECT
  // ===================================================

  {

    id:"SUP-003",

    supplierName:
      "LR Direct",

    supplierType:
      "OEM",

    supplierRegion:
      "UK",

    physicalStore:false,

    onlineOnly:true,

    partNumber:
      "ERR3340",

    compatibleVehicles:[

      "Defender Td5",
      "Defender Puma 2.4",
      "Defender Puma 2.2"

    ],

    brand:
      "Land Rover",

    oemEquivalent:true,

    touringGrade:true,

    stockStatus:
      "limited",

    retailPrice:205,

    tradePrice:188,

    estimatedDeliveryDays:8,

    supplierConfidence:0.90,

    routeSuitability:[

      "Global"

    ],

    operationalNotes:[

      "OEM supply chain",
      "Longer international delivery"
    ]
  },

  // ===================================================
  // ALL FOUR X 4
  // ===================================================

  {

    id:"SUP-004",

    supplierName:
      "All Four x 4",

    supplierType:
      "Aftermarket",

    supplierRegion:
      "NSW",

    physicalStore:true,

    onlineOnly:false,

    mapLink:
      "https://maps.google.com",

    partNumber:
      "RTC3429",

    compatibleVehicles:[

      "Defender 200Tdi",
      "Defender 300Tdi",
      "Defender Td5"

    ],

    brand:
      "Aftermarket",

    oemEquivalent:false,

    touringGrade:true,

    stockStatus:
      "in_stock",

    retailPrice:118,

    tradePrice:98,

    estimatedDeliveryDays:2,

    supplierConfidence:0.88,

    routeSuitability:[

      "Gibb River Road",
      "Gunbarrel"

    ],

    operationalNotes:[

      "Strong aftermarket availability"
    ]
  }

]

// =====================================================
// LOOKUP
// =====================================================

export function getSupplierOptions(

  partNumber:string

){

  return supplierData.filter(

    item =>

      item.partNumber === partNumber
  )
}

// =====================================================
// TRADE LOOKUP
// =====================================================

export function getTradeSupplierOptions(

  partNumber:string

){

  return supplierData

    .filter(

      item =>

        item.partNumber === partNumber
    )

    .sort(

      (a,b)=>

        (a.tradePrice || 0)
        -
        (b.tradePrice || 0)
    )
}

// =====================================================
// ROUTE LOOKUP
// =====================================================

export function getRouteOptimisedSuppliers(

  partNumber:string,
  route:string

){

  return supplierData.filter(

    item =>

      item.partNumber === partNumber
      &&
      item.routeSuitability?.includes(
        route
      )
  )
}

// =====================================================
// HIGH CONFIDENCE
// =====================================================

export function getHighConfidenceSuppliers(

  minimum:number = 0.9

){

  return supplierData.filter(

    item =>

      (item.supplierConfidence || 0)
      >=
      minimum
  )
}
