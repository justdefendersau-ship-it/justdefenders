/* =====================================================
   JustDefenders ©
   Supplier Part Contract
===================================================== */

export interface SupplierPartContract {

  id: string

  supplierName: string

  supplierType:

    | "OEM"
    | "Aftermarket"
    | "Workshop"

  supplierRegion: string

  physicalStore: boolean

  onlineOnly: boolean

  mapLink?: string

  partNumber: string

  compatibleVehicles: string[]

  brand?: string

  oemEquivalent?: boolean

  touringGrade?: boolean

  stockStatus:

    | "in_stock"
    | "limited"
    | "backorder"

  retailPrice?: number

  tradePrice?: number

  estimatedDeliveryDays?: number

  supplierConfidence?: number

  routeSuitability?: string[]

  operationalNotes?: string[]
}
