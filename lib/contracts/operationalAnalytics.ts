/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/operationalAnalytics.ts

   Timestamp:
   11 May 2026 21:15 (Sydney)

   PURPOSE:
   Operational analytics intelligence contract
===================================================== */

export interface OperationalAnalyticsContract {

  analyticsId: string

  analyticsType:

    | "procurement"
    | "fleet"
    | "inventory"
    | "workshop"
    | "route"

  metricName: string

  metricValue: number

  metricUnit?: string

  operationalStatus?:

    | "healthy"
    | "warning"
    | "critical"

  reportingPeriod?: string

  supportingFactors?: string[]

  recommendedActions?: string[]

  lastCalculated?: string
}
