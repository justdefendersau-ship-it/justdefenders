// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\predictive\predictiveTypes.ts
// Timestamp: 15 May 2026 08:00 Sydney
// ====================================================================

export interface PredictiveMaintenanceInsight {

  id: string

  vin: string

  category: string

  severity: string

  prediction: string

  recommendation: string

  generatedAt: string
}

export interface PredictiveRequest {

  vin: string

  mileage?: number

  engine?: string

  model?: string
}