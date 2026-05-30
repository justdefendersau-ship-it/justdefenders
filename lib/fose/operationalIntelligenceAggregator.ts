// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\operationalIntelligenceAggregator.ts
//
// Timestamp:
// 27 May 2026 14:25 Sydney
//
// PURPOSE:
// Operational intelligence aggregation layer.
// ====================================================================

import {

  getOperationalEvents

}
from "@/lib/events/operationalEventBus"

// ====================================================================
// AGGREGATE
// ====================================================================

export function aggregateOperationalIntelligence(){

  const events =
    getOperationalEvents()

  console.log("")

  console.log(
    "================================================"
  )

  console.log(
    "FOSE AGGREGATOR"
  )

  console.log(
    "TOTAL EVENTS:",
    events.length
  )

  console.log(
    "================================================"
  )

  console.log("")

  // ================================================================
  // COUNTERS
  // ================================================================

  let survivabilityAlerts =
    0

  let activeAlerts =
    0

  // ================================================================
  // ANALYZE EVENTS
  // ================================================================

  events.forEach(event => {

    console.log(

      "EVENT:",
      event.type,
      event.severity,
      event.title
    )

    if(
      event.type ===
      "SURVIVABILITY_ALERT"
    ){

      survivabilityAlerts++
    }

    if(
      event.severity ===
      "HIGH"
    ){

      activeAlerts++
    }
  })

  console.log("")

  console.log(
    "SURVIVABILITY ALERTS:",
    survivabilityAlerts
  )

  console.log(
    "ACTIVE ALERTS:",
    activeAlerts
  )

  console.log("")

  // ================================================================
  // OUTPUT
  // ================================================================

  return {

    vin:
      "SALLDHA87XA176069",

    overdueServices:
      4,

    activeAlerts,

    survivabilityAlerts,

    maintenanceEvents:
      74
  }
}