/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\telemetry\trackEvent.ts
 *
 * Timestamp:
 * 21 May 2026 13:48 Sydney
 *
 * PURPOSE:
 * Unified Telemetry Tracking Client
 *
 * STRATEGY:
 * PASS 20B — Telemetry + Operational Observability
 *
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

export interface TelemetryEvent {

  event: string

  metadata?: Record<string, unknown>
}

// ============================================================
// TRACK EVENT
// ============================================================

export async function trackEvent({

  event,

  metadata = {}

}: TelemetryEvent){

  try {

    await fetch(

      "/api/telemetry",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          event,

          metadata,

          timestamp:
            new Date()
              .toISOString()
        })
      }
    )

  } catch (

    err

  ) {

    console.error(

      "TELEMETRY FAILURE",

      err
    )
  }
}