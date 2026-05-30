// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\cvil\unifiedOperationalIntelligenceGateway.ts
//
// Timestamp:
// 27 May 2026 18:30 Sydney
//
// PURPOSE:
// Unified operational intelligence gateway.
// ====================================================================

import {

  buildCanonicalVehicleIntelligence

}
from "./canonicalVehicleIntelligenceEngine"

// ====================================================================
// GATEWAY
// ====================================================================

export function getUnifiedOperationalIntelligence(){

  const intelligence =

    buildCanonicalVehicleIntelligence()

  // ================================================================
  // NORMALIZED OUTPUT
  // ================================================================

  return {

    vehicle:{

      vin:
        intelligence.vin,

      timestamp:
        intelligence.timestamp
    },

    operational:{

      readiness:
        intelligence.operationalReadiness,

      expedition:
        intelligence.expeditionReadiness,

      survivability:
        intelligence.survivabilityScore,

      status:
        intelligence.operationalStatus
    },

    predictive:{

      forecastRisk:
        intelligence.forecastRisk,

      degradationRate:
        intelligence.degradationRate,

      adaptiveRisk:
        intelligence.adaptiveRisk,

      volatility:
        intelligence.operationalVolatility
    },

    maintenance:{

      overdueServices:
        intelligence.overdueServices,

      burden:
        intelligence.maintenanceBurden,

      events:
        intelligence.maintenanceEvents
    },

    survivability:{

      alerts:
        intelligence.survivabilityAlerts,

      instability:
        intelligence.survivabilityInstability,

      escalation:
        intelligence.expeditionEscalation
    },

    confidence:{

      telemetry:
        intelligence.telemetryConfidence,

      fuel:
        intelligence.fuelDataConfidence,

      service:
        intelligence.serviceConfidence
    },

    advisories:
      intelligence.advisories
  }
}