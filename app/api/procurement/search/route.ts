/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\procurement\search\route.ts
 *
 * Timestamp:
 * 22 May 2026 11:34 Sydney
 *
 * PURPOSE:
 * Live Procurement Federation Search API
 *
 * STRATEGY:
 * PASS 31A — Live Procurement Search Wiring
 *
 * OBJECTIVES:
 * - live federation execution
 * - supplier federation activation
 * - operational procurement search
 * - telemetry continuity
 * - live supplier rendering
 *
 * ============================================================
 */

import {

  NextRequest,
  NextResponse

} from "next/server"

import {

  runFederatedSearch

} from "@/lib/federation/federationEngine"

// ============================================================
// GET
// ============================================================

export async function GET(

  request: NextRequest

){

  const {

    searchParams

  } = new URL(
    request.url
  )

  const query =
    searchParams.get("q")

  // ==========================================================
  // VALIDATION
  // ==========================================================

  if (

    !query

    ||

    !query.trim()

  ){

    return NextResponse.json(

      {

        success: false,

        error:
          "Missing procurement query"

      },

      {

        status: 400
      }
    )
  }

  const started =
    Date.now()

  try {

    // ========================================================
    // FEDERATION EXECUTION
    // ========================================================

    const products =
      await runFederatedSearch(
        query
      )

    const latency =
      Date.now() - started

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json({

      success: true,

      query,

      telemetry: {

        federationLatency:
          latency,

        supplierCount:
          products.length,

        federationActive:
          true,

        generatedAt:
          new Date().toISOString()
      },

      products
    })

  } catch (error){

    // ========================================================
    // FAILURE
    // ========================================================

    return NextResponse.json(

      {

        success: false,

        query,

        error:

          error instanceof Error

          ?

          error.message

          :

          "Federation execution failure"

      },

      {

        status: 500
      }
    )
  }
}