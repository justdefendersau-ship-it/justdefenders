/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/platformMonetisation.ts

   Timestamp:
   12 May 2026 00:15 (Sydney)

   PURPOSE:
   Platform monetisation intelligence contract
===================================================== */

export interface PlatformMonetisationContract {

  monetisationId: string

  revenueStreamType?:

    | "affiliate"
    | "subscription"
    | "fleet_operations"
    | "workshop"
    | "enterprise"

  operationalRegion?: string

  monthlyRevenue?: number

  monthlyTransactions?: number

  conversionRate?: number

  operationalHealth?:

    | "healthy"
    | "warning"
    | "critical"

  topPartners?: string[]

  growthPercentage?: number

  operationalInsights?: string[]

  recommendedActions?: string[]

  calculatedAt?: string
}
