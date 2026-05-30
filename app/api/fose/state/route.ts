// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\fose\state\route.ts
//
// Timestamp:
// 27 May 2026 14:05 Sydney
//
// PURPOSE:
// Fleet Operational State Engine API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  calculateOperationalState

}
from "@/lib/fose/readinessEngine"

import {

  aggregateOperationalIntelligence

}
from "@/lib/fose/operationalIntelligenceAggregator"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    // ================================================================
    // AGGREGATE LIVE OPERATIONAL INTELLIGENCE
    // ================================================================

    const intelligence =

      aggregateOperationalIntelligence()

    // ================================================================
    // CALCULATE OPERATIONAL STATE
    // ================================================================

    const state =

      calculateOperationalState(
        intelligence
      )

    return NextResponse.json({

      success:true,

      state
    })

  } catch(error:any){

    console.error(
      "FOSE API FAILURE:",
      error
    )

    return NextResponse.json({

      success:false,

      error:
        error.message

    },{
      status:500
    })
  }
}