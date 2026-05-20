// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\api\apiResponses.ts
// Timestamp: 15 May 2026 00:25 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

export interface StandardApiResponse<T> {

  success: boolean

  data?: T

  error?: string

  metadata: {

    timestamp: string

    version: string
  }
}

export function successResponse<T>(
  data: T,
  status = 200
) {

  const response:
    StandardApiResponse<T> = {

    success: true,

    data,

    metadata: {

      timestamp:
        new Date()
          .toISOString(),

      version:
        "2.0.0-enterprise"
    }
  }

  return NextResponse.json(
    response,
    {
      status
    }
  )
}

export function errorResponse(
  error: string,
  status = 500
) {

  const response:
    StandardApiResponse<null> = {

    success: false,

    error,

    metadata: {

      timestamp:
        new Date()
          .toISOString(),

      version:
        "2.0.0-enterprise"
    }
  }

  return NextResponse.json(
    response,
    {
      status
    }
  )
}