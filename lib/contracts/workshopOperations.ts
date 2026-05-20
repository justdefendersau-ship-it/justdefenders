/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/workshopOperations.ts

   Timestamp:
   11 May 2026 20:30 (Sydney)

   PURPOSE:
   Multi-user workshop operational contract
===================================================== */

export interface WorkshopOperationsContract {

  jobId: string

  workshopName: string

  assignedTechnician?: string

  vehicleModel: string

  routePreparation?: string

  serviceType?: string

  operationalPriority?:

    | "critical"
    | "recommended"
    | "standard"

  workflowStatus?:

    | "queued"
    | "in_progress"
    | "awaiting_parts"
    | "completed"

  requiredParts?: string[]

  estimatedCompletionHours?: number

  readinessImpact?: number

  createdAt?: string

  notes?: string[]
}
