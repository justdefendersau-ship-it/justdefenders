// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\garage\fused-timeline\route.ts
//
// Timestamp:
// 27 May 2026 00:25 Sydney
//
// PURPOSE:
// Fused operational intelligence timeline API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {
  buildFusedTimeline
}
from "@/lib/events/timelineFusionEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const timeline =
      buildFusedTimeline()

    return NextResponse.json({

      success:true,

      totalEvents:
        timeline.length,

      timeline
    })

  } catch(error:any){

    console.error(
      "Fused timeline failure",
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