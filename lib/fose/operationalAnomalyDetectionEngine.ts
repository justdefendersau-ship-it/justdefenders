// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\operationalAnomalyDetectionEngine.ts
//
// Timestamp:
// 27 May 2026 19:00 Sydney
//
// PURPOSE:
// Operational anomaly detection intelligence.
// ====================================================================

import {

  replayOperationalHistory

}
from "./operationalReplayEngine"

// ====================================================================
// DETECT
// ====================================================================

export function detectOperationalAnomalies(){

  const history =
    replayOperationalHistory()

  const anomalies:any[] = []

  // ================================================================
  // NO HISTORY
  // ================================================================

  if(
    history.length < 2
  ){

    return anomalies
  }

  // ================================================================
  // ANALYZE
  // ================================================================

  for(
    let i = 1;
    i < history.length;
    i++
  ){

    const previous =
      history[i - 1]

    const current =
      history[i]

    // ==============================================================
    // READINESS DROP
    // ==============================================================

    const readinessDelta =

      previous.operationalReadiness
      -
      current.operationalReadiness

    if(
      readinessDelta > 10
    ){

      anomalies.push({

        severity:
          "HIGH",

        category:
          "READINESS",

        title:
          "Abnormal Operational Readiness Drop",

        description:
          `Operational readiness dropped ${readinessDelta}% between events.`,

        timestamp:
          current.timestamp
      })
    }

    // ==============================================================
    // SURVIVABILITY DROP
    // ==============================================================

    const survivabilityDelta =

      previous.survivabilityScore
      -
      current.survivabilityScore

    if(
      survivabilityDelta > 15
    ){

      anomalies.push({

        severity:
          "HIGH",

        category:
          "SURVIVABILITY",

        title:
          "Survivability Degradation Spike",

        description:
          `Survivability score dropped ${survivabilityDelta}% unexpectedly.`,

        timestamp:
          current.timestamp
      })
    }

    // ==============================================================
    // STATUS ESCALATION
    // ==============================================================

    if(
      previous.operationalStatus ===
      "GREEN"

      &&

      current.operationalStatus ===
      "RED"
    ){

      anomalies.push({

        severity:
          "HIGH",

        category:
          "ESCALATION",

        title:
          "Critical Operational Escalation",

        description:
          "Operational state escalated directly from GREEN to RED.",

        timestamp:
          current.timestamp
      })
    }
  }

  return anomalies
}