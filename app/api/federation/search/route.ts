/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\federation\search\route.ts
 *
 * Timestamp:
 * 21 May 2026 21:18 Sydney
 *
 * PURPOSE:
 * Federation Procurement API
 *
 * STRATEGY:
 * PASS 27 — Real Supplier Federation Adapters
 *
 * ============================================================
 */
export const dynamic = "force-dynamic"
import {

  NextRequest,
  NextResponse

} from "next/server"

import {

  runFederatedSearch

} from "@/lib/federation/federationEngine"

export async function GET(

  request: NextRequest

){

  try {

    const query =

      request.nextUrl
      .searchParams
      .get("query")

    if (!query){

      return NextResponse.json(

        {

          success: false,

          error:
            "Missing query parameter"
        },

        {

          status: 400
        }
      )
    }

    const results = await runFederatedSearch(
      query
    )

    return NextResponse.json({

      success: true,

      federationCount:
        results.length,

      results
    })

  } catch (error){

    console.error(

      "FEDERATION SEARCH FAILURE",
      error
    )

    return NextResponse.json(

      {

        success: false,

        error:
          "Federation engine failure"
      },

      {

        status: 500
      }
    )
  }
}