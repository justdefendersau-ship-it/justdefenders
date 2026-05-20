/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/enterpriseFleetOperations.ts

   Timestamp:
   11 May 2026 22:45 (Sydney)

   PURPOSE:
   Enterprise fleet operational intelligence contract
===================================================== */

export interface EnterpriseFleetOperationsContract {

  enterpriseFleetId: string

  organisationName: string

  operationalRegions: string[]

  managedFleets: string[]

  operationalCommandStatus?:

    | "normal"
    | "elevated"
    | "critical"

  expeditionPrograms?: string[]

  activeDeployments?: number

  readinessScore?: number

  operationalRisks?: string[]

  escalationActions?: string[]

  createdAt?: string
}
