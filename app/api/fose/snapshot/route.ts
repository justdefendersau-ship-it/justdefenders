// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\fose\snapshot\route.ts
//
// Timestamp:
// 28 May 2026 02:00 Sydney
//
// PURPOSE:
// Fleet operational snapshot API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  saveOperationalSnapshot,

  loadOperationalSnapshot

}
from "@/lib/fose/operationalSnapshotEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    // ==============================================================
    // MOCK STATE
    // ==============================================================

    const state = {

      operationalReadiness:68,

      expeditionReadiness:58,

      survivabilityScore:85,

      operationalStatus:"AMBER",

      maintenanceBurden:"MEDIUM",

      failureExposure:"MEDIUM",

      activeAlerts:0,

      survivabilityAlerts:1
    }

    // ==============================================================
    // SNAPSHOT
    // ==============================================================

    saveOperationalSnapshot({

      timestamp:
        new Date().toISOString(),

      operationalReadiness:
        state.operationalReadiness,

      expeditionReadiness:
        state.expeditionReadiness,

      survivabilityScore:
        state.survivabilityScore,

      operationalStatus:
        state.operationalStatus,

      maintenanceBurden:
        state.maintenanceBurden,

      failureExposure:
        state.failureExposure,

      activeAlerts:
        state.activeAlerts,

      survivabilityAlerts:
        state.survivabilityAlerts
    })

    // ==============================================================
    // LOAD
    // ==============================================================

    const snapshot =

      loadOperationalSnapshot()

    return NextResponse.json({

      success:true,

      snapshot
    })

  } catch(error:any){

    console.error(
      "SNAPSHOT FAILURE:",
      error
    )

    return NextResponse.json({

      success:false,

      error:error.message

    },{
      status:500
    })
  }
}