/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/supplierApiIntegration.ts

   Timestamp:
   11 May 2026 18:15 (Sydney)

   PURPOSE:
   Supplier API integration operational contract
===================================================== */

export interface SupplierApiIntegrationContract {

  supplierId: string

  supplierName: string

  apiEnabled: boolean

  inventorySyncSupported?: boolean

  pricingSyncSupported?: boolean

  orderSubmissionSupported?: boolean

  webhookSupport?: boolean

  authType?:

    | "api_key"
    | "oauth"
    | "basic_auth"
    | "custom"

  syncFrequencyMinutes?: number

  operationalStatus?:

    | "active"
    | "degraded"
    | "offline"

  lastSuccessfulSync?: string

  notes?: string[]
}
