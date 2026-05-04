export function scoreResults(results, vehicle) {

  if (!results || results.length === 0) {
    return { ranked: [], best: null }
  }

  // -------------------------
  // PRICE NORMALISATION
  // -------------------------
  const prices = results.map(r => r.totalAUD || 0)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  let ranked = results.map(item => {

    let priceScore = 100

    if (maxPrice !== minPrice) {
      priceScore =
        100 - ((item.totalAUD - minPrice) / (maxPrice - minPrice)) * 100
    }

    // -------------------------
    // FITMENT
    // -------------------------
    let fitScore = 0
    let fits = false

    if (vehicle && item.title) {

      const title = item.title.toLowerCase()

      if (
        title.includes("defender") &&
        title.includes("2.2")
      ) {
        fits = true
        fitScore = 50
      }
    }

    // -------------------------
    // QUALITY
    // -------------------------
    const qualityScore = getQualityScore(item)

    // -------------------------
    // FINAL SCORE
    // -------------------------
    const score = Math.round(
      priceScore * 0.5 +
      fitScore * 0.3 +
      qualityScore * 0.2
    )

    return {
      ...item,
      score,
      fits,
      qualityScore
    }
  })

  // -------------------------
  // PRICE RANKING (NEW)
  // -------------------------
  const sortedByPrice = [...ranked].sort((a, b) => a.totalAUD - b.totalAUD)

  sortedByPrice.forEach((item, index) => {
    const match = ranked.find(r => r.title === item.title)
    if (match) {
      match.priceRank = index + 1
    }
  })

  // -------------------------
  // FINAL SORT
  // -------------------------
  ranked.sort((a, b) => b.score - a.score)

  return {
    ranked,
    best: ranked[0]
  }
}

/* =========================
   QUALITY ENGINE
========================= */

function getQualityScore(item) {

  const name = (item.title || "").toLowerCase()
  const supplier = (item.supplier || "").toLowerCase()

  if (name.includes("genuine") || name.includes("oem")) {
    return 100
  }

  if (
    name.includes("bosch") ||
    name.includes("delphi") ||
    name.includes("denso")
  ) {
    return 90
  }

  if (supplier.includes("repco")) {
    return 85
  }

  if (supplier.includes("lr direct")) {
    return 88
  }

  if (supplier.includes("ebay")) {
    return 60
  }

  return 70
}
