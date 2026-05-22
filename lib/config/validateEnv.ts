/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\config\validateEnv.ts
 *
 * Timestamp:
 * 21 May 2026 15:44 Sydney
 *
 * PURPOSE:
 * Environment Validation
 *
 * STRATEGY:
 * PASS 23 — Production Readiness Layer
 *
 * ============================================================
 */

// ============================================================
// REQUIRED VARIABLES
// ============================================================

const requiredEnv = [

  "NEXT_PUBLIC_APP_NAME",

  "NEXT_PUBLIC_API_BASE",

  "NEXTAUTH_SECRET"
]

// ============================================================
// VALIDATE
// ============================================================

export function validateEnv(){

  const missing =
    requiredEnv.filter(

      variable =>

        !process.env[variable]
    )

  if (
    missing.length > 0
  ) {

    console.error(

      "MISSING ENVIRONMENT VARIABLES",

      missing
    )

    throw new Error(

      `Missing environment variables: ${missing.join(", ")}`
    )
  }

  console.log(
    "Environment validation passed"
  )
}