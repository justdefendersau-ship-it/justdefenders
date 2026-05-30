// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\expeditionAdvisoryEngine.ts
//
// Timestamp:
// 27 May 2026 17:20 Sydney
//
// PURPOSE:
// Expedition operational advisory intelligence.
// ====================================================================

import {

  analyzeAdaptiveOperationalRisk

}
from "./adaptiveRiskIntelligence"

import {

  generateOperationalForecast

}
from "./predictiveDegradationEngine"

// ====================================================================
// ADVISORY
// ====================================================================

export function generateOperationalAdvisories(){

  const adaptive =

    analyzeAdaptiveOperationalRisk()

  const forecast =

    generateOperationalForecast()

  const advisories:any[] = []

  // ================================================================
  // FORECAST RISK
  // ================================================================

  if(
    forecast.forecastRisk ===
    "HIGH"
  ){

    advisories.push({

      severity:
        "HIGH",

      category:
        "EXPEDITION",

      title:
        "High Operational Risk Forecast",

      recommendation:
        "Expedition deployment is not recommended until operational readiness improves."
    })
  }

  // ================================================================
  // DEGRADATION
  // ================================================================

  if(
    adaptive.degradationAcceleration > 10
  ){

    advisories.push({

      severity:
        "MEDIUM",

      category:
        "DEGRADATION",

      title:
        "Accelerated Operational Degradation",

      recommendation:
        "Vehicle degradation trend increasing. Maintenance intervention recommended."
    })
  }

  // ================================================================
  // SURVIVABILITY
  // ================================================================

  if(
    adaptive.survivabilityInstability ===
    "CRITICAL"
  ){

    advisories.push({

      severity:
        "HIGH",

      category:
        "SURVIVABILITY",

      title:
        "Critical Survivability Instability",

      recommendation:
        "Immediate survivability inspection recommended before remote operation."
    })
  }

  // ================================================================
  // EXPEDITION
  // ================================================================

  if(
    adaptive.expeditionEscalation
  ){

    advisories.push({

      severity:
        "HIGH",

      category:
        "EXPEDITION",

      title:
        "Expedition Escalation Triggered",

      recommendation:
        "Operational risk threshold exceeded for expedition deployment."
    })
  }

  // ================================================================
  // SAFE MODE
  // ================================================================

  if(
    advisories.length === 0
  ){

    advisories.push({

      severity:
        "LOW",

      category:
        "STATUS",

      title:
        "Operational Status Stable",

      recommendation:
        "No significant operational advisories detected."
    })
  }

  return advisories
}