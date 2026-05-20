/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/fleetOperationalEngine.ts

   Timestamp:
   11 May 2026 19:00 (Sydney)

   PURPOSE:
   Fleet operational intelligence engine
===================================================== */

import {

  FleetOperationalContract

}
from "../contracts/fleetOperational"

// =====================================================
// FLEETS
// =====================================================

const fleets:
  FleetOperationalContract[] = [

  {

    fleetId:
      "FLEET-001",

    fleetName:
      "Cape York Expedition Fleet",

    vehicles:[

      "Defender Td5",
      "Defender Puma 2.2",
      "Defender 300Tdi"
    ],

    operationalStatus:
      "ready",

    expeditionRoutes:[

      "Cape York",
      "OTT"
    ],

    readinessScore:0.94,

    criticalParts:[

      "PCH119890",
      "RTC3429"
    ],

    supplierCoverage:[

      "MR Automotive",
      "British Off Road"
    ],

    workshopCoverage:[

      "MR Automotive"
    ],

    operationalWarnings:[

      "Confirm tyre inventory before departure"
    ],

    createdAt:
      new Date().toISOString()
  },

  {

    fleetId:
      "FLEET-002",

    fleetName:
      "Simpson Desert Support Fleet",

    vehicles:[

      "Defender Td5",
      "Defender Puma 2.4"
    ],

    operationalStatus:
      "maintenance_required",

    expeditionRoutes:[

      "Simpson Desert",
      "Madigan Line"
    ],

    readinessScore:0.82,

    criticalParts:[

      "ERR3340",
      "RTC3429"
    ],

    supplierCoverage:[

      "LR Direct",
      "All Four x 4"
    ],

    workshopCoverage:[

      "Les Richmond Automotive"
    ],

    operationalWarnings:[

      "Cooling system inspection recommended",
      "Inventory reserves below threshold"
    ],

    createdAt:
      new Date().toISOString()
  }

]

// =====================================================
// ALL
// =====================================================

export function getAllFleets(){

  return fleets
}

// =====================================================
// READY
// =====================================================

export function getReadyFleets(){

  return fleets.filter(

    item =>

      item.operationalStatus
      ===
      "ready"
  )
}

// =====================================================
// MAINTENANCE REQUIRED
// =====================================================

export function getMaintenanceRequiredFleets(){

  return fleets.filter(

    item =>

      item.operationalStatus
      ===
      "maintenance_required"
  )
}

// =====================================================
// READINESS SCORE
// =====================================================

export function getFleetReadinessAverage(){

  const total =
    fleets.reduce(

      (
        sum,
        fleet
      )=>

        sum +
        (fleet.readinessScore || 0),

      0
    )

  return Number(

    (
      total / fleets.length
    ).toFixed(2)
  )
}
