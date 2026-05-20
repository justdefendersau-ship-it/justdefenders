// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\queue\runtimeTasks.ts
// Timestamp: 15 May 2026 06:25 Sydney
// ====================================================================

export type RuntimeTaskStatus =

  | "queued"
  | "running"
  | "completed"
  | "failed"

export interface RuntimeTask {

  id: string

  name: string

  createdAt: string

  status: RuntimeTaskStatus

  startedAt?: string

  completedAt?: string

  error?: string
}

export function createRuntimeTask(
  name: string
): RuntimeTask {

  return {

    id:

      "task-" +

      Math.random()
        .toString(36)
        .substring(2, 10),

    name,

    createdAt:
      new Date()
        .toISOString(),

    status:
      "queued"
  }
}