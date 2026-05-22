/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\federationAudit.ts
 *
 * Timestamp:
 * 22 May 2026 09:34 Sydney
 *
 * PURPOSE:
 * Federation Audit + Telemetry
 *
 * STRATEGY:
 * PASS 30B — Federation Telemetry Stabilization
 *
 * OBJECTIVES:
 * - improve federation audit continuity
 * - improve Alpha telemetry retention
 * - improve operational diagnostics
 * - improve supplier failure visibility
 * - improve federation observability
 *
 * ============================================================
 */

import {

  FederationAuditEvent

} from "@/lib/procurement/types"

// ============================================================
// AUDIT STORE
// ============================================================

const federationAuditLog:
FederationAuditEvent[] = []

// ============================================================
// CONFIG
// ============================================================

const MAX_AUDIT_EVENTS =
  2000

// ============================================================
// RECORD EVENT
// ============================================================

export function recordFederationEvent(

  event: FederationAuditEvent

){

  federationAuditLog.unshift(event)

  // ==========================================================
  // LOG LIMIT
  // ==========================================================

  if (

    federationAuditLog.length >
    MAX_AUDIT_EVENTS

  ){

    federationAuditLog.pop()
  }

  // ==========================================================
  // OPERATIONAL LOGGING
  // ==========================================================

  console.log(

    "[FEDERATION_EVENT]",

    JSON.stringify({

      supplierId:
        event.supplierId,

      supplierName:
        event.supplierName,

      success:
        event.success,

      latencyMs:
        event.latencyMs,

      health:
        event.health,

      timestamp:
        event.timestamp,

      error:
        event.error
    })
  )
}

// ============================================================
// GET AUDIT LOG
// ============================================================

export function getFederationAuditLog(){

  return federationAuditLog
}

// ============================================================
// CLEAR AUDIT LOG
// ============================================================

export function clearFederationAuditLog(){

  federationAuditLog.length = 0
}