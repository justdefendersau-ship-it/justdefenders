/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/procurementAutomation.ts

   Timestamp:
   11 May 2026 19:45 (Sydney)

   PURPOSE:
   Automated procurement orchestration contract
===================================================== */

export interface ProcurementAutomationContract {

  automationId: string

  workflowName: string

  vehicleModel?: string

  route?: string

  monitoredPartNumbers: string[]

  automationStatus?:

    | "active"
    | "paused"
    | "triggered"
    | "completed"

  triggerType?:

    | "low_stock"
    | "route_preparation"
    | "critical_failure"
    | "inventory_change"

  recommendedSupplier?: string

  recommendedAction?: string

  automationConfidence?: number

  operationalPriority?:

    | "critical"
    | "recommended"
    | "optional"

  lastEvaluation?: string

  notes?: string[]
}
