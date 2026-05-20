// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\automation\automationEngine.ts
// Timestamp: 15 May 2026 10:20 Sydney
// ====================================================================

import {
  RuntimeAutomationTask
} from "./automationTypes"

import {
  persistAuditEvent
} from "../audit/auditPersistence"

import {
  publishRealtimeEvent
} from "../realtime/realtimeEventBus"

const automationTasks:
RuntimeAutomationTask[] = []

export function scheduleAutomationTask(
  name: string,
  schedule: string
): RuntimeAutomationTask {

  const task:
    RuntimeAutomationTask = {

    id:

      "automation-" +

      Math.random()
        .toString(36)
        .substring(2, 10),

    name,

    schedule,

    status:
      "scheduled",

    createdAt:
      new Date()
        .toISOString()
  }

  automationTasks.push(
    task
  )

  persistAuditEvent(

    "automation-engine",

    "automation-scheduled",

    "info",

    {

      automationId:
        task.id,

      name
    }
  )

  publishRealtimeEvent(

    "runtime.alert",

    {

      automationId:
        task.id,

      status:
        task.status
    }
  )

  return task
}

export function getAutomationTasks():
RuntimeAutomationTask[] {

  return automationTasks
}