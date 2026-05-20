// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\runtime\requestGovernance.ts
// Timestamp: 14 May 2026 23:55 Sydney
// ====================================================================

import {
  NextRequest
} from "next/server"

import {
  RuntimeRequestContext,
  generateRequestId
} from "./requestContext"

import {
  logInfo
} from "../logging/runtimeLogger"

export function createRequestContext(
  request: NextRequest
): RuntimeRequestContext {

  const context = {

    requestId:
      generateRequestId(),

    method:
      request.method,

    path:
      request.nextUrl.pathname,

    startedAt:
      Date.now(),

    userAgent:
      request.headers.get(
        "user-agent"
      ),

    ipAddress:
      request.headers.get(
        "x-forwarded-for"
      )
  }

  logInfo(
    "request-governance",
    "Request context created",
    context
  )

  return context
}

export function calculateRequestDuration(
  context: RuntimeRequestContext
): number {

  return (
    Date.now() -
    context.startedAt
  )
}