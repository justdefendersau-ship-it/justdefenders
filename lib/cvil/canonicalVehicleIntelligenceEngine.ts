// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\cvil\canonicalVehicleIntelligenceEngine.ts
//
// Timestamp:
// 27 May 2026 18:05 Sydney
//
// PURPOSE:
// Canonical Vehicle Intelligence Layer engine.
// ====================================================================

import {

  calculateOperationalState

}
from "@/lib/fose/readinessEngine"

import {

  aggregateOperationalIntelligence

}
from "@/lib/fose/operationalIntelligenceAggregator"

import {

  generateOperationalForecast

}
from "@/lib/fose/predictiveDegradationEngine"

import {

  analyzeAdaptiveOperationalRisk

}
from "@/lib/fose/adaptiveRiskIntelligence"

import {

  generateOperationalAdvisories

}
from "@/lib/fose/expeditionAdvisoryEngine"

import {

  CanonicalVehicleIntelligence

}
from "./canonicalVehicleIntelligenceModel"

// ====================================================================
// ENGINE
// ====================================================================

export function buildCanonicalVehicleIntelligence():

  CanonicalVehicleIntelligence {

  // ================================================================
  // BASE INTELLIGENCE
  // ================================================================

  const intelligence =

    aggregateOperationalIntelligence()

  const operational =

    calculateOperationalState(
      intelligence
    )

  const forecast =

    generateOperationalForecast()

  const adaptive =

    analyzeAdaptiveOperationalRisk()

  const advisories =

    generateOperationalAdvisories()

  // ================================================================
  // OUTPUT
  // ================================================================

  return {

    vin:
      intelligence.vin,

    timestamp:
      new Date().toISOString(),

    // ==============================================================
    // OPERATIONAL
    // ==============================================================

    operationalReadiness:
      operational.operationalReadiness,

    expeditionReadiness:
      operational.expeditionReadiness,

    survivabilityScore:
      operational.survivabilityScore,

    operationalStatus:
      operational.operationalStatus,

    // ==============================================================
    // PREDICTIVE
    // ==============================================================

    forecastRisk:
      forecast.forecastRisk,

    degradationRate:
      forecast.degradationRate,

    adaptiveRisk:
      adaptive.adaptiveRisk,

    operationalVolatility:
      adaptive.operationalVolatility,

    // ==============================================================
    // MAINTENANCE
    // ==============================================================

    overdueServices:
      operational.overdueServices,

    maintenanceBurden:
      operational.maintenanceBurden,

    maintenanceEvents:
      operational.maintenanceEvents,

    // ==============================================================
    // SURVIVABILITY
    // ==============================================================

    survivabilityAlerts:
      operational.survivabilityAlerts,

    survivabilityInstability:
      adaptive.survivabilityInstability,

    expeditionEscalation:
      adaptive.expeditionEscalation,

    // ==============================================================
    // CONFIDENCE
    // ==============================================================

    telemetryConfidence:
      operational.telemetryConfidence,

    fuelDataConfidence:
      operational.fuelDataConfidence,

    serviceConfidence:
      operational.serviceConfidence,

    // ==============================================================
    // ADVISORIES
    // ==============================================================

    advisories
  }
}