/* =====================================================
   JustDefenders ©
   Vehicle Fitment Engine
===================================================== */

import {

  VehicleFitmentContract

}
from "../contracts/vehicleFitment"

// =====================================================
// FITMENT DATA
// =====================================================

const fitmentData:
  VehicleFitmentContract[] = [

  // ===================================================
  // NINETY
  // ===================================================

  {

    id:"FIT-001",

    vehicleModel:
      "Defender Ninety",

    productionStartYear:1983,

    productionEndYear:1990,

    engineVariants:[

      "2.25 Petrol",
      "2.5 NA Diesel",
      "2.5 Turbo Diesel"

    ],

    gearboxVariants:[

      "LT77"
    ],

    axleVariants:[

      "Rover",
      "Salisbury"
    ],

    vinPrefixes:[

      "SALLDV"
    ],

    compatibleParts:[

      "RTC3429",
      "ERR3340"

    ],

    exportMarkets:[

      "UK",
      "Australia"
    ],

    militaryVariants:true,

    fitmentConfidence:0.84,

    notes:[

      "Early production fitment variation exists"
    ]
  },

  // ===================================================
  // ONE TEN
  // ===================================================

  {

    id:"FIT-002",

    vehicleModel:
      "Defender One Ten",

    productionStartYear:1983,

    productionEndYear:1990,

    engineVariants:[

      "2.25 Petrol",
      "2.5 Diesel",
      "V8"

    ],

    gearboxVariants:[

      "LT95",
      "LT77"
    ],

    axleVariants:[

      "Salisbury"
    ],

    vinPrefixes:[

      "SALLDH"
    ],

    compatibleParts:[

      "RTC3429",
      "ERR3340"

    ],

    exportMarkets:[

      "Australia",
      "Africa"
    ],

    militaryVariants:true,

    fitmentConfidence:0.86
  },

  // ===================================================
  // 200TDI
  // ===================================================

  {

    id:"FIT-003",

    vehicleModel:
      "Defender 200Tdi",

    productionStartYear:1990,

    productionEndYear:1994,

    engineVariants:[

      "200Tdi"
    ],

    gearboxVariants:[

      "LT77"
    ],

    compatibleParts:[

      "RTC3429",
      "ERR3340",
      "PCH119890"

    ],

    vinPrefixes:[

      "SALLDH"
    ],

    exportMarkets:[

      "Global"
    ],

    fitmentConfidence:0.91
  },

  // ===================================================
  // 300TDI
  // ===================================================

  {

    id:"FIT-004",

    vehicleModel:
      "Defender 300Tdi",

    productionStartYear:1994,

    productionEndYear:1998,

    engineVariants:[

      "300Tdi"
    ],

    gearboxVariants:[

      "R380"
    ],

    compatibleParts:[

      "RTC3429",
      "ERR3340",
      "PCH119890"

    ],

    vinPrefixes:[

      "SALLDH"
    ],

    exportMarkets:[

      "Global"
    ],

    fitmentConfidence:0.94
  },

  // ===================================================
  // TD5
  // ===================================================

  {

    id:"FIT-005",

    vehicleModel:
      "Defender Td5",

    productionStartYear:1998,

    productionEndYear:2007,

    engineVariants:[

      "Td5"
    ],

    gearboxVariants:[

      "R380"
    ],

    compatibleParts:[

      "RTC3429",
      "PCH119890",
      "ERR3340"

    ],

    vinPrefixes:[

      "SALLDH"
    ],

    exportMarkets:[

      "Global"
    ],

    fitmentConfidence:0.96,

    notes:[

      "Injector harness monitoring recommended"
    ]
  },

  // ===================================================
  // PUMA 2.4
  // ===================================================

  {

    id:"FIT-006",

    vehicleModel:
      "Defender Puma 2.4",

    productionStartYear:2007,

    productionEndYear:2011,

    engineVariants:[

      "Puma 2.4"
    ],

    gearboxVariants:[

      "MT82"
    ],

    compatibleParts:[

      "PCH119890",
      "ERR3340"

    ],

    vinPrefixes:[

      "SALLDH"
    ],

    exportMarkets:[

      "Global"
    ],

    fitmentConfidence:0.97
  },

  // ===================================================
  // PUMA 2.2
  // ===================================================

  {

    id:"FIT-007",

    vehicleModel:
      "Defender Puma 2.2",

    productionStartYear:2011,

    productionEndYear:2016,

    engineVariants:[

      "Puma 2.2"
    ],

    gearboxVariants:[

      "MT82"
    ],

    compatibleParts:[

      "PCH119890",
      "ERR3340"

    ],

    vinPrefixes:[

      "SALLDH"
    ],

    exportMarkets:[

      "Global"
    ],

    fitmentConfidence:0.98
  }

]

// =====================================================
// ENGINE
// =====================================================

export function getVehicleFitmentData(){

  return fitmentData
}

// =====================================================
// YEAR LOOKUP
// =====================================================

export function getVehicleByYear(

  year:number

){

  return fitmentData.filter(

    item =>

      year >= item.productionStartYear
      &&
      year <= item.productionEndYear
  )
}

// =====================================================
// VIN LOOKUP
// =====================================================

export function getVehicleByVin(

  vin:string

){

  return fitmentData.find(

    item =>

      item.vinPrefixes?.some(

        prefix =>

          vin.startsWith(prefix)
      )
  )
}

// =====================================================
// PART LOOKUP
// =====================================================

export function getCompatibleVehicles(

  partNumber:string

){

  return fitmentData.filter(

    item =>

      item.compatibleParts.includes(
        partNumber
      )
  )
}
