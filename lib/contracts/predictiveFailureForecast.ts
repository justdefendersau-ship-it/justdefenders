/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/predictiveFailureForecast.ts

   Timestamp:
   12 May 2026 01:00 (Sydney)

   PURPOSE:
   Predictive expedition failure forecasting contract
===================================================== */

export interface PredictiveFailureForecastContract {

  forecastId: string

  vehicleModel: string

  expeditionRoute?: string

  componentName: string

  predictedFailureProbability?: number

  operationalSeverity?:

    | "low"
    | "moderate"
    | "high"
    | "critical"

  estimatedFailureWindowKm?: number

  supportingSignals?: string[]

  recommendedMitigations?: string[]

  recommendedParts?: string[]

  operationalConfidence?: number

  forecastStatus?:

    | "monitoring"
    | "escalated"
    | "critical"

  generatedAt?: string
}
