import {
  NextRequest,
  NextResponse
} from "next/server"

interface MarketItem {

  id: string

  title: string

  category: string

  price: string

  seller: string

  confidence: number
}

const MARKET_ITEMS:
MarketItem[] = [

  {
    id: "MRK-001",

    title:
      "Defender Puma Bull Bar",

    category:
      "Protection",

    price:
      "$1450",

    seller:
      "Terrain Tamer",

    confidence: 94
  },

  {
    id: "MRK-002",

    title:
      "TD5 Intercooler Upgrade",

    category:
      "Performance",

    price:
      "$890",

    seller:
      "Allisport",

    confidence: 91
  }

]

export async function GET(
  request: NextRequest
) {

  try {

    const query =
      request.nextUrl.searchParams.get(
        "query"
      ) ?? ""

    const results =
      MARKET_ITEMS.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            ) ||

          item.category
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      )

    return NextResponse.json({

      success: true,

      count:
        results.length,

      results
    })

  } catch (err) {

    const error =
      err instanceof Error
        ? err.message
        : "Unknown market error"

    return NextResponse.json(
      {

        success: false,

        error
      },

      {
        status: 500
      }
    )
  }
}