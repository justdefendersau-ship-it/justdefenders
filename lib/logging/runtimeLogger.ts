// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\logging\runtimeLogger.ts
// Timestamp: 14 May 2026 23:00 Sydney
// ====================================================================

export type RuntimeLogLevel =

  | "debug"
  | "info"
  | "warn"
  | "error"
  | "critical"

export interface RuntimeLogEntry {

  timestamp: string

  level: RuntimeLogLevel

  source: string

  message: string

  metadata?: unknown
}

function writeLog(
  entry: RuntimeLogEntry
) {

  const payload =
    JSON.stringify(
      entry,
      null,
      2
    )

  switch (entry.level) {

    case "debug":
      console.debug(payload)
      break

    case "info":
      console.info(payload)
      break

    case "warn":
      console.warn(payload)
      break

    case "error":
    case "critical":
      console.error(payload)
      break

    default:
      console.log(payload)
  }
}

export function logDebug(
  source: string,
  message: string,
  metadata?: unknown
) {

  writeLog({

    timestamp:
      new Date()
        .toISOString(),

    level:
      "debug",

    source,

    message,

    metadata
  })
}

export function logInfo(
  source: string,
  message: string,
  metadata?: unknown
) {

  writeLog({

    timestamp:
      new Date()
        .toISOString(),

    level:
      "info",

    source,

    message,

    metadata
  })
}

export function logWarning(
  source: string,
  message: string,
  metadata?: unknown
) {

  writeLog({

    timestamp:
      new Date()
        .toISOString(),

    level:
      "warn",

    source,

    message,

    metadata
  })
}

export function logError(
  source: string,
  message: string,
  metadata?: unknown
) {

  writeLog({

    timestamp:
      new Date()
        .toISOString(),

    level:
      "error",

    source,

    message,

    metadata
  })
}

export function logCritical(
  source: string,
  message: string,
  metadata?: unknown
) {

  writeLog({

    timestamp:
      new Date()
        .toISOString(),

    level:
      "critical",

    source,

    message,

    metadata
  })
}