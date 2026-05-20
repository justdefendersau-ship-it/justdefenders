// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\operations\operationsDashboardEngine.ts
// Timestamp: 15 May 2026 11:00 Sydney
// ====================================================================

import {
  OperationsDashboardSnapshot
} from "./operationsDashboardTypes"

import {
  getRuntimeMetrics
} from "../telemetry/runtimeMetrics"

import {
  getDistributedNodes
} from "../distributed/distributedRuntimeEngine"

import {
  getGovernancePolicies
} from "../governance/policyGovernanceEngine"

import {
  getAuditEvents
} from "../audit/auditPersistence"

export function generateOperationsDashboard():
OperationsDashboardSnapshot {

  const metrics =
    getRuntimeMetrics()

  const nodes =
    getDistributedNodes()

  const policies =
    getGovernancePolicies()

  const audits =
    getAuditEvents()

  return {

    generatedAt:
      new Date()
        .toISOString(),

    operational:
      true,

    services: {

      realtime:
        true,

      telemetry:
        true,

      predictive:
        true,

      ai:
        true,

      workflow:
        true,

      federation:
        true
    },

    runtime: {

      requests:
        metrics.totalRequests,

      errors:
        metrics.totalErrors,

      averageResponseTime:
        metrics.averageResponseTime
    },

    distributed: {

      nodes:
        nodes.length,

      healthy:
        nodes.filter(
          node =>
            node.status ===
            "online"
        ).length
    },

    governance: {

      policies:
        policies.length,

      auditEvents:
        audits.length
    }
  }
}