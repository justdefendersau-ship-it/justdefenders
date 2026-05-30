// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\mobile\sync-events\route.ts
//
// Timestamp:
// 27 May 2026 11:10 Sydney
//
// PURPOSE:
// Mobile operational synchronization endpoint.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  emitOperationalEvent

}
from "@/lib/events/operationalEventBus"

// ====================================================================
// POST
// ====================================================================

export async function POST(
  request:Request
){

  try {

    const body =
      await request.json()

    console.log(
      "MOBILE SYNC BODY:",
      body
    )

    const events =
      body.events || []

    // ================================================================
    // EMIT EVENTS
    // ================================================================

    for(
      const event
      of events
    ){

      emitOperationalEvent({

        id:
          event.id,

        timestamp:
          event.timestamp,

        type:
          event.type,

        severity:
          event.severity,

        source:
          event.source,

        title:
          event.title,

        description:
          event.description,

        telemetry:
          event.telemetry
      })
    }

    return NextResponse.json({

      success:true,

      synced:
        events.length
    })

  } catch(error:any){

    console.error(
      "MOBILE SYNC FAILURE:",
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

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  return NextResponse.json({

    success:true,

    endpoint:
      "mobile-sync",

    status:
      "online"
  })
}