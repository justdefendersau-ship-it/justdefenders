// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\command\route.ts
//
// Timestamp:
// 28 May 2026 02:50 Sydney
//
// PURPOSE:
// Operational runtime command API.
// ====================================================================

import {
  NextRequest,
  NextResponse
}
from "next/server"

import {

  loadRuntimeCommandState,

  saveRuntimeCommandState

}
from "@/lib/runtime/runtimeCommandEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const state =

      loadRuntimeCommandState()

    return NextResponse.json({

      success:true,

      commandState:state
    })

  } catch(error:any){

    console.error(
      "COMMAND LOAD FAILURE:",
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

    const current =

      loadRuntimeCommandState()

    const updated = {

      ...current,

      ...body,

      timestamp:
        new Date().toISOString()
    }

    saveRuntimeCommandState(
      updated
    )

    return NextResponse.json({

      success:true,

      commandState:updated
    })

  } catch(error:any){

    console.error(
      "COMMAND UPDATE FAILURE:",
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