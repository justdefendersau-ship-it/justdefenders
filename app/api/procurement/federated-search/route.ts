/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\app\api\procurement\federated-search\route.ts
 *
 * Timestamp:
 * 17 May 2026 23:50 Sydney
 *
 * PURPOSE:
 * Federated Procurement Search API
 *
 * STRATEGY:
 * Multi-source procurement federation
 * ============================================================
 */

import {
  NextResponse
} from "next/server"

import {
  executeFederatedProcurement
} from "@/lib/procurement/federatedProcurementEngine"

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
          "Missing federated procurement query"

      },{

        status: 400
      })
    }

    // ========================================================
    // FEDERATED EXECUTION
    // ========================================================

    const federation =
      await executeFederatedProcurement({

        query:
          body.query,

        country:
          body.country || "AU",

        expeditionCritical:
          body.expeditionCritical ?? true,

        internationalEnabled:
          body.internationalEnabled ?? false,

        recoverySearchEnabled:
          body.recoverySearchEnabled ?? true
      })

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json({

      success: true,

      federation
    })

  } catch(error){

    // ========================================================
    // ERROR
    // ========================================================

    console.error(
      "FEDERATED_PROCUREMENT_ERROR",
      error
    )

    return NextResponse.json({

      success: false,

      error:
        "Federated procurement execution failed"

    },{

      status: 500
    })
  }
}