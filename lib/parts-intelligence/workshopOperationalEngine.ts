/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/workshopOperationalEngine.ts

   Timestamp:
   11 May 2026 16:00 (Sydney)

   PURPOSE:
   Workshop operational intelligence engine
===================================================== */

import {

  WorkshopOperationalContract

}
from "../contracts/workshopOperational"

// =====================================================
// WORKSHOPS
// =====================================================

const workshops:
  WorkshopOperationalContract[] = [

  {

    id:"WS-001",

    workshopName:
      "MR Automotive",

    region:
      "QLD",

    specialties:[

      "Td5",
      "Touring",
      "Expedition"
    ],

    defenderExpertise:true,

    touringInspection:true,

    emergencySupport:true,

    mobileSupport:false,

    supportedRoutes:[

      "Cape York",
      "Simpson Desert"
    ],

    operationalConfidence:0.97,

    leadTimeDays:5,

    recommendedServices:[

      "Cooling inspection",
      "Injector harness inspection",
      "Bearing inspection"
    ],

    notes:[

      "High expedition preparation reputation"
    ]
  },

  {

    id:"WS-002",

    workshopName:
      "Les Richmond Automotive",

    region:
      "VIC",

    specialties:[

      "Touring",
      "Defender",
      "Suspension"
    ],

    defenderExpertise:true,

    touringInspection:true,

    emergencySupport:false,

    mobileSupport:false,

    supportedRoutes:[

      "High Country",
      "Simpson Desert"
    ],

    operationalConfidence:0.94,

    leadTimeDays:7,

    recommendedServices:[

      "Suspension inspection",
      "Driveline inspection"
    ]
  },

  {

    id:"WS-003",

    workshopName:
      "Ritter",

    region:
      "VIC",

    specialties:[

      "Defender",
      "Service",
      "Workshop"
    ],

    defenderExpertise:true,

    touringInspection:true,

    emergencySupport:false,

    mobileSupport:false,

    supportedRoutes:[

      "High Country"
    ],

    operationalConfidence:0.91,

    leadTimeDays:10,

    recommendedServices:[

      "General service",
      "Touring inspection"
    ]
  }

]

// =====================================================
// ALL
// =====================================================

export function getAllWorkshops(){

  return workshops
}

// =====================================================
// ROUTE SUPPORT
// =====================================================

export function getRouteSupportedWorkshops(

  route:string

){

  return workshops.filter(

    item =>

      item.supportedRoutes?.includes(
        route
      )
  )
}

// =====================================================
// HIGH CONFIDENCE
// =====================================================

export function getHighConfidenceWorkshops(

  minimum:number = 0.9

){

  return workshops.filter(

    item =>

      (item.operationalConfidence || 0)
      >=
      minimum
  )
}

// =====================================================
// TOURING
// =====================================================

export function getTouringInspectionWorkshops(){

  return workshops.filter(

    item =>

      item.touringInspection === true
  )
}
