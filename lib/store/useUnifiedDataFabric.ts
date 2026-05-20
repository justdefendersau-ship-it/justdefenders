/* =====================================================
   JustDefenders ©
   File:
   /lib/store/useUnifiedDataFabric.ts

   Timestamp:
   11 May 2026 15:15 (Sydney)

   PURPOSE:
   Unified enterprise telemetry fabric
===================================================== */

"use client"

import { create } from "zustand"

export interface MissionNode {

  id:string

  name:string

  latitude:number

  longitude:number

  status:string

  risk:number

  activity:number
}

interface UnifiedFabricState {

  missions:MissionNode[]

  selectedMission?:MissionNode

  updateMission:
  (
    mission:MissionNode
  )=>void

  setSelectedMission:
  (
    mission:MissionNode
  )=>void
}

export const useUnifiedDataFabric =
create<UnifiedFabricState>(
(
  set
)=>({

  missions:[

    {

      id:"OPS-001",

      name:"Sydney Maritime Corridor",

      latitude:-33.8688,

      longitude:151.2093,

      status:"ACTIVE",

      risk:82,

      activity:91
    },

    {

      id:"OPS-002",

      name:"Singapore Operations Grid",

      latitude:1.3521,

      longitude:103.8198,

      status:"MONITORING",

      risk:68,

      activity:77
    },

    {

      id:"OPS-003",

      name:"Dubai Logistics Federation",

      latitude:25.2048,

      longitude:55.2708,

      status:"ESCALATED",

      risk:94,

      activity:99
    }
  ],

  updateMission:(mission)=>{

    set(
      (
        state
      )=>({

        missions:
        state.missions.map(
          (
            item
          )=>
            item.id === mission.id
            ? mission
            : item
        )
      })
    )
  },

  setSelectedMission:(mission)=>{

    set({

      selectedMission:mission
    })
  }
}))
