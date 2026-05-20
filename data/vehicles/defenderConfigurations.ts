/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\data\vehicles\defenderConfigurations.ts
 *
 * Timestamp:
 * 18 May 2026 19:20 Sydney
 *
 * PURPOSE:
 * Canonical Defender Vehicle Configuration Matrix
 *
 * STRATEGY:
 * Single authoritative source for:
 * - procurement orchestration
 * - fitment intelligence
 * - VIN resolution
 * - compatibility logic
 * - drivetrain intelligence
 * - expedition procurement logic
 *
 * IMPORTANT:
 * DO NOT duplicate vehicle logic elsewhere.
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export interface DefenderConfiguration {

  id: string

  platform:
    "One Ten"
    |
    "Ninety"
    |
    "Defender"

  model: string

  engine: string

  years: string

  startYear: number

  endYear: number

  engineFamily: string

  fuelType:
    "Diesel"
    |
    "Petrol"

  drivetrain: string

  procurementCategory:
    "Legacy"
    |
    "Modern"

  expeditionPriority: boolean
}

// ============================================================
// CONFIGURATIONS
// ============================================================

export const DEFENDER_CONFIGURATIONS:
DefenderConfiguration[] = [

  // ==========================================================
  // ONE TEN
  // ==========================================================

  {

    id:
      "one-ten-4bd1",

    platform:
      "One Ten",

    model:
      "One Ten",

    engine:
      "3.9L Isuzu 4BD1",

    years:
      "1983-1990",

    startYear:
      1983,

    endYear:
      1990,

    engineFamily:
      "4BD1",

    fuelType:
      "Diesel",

    drivetrain:
      "LT95",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "one-ten-35",

    platform:
      "One Ten",

    model:
      "One Ten",

    engine:
      "3.5L",

    years:
      "1983-1990",

    startYear:
      1983,

    endYear:
      1990,

    engineFamily:
      "Rover V8",

    fuelType:
      "Petrol",

    drivetrain:
      "LT95",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      false
  },

  // ==========================================================
  // NINETY
  // ==========================================================

  {

    id:
      "ninety-25",

    platform:
      "Ninety",

    model:
      "Ninety",

    engine:
      "2.5L",

    years:
      "1984-1990",

    startYear:
      1984,

    endYear:
      1990,

    engineFamily:
      "2.5 NA",

    fuelType:
      "Diesel",

    drivetrain:
      "LT77",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "ninety-35",

    platform:
      "Ninety",

    model:
      "Ninety",

    engine:
      "3.5L",

    years:
      "1984-1990",

    startYear:
      1984,

    endYear:
      1990,

    engineFamily:
      "Rover V8",

    fuelType:
      "Petrol",

    drivetrain:
      "LT77",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      false
  },

  // ==========================================================
  // DEFENDER 90
  // ==========================================================

  {

    id:
      "defender-90-200tdi",

    platform:
      "Defender",

    model:
      "Defender 90",

    engine:
      "200Tdi",

    years:
      "1990-1994",

    startYear:
      1990,

    endYear:
      1994,

    engineFamily:
      "200Tdi",

    fuelType:
      "Diesel",

    drivetrain:
      "LT77",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-90-300tdi",

    platform:
      "Defender",

    model:
      "Defender 90",

    engine:
      "300Tdi",

    years:
      "1994-1998",

    startYear:
      1994,

    endYear:
      1998,

    engineFamily:
      "300Tdi",

    fuelType:
      "Diesel",

    drivetrain:
      "R380",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-90-td5",

    platform:
      "Defender",

    model:
      "Defender 90",

    engine:
      "Td5",

    years:
      "1998-2007",

    startYear:
      1998,

    endYear:
      2007,

    engineFamily:
      "Td5",

    fuelType:
      "Diesel",

    drivetrain:
      "R380",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-90-24",

    platform:
      "Defender",

    model:
      "Defender 90",

    engine:
      "Tdci 2.4",

    years:
      "2007-2012",

    startYear:
      2007,

    endYear:
      2012,

    engineFamily:
      "Puma 2.4",

    fuelType:
      "Diesel",

    drivetrain:
      "MT82",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-90-22",

    platform:
      "Defender",

    model:
      "Defender 90",

    engine:
      "Tdci 2.2",

    years:
      "2012-2016",

    startYear:
      2012,

    endYear:
      2016,

    engineFamily:
      "Puma 2.2",

    fuelType:
      "Diesel",

    drivetrain:
      "MT82",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  // ==========================================================
  // DEFENDER 110
  // ==========================================================

  {

    id:
      "defender-110-200tdi",

    platform:
      "Defender",

    model:
      "Defender 110",

    engine:
      "200Tdi",

    years:
      "1990-1994",

    startYear:
      1990,

    endYear:
      1994,

    engineFamily:
      "200Tdi",

    fuelType:
      "Diesel",

    drivetrain:
      "LT77",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-110-300tdi",

    platform:
      "Defender",

    model:
      "Defender 110",

    engine:
      "300Tdi",

    years:
      "1994-1998",

    startYear:
      1994,

    endYear:
      1998,

    engineFamily:
      "300Tdi",

    fuelType:
      "Diesel",

    drivetrain:
      "R380",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-110-td5",

    platform:
      "Defender",

    model:
      "Defender 110",

    engine:
      "Td5",

    years:
      "1998-2007",

    startYear:
      1998,

    endYear:
      2007,

    engineFamily:
      "Td5",

    fuelType:
      "Diesel",

    drivetrain:
      "R380",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-110-24",

    platform:
      "Defender",

    model:
      "Defender 110",

    engine:
      "Tdci 2.4",

    years:
      "2007-2012",

    startYear:
      2007,

    endYear:
      2012,

    engineFamily:
      "Puma 2.4",

    fuelType:
      "Diesel",

    drivetrain:
      "MT82",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-110-22",

    platform:
      "Defender",

    model:
      "Defender 110",

    engine:
      "Tdci 2.2",

    years:
      "2012-2016",

    startYear:
      2012,

    endYear:
      2016,

    engineFamily:
      "Puma 2.2",

    fuelType:
      "Diesel",

    drivetrain:
      "MT82",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  // ==========================================================
  // DEFENDER 130
  // ==========================================================

  {

    id:
      "defender-130-200tdi",

    platform:
      "Defender",

    model:
      "Defender 130",

    engine:
      "200Tdi",

    years:
      "1990-1994",

    startYear:
      1990,

    endYear:
      1994,

    engineFamily:
      "200Tdi",

    fuelType:
      "Diesel",

    drivetrain:
      "LT77",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-130-300tdi",

    platform:
      "Defender",

    model:
      "Defender 130",

    engine:
      "300Tdi",

    years:
      "1994-1998",

    startYear:
      1994,

    endYear:
      1998,

    engineFamily:
      "300Tdi",

    fuelType:
      "Diesel",

    drivetrain:
      "R380",

    procurementCategory:
      "Legacy",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-130-td5",

    platform:
      "Defender",

    model:
      "Defender 130",

    engine:
      "Td5",

    years:
      "1998-2007",

    startYear:
      1998,

    endYear:
      2007,

    engineFamily:
      "Td5",

    fuelType:
      "Diesel",

    drivetrain:
      "R380",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-130-24",

    platform:
      "Defender",

    model:
      "Defender 130",

    engine:
      "Tdci 2.4",

    years:
      "2007-2012",

    startYear:
      2007,

    endYear:
      2012,

    engineFamily:
      "Puma 2.4",

    fuelType:
      "Diesel",

    drivetrain:
      "MT82",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  },

  {

    id:
      "defender-130-22",

    platform:
      "Defender",

    model:
      "Defender 130",

    engine:
      "Tdci 2.2",

    years:
      "2012-2016",

    startYear:
      2012,

    endYear:
      2016,

    engineFamily:
      "Puma 2.2",

    fuelType:
      "Diesel",

    drivetrain:
      "MT82",

    procurementCategory:
      "Modern",

    expeditionPriority:
      true
  }
]