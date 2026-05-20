/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\app\api\procurement\search\route.ts
 *
 * Timestamp:
 * 17 May 2026 21:20 Sydney
 *
 * PURPOSE:
 * Operational Procurement Search API
 * ============================================================
 */

import {
  NextResponse
} from "next/server"

import {
  orchestrateOperationalProcurement
} from "@/lib/procurement/operationalProcurementOrchestrator"

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request
){

  try {

    // ========================================================
    // BODY
    // ========================================================

    const body =
      await request.json()

    // ========================================================
    // VALIDATION
    // ========================================================

    if(
      !body.query
    ){

      return NextResponse.json({

        success: false,

        error:
          "Missing procurement query"

      },{

        status: 400
      })
    }

    // ========================================================
    // PROCUREMENT ORCHESTRATION
    // ========================================================

    const result =
      await orchestrateOperationalProcurement({

        query:
          body.query,

        vehicleId:
          body.vehicleId,

        country:
          body.country || "AU",

        expeditionCritical:
          body.expeditionCritical ?? true,

        oemPriority:
          body.oemPriority ?? true,

        internationalEnabled:
          body.internationalEnabled ?? false
      })

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json({

      success: true,

      procurement:
        result
    })

  } catch(error){

    // ========================================================
    // ERROR
    // ========================================================

    console.error(
      "PROCUREMENT_SEARCH_ERROR",
      error
    )

    return NextResponse.json({

      success: false,

      error:
        "Operational procurement orchestration failed"

    },{

      status: 500
    })
  }
}