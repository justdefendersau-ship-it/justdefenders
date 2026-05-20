/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/inventoryIntelligence.ts

   Timestamp:
   11 May 2026 17:30 (Sydney)

   PURPOSE:
   Real-time inventory operational contract
===================================================== */

export interface InventoryIntelligenceContract {

  supplierId: string

  supplierName: string

  partNumber: string

  stockLevel?: number

  stockStatus?:

    | "in_stock"
    | "limited"
    | "backorder"
    | "out_of_stock"

  warehouseRegion?: string

  estimatedDispatchDays?: number

  inventoryConfidence?: number

  lastUpdated?: string

  operationalPriority?:

    | "critical"
    | "recommended"
    | "optional"

  expeditionSuitable?: boolean

  notes?: string[]
}
