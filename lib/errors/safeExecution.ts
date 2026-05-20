// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\errors\safeExecution.ts
// Timestamp: 14 May 2026 23:15 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  RuntimeError
} from "./runtimeErrors"

import {
  logError
} from "../logging/runtimeLogger"

export async function safeApiExecution<T>(
  source: string,
  operation: () => Promise<T>
) {

  try {

    const result =
      await operation()

    return NextResponse.json({

      success: true,

      data:
        result
    })

  } catch (error) {

    logError(
      source,
      "Safe execution failure",
      {

        error:
          error instanceof Error
            ? error.message
            : String(error)
      }
    )

    if (
      error instanceof RuntimeError
    ) {

      return NextResponse.json(
        {

          success: false,

          error:
            error.message
        },

        {
          status:
            error.statusCode
        }
      )
    }

    return NextResponse.json(
      {

        success: false,

        error:
          "Internal server error"
      },

      {
        status: 500
      }
    )
  }
}