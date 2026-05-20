/* =====================================================
   JustDefenders ©
   Route Intelligence Engine
===================================================== */

import {

  RouteIntelligenceContract

}
from "../contracts/routeIntelligence"

// =====================================================
// ROUTES
// =====================================================

const routes:
  RouteIntelligenceContract[] = [

  // ===================================================
  // SIMPSON DESERT
  // ===================================================

  {

    id:"ROUTE-001",

    routeName:
      "Simpson Desert",

    region:
      "NT/SA/QLD",

    difficulty:
      "extreme",

    remotenessScore:95,

    environmentalHazards:[

      "Deep sand dunes",
      "Extreme heat",
      "Fuel logistics",
      "Isolation"

    ],

    commonFailures:[

      "Cooling systems",
      "Tyre failures",
      "Shock absorber fatigue"

    ],

    requiredPreparation:[

      "Long range fuel",
      "Satellite communications",
      "Tyre redundancy"

    ],

    minimumFuelRange:1000,

    recommendedWaterLitres:80,

    communicationsRequired:[

      "Satellite phone",
      "PLB"

    ],

    recoveryRequirements:[

      "MaxTrax",
      "Long-handle shovel",
      "Recovery straps"

    ],

    seasonalWarnings:[

      "Avoid summer heat"
    ],

    tyreRisk:92,

    heatStress:97,

    waterCrossingRisk:10,

    corrugationSeverity:70,

    isolationRisk:96
  },

  // ===================================================
  // OLD TELEGRAPH TRACK
  // ===================================================

  {

    id:"ROUTE-002",

    routeName:
      "Old Telegraph Track",

    region:
      "QLD",

    difficulty:
      "extreme",

    remotenessScore:88,

    environmentalHazards:[

      "Deep river crossings",
      "Mud",
      "Vehicle drownings"

    ],

    commonFailures:[

      "Wheel bearings",
      "Electrical systems",
      "Hub seals"

    ],

    requiredPreparation:[

      "Snorkel",
      "Breather extensions",
      "Water crossing prep"

    ],

    minimumFuelRange:700,

    recommendedWaterLitres:60,

    communicationsRequired:[

      "Satellite phone"
    ],

    recoveryRequirements:[

      "Winch",
      "Snatch straps"

    ],

    seasonalWarnings:[

      "Wet season closures"
    ],

    tyreRisk:60,

    heatStress:78,

    waterCrossingRisk:99,

    corrugationSeverity:55,

    isolationRisk:82
  },

  // ===================================================
  // GIBB RIVER ROAD
  // ===================================================

  {

    id:"ROUTE-003",

    routeName:
      "Gibb River Road",

    region:
      "WA",

    difficulty:
      "hard",

    remotenessScore:80,

    environmentalHazards:[

      "Corrugations",
      "Rock strikes",
      "Dust"

    ],

    commonFailures:[

      "Shock absorbers",
      "Suspension fatigue",
      "Tyre punctures"

    ],

    requiredPreparation:[

      "Suspension inspection",
      "Tyre repair kits"

    ],

    minimumFuelRange:800,

    recommendedWaterLitres:60,

    tyreRisk:78,

    heatStress:75,

    waterCrossingRisk:45,

    corrugationSeverity:95,

    isolationRisk:76
  },

  // ===================================================
  // CANNING STOCK ROUTE
  // ===================================================

  {

    id:"ROUTE-004",

    routeName:
      "Canning Stock Route",

    region:
      "WA",

    difficulty:
      "extreme",

    remotenessScore:100,

    environmentalHazards:[

      "Extreme isolation",
      "Sand dunes",
      "Heat"

    ],

    commonFailures:[

      "Cooling systems",
      "Tyres",
      "Fuel contamination"

    ],

    requiredPreparation:[

      "Dual spare tyres",
      "Long-range fuel",
      "Satellite communications"

    ],

    minimumFuelRange:1400,

    recommendedWaterLitres:120,

    tyreRisk:94,

    heatStress:96,

    waterCrossingRisk:5,

    corrugationSeverity:82,

    isolationRisk:100
  },

  // ===================================================
  // BLUE RAG
  // ===================================================

  {

    id:"ROUTE-005",

    routeName:
      "Blue Rag Range Track",

    region:
      "VIC",

    difficulty:
      "hard",

    remotenessScore:58,

    environmentalHazards:[

      "Steep climbs",
      "Loose rock",
      "Weather shifts"

    ],

    commonFailures:[

      "Clutch overheating",
      "Tyre damage"

    ],

    requiredPreparation:[

      "Recovery gear",
      "Tyre pressure management"

    ],

    minimumFuelRange:350,

    recommendedWaterLitres:30,

    tyreRisk:74,

    heatStress:35,

    waterCrossingRisk:20,

    corrugationSeverity:40,

    isolationRisk:52
  }

]

// =====================================================
// ENGINE
// =====================================================

export function getRouteIntelligence(){

  return routes
}

export function getRouteByName(

  routeName:string

){

  return routes.find(

    route =>

      route.routeName === routeName
  )
}
