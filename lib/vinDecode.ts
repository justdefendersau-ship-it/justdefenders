/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\vinDecode.ts

   Timestamp:
   2026-05-07 08:00

   Purpose:
   - Intelligent VIN decoding
   - Defender support 1983-2016
   - Engine + year + platform inference
===================================================== */

export type DecodedVIN = {

  vin: string

  valid: boolean

  manufacturer: string

  model: string

  year: number | null

  platform: string

  body: string

  engine: string

  fuel: string

  drivetrain: string

  generation: string

  notes: string[]
}

// =====================================================
// MODEL YEAR MAP
// Defender / Land Rover VIN year codes
// =====================================================

const YEAR_CODES: Record<string, number> = {

  D: 1983,
  E: 1984,
  F: 1985,
  G: 1986,
  H: 1987,
  J: 1988,
  K: 1989,
  L: 1990,
  M: 1991,
  N: 1992,
  P: 1993,
  R: 1994,
  S: 1995,
  T: 1996,
  V: 1997,
  W: 1998,
  X: 1999,
  Y: 2000,

  1: 2001,
  2: 2002,
  3: 2003,
  4: 2004,
  5: 2005,
  6: 2006,
  7: 2007,
  8: 2008,
  9: 2009,

  A: 2010,
  B: 2011,
  C: 2012,
  D2: 2013,
  E2: 2014,
  F2: 2015,
  G2: 2016
}

// =====================================================
// ENGINE DETECTION
// =====================================================

function detectEngine(
  vin: string,
  year: number | null
){

  const lower =
    vin.toLowerCase()

  // =====================================================
  // TDCI / PUMA
  // =====================================================

  if(
    year &&
    year >= 2007
  ){

    return {
      engine:"2.4 / 2.2 Puma TDCi",
      fuel:"Diesel",
      generation:"Puma"
    }
  }

  // =====================================================
  // TD5
  // =====================================================

  if(
    year &&
    year >= 1998 &&
    year <= 2006
  ){

    return {
      engine:"2.5 TD5",
      fuel:"Diesel",
      generation:"TD5"
    }
  }

  // =====================================================
  // 300TDI
  // =====================================================

  if(
    year &&
    year >= 1994 &&
    year <= 1998
  ){

    return {
      engine:"300Tdi",
      fuel:"Diesel",
      generation:"300Tdi"
    }
  }

  // =====================================================
  // 200TDI
  // =====================================================

  if(
    year &&
    year >= 1990 &&
    year <= 1994
  ){

    return {
      engine:"200Tdi",
      fuel:"Diesel",
      generation:"200Tdi"
    }
  }

  // =====================================================
  // EARLY NA / V8
  // =====================================================

  return {
    engine:"2.5 NA / V8",
    fuel:"Diesel / Petrol",
    generation:"Early Defender"
  }
}

// =====================================================
// BODY DETECTION
// =====================================================

function detectBody(vin: string){

  // =====================================================
  // COMMON BODY IDENTIFIERS
  // =====================================================

  if(vin.includes("90")){

    return {
      body:"90",
      platform:"Defender 90"
    }
  }

  if(vin.includes("110")){

    return {
      body:"110",
      platform:"Defender 110"
    }
  }

  if(vin.includes("130")){

    return {
      body:"130",
      platform:"Defender 130"
    }
  }

  // =====================================================
  // FALLBACK
  // =====================================================

  return {
    body:"Unknown",
    platform:"Defender"
  }
}

// =====================================================
// MAIN DECODER
// =====================================================

export function decodeVIN(
  rawVIN: string
): DecodedVIN {

  const vin =
    rawVIN
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")

  // =====================================================
  // BASE RESULT
  // =====================================================

  const base: DecodedVIN = {

    vin,

    valid:false,

    manufacturer:"Unknown",

    model:"Unknown",

    year:null,

    platform:"Unknown",

    body:"Unknown",

    engine:"Unknown",

    fuel:"Unknown",

    drivetrain:"4WD",

    generation:"Unknown",

    notes:[]
  }

  // =====================================================
  // VALIDATION
  // =====================================================

  if(vin.length !== 17){

    base.notes.push(
      "VIN must be 17 characters"
    )

    return base
  }

  if(/[IOQ]/.test(vin)){

    base.notes.push(
      "VIN contains invalid characters"
    )

    return base
  }

  // =====================================================
  // LAND ROVER WMI
  // =====================================================

  const wmi =
    vin.substring(0,3)

  if(wmi === "SAL"){

    base.manufacturer =
      "Land Rover"

  } else {

    base.notes.push(
      "Unknown manufacturer"
    )

    return base
  }

  // =====================================================
  // YEAR
  // =====================================================

  const yearCode =
    vin[9]

  let year =
    YEAR_CODES[yearCode]

  // =====================================================
  // HANDLE 2013-2016 DUPLICATES
  // =====================================================

  if(
    yearCode === "D" &&
    vin.startsWith("SAL")
  ){
    year = 1983
  }

  // =====================================================
  // BODY / PLATFORM
  // =====================================================

  const body =
    detectBody(vin)

  // =====================================================
  // ENGINE
  // =====================================================

  const engine =
    detectEngine(vin, year)

  // =====================================================
  // BUILD RESULT
  // =====================================================

  return {

    vin,

    valid:true,

    manufacturer:"Land Rover",

    model:"Defender",

    year:year || null,

    platform:body.platform,

    body:body.body,

    engine:engine.engine,

    fuel:engine.fuel,

    drivetrain:"4WD",

    generation:engine.generation,

    notes:[]
  }
}
