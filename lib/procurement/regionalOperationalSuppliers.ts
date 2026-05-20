/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\procurement\regionalOperationalSuppliers.ts
 *
 * Timestamp:
 * 17 May 2026 18:55 Sydney
 *
 * PURPOSE:
 * Regional Operational Procurement Supplier Graph
 *
 * STRATEGY:
 * Multi-region operational procurement architecture
 *
 * INITIAL REGIONS:
 * - Australia
 * - New Zealand (planned)
 *
 * FUTURE REGIONS:
 * - UK
 * - South Africa
 * - EU
 * - North America
 * ============================================================
 */

export interface RegionalOperationalSupplier {

  id: string

  name: string

  country: string

  region: string

  website: string

  email?: string

  phone?: string

  address?: string

  expeditionCapable: boolean

  operationalPriority: number

  oemPriority: number

  logisticsScore: number

  regionalFulfilmentScore: number

  categories: string[]

  tags: string[]
}

// ============================================================
// REGIONAL OPERATIONAL SUPPLIERS
// ============================================================

export const REGIONAL_OPERATIONAL_SUPPLIERS:
RegionalOperationalSupplier[] = [

  // ==========================================================
  // AUSTRALIA
  // ==========================================================

  {
    id: "au-4wd-industries",

    name: "4WD Industries",

    country: "AU",

    region: "NSW",

    website:
      "https://4wdindustries.com.au",

    email:
      "info@4wdindustries.com.au",

    phone:
      "(02) 4933 3766",

    address:
      "257 High St, Maitland NSW 2320",

    expeditionCapable: true,

    operationalPriority: 84,

    oemPriority: 72,

    logisticsScore: 82,

    regionalFulfilmentScore: 88,

    categories: [
      "4WD",
      "Accessories",
      "Touring"
    ],

    tags: [
      "expedition",
      "touring",
      "accessories"
    ]
  },

  {
    id: "au-allfourx4",

    name: "All Four x 4 Spares",

    country: "AU",

    region: "NSW",

    website:
      "https://allfourx4.com.au",

    phone:
      "(02) 4041 4000",

    address:
      "Kotara NSW 2289",

    expeditionCapable: true,

    operationalPriority: 94,

    oemPriority: 88,

    logisticsScore: 91,

    regionalFulfilmentScore: 93,

    categories: [
      "OEM",
      "Defender",
      "Used Parts"
    ],

    tags: [
      "land-rover",
      "defender",
      "oem"
    ]
  },

  {
    id: "au-british-offroad",

    name: "British Off Road",

    country: "AU",

    region: "QLD",

    website:
      "https://britishoffroad.com",

    email:
      "info@britishoffroad.com",

    phone:
      "(07) 5445 1094",

    address:
      "Sunshine Coast QLD 4555",

    expeditionCapable: true,

    operationalPriority: 96,

    oemPriority: 92,

    logisticsScore: 94,

    regionalFulfilmentScore: 95,

    categories: [
      "Defender",
      "OEM",
      "Expedition"
    ],

    tags: [
      "expedition",
      "touring",
      "remote"
    ]
  },

  {
    id: "au-davis-performance",

    name: "Davis Performance Landys",

    country: "AU",

    region: "NSW",

    website:
      "https://davisperformance.com.au",

    email:
      "spares@davisperformance.com",

    phone:
      "(02) 9679 1978",

    address:
      "South Windsor NSW",

    expeditionCapable: true,

    operationalPriority: 95,

    oemPriority: 93,

    logisticsScore: 90,

    regionalFulfilmentScore: 91,

    categories: [
      "Performance",
      "TDCi",
      "OEM"
    ],

    tags: [
      "puma",
      "tdci",
      "performance"
    ]
  },

  {
    id: "au-graeme-cooper",

    name: "Graeme Cooper Automotive",

    country: "AU",

    region: "NSW",

    website:
      "https://graemecooper.com.au",

    email:
      "enquiries@graemecooper.com.au",

    phone:
      "(02) 9550 2689",

    address:
      "St Peters NSW",

    expeditionCapable: true,

    operationalPriority: 92,

    oemPriority: 94,

    logisticsScore: 89,

    regionalFulfilmentScore: 90,

    categories: [
      "OEM",
      "Workshop",
      "Defender"
    ],

    tags: [
      "land-rover",
      "service",
      "oem"
    ]
  },

  {
    id: "au-mr-automotive",

    name: "M.R. Automotive",

    country: "AU",

    region: "QLD",

    website:
      "https://mrautomotive.com.au",

    email:
      "parts@mrautomotive.com.au",

    phone:
      "(07) 3284 6688",

    address:
      "Redcliffe QLD 4020",

    expeditionCapable: true,

    operationalPriority: 98,

    oemPriority: 95,

    logisticsScore: 97,

    regionalFulfilmentScore: 98,

    categories: [
      "Defender",
      "TDCi",
      "OEM",
      "Expedition"
    ],

    tags: [
      "puma",
      "expedition",
      "remote",
      "touring"
    ]
  },

  {
    id: "au-rovacraft",

    name: "Rovacraft",

    country: "AU",

    region: "National",

    website:
      "https://rovacraft.com.au",

    email:
      "info@rovacraft.com.au",

    phone:
      "(08) 9377 0080",

    address:
      "Australia Wide",

    expeditionCapable: true,

    operationalPriority: 93,

    oemPriority: 91,

    logisticsScore: 94,

    regionalFulfilmentScore: 96,

    categories: [
      "OEM",
      "National Distribution"
    ],

    tags: [
      "distribution",
      "national",
      "oem"
    ]
  },

  {
    id: "au-tr-spares",

    name: "TR Spares",

    country: "AU",

    region: "NSW",

    website:
      "https://trspares.com.au",

    email:
      "sales@trspares.com.au",

    phone:
      "(02) 9709 5611",

    address:
      "Padstow NSW 2211",

    expeditionCapable: true,

    operationalPriority: 89,

    oemPriority: 90,

    logisticsScore: 88,

    regionalFulfilmentScore: 90,

    categories: [
      "OEM",
      "Used Parts",
      "Defender"
    ],

    tags: [
      "land-rover",
      "used-parts",
      "oem"
    ]
  },

  // ==========================================================
  // NEW ZEALAND
  // ==========================================================

  {
    id: "nz-placeholder-market",

    name: "NZ Operational Supplier Network",

    country: "NZ",

    region: "North Island",

    website:
      "https://example-nz-supplier.nz",

    expeditionCapable: true,

    operationalPriority: 75,

    oemPriority: 74,

    logisticsScore: 78,

    regionalFulfilmentScore: 80,

    categories: [
      "Defender",
      "Touring"
    ],

    tags: [
      "nz-market",
      "future-deployment"
    ]
  }
]