// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\logging\structuredLoggingPipeline.ts
// Timestamp: 15 May 2026 00:15 Sydney

export interface StructuredLogEntry {

  level:
    | "info"
    | "warn"
    | "error"
    | "debug"

  message: string

  timestamp: string

  metadata?: Record<
    string,
    unknown
  >
}

class RuntimeLogger {

  private write(
    entry: StructuredLogEntry
  ): void {

    const output = {

      ...entry
    }

    /**
     * Structured JSON logging
     */
    console.log(
      JSON.stringify(output)
    )
  }

  info(
    message: string,
    metadata?: Record<
      string,
      unknown
    >
  ): void {

    this.write({

      level: "info",

      message,

      timestamp:
        new Date()
          .toISOString(),

      metadata
    })
  }

  warn(
    message: string,
    metadata?: Record<
      string,
      unknown
    >
  ): void {

    this.write({

      level: "warn",

      message,

      timestamp:
        new Date()
          .toISOString(),

      metadata
    })
  }

  error(
    message: string,
    metadata?: Record<
      string,
      unknown
    >
  ): void {

    this.write({

      level: "error",

      message,

      timestamp:
        new Date()
          .toISOString(),

      metadata
    })
  }

  debug(
    message: string,
    metadata?: Record<
      string,
      unknown
    >
  ): void {

    this.write({

      level: "debug",

      message,

      timestamp:
        new Date()
          .toISOString(),

      metadata
    })
  }
}

export const runtimeLogger =
  new RuntimeLogger()