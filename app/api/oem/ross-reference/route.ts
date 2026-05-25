/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\oem\cross-reference\route.ts
 *
 * Timestamp:
 * 21 May 2026 22:08 Sydney
 *
 * PURPOSE:
 * OEM Cross Reference API
 *
 * STRATEGY:
 * PASS 27C — OEM Cross-Reference Intelligence
 *
 * ============================================================
 */
export const dynamic = "force-dynamic"
import {

  NextRequest,
  NextResponse

} from "next/server"

import {

  findOEMCrossReference

} from "@/lib/oem/crossReferenceEngine"

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
            "Missing OEM query"
        },

        {

          status: 400
        }
      )
    }

    const result =
      findOEMCrossReference(
        query
      )

    if (!result){

      return NextResponse.json(

        {

          success: false,

          error:
            "OEM part not found"
        },

        {

          status: 404
        }
      )
    }

    return NextResponse.json({

      success: true,

      result
    })

  } catch (error){

    console.error(

      "OEM CROSS REFERENCE FAILURE",
      error
    )

    return NextResponse.json(

      {

        success: false,

        error:
          "Cross reference engine failure"
      },

      {

        status: 500
      }
    )
  }
}