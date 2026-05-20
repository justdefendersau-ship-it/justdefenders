// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\operations\operationsDashboardTypes.ts
// Timestamp: 15 May 2026 11:00 Sydney
// ====================================================================

export interface OperationsDashboardSnapshot {

  generatedAt: string

  operational: boolean

  services: {

    realtime: boolean

    telemetry: boolean

    predictive: boolean

    ai: boolean

    workflow: boolean

    federation: boolean
  }

  runtime: {

    requests: number

    errors: number

    averageResponseTime: number
  }

  distributed: {

    nodes: number

    healthy: number
  }

  governance: {

    policies: number

    auditEvents: number
  }
}