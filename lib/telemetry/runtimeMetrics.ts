// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\telemetry\runtimeMetrics.ts
// Timestamp: 15 May 2026 01:05 Sydney
// ====================================================================

export interface RuntimeMetrics {

  totalRequests: number

  totalErrors: number

  successfulRequests: number

  failedRequests: number

  averageResponseTime: number

  lastUpdated: string
}

const metrics:
RuntimeMetrics = {

  totalRequests: 0,

  totalErrors: 0,

  successfulRequests: 0,

  failedRequests: 0,

  averageResponseTime: 0,

  lastUpdated:
    new Date()
      .toISOString()
}

const responseTimes:
number[] = []

export function incrementRequestCount() {

  metrics.totalRequests += 1

  updateTimestamp()
}

export function incrementSuccessCount() {

  metrics.successfulRequests += 1

  updateTimestamp()
}

export function incrementErrorCount() {

  metrics.totalErrors += 1

  metrics.failedRequests += 1

  updateTimestamp()
}

export function recordResponseTime(
  duration: number
) {

  responseTimes.push(
    duration
  )

  if (
    responseTimes.length > 1000
  ) {

    responseTimes.shift()
  }

  const total =
    responseTimes.reduce(
      (
        accumulator,
        value
      ) =>
        accumulator + value,
      0
    )

  metrics.averageResponseTime =
    responseTimes.length > 0
      ? Math.round(
          total /
          responseTimes.length
        )
      : 0

  updateTimestamp()
}

export function getRuntimeMetrics():
RuntimeMetrics {

  return {

    ...metrics
  }
}

function updateTimestamp() {

  metrics.lastUpdated =
    new Date()
      .toISOString()
}