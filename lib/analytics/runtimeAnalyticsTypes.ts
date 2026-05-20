// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\analytics\runtimeAnalyticsTypes.ts
// Timestamp: 15 May 2026 09:40 Sydney
// ====================================================================

export interface RuntimeAnalyticsSnapshot {

  generatedAt: string

  services: {

    realtimeEvents: number

    telemetryRecords: number

    auditEvents: number

    workflows: number
  }

  runtime: {

    requests: number

    errors: number

    averageResponseTime: number
  }

  health: {

    operational: boolean

    status: string
  }
}