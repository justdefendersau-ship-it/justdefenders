// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\audit\auditPersistence.ts
// Timestamp: 15 May 2026 09:20 Sydney
// ====================================================================

import {
  AuditEvent,
  AuditSeverity,
  createAuditEvent
} from "./auditEventTypes"

import {
  publishRealtimeEvent
} from "../realtime/realtimeEventBus"

import {
  logInfo
} from "../logging/runtimeLogger"

const auditStore:
AuditEvent[] = []

export function persistAuditEvent(
  source: string,
  action: string,
  severity: AuditSeverity,
  metadata?: Record<
    string,
    unknown
  >
): AuditEvent {

  const event =
    createAuditEvent(
      source,
      action,
      severity,
      metadata
    )

  auditStore.push(
    event
  )

  publishRealtimeEvent(

    "runtime.alert",

    {

      auditId:
        event.id,

      source,

      severity
    }
  )

  logInfo(
    "audit-persistence",
    "Audit event persisted",
    {

      auditId:
        event.id,

      source,

      severity
    }
  )

  return event
}

export function getAuditEvents():
AuditEvent[] {

  return auditStore.slice(
    -500
  )
}