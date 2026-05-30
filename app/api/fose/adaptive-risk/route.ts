// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\fose\adaptive-risk\route.ts
//
// Timestamp:
// 27 May 2026 16:50 Sydney
//
// PURPOSE:
// Adaptive operational intelligence API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  analyzeAdaptiveOperationalRisk

}
from "@/lib/fose/adaptiveRiskIntelligence"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const analysis =

      analyzeAdaptiveOperationalRisk()

    return NextResponse.json({

      success:true,

      analysis
    })

  } catch(error:any){

    console.error(
      "ADAPTIVE RISK FAILURE:",
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