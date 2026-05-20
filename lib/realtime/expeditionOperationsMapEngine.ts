/* =====================================================
   JustDefenders ©
   File:
   /lib/realtime/expeditionOperationsMapEngine.ts

   Timestamp:
   13 May 2026 01:00 (Sydney)

   PURPOSE:
   Expedition operations map engine
===================================================== */

export interface ExpeditionMapNode {

  id:string

  region:string

  terrainRisk:string

  survivability:number

  convoyStatus:string

  weatherThreat:string

  x:number

  y:number
}

// =====================================================
// MAP NODES
// =====================================================

export const expeditionMapNodes:
ExpeditionMapNode[] = [

  {

    id:"MAP-001",

    region:"Simpson Desert",

    terrainRisk:"HIGH",

    survivability:71,

    convoyStatus:"ACTIVE",

    weatherThreat:"THERMAL",

    x:18,

    y:42
  },

  {

    id:"MAP-002",

    region:"Cape York",

    terrainRisk:"MODERATE",

    survivability:84,

    convoyStatus:"STABLE",

    weatherThreat:"FLOODING",

    x:68,

    y:22
  },

  {

    id:"MAP-003",

    region:"Canning Stock Route",

    terrainRisk:"CRITICAL",

    survivability:58,

    convoyStatus:"DEGRADED",

    weatherThreat:"REMOTE ISOLATION",

    x:36,

    y:72
  },

  {

    id:"MAP-004",

    region:"Victorian High Country",

    terrainRisk:"LOW",

    survivability:92,

    convoyStatus:"OPTIMAL",

    weatherThreat:"MINIMAL",

    x:74,

    y:78
  }

]
