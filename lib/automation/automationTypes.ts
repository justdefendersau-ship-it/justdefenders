// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\automation\automationTypes.ts
// Timestamp: 15 May 2026 10:20 Sydney
// ====================================================================

export type AutomationStatus =

  | "scheduled"
  | "running"
  | "completed"
  | "failed"

export interface RuntimeAutomationTask {

  id: string

  name: string

  schedule: string

  status: AutomationStatus

  createdAt: string

  lastExecution?: string
}