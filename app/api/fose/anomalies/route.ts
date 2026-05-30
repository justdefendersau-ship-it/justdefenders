// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\fose\anomalies\route.ts
//
// Timestamp:
// 27 May 2026 19:05 Sydney
//
// PURPOSE:
// Operational anomaly intelligence API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  detectOperationalAnomalies

}
from "@/lib/fose/operationalAnomalyDetectionEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const anomalies =

      detectOperationalAnomalies()

    return NextResponse.json({

      success:true,

      total:
        anomalies.length,

      anomalies
    })

  } catch(error:any){

    console.error(
      "ANOMALY DETECTION FAILURE:",
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