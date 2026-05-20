// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\platform\serviceConsolidation.ts
// Timestamp: 15 May 2026 08:55 Sydney
// ====================================================================

import {
  runtimeFeatureFlags
} from "../runtime/featureFlags"

import {
  getRuntimeMetrics
} from "../telemetry/runtimeMetrics"

import {
  getRealtimeEvents
} from "../realtime/realtimeEventBus"

import {
  getTelemetryRecords
} from "../telemetry/telemetryPersistence"

import {
  getWorkflowHistory
} from "../workflow/workflowOrchestrationEngine"

export interface ServiceConsolidationReport {

  operational: boolean

  generatedAt: string

  services: {

    realtime: boolean

    telemetry: boolean

    federation: boolean

    predictive: boolean

    ai: boolean

    workflow: boolean
  }

  telemetry: {

    records: number

    requests: number

    errors: number
  }

  realtime: {

    events: number
  }

  workflows: {

    total: number
  }

  features:
    typeof runtimeFeatureFlags
}

export function generateServiceReport():
ServiceConsolidationReport {

  const metrics =
    getRuntimeMetrics()

  const telemetry =
    getTelemetryRecords()

  const events =
    getRealtimeEvents()

  const workflows =
    getWorkflowHistory()

  return {

    operational: true,

    generatedAt:
      new Date()
        .toISOString(),

    services: {

      realtime: true,

      telemetry: true,

      federation: true,

      predictive: true,

      ai: true,

      workflow: true
    },

    telemetry: {

      records:
        telemetry.length,

      requests:
        metrics.totalRequests,

      errors:
        metrics.totalErrors
    },

    realtime: {

      events:
        events.length
    },

    workflows: {

      total:
        workflows.length
    },

    features:
      runtimeFeatureFlags
  }
}