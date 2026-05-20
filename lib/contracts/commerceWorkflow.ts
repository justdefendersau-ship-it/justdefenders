/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/commerceWorkflow.ts

   Timestamp:
   11 May 2026 14:35 (Sydney)

   PURPOSE:
   Commerce workflow operational contract
===================================================== */

export interface CommerceWorkflowContract {

  id: string

  workflowType:

    | "touring_loadout"
    | "procurement"
    | "supplier_compare"
    | "expedition_build"

  vehicleModel?: string

  route?: string

  partNumbers: string[]

  supplierIds?: string[]

  estimatedTotal?: number

  operationalPriority?:

    | "critical"
    | "recommended"
    | "optional"

  createdAt?: string
}
