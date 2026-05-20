/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\telemetryEngine.ts

   Timestamp:
   2026-05-09 15:00

   Purpose:
   - Platform telemetry
   - Workflow observability
===================================================== */

export async function trackTelemetryEvent({

  event,

  category,

  metadata

}:any){

  console.log(

    "[JD-TELEMETRY]",

    {

      event,

      category,

      metadata,

      timestamp:
        new Date().toISOString()
    }
  )
}

// =====================================================
// DASHBOARD METRICS
// =====================================================

export function buildOperationalMetrics(

  telemetry:any[]

){

  return {

    totalEvents:
      telemetry.length,

    searches:

      telemetry.filter(
        t => t.category === "search"
      ).length,

    workflowFailures:

      telemetry.filter(
        t => t.category === "failure"
      ).length,

    mobileUsage:

      telemetry.filter(
        t => t.category === "mobile"
      ).length
  }
}
