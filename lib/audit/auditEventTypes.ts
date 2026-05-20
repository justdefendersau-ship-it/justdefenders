// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\audit\auditEventTypes.ts
// Timestamp: 15 May 2026 09:20 Sydney
// ====================================================================

export type AuditSeverity =

  | "info"
  | "warning"
  | "critical"

export interface AuditEvent {

  id: string

  source: string

  action: string

  severity: AuditSeverity

  createdAt: string

  metadata?: Record<
    string,
    unknown
  >
}

export function createAuditEvent(
  source: string,
  action: string,
  severity: AuditSeverity,
  metadata?: Record<
    string,
    unknown
  >
): AuditEvent {

  return {

    id:

      "audit-" +

      Math.random()
        .toString(36)
        .substring(2, 10),

    source,

    action,

    severity,

    createdAt:
      new Date()
        .toISOString(),

    metadata
  }
}