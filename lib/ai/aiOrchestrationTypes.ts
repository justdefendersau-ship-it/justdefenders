// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\ai\aiOrchestrationTypes.ts
// Timestamp: 15 May 2026 08:15 Sydney
// ====================================================================

export type AiTaskType =

  | "predictive-analysis"
  | "supplier-ranking"
  | "vehicle-diagnostics"
  | "telemetry-analysis"

export interface AiOrchestrationRequest {

  task: AiTaskType

  vin?: string

  payload?: unknown
}

export interface AiOrchestrationResponse {

  task: AiTaskType

  success: boolean

  result: unknown

  generatedAt: string
}