// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\parts-intelligence\partsKnowledgeSeed.ts
// Timestamp: 14 May 2026 14:40 Sydney

export interface PartContract {
  id: string

  partNumber: string

  name: string

  category: string

  manufacturer: string

  oemEquivalent?: boolean

  compatibleVehicles: string[]

  compatibleRoutes?: string[]

  operationalNotes: string[]

  recommendedUse: string

  confidence: number
}

export const partsKnowledgeSeed: PartContract[] = [

  {
    id: "PART-001",

    partNumber: "TIMKEN-SET37",

    name: "Wheel Bearing Kit",

    category: "Driveline",

    manufacturer: "Timken",

    oemEquivalent: true,

    compatibleVehicles: [
      "Defender 90",
      "Defender 110",
      "Defender Puma 2.2"
    ],

    compatibleRoutes: [
      "Cape York",
      "Simpson Desert",
      "High Country",
      "Canning Stock Route"
    ],

    operationalNotes: [
      "Recommended for touring applications",
      "Suitable for heavy-duty usage",
      "High reliability aftermarket replacement"
    ],

    recommendedUse:
      "Touring / Overland / Daily Use",

    confidence: 94
  },

  {
    id: "PART-002",

    partNumber: "ARB-INTK-001",

    name: "Safari Snorkel Kit",

    category: "Air Intake",

    manufacturer: "ARB",

    oemEquivalent: false,

    compatibleVehicles: [
      "Defender 90",
      "Defender 110"
    ],

    compatibleRoutes: [
      "Cape York",
      "Kimberley",
      "Telegraph Track"
    ],

    operationalNotes: [
      "Improves water crossing capability",
      "Recommended for dusty environments",
      "Periodic inspection required"
    ],

    recommendedUse:
      "Remote Expedition Touring",

    confidence: 90
  },

  {
    id: "PART-003",

    partNumber: "OLDMANEMU-HD220",

    name: "Heavy Duty Suspension Kit",

    category: "Suspension",

    manufacturer: "Old Man Emu",

    oemEquivalent: false,

    compatibleVehicles: [
      "Defender 110",
      "Defender 130"
    ],

    compatibleRoutes: [
      "Simpson Desert",
      "Birdsville Track",
      "Oodnadatta Track"
    ],

    operationalNotes: [
      "Designed for increased payload",
      "Recommended for overland touring",
      "Wheel alignment required after install"
    ],

    recommendedUse:
      "Heavy Touring / Expedition Builds",

    confidence: 96
  }

]