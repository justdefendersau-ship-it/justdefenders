/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\oem\crossReferenceEngine.ts
 *
 * Timestamp:
 * 21 May 2026 22:08 Sydney
 *
 * PURPOSE:
 * OEM Cross Reference Intelligence Engine
 *
 * STRATEGY:
 * PASS 27C — OEM Cross-Reference Intelligence
 *
 * ============================================================
 */

import {

  OEM_DATABASE

} from "./oemDatabase"

export function findOEMCrossReference(

  query: string

){

  const normalized =
    query.trim().toUpperCase()

  return OEM_DATABASE.find(

    item =>

      item.oemPartNumber === normalized

      ||

      item.interchangeableWith
      .includes(normalized)
  )
}

export function getExpeditionRecommendations(){

  return OEM_DATABASE.filter(

    item =>

      item.expeditionSuitable
  )
}

export function getTradePriorityParts(){

  return OEM_DATABASE.filter(

    item =>

      item.tradeRecommended
  )
}