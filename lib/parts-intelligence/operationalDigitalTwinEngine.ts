/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/operationalDigitalTwinEngine.ts

   Timestamp:
   12 May 2026 02:30 (Sydney)

   PURPOSE:
   Real-time operational digital twin engine
===================================================== */

import {

  OperationalDigitalTwinContract

}
from "../contracts/operationalDigitalTwin"

// =====================================================
// DIGITAL TWINS
// =====================================================

const twins:
  OperationalDigitalTwinContract[] = [

  {

    twinId:
      "TWIN-001",

    vehicleModel:
      "Defender Td5",

    expeditionRoute:
      "Cape York",

    operationalState:
      "elevated_load",

    drivetrainHealth:88,

    coolingSystemHealth:72,

    suspensionHealth:91,

    electricalSystemHealth:86,

    environmentalLoad:93,

    predictiveRiskScore:78,

    telemetrySignals:[

      "Elevated coolant temperature",

      "High driveline load variance",

      "Extended recovery usage detected"
    ],

    operationalRecommendations:[

      "Reduce thermal operating load",

      "Schedule cooling inspection",

      "Monitor coolant pressure"
    ],

    synchronisedAt:
      new Date().toISOString()
  },

  {

    twinId:
      "TWIN-002",

    vehicleModel:
      "Defender Puma 2.2",

    expeditionRoute:
      "Simpson Desert",

    operationalState:
      "stable",

    drivetrainHealth:92,

    coolingSystemHealth:89,

    suspensionHealth:84,

    electricalSystemHealth:90,

    environmentalLoad:87,

    predictiveRiskScore:58,

    telemetrySignals:[

      "Stable drivetrain telemetry",

      "Moderate suspension compression cycles"
    ],

    operationalRecommendations:[

      "Continue predictive monitoring"
    ],

    synchronisedAt:
      new Date().toISOString()
  },

  {

    twinId:
      "TWIN-003",

    vehicleModel:
      "Defender 300Tdi",

    expeditionRoute:
      "Canning Stock Route",

    operationalState:
      "degraded",

    drivetrainHealth:68,

    coolingSystemHealth:74,

    suspensionHealth:61,

    electricalSystemHealth:83,

    environmentalLoad:96,

    predictiveRiskScore:88,

    telemetrySignals:[

      "Excessive suspension stress",

      "High ambient thermal load",

      "Drivetrain vibration escalation"
    ],

    operationalRecommendations:[

      "Immediate suspension inspection",

      "Reduce payload load",

      "Escalate predictive maintenance"
    ],

    synchronisedAt:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getOperationalDigitalTwins(){

  return twins
}

// =====================================================
// DEGRADED
// =====================================================

export function getDegradedTwins(){

  return twins.filter(

    item =>

      item.operationalState
      ===
      "degraded"
  )
}

// =====================================================
// CRITICAL RISK
// =====================================================

export function getHighRiskTwins(){

  return twins.filter(

    item =>

      (item.predictiveRiskScore || 0)
      >=
      80
  )
}

// =====================================================
// PLATFORM HEALTH
// =====================================================

export function getTwinPlatformHealth(){

  const total =
    twins.reduce(

      (
        sum,
        item
      )=>

        sum +
        (
          item.drivetrainHealth || 0
        ) +
        (
          item.coolingSystemHealth || 0
        ) +
        (
          item.suspensionHealth || 0
        ) +
        (
          item.electricalSystemHealth || 0
        ),

      0
    )

  return Number(

    (
      total / (twins.length * 4)
    ).toFixed(0)
  )
}
