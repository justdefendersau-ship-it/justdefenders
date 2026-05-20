/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\extractRepcoProducts.ts
 *
 * Timestamp:
 * 19 May 2026 21:35 Sydney
 *
 * PURPOSE:
 * Clean Production Repco Extraction
 * ============================================================
 */

import {
  ProcurementProduct
} from "@/types/procurement"

// ============================================================
// HELPERS
// ============================================================

function isValidProductTitle(
  text: string
): boolean {

  const cleaned =
    text.trim()

  // ==========================================================
  // INVALID
  // ==========================================================

  if(!cleaned){

    return false
  }

  if(cleaned.length < 6){

    return false
  }

  // ==========================================================
  // FILTER RATINGS
  // ==========================================================

  if(
    /^[0-9]\.[0-9]\([0-9]+\)$/
      .test(cleaned)
  ){

    return false
  }

  // ==========================================================
  // FILTER PRICE BLOCKS
  // ==========================================================

  if(
    cleaned.includes("$")
  ){

    return false
  }

  // ==========================================================
  // FILTER PROMO LABELS
  // ==========================================================

  const invalidTerms = [

    "OFF",
    "MULTI BUY",
    "COMBO DEAL",
    "Auto Club Price",
    "Shop Now"
  ]

  for(
    const term of invalidTerms
  ){

    if(
      cleaned.includes(term)
    ){

      return false
    }
  }

  // ==========================================================
  // MUST LOOK LIKE PRODUCT
  // ==========================================================

  return (
    cleaned.includes("-")
    ||
    cleaned.match(/[A-Z0-9]{3,}/)
  ) !== null
}

// ============================================================
// EXTRACTION
// ============================================================

export function extractRepcoProducts(

  domProducts: Array<{

    text?: string

    href?: string | null

    dataAttributes:
      Record<string,string>

  }>

): ProcurementProduct[] {

  const extracted:
    ProcurementProduct[] = []

  const seen =
    new Set<string>()

  for(
    let i = 0;
    i < domProducts.length;
    i++
  ){

    const current =
      domProducts[i]

    const next =
      domProducts[i + 1]

    if(
      !current?.href
    ){

      continue
    }

    // ========================================================
    // PRODUCT LINKS ONLY
    // ========================================================

    if(
      !current.href.includes("/p/")
    ){

      continue
    }

    const title =
      current.text
        ?.trim()

    if(
      !title
    ){

      continue
    }

    // ========================================================
    // VALIDATION
    // ========================================================

    if(
      !isValidProductTitle(title)
    ){

      continue
    }

    // ========================================================
    // DEDUPE
    // ========================================================

    if(
      seen.has(current.href)
    ){

      continue
    }

    seen.add(current.href)

    // ========================================================
    // PRICE EXTRACTION
    // ========================================================

    let standardPrice:
      number | undefined

    let clubPrice:
      number | undefined

    const priceText =
      next?.text || ""

    const prices =
      priceText.match(
        /\$[0-9]+(\.[0-9]+)?/g
      )

    if(prices?.[0]){

      standardPrice =
        parseFloat(
          prices[0]
            .replace("$","")
        )
    }

    if(prices?.[1]){

      clubPrice =
        parseFloat(
          prices[1]
            .replace("$","")
        )
    }

    // ========================================================
    // SKU
    // ========================================================

    const skuMatch =
      current.href.match(
        /\/p\/([A-Z0-9]+)/i
      )

    const sku =
      skuMatch?.[1]

    // ========================================================
    // CATEGORY
    // ========================================================

    const categoryMatch =
      current.href.match(
        /^\/([^/]+)\//
      )

    const category =
      categoryMatch?.[1]
        ?.replace(/-/g," ")

    // ========================================================
    // BRAND
    // ========================================================

    const brand =
      title.split(" ")[0]

    // ========================================================
    // EXPEDITION FLAGGING
    // ========================================================

    const expeditionTerms = [

      "filter",
      "recovery",
      "battery",
      "oil",
      "diesel",
      "cleaner",
      "degreaser",
      "tool",
      "glove"
    ]

    const expeditionReady =
      expeditionTerms.some((term)=>

        title.toLowerCase()
          .includes(term)
      )

    // ========================================================
    // BUILD PRODUCT
    // ========================================================

    extracted.push({

      supplier:
        "Repco",

      title,

      brand,

      sku,

      category,

      url:
        `https://www.repco.com.au${current.href}`,

      standardPrice,

      clubPrice,

      expeditionReady,

      inStock:
        true
    })
  }

  return extracted
}