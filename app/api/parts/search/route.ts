import {
  NextRequest,
  NextResponse
} from "next/server"

export async function GET(
  request: NextRequest
) {

  try {

    const query =
      request.nextUrl.searchParams.get(
        "query"
      ) ?? ""

    const results = [

      {
        partNumber:
          "TIMKEN-SET37",

        description:
          "Wheel Bearing Kit",

        confidence: 94
      },

      {
        partNumber:
          "ARB-INTK-001",

        description:
          "Safari Snorkel Kit",

        confidence: 90
      }

    ].filter(
      item =>
        item.description
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
    )

    return NextResponse.json({

      success: true,

      query,

      count:
        results.length,

      results
    })

  } catch (err) {

    const error =
      err instanceof Error
        ? err.message
        : "Unknown search error"

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