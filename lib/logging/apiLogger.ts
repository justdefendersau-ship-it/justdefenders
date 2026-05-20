// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\logging\apiLogger.ts
// Timestamp: 14 May 2026 23:00 Sydney
// ====================================================================

import {
  NextRequest
} from "next/server"

import {
  logInfo,
  logError
} from "./runtimeLogger"

export function logApiRequest(
  request: NextRequest,
  source: string
) {

  logInfo(
    source,
    "API request received",
    {

      method:
        request.method,

      path:
        request.nextUrl.pathname,

      userAgent:
        request.headers.get(
          "user-agent"
        )
    }
  )
}

export function logApiError(
  source: string,
  error: unknown
) {

  logError(
    source,
    "API request failed",
    {

      error:
        error instanceof Error
          ? error.message
          : String(error)
    }
  )
}