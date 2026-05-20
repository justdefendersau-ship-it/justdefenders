// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\logic\vinDecoder.ts
// Timestamp: 14 May 2026 22:30 Sydney

export interface DecodedVIN {

  engine: string | null

  year: number | null

  model: string | null
}

export function decodeVIN(
  vin: string
): DecodedVIN {

  /**
   * Validation
   */
  if (
    !vin ||
    vin.length < 10
  ) {

    return {

      engine: null,

      year: null,

      model: null
    }
  }

  const normalizedVin =
    vin.toUpperCase()

  /**
   * Simplified Defender decoding
   */
  let engine: string | null =
    null

  let model: string | null =
    null

  let year: number | null =
    null

  /**
   * Example engine decoding
   */
  if (
    normalizedVin.includes("2A")
  ) {

    engine =
      "2.2L Duratorq TDCi"

  } else if (
    normalizedVin.includes("2B")
  ) {

    engine =
      "2.4L Duratorq TDCi"

  } else {

    engine =
      "Unknown Engine"
  }

  /**
   * Example model decoding
   */
  if (
    normalizedVin.includes("110")
  ) {

    model =
      "Defender 110"

  } else if (
    normalizedVin.includes("90")
  ) {

    model =
      "Defender 90"

  } else {

    model =
      "Defender"
  }

  /**
   * Simplified year decoding
   */
  const yearCode =
    normalizedVin.charAt(9)

  const yearMap:
    Record<string, number> = {

    A: 2010,
    B: 2011,
    C: 2012,
    D: 2013,
    E: 2014,
    F: 2015,
    G: 2016
  }

  year =
    yearMap[yearCode] ?? null

  return {

    engine,

    year,

    model
  }
}