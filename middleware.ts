// ====================================================================
// JustDefenders ©
// File: /frontend/middleware.ts
// Timestamp: 16 May 2026 16:35 Sydney
// ====================================================================

import {
  NextResponse,
  type NextRequest
} from "next/server"

const protectedRoutes = [

  "/garage",
  "/executive",
  "/reliability",
  "/suppliers"
]

export async function middleware(
  req: NextRequest
) {

  const isProtected =
    protectedRoutes.some(
      (
        route
      ) =>
        req.nextUrl.pathname.startsWith(
          route
        )
    )

  if (
    !isProtected
  ) {

    return NextResponse.next()
  }

  const accessToken =
    req.cookies.get(
      "sb-access-token"
    )

  if (
    !accessToken
  ) {

    return NextResponse.redirect(

      new URL(
        "/login",
        req.url
      )
    )
  }

  return NextResponse.next()
}

export const config = {

  matcher: [

    "/garage/:path*",
    "/executive/:path*",
    "/reliability/:path*",
    "/suppliers/:path*"
  ]
}