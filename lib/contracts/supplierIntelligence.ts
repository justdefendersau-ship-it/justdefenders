/* =====================================================
   JustDefenders ©
   Supplier Intelligence Contract
===================================================== */

import {

  OperationalIntelligenceContract

}
from "./operationalIntelligence"

export interface SupplierIntelligenceContract
extends OperationalIntelligenceContract {

  supplierName: string

  supplierType:

    | "OEM"
    | "Aftermarket"
    | "Workshop"

  stockStatus:

    | "in_stock"
    | "limited"
    | "backorder"

  estimatedDelivery?: string

  price?: number

  supplierConfidence?: number

  supplierLocation?: string
}
