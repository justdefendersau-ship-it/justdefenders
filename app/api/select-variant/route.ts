// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\select-variant\route.ts
// Timestamp: 15 May 2026 02:45 Sydney

import {
  NextRequest,
  NextResponse
} from "next/server"

export async function GET(
  request: NextRequest
) {

  const variant =
    request.nextUrl.searchParams.get(
      "variant"
    ) ?? "standard"

  return NextResponse.json({

    success: true,

    selectedVariant:
      variant
  })
}