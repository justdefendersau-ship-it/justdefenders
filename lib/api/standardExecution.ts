// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\api\standardExecution.ts
// Timestamp: 15 May 2026 00:25 Sydney
// ====================================================================

import {
  successResponse,
  errorResponse
} from "./apiResponses"

import {
  logError
} from "../logging/runtimeLogger"

export async function standardApiExecution<T>(
  source: string,
  operation: () => Promise<T>
) {

  try {

    const result =
      await operation()

    return successResponse(
      result
    )

  } catch (error) {

    logError(
      source,
      "Standard API execution failure",
      {

        error:
          error instanceof Error
            ? error.message
            : String(error)
      }
    )

    return errorResponse(
      "Internal server error",
      500
    )
  }
}