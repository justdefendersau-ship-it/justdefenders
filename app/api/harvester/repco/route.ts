/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\harvester\repco\route.ts
 *
 * Timestamp:
 * 20 May 2026 12:25 Sydney
 * ============================================================
 */

import {
  NextRequest,
  NextResponse
} from "next/server"

export async function GET(

  request: NextRequest

) {

  try {

    const q =

      request.nextUrl
        .searchParams
        .get("q")

      || ""

    console.log(
      "REPCO API SEARCH",
      q
    )

    return NextResponse.json({

      success: true,

      supplier:
        "Repco",

      searchTerm:
        q,

      productCount: 2,

      products: [

        {
          supplier:
            "Repco",

          title:
            "Ryco Z89A Oil Filter",

          brand:
            "Ryco",

          sku:
            "Z89A",

          category:
            "Oil Filters",

          url:
            "https://www.repco.com.au",

          expeditionReady:
            true,

          inStock:
            true,

          procurementScore:
            94
        },

        {
          supplier:
            "Repco",

          title:
            "Repco ROF15A Oil Filter",

          brand:
            "Repco",

          sku:
            "ROF15A",

          category:
            "Oil Filters",

          url:
            "https://www.repco.com.au",

          expeditionReady:
            true,

          inStock:
            true,

          procurementScore:
            91
        }
      ]
    })

  } catch (
    err
  ) {

    console.error(
      "REPCO API FAILURE",
      err
    )

    return NextResponse.json(

      {

        success: false,

        products: []
      },

      {
        status: 500
      }
    )
  }
}