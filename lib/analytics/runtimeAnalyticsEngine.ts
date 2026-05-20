// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\analytics\runtimeAnalyticsEngine.ts
// Timestamp: 15 May 2026 09:40 Sydney
// ====================================================================

import {
  RuntimeAnalyticsSnapshot
} from "./runtimeAnalyticsTypes"

import {
  getRealtimeEvents
} from "../realtime/realtimeEventBus"

import {
  getTelemetryRecords
} from "../telemetry/telemetryPersistence"

import {
  getAuditEvents
} from "../audit/auditPersistence"

import {
  getWorkflowHistory
} from "../workflow/workflowOrchestrationEngine"

import {
  getRuntimeMetrics
} from "../telemetry/runtimeMetrics"

export function generateRuntimeAnalytics():
RuntimeAnalyticsSnapshot {

  const realtime =
    getRealtimeEvents()

  const telemetry =
    getTelemetryRecords()

  const audit =
    getAuditEvents()

  const workflows =
    getWorkflowHistory()

  const metrics =
    getRuntimeMetrics()

  return {

    generatedAt:
      new Date()
        .toISOString(),

    services: {

      realtimeEvents:
        realtime.length,

      telemetryRecords:
        telemetry.length,

      auditEvents:
        audit.length,

      workflows:
        workflows.length
    },

    runtime: {

      requests:
        metrics.totalRequests,

      errors:
        metrics.totalErrors,

      averageResponseTime:
        metrics.averageResponseTime
    },

    health: {

      operational: true,

      status:
        "healthy"
    }
  }
}