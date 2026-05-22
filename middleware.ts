/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\middleware.ts
 *
 * Timestamp:
 * 21 May 2026 15:44 Sydney
 *
 * PURPOSE:
 * Production Middleware
 *
 * STRATEGY:
 * PASS 23 — Production Readiness Layer
 *
 * FEATURES:
 * - basic rate limiting
 * - security headers
 * - request hardening
 *
 * ============================================================
 */

import {
  NextRequest,
  NextResponse
} from "next/server"

// ============================================================
// RATE LIMIT MAP
// ============================================================

const rateLimitMap =
  new Map()

// ============================================================
// MIDDLEWARE
// ============================================================

export function middleware(

  request: NextRequest

){

  const ip =

    request.ip
    ||
    "unknown"

  const now =
    Date.now()

  const windowMs =
    60 * 1000

  const limit =
    120

  const requestLog =

    rateLimitMap.get(ip)

  if (
    requestLog
  ) {

    const recentRequests =

      requestLog.filter(

        (timestamp: number) =>

          now - timestamp < windowMs
      )

    recentRequests.push(now)

    rateLimitMap.set(
      ip,
      recentRequests
    )

    if (
      recentRequests.length > limit
    ) {

      return new NextResponse(

        "Rate limit exceeded",

        {
          status: 429
        }
      )
    }

  } else {

    rateLimitMap.set(
      ip,
      [now]
    )
  }

  // ==========================================================
  // RESPONSE
  // ==========================================================

  const response =
    NextResponse.next()

  // ==========================================================
  // SECURITY HEADERS
  // ==========================================================

  response.headers.set(

    "X-Frame-Options",

    "DENY"
  )

  response.headers.set(

    "X-Content-Type-Options",

    "nosniff"
  )

  response.headers.set(

    "Referrer-Policy",

    "strict-origin-when-cross-origin"
  )

  response.headers.set(

    "X-JustDefenders",

    "Operational Procurement Intelligence"
  )

  return response
}