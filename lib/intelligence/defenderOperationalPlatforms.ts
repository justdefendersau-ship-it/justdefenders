/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\vehicles\defenderOperationalPlatforms.ts
 *
 * Timestamp:
 * 17 May 2026 20:40 Sydney
 *
 * PURPOSE:
 * Canonical Defender Operational Platform Registry
 *
 * STRATEGY:
 * Core compatibility + procurement intelligence layer
 * ============================================================
 */

export interface DefenderOperationalPlatform {

  id: string

  model: string

  body: string

  generation: string

  engine: string

  engineCode: string

  productionStart: number

  productionEnd: number

  fuelType: string

  expeditionPriority: number

  procurementComplexity: number

  aiProfile: string

  tags: string[]
}

// ============================================================
// DEFENDER OPERATIONAL PLATFORMS
// ============================================================

export const DEFENDER_OPERATIONAL_PLATFORMS:
DefenderOperationalPlatform[] = [

  // ==========================================================
  // ONE TEN
  // ==========================================================

  {
    id: "oneten-isuzu-4bd1",

    model: "One Ten",

    body: "110",

    generation: "Pre-Defender",

    engine: "3.9L Isuzu Diesel",

    engineCode: "4BD1",

    productionStart: 1983,

    productionEnd: 1990,

    fuelType: "Diesel",

    expeditionPriority: 99,

    procurementComplexity: 95,

    aiProfile: "Extreme Expedition Platform",

    tags: [
      "isuzu",
      "4bd1",
      "expedition",
      "rare"
    ]
  },

  {
    id: "oneten-v8-35",

    model: "One Ten",

    body: "110",

    generation: "Pre-Defender",

    engine: "3.5L V8",

    engineCode: "3.5V8",

    productionStart: 1983,

    productionEnd: 1990,

    fuelType: "Petrol",

    expeditionPriority: 70,

    procurementComplexity: 72,

    aiProfile: "Classic V8 Platform",

    tags: [
      "v8",
      "classic",
      "petrol"
    ]
  },

  // ==========================================================
  // NINETY
  // ==========================================================

  {
    id: "ninety-25",

    model: "Ninety",

    body: "90",

    generation: "Pre-Defender",

    engine: "2.5L",

    engineCode: "2.5NA",

    productionStart: 1984,

    productionEnd: 1990,

    fuelType: "Diesel",

    expeditionPriority: 82,

    procurementComplexity: 74,

    aiProfile: "Classic Utility Platform",

    tags: [
      "classic",
      "diesel",
      "utility"
    ]
  },

  {
    id: "ninety-v8-35",

    model: "Ninety",

    body: "90",

    generation: "Pre-Defender",

    engine: "3.5L V8",

    engineCode: "3.5V8",

    productionStart: 1984,

    productionEnd: 1990,

    fuelType: "Petrol",

    expeditionPriority: 68,

    procurementComplexity: 71,

    aiProfile: "Classic V8 Platform",

    tags: [
      "v8",
      "classic",
      "petrol"
    ]
  },

  // ==========================================================
  // DEFENDER 90
  // ==========================================================

  {
    id: "defender90-200tdi",

    model: "Defender 90",

    body: "90",

    generation: "200Tdi",

    engine: "2.5L 200Tdi",

    engineCode: "200Tdi",

    productionStart: 1990,

    productionEnd: 1994,

    fuelType: "Diesel",

    expeditionPriority: 95,

    procurementComplexity: 84,

    aiProfile: "Mechanical Expedition Platform",

    tags: [
      "200tdi",
      "mechanical",
      "expedition"
    ]
  },

  {
    id: "defender90-300tdi",

    model: "Defender 90",

    body: "90",

    generation: "300Tdi",

    engine: "2.5L 300Tdi",

    engineCode: "300Tdi",

    productionStart: 1994,

    productionEnd: 1998,

    fuelType: "Diesel",

    expeditionPriority: 96,

    procurementComplexity: 78,

    aiProfile: "Global Expedition Platform",

    tags: [
      "300tdi",
      "expedition",
      "mechanical"
    ]
  },

  {
    id: "defender90-td5",

    model: "Defender 90",

    body: "90",

    generation: "Td5",

    engine: "2.5L Td5",

    engineCode: "Td5",

    productionStart: 1998,

    productionEnd: 2007,

    fuelType: "Diesel",

    expeditionPriority: 92,

    procurementComplexity: 81,

    aiProfile: "Electronic Expedition Platform",

    tags: [
      "td5",
      "electronic",
      "touring"
    ]
  },

  {
    id: "defender90-puma24",

    model: "Defender 90",

    body: "90",

    generation: "Tdci 2.4",

    engine: "2.4L Tdci",

    engineCode: "Puma2.4",

    productionStart: 2007,

    productionEnd: 2012,

    fuelType: "Diesel",

    expeditionPriority: 93,

    procurementComplexity: 88,

    aiProfile: "Modern Expedition Platform",

    tags: [
      "puma",
      "2.4",
      "tdci"
    ]
  },

  {
    id: "defender90-puma22",

    model: "Defender 90",

    body: "90",

    generation: "Tdci 2.2",

    engine: "2.2L Tdci",

    engineCode: "Puma2.2",

    productionStart: 2012,

    productionEnd: 2016,

    fuelType: "Diesel",

    expeditionPriority: 94,

    procurementComplexity: 90,

    aiProfile: "Late Puma Expedition Platform",

    tags: [
      "puma",
      "2.2",
      "tdci"
    ]
  }

  // ==========================================================
  // NOTE
  // ==========================================================
  // Additional:
  // - Defender 110
  // - Defender 130
  // platforms continue next expansion phase
  // to maintain manageable deployment size.
  // ==========================================================
]