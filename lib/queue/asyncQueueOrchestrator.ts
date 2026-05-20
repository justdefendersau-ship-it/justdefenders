// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\queue\asyncQueueOrchestrator.ts
// Timestamp: 15 May 2026 06:25 Sydney
// ====================================================================

import {
  RuntimeTask,
  createRuntimeTask
} from "./runtimeTasks"

import {
  logInfo,
  logError
} from "../logging/runtimeLogger"

const runtimeQueue:
RuntimeTask[] = []

export async function enqueueRuntimeTask<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {

  const task =
    createRuntimeTask(
      name
    )

  runtimeQueue.push(
    task
  )

  task.status =
    "running"

  task.startedAt =
    new Date()
      .toISOString()

  logInfo(
    "async-queue-orchestrator",
    "Task started",
    task
  )

  try {

    const result =
      await operation()

    task.status =
      "completed"

    task.completedAt =
      new Date()
        .toISOString()

    logInfo(
      "async-queue-orchestrator",
      "Task completed",
      task
    )

    return result

  } catch (error) {

    task.status =
      "failed"

    task.completedAt =
      new Date()
        .toISOString()

    task.error =
      error instanceof Error
        ? error.message
        : String(error)

    logError(
      "async-queue-orchestrator",
      "Task failed",
      task
    )

    throw error
  }
}

export function getRuntimeQueue():
RuntimeTask[] {

  return runtimeQueue
}