/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\federation\health\route.ts
 *
 * Timestamp:
 * 22 May 2026 09:26 Sydney
 *
 * PURPOSE:
 * Federation Health Endpoint
 *
 * STRATEGY:
 * PASS 30B — Federation Telemetry Stabilization
 *
 * OBJECTIVES:
 * - improve operational telemetry visibility
 * - normalize federation health reporting
 * - improve Alpha diagnostics capability
 * - improve supplier health continuity
 * - improve operational observability
 *
 * ============================================================
 */

import {

  NextResponse

} from "next/server"

import {

  getFederationAuditLog

} from "@/lib/federation/federationAudit"

// ============================================================
// HEALTH ENDPOINT
// ============================================================

export async function GET(){

  const auditLog =
    getFederationAuditLog()

  // ==========================================================
  // HEALTH COUNTS
  // ==========================================================

  const healthySuppliers =
    auditLog.filter(

      item =>

        item.health ===
        "HEALTHY"
    ).length

  const degradedSuppliers =
    auditLog.filter(

      item =>

        item.health ===
        "DEGRADED"
    ).length

  const timeoutSuppliers =
    auditLog.filter(

      item =>

        item.health ===
        "TIMEOUT"
    ).length

  // ==========================================================
  // SUCCESS RATE
  // ==========================================================

  const successfulRequests =
    auditLog.filter(

      item => item.success
    ).length

  const successRate =

    auditLog.length > 0

    ?

    Math.round(

      (
        successfulRequests /
        auditLog.length
      ) * 100
    )

    :

    100

  // ==========================================================
  // LATENCY
  // ==========================================================

  const averageLatency =

    auditLog.length > 0

    ?

    Math.round(

      auditLog.reduce(

        (

          total,
          item

        ) =>

          total +
          item.latencyMs,

        0
      )

      /

      auditLog.length
    )

    :

    0

  // ==========================================================
  // RESPONSE
  // ==========================================================

  return NextResponse.json({

    success: true,

    generatedAt:
      new Date().toISOString(),

    federation: {

      healthySuppliers,

      degradedSuppliers,

      timeoutSuppliers,

      totalEvents:
        auditLog.length,

      successfulRequests,

      successRate,

      averageLatency
    },

    recentEvents:
      auditLog.slice(0, 50)
  })
}