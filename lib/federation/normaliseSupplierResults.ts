/**
 * ==================================================================================================
 *
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\normaliseSupplierResults.ts
 *
 * Timestamp:
 * 16th August 2026 08:52 Sydney
 *
 * PURPOSE:
 * Procurement Federation Normalisation Engine
 *
 * IMPORTANT:
 * Enhanced procurement intelligence scoring.
 *
 * EU-008 PURPOSE:
 * Preserve supplier/product identity and available acquisition provenance
 * through the existing normalisation boundary without introducing a
 * second supplier-product model.
 *
 * STRATEGY:
 * - semantic filtering
 * - OEM relevance
 * - procurement confidence
 * - supplier relevance
 * - aftermarket tolerance
 *
 * ==================================================================================================
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

  // ==========================================================
  // EU-008 SUPPLIER IDENTITY
  // ==========================================================

  supplierId?: string

  supplierName?: string

  supplierType?: string

  region?: string

  supplierSku?: string

  oemPartNumber?: string

  brand?: string

  // ==========================================================
  // EU-008 ACQUISITION / PROVENANCE
  // ==========================================================

  sourceUrl?: string

  acquisitionSource?: string

  acquiredAt?: string

  acquisitionTimestamp?: string

  provenance?: string

  freshness?: string

  federationNode?: string

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

  // ==========================================================
  // EU-008 SUPPLIER IDENTITY
  // ==========================================================

  supplierId?: string

  supplierName?: string

  supplierType?: string

  region?: string

  supplierSku?: string

  oemPartNumber?: string

  brand?: string

  // ==========================================================
  // EU-008 ACQUISITION / PROVENANCE
  // ==========================================================

  sourceUrl?: string

  acquisitionSource?: string

  acquiredAt?: string

  acquisitionTimestamp?: string

  provenance?: string

  freshness?: string

  federationNode?: string

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

        record.url ||

        record.sourceUrl,

      stock:

        record.stock,

      delivery:

        record.delivery,

      confidence:

        record.confidence || 70,

      relevanceScore,

      rejected,

      rejectionReason,

      // ======================================================
      // EU-008 SUPPLIER IDENTITY
      // ======================================================

      supplierId:

        record.supplierId,

      supplierName:

        record.supplierName,

      supplierType:

        record.supplierType,

      region:

        record.region,

      supplierSku:

        record.supplierSku,

      oemPartNumber:

        record.oemPartNumber,

      brand:

        record.brand,

      // ======================================================
      // EU-008 ACQUISITION / PROVENANCE
      // ======================================================

      sourceUrl:

        record.sourceUrl ||

        record.url,

      acquisitionSource:

        record.acquisitionSource,

      acquiredAt:

        record.acquiredAt,

      acquisitionTimestamp:

        record.acquisitionTimestamp ||

        record.acquiredAt,

      provenance:

        record.provenance,

      freshness:

        record.freshness,

      federationNode:

        record.federationNode

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