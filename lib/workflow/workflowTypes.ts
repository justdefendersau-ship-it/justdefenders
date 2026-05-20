// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\workflow\workflowTypes.ts
// Timestamp: 15 May 2026 08:35 Sydney
// ====================================================================

export type WorkflowStageStatus =

  | "pending"
  | "running"
  | "completed"
  | "failed"

export interface WorkflowStage {

  name: string

  status: WorkflowStageStatus

  startedAt?: string

  completedAt?: string
}

export interface RuntimeWorkflow {

  id: string

  workflow: string

  createdAt: string

  stages: WorkflowStage[]
}