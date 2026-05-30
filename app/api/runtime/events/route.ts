// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\events\route.ts
//
// Timestamp:
// 28 May 2026 04:30 Sydney
//
// PURPOSE:
// Runtime event bus API.
// ====================================================================

import {
  NextRequest,
  NextResponse
}
from "next/server"

import {

  emitRuntimeEvent,

  loadRuntimeEvents

}
from "@/lib/runtime/runtimeEventBus"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const events =

      loadRuntimeEvents()

    return NextResponse.json({

      success:true,

      total:
        events.length,

      events
    })

  } catch(error:any){

    console.error(
      "EVENT BUS FAILURE:",
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

// ====================================================================
// POST
// ====================================================================

export async function POST(

  request:NextRequest

){

  try {

    const body =
      await request.json()

    const event =

      emitRuntimeEvent(

        body.type,

        body.source,

        body.payload
      )

    return NextResponse.json({

      success:true,

      event
    })

  } catch(error:any){

    console.error(
      "EVENT EMIT FAILURE:",
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