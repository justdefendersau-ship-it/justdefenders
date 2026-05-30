// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\notifications\route.ts
//
// Timestamp:
// 28 May 2026 00:30 Sydney
//
// PURPOSE:
// Operational notification API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  generateOperationalNotifications

}
from "@/lib/notifications/operationalNotificationRuntime"

import {

  appendNotifications,

  loadNotifications

}
from "@/lib/notifications/persistentNotificationStore"

import {

  logOperationalEvent

}
from "@/lib/runtime/structuredOperationalLogger"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const generated =

      generateOperationalNotifications()

    // ==============================================================
    // LOG
    // ==============================================================

    generated.forEach(
      notification => {

        logOperationalEvent(

          notification.category,

          notification.title,

          notification
        )
      }
    )

    // ==============================================================
    // SAVE
    // ==============================================================

    appendNotifications(
      generated
    )

    // ==============================================================
    // LOAD
    // ==============================================================

    const notifications =

      loadNotifications()

    return NextResponse.json({

      success:true,

      total:
        notifications.length,

      notifications
    })

  } catch(error:any){

    console.error(
      "NOTIFICATION FAILURE:",
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