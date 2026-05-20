// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\runtime\requestContext.ts
// Timestamp: 14 May 2026 23:55 Sydney
// ====================================================================

export interface RuntimeRequestContext {

  requestId: string

  method: string

  path: string

  startedAt: number

  userAgent?: string | null

  ipAddress?: string | null
}

export function generateRequestId():
string {

  return (

    "jd-" +

    Math.random()
      .toString(36)
      .substring(2, 10) +

    "-" +

    Date.now()
      .toString(36)
  )
}