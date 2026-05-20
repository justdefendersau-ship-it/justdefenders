/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\normaliseSupplierResults.ts
 *
 * Timestamp:
 * 19 May 2026 16:50 Sydney
 *
 * PURPOSE:
 * Procurement Federation Normalisation Engine
 *
 * IMPORTANT:
 * Enhanced procurement intelligence scoring.
 *
 * STRATEGY:
 * - semantic filtering
 * - OEM relevance
 * - procurement confidence
 * - supplier relevance
 * - aftermarket tolerance
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export type RawSupplierRecord = {

  title: string

  price?: string

  url?: string

  stock?: string

  delivery?: string

  confidence?: number
}

export type NormalisedSupplierRecord = {

  title: string

  price?: string

  url?: string

  stock?: string

  delivery?: string

  confidence: number

  relevanceScore: number

  rejected: boolean

  rejectionReason?: string
}

// ============================================================
// NORMALISATION
// ============================================================

export function normaliseSupplierResults(

  searchTerm: string,

  records: RawSupplierRecord[]

): NormalisedSupplierRecord[] {

  const normalisedSearch =
    searchTerm
      .toLowerCase()
      .trim()

  const searchTokens =
    normalisedSearch.split(" ")

  return records.map((record)=>{

    const title =
      record.title
        .toLowerCase()

    let relevanceScore = 0

    let rejected = false

    let rejectionReason:
      string | undefined

    // ========================================================
    // EXACT MATCH
    // ========================================================

    if(
      title.includes(
        normalisedSearch
      )
    ){

      relevanceScore += 60
    }

    // ========================================================
    // TOKEN MATCHING
    // ========================================================

    searchTokens.forEach((token)=>{

      if(
        title.includes(token)
      ){

        relevanceScore += 12
      }
    })

    // ========================================================
    // LAND ROVER TERMS
    // ========================================================

    const landRoverTerms = [

      "defender",
      "land rover",
      "tdi",
      "td5",
      "puma",
      "diesel",
      "oil filter",
      "filter",
      "fuel filter",
      "air filter"
    ]

    landRoverTerms.forEach((term)=>{

      if(
        title.includes(term)
      ){

        relevanceScore += 8
      }
    })

    // ========================================================
    // PROCUREMENT BOOSTS
    // ========================================================

    const procurementTerms = [

      "ryco",
      "sakura",
      "wesfil",
      "wix",
      "oem"
    ]

    procurementTerms.forEach((term)=>{

      if(
        title.includes(term)
      ){

        relevanceScore += 5
      }
    })

    // ========================================================
    // IRRELEVANT TERMS
    // ========================================================

    const irrelevantTerms = [

      "tape",
      "wash",
      "flush",
      "cleaner",
      "air freshener"
    ]

    irrelevantTerms.forEach((term)=>{

      if(
        title.includes(term)
      ){

        relevanceScore -= 30
      }
    })

    // ========================================================
    // MINIMUM CONFIDENCE
    // ========================================================

    if(relevanceScore < 5){

      rejected = true

      rejectionReason =
        "Low procurement relevance"
    }

    // ========================================================
    // RETURN
    // ========================================================

    return {

      title:
        record.title,

      price:
        record.price,

      url:
        record.url,

      stock:
        record.stock,

      delivery:
        record.delivery,

      confidence:
        record.confidence || 70,

      relevanceScore,

      rejected,

      rejectionReason
    }

  })

  // ==========================================================
  // FILTER + SORT
  // ==========================================================

  .filter((record)=>
    !record.rejected
  )

  .sort((
    a,
    b
  )=>

    b.relevanceScore
    -
    a.relevanceScore
  )
}