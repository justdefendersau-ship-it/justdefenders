/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/expeditionIncidentResponseEngine.ts

   Timestamp:
   12 May 2026 10:00 (Sydney)

   PURPOSE:
   Expedition incident response intelligence engine
===================================================== */

import {

  ExpeditionIncidentResponseContract

}
from "../contracts/expeditionIncidentResponse"

// =====================================================
// INCIDENT RESPONSES
// =====================================================

const incidents:
  ExpeditionIncidentResponseContract[] = [

  {

    incidentId:
      "INCIDENT-001",

    incidentName:
      "Cape York River Crossing Incident",

    expeditionRoute:
      "Old Telegraph Track",

    incidentSeverity:
      "major",

    affectedVehicles:2,

    affectedPersonnel:5,

    survivabilityIndex:88,

    responseReadiness:91,

    communicationsIntegrity:94,

    evacuationComplexity:48,

    activeIncidentThreats:[

      "Flooded crossing conditions",

      "Cooling system thermal escalation"
    ],

    emergencyActions:[

      "Deploy remote recovery convoy",

      "Activate satellite communication protocols",

      "Escalate medical standby coordination"
    ],

    responseRecommendations:[

      "Reduce convoy crossing frequency",

      "Increase environmental telemetry cadence"
    ],

    commandEscalations:[

      "Synchronise predictive logistics support"
    ],

    synchronisedAt:
      new Date().toISOString()
  },

  {

    incidentId:
      "INCIDENT-002",

    incidentName:
      "Simpson Desert Fuel Exposure Event",

    expeditionRoute:
      "French Line",

    incidentSeverity:
      "critical",

    affectedVehicles:3,

    affectedPersonnel:7,

    survivabilityIndex:72,

    responseReadiness:84,

    communicationsIntegrity:88,

    evacuationComplexity:73,

    activeIncidentThreats:[

      "Fuel reserve depletion",

      "Extreme heat exposure"
    ],

    emergencyActions:[

      "Escalate emergency fuel staging",

      "Reduce operational convoy speed"
    ],

    responseRecommendations:[

      "Increase water reserve protection",

      "Activate survivability logistics planning"
    ],

    commandEscalations:[

      "Escalate autonomous logistics orchestration"
    ],

    synchronisedAt:
      new Date().toISOString()
  },

  {

    incidentId:
      "INCIDENT-003",

    incidentName:
      "CSR Catastrophic Drivetrain Failure",

    expeditionRoute:
      "Canning Stock Route",

    incidentSeverity:
      "catastrophic",

    affectedVehicles:1,

    affectedPersonnel:4,

    survivabilityIndex:51,

    responseReadiness:63,

    communicationsIntegrity:71,

    evacuationComplexity:96,

    activeIncidentThreats:[

      "Critical drivetrain immobilisation",

      "Extreme remote isolation",

      "Environmental survivability degradation"
    ],

    emergencyActions:[

      "Activate emergency aerial extraction",

      "Deploy survivability logistics reserves",

      "Escalate mission-critical recovery coordination"
    ],

    responseRecommendations:[

      "Reduce environmental exposure immediately",

      "Activate contingency survival planning"
    ],

    commandEscalations:[

      "Trigger catastrophic incident command protocols"
    ],

    synchronisedAt:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getExpeditionIncidentResponses(){

  return incidents
}

// =====================================================
// CATASTROPHIC
// =====================================================

export function getCatastrophicIncidents(){

  return incidents.filter(

    item =>

      item.incidentSeverity
      ===
      "catastrophic"
  )
}

// =====================================================
// CRITICAL
// =====================================================

export function getCriticalIncidents(){

  return incidents.filter(

    item =>

      item.incidentSeverity
      ===
      "critical"
  )
}

// =====================================================
// RESPONSE INDEX
// =====================================================

export function getIncidentResponseReadinessIndex(){

  const total =
    incidents.reduce(

      (
        sum,
        item
      )=>

        sum +
        (
          item.responseReadiness || 0
        ),

      0
    )

  return Number(

    (
      total / incidents.length
    ).toFixed(0)
  )
}
