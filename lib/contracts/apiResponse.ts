// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\contracts\apiResponse.ts
// Timestamp: 14 May 2026 21:25 Sydney
// PHASE 2A — FOUNDATION HARDENING
// STEP 4 — API RESPONSE CONTRACTS
// ====================================================================

export interface ApiResponse<T> {

  success: boolean

  data?: T

  error?: string

  meta?: unknown
}

export function successResponse<T>(
  data: T,
  meta?: unknown
): ApiResponse<T> {

  return {

    success: true,

    data,

    meta
  }
}

export function errorResponse(
  error: string,
  meta?: unknown
): ApiResponse<null> {

  return {

    success: false,

    error,

    meta
  }
}
