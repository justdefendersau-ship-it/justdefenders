/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/commercialPartnerIntegration.ts

   Timestamp:
   11 May 2026 23:30 (Sydney)

   PURPOSE:
   Commercial partner integration contract
===================================================== */

export interface CommercialPartnerIntegrationContract {

  partnerId: string

  partnerName: string

  partnerType?:

    | "supplier"
    | "workshop"
    | "affiliate"
    | "logistics"
    | "fleet"

  operationalRegions?: string[]

  integrationStatus?:

    | "active"
    | "pending"
    | "offline"

  affiliateEnabled?: boolean

  apiIntegrationEnabled?: boolean

  expeditionPrograms?: string[]

  revenueSharePercentage?: number

  operationalConfidence?: number

  commercialNotes?: string[]

  lastUpdated?: string
}
