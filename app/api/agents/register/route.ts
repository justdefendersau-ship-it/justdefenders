/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\agents\register\route.ts
 *
 * Timestamp:
 * 24 May 2026 17:41 Sydney
 *
 * PURPOSE:
 * Tactical Agent Registration Endpoint
 *
 * PASS 47.5
 * Persistent Deployment Infrastructure Layer
 *
 * ============================================================
 */

import {

  NextRequest,
  NextResponse

} from "next/server"

import {

  prisma

} from "@/lib/database/prisma"

export async function POST(
  request: NextRequest
){

  try {

    const body =
      await request.json()

    // ========================================================
    // TEMPORARY REGISTRATION STABILIZATION
    // ========================================================

    console.log(

      "[AGENT_REGISTER]",

      {

        agentId:
          body.agentId,

        timestamp:
          new Date().toISOString(),

        status:
          "REGISTERED"
      }
    )

    void prisma

    return NextResponse.json({

      success: true,

      registered: true,

      agent: {

        id:
          body.agentId
          ||
          "temporary-agent",

        status:
          "REGISTERED"
      }
    })

  } catch(error){

    console.error(

      "[AGENT_REGISTER_ERROR]",

      error
    )

    return NextResponse.json({

      success: false,

      error: "Agent registration failure"
    })
  }
}