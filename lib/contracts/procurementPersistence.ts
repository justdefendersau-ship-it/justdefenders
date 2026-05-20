/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/procurementPersistence.ts

   Timestamp:
   11 May 2026 16:45 (Sydney)

   PURPOSE:
   Procurement persistence operational contract
===================================================== */

export interface ProcurementPersistenceContract {

  id: string

  workflowName: string

  workflowType:

    | "touring_build"
    | "procurement_list"
    | "supplier_compare"
    | "expedition_package"

  vehicleModel?: string

  route?: string

  partNumbers: string[]

  supplierIds?: string[]

  status?:

    | "draft"
    | "active"
    | "completed"
    | "archived"

  estimatedTotal?: number

  createdAt?: string

  updatedAt?: string

  notes?: string[]
}
