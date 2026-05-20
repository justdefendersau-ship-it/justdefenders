// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\telemetry\telemetryTracking.ts
// Timestamp: 15 May 2026 01:05 Sydney
// ====================================================================

import {
  incrementRequestCount,
  incrementSuccessCount,
  incrementErrorCount,
  recordResponseTime
} from "./runtimeMetrics"

export async function trackRuntimeOperation<T>(
  operation: () => Promise<T>
): Promise<T> {

  incrementRequestCount()

  const startedAt =
    Date.now()

  try {

    const result =
      await operation()

    incrementSuccessCount()

    recordResponseTime(
      Date.now() -
      startedAt
    )

    return result

  } catch (error) {

    incrementErrorCount()

    recordResponseTime(
      Date.now() -
      startedAt
    )

    throw error
  }
}