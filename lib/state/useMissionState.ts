/* =====================================================
   JustDefenders ©
   File:
   /lib/state/useMissionState.ts

   Timestamp:
   14 May 2026 04:15 (Sydney)

   PURPOSE:
   Live mission state synchronisation
===================================================== */

import {
  create
}
from "zustand"

export interface MissionState {

  missionStatus:string

  activeThreats:number

  telemetryRate:number

  updateMission:
  (
    data:Partial<MissionState>
  )=>void
}

export const useMissionState =
create<MissionState>(
  (
    set
  )=>({

    missionStatus:
    "OPERATIONAL",

    activeThreats:4,

    telemetryRate:12800,

    updateMission:data=>
      set(data)
  })
)
