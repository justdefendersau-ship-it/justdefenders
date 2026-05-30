// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\recovery\route.ts
//
// Timestamp:
// 28 May 2026 01:20 Sydney
//
// PURPOSE:
// Runtime recovery status API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import path from "path"

import {

  safeJsonLoad

}
from "@/lib/runtime/runtimeRecoveryEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const notificationPath =

      path.join(

        process.cwd(),

        "data",

        "notifications",

        "notifications.json"
      )

    const notifications =

      safeJsonLoad(

        notificationPath,

        []
      )

    return NextResponse.json({

      success:true,

      recovery:{

        notificationsRecovered:
          notifications.length,

        runtimeRecoveryActive:true,

        operationalContinuity:true
      }
    })

  } catch(error:any){

    console.error(
      "RECOVERY API FAILURE:",
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