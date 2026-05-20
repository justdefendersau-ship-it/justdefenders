// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\parts\search\route.ts
// Timestamp: 15 May 2026 02:25 Sydney

import {
  NextRequest,
  NextResponse
} from "next/server"

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json()

    const query =
      String(
        body?.query ?? ""
      ).toLowerCase()

    const results = [

      {
        partNumber:
          "DEF-PUMA-001",

        description:
          "Puma Oil Filter",

        supplier:
          "LR Direct",

        price:
          "$24.95",

        confidence: 95
      },

      {
        partNumber:
          "DEF-TD5-002",

        description:
          "TD5 Fuel Regulator",

        supplier:
          "Allisport",

        price:
          "$142.00",

        confidence: 91
      }

    ].filter(
      (
        item
      ) =>
        item.description
          .toLowerCase()
          .includes(query) ||

        item.partNumber
          .toLowerCase()
          .includes(query)
    )

    return NextResponse.json({

      success: true,

      results
    })

  } catch (err) {

    console.error(
      "Parts search failure",
      err
    )

    return NextResponse.json(
      {

        success: false,

        error:
          "Parts search failed"
      },

      {
        status: 500
      }
    )
  }
}