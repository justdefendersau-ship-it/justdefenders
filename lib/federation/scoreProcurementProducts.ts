/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\scoreProcurementProducts.ts
 *
 * Timestamp:
 * 19 May 2026 21:00 Sydney
 *
 * PURPOSE:
 * Procurement Product Scoring
 * ============================================================
 */

import {
  ProcurementProduct
} from "@/types/procurement"

export function scoreProcurementProducts(

  products:
    ProcurementProduct[]

): ProcurementProduct[] {

  return products.map((product)=>{

    let score = 0

    // ========================================================
    // PRICE
    // ========================================================

    if(
      product.clubPrice
    ){

      score += 20
    }

    if(
      product.tradePrice
    ){

      score += 20
    }

    // ========================================================
    // EXPEDITION
    // ========================================================

    if(
      product.expeditionReady
    ){

      score += 25
    }

    // ========================================================
    // STOCK
    // ========================================================

    if(
      product.inStock
    ){

      score += 15
    }

    // ========================================================
    // RATING
    // ========================================================

    if(
      product.rating
    ){

      score +=
        product.rating * 5
    }

    return {

      ...product,

      procurementScore:
        score
    }
  })
}