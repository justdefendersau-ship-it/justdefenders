// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\platform\platformConsolidation.ts
// Timestamp: 15 May 2026 06:45 Sydney
// ====================================================================

import {
  runtimeFeatureFlags
} from "../runtime/featureFlags"

import {
  getRuntimeMetrics
} from "../telemetry/runtimeMetrics"

import {
  auditEnvironment
} from "../config/environmentGovernance"

export interface PlatformConsolidationReport {

  runtime: {

    operational: boolean

    timestamp: string
  }

  environment: {

    valid: boolean

    warnings: string[]

    critical: string[]
  }

  telemetry: {

    totalRequests: number

    totalErrors: number

    averageResponseTime: number
  }

  features:
    typeof runtimeFeatureFlags
}

export function generatePlatformReport():
PlatformConsolidationReport {

  const environment =
    auditEnvironment()

  const telemetry =
    getRuntimeMetrics()

  return {

    runtime: {

      operational: true,

      timestamp:
        new Date()
          .toISOString()
    },

    environment: {

      valid:
        environment.valid,

      warnings:
        environment.warnings,

      critical:
        environment.critical
    },

    telemetry: {

      totalRequests:
        telemetry.totalRequests,

      totalErrors:
        telemetry.totalErrors,

      averageResponseTime:
        telemetry.averageResponseTime
    },

    features:
      runtimeFeatureFlags
  }
}