/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/inventoryIntelligenceEngine.ts

   Timestamp:
   11 May 2026 17:30 (Sydney)

   PURPOSE:
   Supplier inventory aggregation engine
===================================================== */

import {

  InventoryIntelligenceContract

}
from "../contracts/inventoryIntelligence"

// =====================================================
// INVENTORY SEED
// =====================================================

const inventorySeed:
  InventoryIntelligenceContract[] = [

  {

    supplierId:
      "SUP-001",

    supplierName:
      "MR Automotive",

    partNumber:
      "PCH119890",

    stockLevel:12,

    stockStatus:
      "in_stock",

    warehouseRegion:
      "QLD",

    estimatedDispatchDays:1,

    inventoryConfidence:0.96,

    lastUpdated:
      new Date().toISOString(),

    operationalPriority:
      "critical",

    expeditionSuitable:true,

    notes:[

      "Remote touring stock priority"
    ]
  },

  {

    supplierId:
      "SUP-002",

    supplierName:
      "British Off Road",

    partNumber:
      "RTC3429",

    stockLevel:4,

    stockStatus:
      "limited",

    warehouseRegion:
      "QLD",

    estimatedDispatchDays:2,

    inventoryConfidence:0.91,

    lastUpdated:
      new Date().toISOString(),

    operationalPriority:
      "critical",

    expeditionSuitable:true
  },

  {

    supplierId:
      "SUP-003",

    supplierName:
      "LR Direct",

    partNumber:
      "ERR3340",

    stockLevel:0,

    stockStatus:
      "backorder",

    warehouseRegion:
      "UK",

    estimatedDispatchDays:10,

    inventoryConfidence:0.88,

    lastUpdated:
      new Date().toISOString(),

    operationalPriority:
      "recommended",

    expeditionSuitable:true
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getAllInventory(){

  return inventorySeed
}

// =====================================================
// PART LOOKUP
// =====================================================

export function getInventoryByPart(

  partNumber:string

){

  return inventorySeed.filter(

    item =>

      item.partNumber === partNumber
  )
}

// =====================================================
// HIGH PRIORITY
// =====================================================

export function getCriticalInventory(){

  return inventorySeed.filter(

    item =>

      item.operationalPriority
      ===
      "critical"
  )
}

// =====================================================
// EXPEDITION STOCK
// =====================================================

export function getExpeditionSuitableInventory(){

  return inventorySeed.filter(

    item =>

      item.expeditionSuitable === true
  )
}

// =====================================================
// STOCK HEALTH
// =====================================================

export function getInventoryHealthScore(){

  const total =
    inventorySeed.length

  const healthy =
    inventorySeed.filter(

      item =>

        item.stockStatus === "in_stock"
    ).length

  return Number(

    (
      healthy / total
    ).toFixed(2)
  )
}
