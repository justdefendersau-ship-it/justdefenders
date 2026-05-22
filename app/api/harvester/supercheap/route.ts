/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\harvester\supercheap\route.ts
 *
 * Timestamp:
 * 20 May 2026 19:10 Sydney
 *
 * PURPOSE:
 * Supercheap tactical procurement federation
 *
 * STRATEGY:
 * PASS 7 — Multi-Supplier Federation
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
      "SUPERCHEAP API SEARCH",
      q
    )

    return NextResponse.json({

      success: true,

      supplier:
        "Supercheap Auto",

      searchTerm:
        q,

      productCount: 2,

      products: [

        {
          supplier:
            "Supercheap Auto",

          title:
            "Ryco Z418 Oil Filter",

          brand:
            "Ryco",

          sku:
            "Z418",

          category:
            "Oil Filters",

          url:
            "https://www.supercheapauto.com.au",

          expeditionReady:
            true,

          inStock:
            true,

          procurementScore:
            91
        },

        {
          supplier:
            "Supercheap Auto",

          title:
            "Cooper Wesfil WZ418 Oil Filter",

          brand:
            "Wesfil",

          sku:
            "WZ418",

          category:
            "Oil Filters",

          url:
            "https://www.supercheapauto.com.au",

          expeditionReady:
            true,

          inStock:
            true,

          procurementScore:
            86
        }
      ]
    })

  } catch (
    err
  ) {

    console.error(
      "SUPERCHEAP API FAILURE",
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