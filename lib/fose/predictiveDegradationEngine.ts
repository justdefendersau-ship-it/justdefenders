// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\predictiveDegradationEngine.ts
//
// Timestamp:
// 27 May 2026 16:10 Sydney
//
// PURPOSE:
// Predictive operational degradation engine.
// ====================================================================

import {

  replayOperationalHistory

}
from "./operationalReplayEngine"

// ====================================================================
// FORECAST
// ====================================================================

export function generateOperationalForecast(){

  const history =
    replayOperationalHistory()

  // ================================================================
  // NO HISTORY
  // ================================================================

  if(
    history.length === 0
  ){

    return {

      projectedOperationalReadiness:
        100,

      projectedExpeditionReadiness:
        100,

      projectedSurvivabilityScore:
        100,

      projectedOperationalStatus:
        "GREEN",

      degradationRate:
        0,

      forecastRisk:
        "LOW"
    }
  }

  // ================================================================
  // LATEST STATE
  // ================================================================

  const latest =
    history[
      history.length - 1
    ]

  // ================================================================
  // SIMPLE DEGRADATION MODEL
  // ================================================================

  const degradationRate =
    history.length * 2

  let projectedOperationalReadiness =

    latest.operationalReadiness
    -
    degradationRate

  let projectedExpeditionReadiness =

    latest.expeditionReadiness
    -
    degradationRate

  let projectedSurvivabilityScore =

    latest.survivabilityScore
    -
    degradationRate

  // ================================================================
  // CLAMP
  // ================================================================

  projectedOperationalReadiness =
    Math.max(
      0,
      projectedOperationalReadiness
    )

  projectedExpeditionReadiness =
    Math.max(
      0,
      projectedExpeditionReadiness
    )

  projectedSurvivabilityScore =
    Math.max(
      0,
      projectedSurvivabilityScore
    )

  // ================================================================
  // STATUS
  // ================================================================

  let projectedOperationalStatus =
    "GREEN"

  if(
    projectedOperationalReadiness < 75
  ){

    projectedOperationalStatus =
      "AMBER"
  }

  if(
    projectedOperationalReadiness < 50
  ){

    projectedOperationalStatus =
      "RED"
  }

  // ================================================================
  // RISK
  // ================================================================

  let forecastRisk =
    "LOW"

  if(
    projectedOperationalReadiness < 75
  ){

    forecastRisk =
      "MEDIUM"
  }

  if(
    projectedOperationalReadiness < 50
  ){

    forecastRisk =
      "HIGH"
  }

  // ================================================================
  // OUTPUT
  // ================================================================

  return {

    projectedOperationalReadiness,

    projectedExpeditionReadiness,

    projectedSurvivabilityScore,

    projectedOperationalStatus,

    degradationRate,

    forecastRisk
  }
}