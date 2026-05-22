/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\config\productionValidation.ts
 *
 * Timestamp:
 * 22 May 2026 09:54 Sydney
 *
 * PURPOSE:
 * Production Environment Validation
 *
 * STRATEGY:
 * PASS 30C — Production Deployment Hardening
 *
 * OBJECTIVES:
 * - improve deployment reliability
 * - improve production validation
 * - prevent invalid Alpha deployment
 * - improve operational diagnostics
 * - stabilize production runtime
 *
 * ============================================================
 */

const REQUIRED_PRODUCTION_ENV = [

  "NEXT_PUBLIC_APP_NAME",

  "NEXT_PUBLIC_API_BASE",

  "NEXT_PUBLIC_ENVIRONMENT"

]

// ============================================================
// VALIDATION
// ============================================================

export function validateProductionEnvironment(){

  const missing: string[] = []

  for (

    const variable of
    REQUIRED_PRODUCTION_ENV

  ){

    if (

      !process.env[variable]

    ){

      missing.push(variable)
    }
  }

  // ==========================================================
  // VALIDATION FAILURE
  // ==========================================================

  if (missing.length > 0){

    console.error(

      "PRODUCTION ENV VALIDATION FAILURE",

      missing
    )

    throw new Error(

      `Missing production environment variables: ${missing.join(", ")}`
    )
  }

  // ==========================================================
  // VALIDATION SUCCESS
  // ==========================================================

  console.log(

    "PRODUCTION ENV VALIDATION SUCCESS"
  )

  return true
}