/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\australianOperationalSuppliers.ts
 *
 * Timestamp:
 * 17 May 2026 18:30 Sydney
 *
 * PURPOSE:
 * Australian Operational Procurement Supplier Graph
 * ============================================================
 */

export interface AustralianOperationalSupplier {

  name: string

  website: string

  email?: string

  phone?: string

  address?: string

  region?: string

  expeditionCapable: boolean

  operationalPriority: number

  oemPriority: number

  categories: string[]
}

// ============================================================
// AUSTRALIAN OPERATIONAL SUPPLIERS
// ============================================================

export const AUSTRALIAN_OPERATIONAL_SUPPLIERS:
AustralianOperationalSupplier[] = [

  {
    name: "4WD Industries",

    website:
      "https://4wdindustries.com.au",

    email:
      "info@4wdindustries.com.au",

    phone:
      "(02) 4933 3766",

    address:
      "257 High St, Maitland NSW 2320",

    region:
      "NSW",

    expeditionCapable: true,

    operationalPriority: 84,

    oemPriority: 72,

    categories: [
      "4WD",
      "Expedition",
      "Accessories"
    ]
  },

  {
    name: "All Four x 4 Spares",

    website:
      "https://allfourx4.com.au",

    phone:
      "(02) 4041 4000",

    address:
      "11 McDougall St, Kotara NSW 2289",

    region:
      "NSW",

    expeditionCapable: true,

    operationalPriority: 94,

    oemPriority: 88,

    categories: [
      "Land Rover",
      "Defender",
      "Used Parts",
      "OEM"
    ]
  },

  {
    name: "British Auto Parts",

    website:
      "https://britishautoparts.com.au",

    email:
      "sales@britishautoparts.com.au",

    phone:
      "1300 760 125",

    address:
      "Bayswater VIC 3153",

    region:
      "VIC",

    expeditionCapable: true,

    operationalPriority: 89,

    oemPriority: 91,

    categories: [
      "OEM",
      "Land Rover",
      "Defender"
    ]
  },

  {
    name: "British Off Road",

    website:
      "https://britishoffroad.com",

    email:
      "info@britishoffroad.com",

    phone:
      "(07) 5445 1094",

    address:
      "Sunshine Coast QLD 4555",

    region:
      "QLD",

    expeditionCapable: true,

    operationalPriority: 96,

    oemPriority: 92,

    categories: [
      "Defender",
      "Expedition",
      "Touring",
      "OEM"
    ]
  },

  {
    name: "Davis Performance Landys",

    website:
      "https://davisperformance.com.au",

    email:
      "spares@davisperformance.com",

    phone:
      "(02) 9679 1978",

    address:
      "South Windsor NSW 2756",

    region:
      "NSW",

    expeditionCapable: true,

    operationalPriority: 95,

    oemPriority: 93,

    categories: [
      "Performance",
      "Defender",
      "TDCi",
      "OEM"
    ]
  },

  {
    name: "Graeme Cooper Automotive",

    website:
      "https://graemecooper.com.au",

    email:
      "enquiries@graemecooper.com.au",

    phone:
      "(02) 9550 2689",

    address:
      "St Peters NSW",

    region:
      "NSW",

    expeditionCapable: true,

    operationalPriority: 92,

    oemPriority: 94,

    categories: [
      "Land Rover",
      "Defender",
      "OEM",
      "Workshop"
    ]
  },

  {
    name: "Jordan Rovertech",

    website:
      "https://jordanrover-tech.com.au",

    email:
      "info@jordanrover-tech.com.au",

    phone:
      "(08) 9350 5633",

    address:
      "Bentley WA",

    region:
      "WA",

    expeditionCapable: true,

    operationalPriority: 88,

    oemPriority: 90,

    categories: [
      "Land Rover",
      "Defender",
      "Workshop"
    ]
  },

  {
    name: "Landybitz",

    website:
      "https://landybitz.com.au",

    email:
      "sales@landybitz.com.au",

    phone:
      "(07) 3734 7134",

    address:
      "Molendinar QLD 4214",

    region:
      "QLD",

    expeditionCapable: true,

    operationalPriority: 90,

    oemPriority: 87,

    categories: [
      "Defender",
      "OEM",
      "Aftermarket"
    ]
  },

  {
    name: "M.R. Automotive",

    website:
      "https://mrautomotive.com.au",

    email:
      "parts@mrautomotive.com.au",

    phone:
      "(07) 3284 6688",

    address:
      "Redcliffe QLD 4020",

    region:
      "QLD",

    expeditionCapable: true,

    operationalPriority: 98,

    oemPriority: 95,

    categories: [
      "Defender",
      "TDCi",
      "OEM",
      "Expedition"
    ]
  },

  {
    name: "Rovacraft",

    website:
      "https://rovacraft.com.au",

    email:
      "info@rovacraft.com.au",

    phone:
      "(08) 9377 0080",

    address:
      "Australia Wide",

    region:
      "National",

    expeditionCapable: true,

    operationalPriority: 93,

    oemPriority: 91,

    categories: [
      "Land Rover",
      "OEM",
      "National Distribution"
    ]
  },

  {
    name: "Rovertech",

    website:
      "https://rovertech.au",

    email:
      "info@rovertech.au",

    phone:
      "0481 748 978",

    address:
      "Acacia Ridge QLD 4110",

    region:
      "QLD",

    expeditionCapable: true,

    operationalPriority: 86,

    oemPriority: 82,

    categories: [
      "Defender",
      "Workshop",
      "Diagnostics"
    ]
  },

  {
    name: "TR Spares",

    website:
      "https://trspares.com.au",

    email:
      "sales@trspares.com.au",

    phone:
      "(02) 9709 5611",

    address:
      "Padstow NSW 2211",

    region:
      "NSW",

    expeditionCapable: true,

    operationalPriority: 89,

    oemPriority: 90,

    categories: [
      "Land Rover",
      "OEM",
      "Used Parts"
    ]
  }
]