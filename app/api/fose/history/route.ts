// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\fose\history\route.ts
//
// Timestamp:
// 27 May 2026 15:25 Sydney
//
// PURPOSE:
// Historical Fleet Operational State Engine API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  replayOperationalHistory

}
from "@/lib/fose/operationalReplayEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const history =

      replayOperationalHistory()

    return NextResponse.json({

      success:true,

      totalStates:
        history.length,

      history
    })

  } catch(error:any){

    console.error(
      "FOSE HISTORY FAILURE:",
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