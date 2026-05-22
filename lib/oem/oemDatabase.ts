/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\oem\oemDatabase.ts
 *
 * Timestamp:
 * 21 May 2026 22:08 Sydney
 *
 * PURPOSE:
 * Land Rover OEM Cross Reference Database
 *
 * STRATEGY:
 * PASS 27C — OEM Cross-Reference Intelligence
 *
 * ============================================================
 */

export interface OEMCrossReference {

  oemPartNumber: string

  title: string

  category: string

  vehicleCompatibility: string[]

  supersededBy: string[]

  interchangeableWith: string[]

  aftermarketOptions: {

    supplier: string

    sku: string

    brand: string

  }[]

  expeditionSuitable: boolean

  tradeRecommended: boolean

  procurementPriority:

    | "HIGH"
    | "MEDIUM"
    | "LOW"
}

export const OEM_DATABASE:
OEMCrossReference[] = [

  {

    oemPartNumber:
      "ERR3340",

    title:
      "Oil Filter",

    category:
      "Engine",

    vehicleCompatibility: [

      "Defender 300Tdi",
      "Discovery 300Tdi"
    ],

    supersededBy: [],

    interchangeableWith: [

      "Z89A",
      "WL7070"
    ],

    aftermarketOptions: [

      {

        supplier:
          "Repco",

        sku:
          "Z89A",

        brand:
          "Ryco"
      },

      {

        supplier:
          "Burson",

        sku:
          "WL7070",

        brand:
          "WIX"
      }
    ],

    expeditionSuitable:
      true,

    tradeRecommended:
      true,

    procurementPriority:
      "HIGH"
  },

  {

    oemPartNumber:
      "RTC3184",

    title:
      "Air Filter",

    category:
      "Engine",

    vehicleCompatibility: [

      "Defender 300Tdi"
    ],

    supersededBy: [],

    interchangeableWith: [

      "A1287",
      "SA1234"
    ],

    aftermarketOptions: [

      {

        supplier:
          "Repco",

        sku:
          "A1287",

        brand:
          "Ryco"
      }
    ],

    expeditionSuitable:
      true,

    tradeRecommended:
      true,

    procurementPriority:
      "HIGH"
  },

  {

    oemPartNumber:
      "ESR3294",

    title:
      "Fuel Filter",

    category:
      "Fuel System",

    vehicleCompatibility: [

      "Defender Td5",
      "Discovery Td5"
    ],

    supersededBy: [],

    interchangeableWith: [

      "Z647",
      "FF5320"
    ],

    aftermarketOptions: [

      {

        supplier:
          "Burson",

        sku:
          "FF5320",

        brand:
          "Fleetguard"
      }
    ],

    expeditionSuitable:
      true,

    tradeRecommended:
      true,

    procurementPriority:
      "HIGH"
  },

  {

    oemPartNumber:
      "STC50529",

    title:
      "Water Pump",

    category:
      "Cooling",

    vehicleCompatibility: [

      "Defender Td5"
    ],

    supersededBy: [],

    interchangeableWith: [

      "GWP201"
    ],

    aftermarketOptions: [

      {

        supplier:
          "LR Direct",

        sku:
          "GWP201",

        brand:
          "Allmakes"
      }
    ],

    expeditionSuitable:
      true,

    tradeRecommended:
      false,

    procurementPriority:
      "MEDIUM"
  }
]