// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\route.ts
//
// Timestamp:
// 27 May 2026 20:40 Sydney
//
// PURPOSE:
// Runtime configuration API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  RuntimeConfiguration

}
from "@/lib/runtime/runtimeConfiguration"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    return NextResponse.json({

      success:true,

      runtime:{

        environment:
          RuntimeConfiguration.environment,

        safeMode:
          RuntimeConfiguration.safeMode,

        telemetryEnabled:
          RuntimeConfiguration.telemetryEnabled,

        realELM327Enabled:
          RuntimeConfiguration.realELM327Enabled,

        notificationsEnabled:
          RuntimeConfiguration.notificationsEnabled,

        anomalyDetectionEnabled:
          RuntimeConfiguration
            .anomalyDetectionEnabled,

        predictiveEngineEnabled:
          RuntimeConfiguration
            .predictiveEngineEnabled,

        adaptiveIntelligenceEnabled:
          RuntimeConfiguration
            .adaptiveIntelligenceEnabled,

        debugLogging:
          RuntimeConfiguration
            .debugLogging
      }
    })

  } catch(error:any){

    console.error(
      "RUNTIME API FAILURE:",
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