// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\operationalReplayEngine.ts
//
// Timestamp:
// 27 May 2026 15:20 Sydney
//
// PURPOSE:
// Historical operational replay engine.
// ====================================================================

import {

  loadPersistentEvents

}
from "@/lib/events/persistentOperationalEventStore"

import {

  calculateOperationalState

}
from "./readinessEngine"

// ====================================================================
// REPLAY
// ====================================================================

export function replayOperationalHistory(){

  const events =
    loadPersistentEvents()

  // ================================================================
  // COUNTERS
  // ================================================================

  let survivabilityAlerts =
    0

  let activeAlerts =
    0

  // ================================================================
  // TIMELINE
  // ================================================================

  const historicalStates:any[] = []

  // ================================================================
  // REPLAY EVENTS
  // ================================================================

  events.forEach(event => {

    // ==============================================================
    // SURVIVABILITY
    // ==============================================================

    if(
      event.type ===
      "SURVIVABILITY_ALERT"
    ){

      survivabilityAlerts++
    }

    // ==============================================================
    // ACTIVE ALERTS
    // ==============================================================

    if(
      event.severity ===
      "HIGH"
    ){

      activeAlerts++
    }

    // ==============================================================
    // CALCULATE STATE
    // ==============================================================

    const state =

      calculateOperationalState({

        vin:
          "SALLDHA87XA176069",

        overdueServices:
          4,

        activeAlerts,

        survivabilityAlerts,

        maintenanceEvents:
          74
      })

    historicalStates.push({

      timestamp:
        event.timestamp,

      eventType:
        event.type,

      operationalReadiness:
        state.operationalReadiness,

      expeditionReadiness:
        state.expeditionReadiness,

      survivabilityScore:
        state.survivabilityScore,

      operationalStatus:
        state.operationalStatus
    })
  })

  return historicalStates
}