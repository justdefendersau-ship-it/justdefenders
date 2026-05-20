import {
  NextRequest,
  NextResponse
} from "next/server"

export async function GET(
  request: NextRequest
) {

  try {

    const destination =
      request.nextUrl.searchParams.get(
        "to"
      ) ?? "/"

    /**
     * Safe internal redirects only
     */
    const safeDestination =
      destination.startsWith("/")
        ? destination
        : "/"

    return NextResponse.json({

      success: true,

      redirect:
        safeDestination
    })

  } catch (err) {

    const error =
      err instanceof Error
        ? err.message
        : "Unknown redirect error"

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