// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\adaptiveRiskIntelligence.ts
//
// Timestamp:
// 27 May 2026 16:45 Sydney
//
// PURPOSE:
// Adaptive operational risk intelligence.
// ====================================================================

import {

  replayOperationalHistory

}
from "./operationalReplayEngine"

// ====================================================================
// ANALYZE
// ====================================================================

export function analyzeAdaptiveOperationalRisk(){

  const history =
    replayOperationalHistory()

  // ================================================================
  // NO HISTORY
  // ================================================================

  if(
    history.length < 2
  ){

    return {

      adaptiveRisk:
        "LOW",

      degradationAcceleration:
        0,

      survivabilityInstability:
        "STABLE",

      operationalVolatility:
        "LOW",

      expeditionEscalation:
        false
    }
  }

  // ================================================================
  // FIRST/LAST
  // ================================================================

  const first =
    history[0]

  const latest =
    history[
      history.length - 1
    ]

  // ================================================================
  // DEGRADATION RATE
  // ================================================================

  const degradationAcceleration =

    first.operationalReadiness
    -
    latest.operationalReadiness

  // ================================================================
  // RISK
  // ================================================================

  let adaptiveRisk =
    "LOW"

  if(
    degradationAcceleration > 10
  ){

    adaptiveRisk =
      "MEDIUM"
  }

  if(
    degradationAcceleration > 25
  ){

    adaptiveRisk =
      "HIGH"
  }

  // ================================================================
  // VOLATILITY
  // ================================================================

  let operationalVolatility =
    "LOW"

  if(
    history.length > 5
  ){

    operationalVolatility =
      "MEDIUM"
  }

  if(
    history.length > 10
  ){

    operationalVolatility =
      "HIGH"
  }

  // ================================================================
  // SURVIVABILITY
  // ================================================================

  let survivabilityInstability =
    "STABLE"

  if(
    latest.survivabilityScore < 80
  ){

    survivabilityInstability =
      "DEGRADING"
  }

  if(
    latest.survivabilityScore < 60
  ){

    survivabilityInstability =
      "CRITICAL"
  }

  // ================================================================
  // EXPEDITION
  // ================================================================

  const expeditionEscalation =

    latest.operationalStatus ===
    "RED"

  // ================================================================
  // OUTPUT
  // ================================================================

  return {

    adaptiveRisk,

    degradationAcceleration,

    survivabilityInstability,

    operationalVolatility,

    expeditionEscalation
  }
}