/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\app\api\procurement\live-federation\route.ts
 *
 * Timestamp:
 * 18 May 2026 02:35 Sydney
 *
 * PURPOSE:
 * Live Federated Procurement API
 *
 * STRATEGY:
 * Real procurement federation execution layer
 *
 * RESPONSIBILITIES:
 * - connector federation
 * - procurement orchestration
 * - live ingestion execution
 * - expedition-aware procurement
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
          "Missing live federation query"

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
      "LIVE_FEDERATION_ERROR",
      error
    )

    return NextResponse.json({

      success: false,

      error:
        "Live procurement federation failed"

    },{

      status: 500
    })
  }
}