export function decodeVIN(vin) {
  if (!vin || vin.length < 10) return { engine: null, year: null, model: null }

  vin = vin.toUpperCase()

  // YEAR CODE (Position 10)
  const yearCode = vin[9]

  const yearMap = {
    V: 1997, W: 1998, X: 1999, Y: 2000,
    1: 2001, 2: 2002, 3: 2003, 4: 2004,
    5: 2005, 6: 2006, 7: 2007, 8: 2008,
    9: 2009, A: 2010, B: 2011, C: 2012,
    D: 2013, E: 2014, F: 2015, G: 2016
  }

  const year = yearMap[yearCode] || null

  let engine = null
  let model = null

  // DEFENDER ENGINE + MODEL LOGIC
  if (year >= 1998 && year <= 2007) engine = 'Td5'
  else if (year >= 2007 && year <= 2012) engine = '2.4TDCi'
  else if (year >= 2012 && year <= 2016) engine = '2.2TDCi'
  else if (year >= 1994 && year < 1998) engine = '300Tdi'
  else if (year >= 1990 && year < 1994) engine = '200Tdi'
  else if (year >= 1983 && year < 1990) engine = '4BD1 / V8'

  // BASIC MODEL SPLIT (VIN POSITION 4-5 TYPICALLY)
  const modelCode = vin.substring(3,5)

  if (modelCode.includes('DH')) model = 'Defender 110'
  else if (modelCode.includes('LD')) model = 'Defender 90'
  else model = 'Defender'

  return { engine, year, model }
}
