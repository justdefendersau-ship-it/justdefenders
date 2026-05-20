// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\services\supabase\baseSupabaseService.ts
// Timestamp: 14 May 2026 23:30 Sydney
// ====================================================================

import {
  getServerSupabaseClient
} from "./serverClient"

import {
  logWarning,
  logError
} from "../../logging/runtimeLogger"

export async function executeSupabaseOperation<T>(
  source: string,
  operation: (
    client: NonNullable<
      ReturnType<
        typeof getServerSupabaseClient
      >
    >
  ) => Promise<T>
): Promise<T | null> {

  const client =
    getServerSupabaseClient()

  if (!client) {

    logWarning(
      source,
      "Supabase client unavailable"
    )

    return null
  }

  try {

    return await operation(
      client
    )

  } catch (error) {

    logError(
      source,
      "Supabase operation failed",
      {

        error:
          error instanceof Error
            ? error.message
            : String(error)
      }
    )

    return null
  }
}