export function evaluateCompatibility(part, vehicle) {

  if (!vehicle || !vehicle.engine || !vehicle.year) {
    return { compatible: true, scoreBoost: 0 }
  }

  let engineMatch = false
  let yearMatch = false

  // ENGINE MATCH
  if (part.engine) {
    engineMatch = part.engine.includes(vehicle.engine)
  }

  // YEAR MATCH
  if (part.years) {
    yearMatch = part.years.includes(vehicle.year)
  }

  // STRICT FILTERING
  if (part.engine || part.years) {
    if (!engineMatch || !yearMatch) {
      return { compatible: false, scoreBoost: -1000 }
    }
  }

  // UNKNOWN DATA PENALTY
  if (!part.engine && !part.years) {
    return { compatible: true, scoreBoost: -20 }
  }

  // STRONG MATCH BOOST
  if (engineMatch && yearMatch) {
    return { compatible: true, scoreBoost: 50 }
  }

  return { compatible: true, scoreBoost: 0 }
}
