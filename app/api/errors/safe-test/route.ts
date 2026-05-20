// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\errors\safe-test\route.ts
// Timestamp: 14 May 2026 23:15 Sydney
// ====================================================================

import {
  safeApiExecution
} from "../../../../lib/errors/safeExecution"

export async function GET() {

  return safeApiExecution(
    "safe-test-endpoint",

    async () => {

      return {

        operational: true,

        runtime:
          "stable",

        timestamp:
          new Date()
            .toISOString()
      }
    }
  )
}