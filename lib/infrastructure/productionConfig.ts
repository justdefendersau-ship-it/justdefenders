/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\infrastructure\productionConfig.ts
 *
 * Timestamp:
 * 23 May 2026 20:56 Sydney
 *
 * PURPOSE:
 * Production Infrastructure Configuration Layer
 *
 * STRATEGY:
 * PASS 41 — Production Hardening & SaaS Infrastructure
 *
 * OBJECTIVES:
 * - production environment validation
 * - SaaS infrastructure configuration
 * - deployment environment segregation
 * - operational telemetry configuration
 * - Stripe infrastructure support
 * - production authentication configuration
 * - enterprise infrastructure readiness
 *
 * ============================================================
 */

// ============================================================
// ENVIRONMENT
// ============================================================

export type DeploymentEnvironment =

  | "development"
  | "staging"
  | "production"

// ============================================================
// CONFIG
// ============================================================

export interface ProductionInfrastructureConfig {

  environment:
    DeploymentEnvironment

  applicationName:
    string

  applicationUrl:
    string

  apiBaseUrl:
    string

  databaseUrl:
    string

  redisUrl:
    string

  telemetryEnabled:
    boolean

  telemetryEndpoint:
    string

  federationCachingEnabled:
    boolean

  federationCacheTtlSeconds:
    number

  authenticationProvider:
    "mock"
    |
    "nextauth"
    |
    "clerk"

  stripeEnabled:
    boolean

  stripePublishableKey:
    string

  stripeSecretConfigured:
    boolean

  productionMonitoringEnabled:
    boolean

  rateLimitingEnabled:
    boolean

  analyticsEnabled:
    boolean

  secureCookies:
    boolean

  debugMode:
    boolean
}

// ============================================================
// ENVIRONMENT
// ============================================================

const environment =
  (
    process.env.NODE_ENV
    ||
    "development"
  ) as DeploymentEnvironment

// ============================================================
// CONFIG
// ============================================================

export const productionConfig:
  ProductionInfrastructureConfig = {

  // ==========================================================
  // CORE
  // ==========================================================

  environment,

  applicationName:
    "JustDefenders",

  applicationUrl:
    process.env.NEXT_PUBLIC_APP_URL
    ||
    "http://localhost:3000",

  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL
    ||
    "http://localhost:3000/api",

  // ==========================================================
  // DATABASE
  // ==========================================================

  databaseUrl:
    process.env.DATABASE_URL
    ||
    "",

  redisUrl:
    process.env.REDIS_URL
    ||
    "",

  // ==========================================================
  // TELEMETRY
  // ==========================================================

  telemetryEnabled:
    process.env.NEXT_PUBLIC_TELEMETRY_ENABLED === "true",

  telemetryEndpoint:
    process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT
    ||
    "/api/telemetry",

  // ==========================================================
  // FEDERATION
  // ==========================================================

  federationCachingEnabled:
    process.env.NEXT_PUBLIC_FEDERATION_CACHE === "true",

  federationCacheTtlSeconds:
    Number(

      process.env.NEXT_PUBLIC_FEDERATION_CACHE_TTL
      ||
      300
    ),

  // ==========================================================
  // AUTH
  // ==========================================================

  authenticationProvider:
    (
      process.env.NEXT_PUBLIC_AUTH_PROVIDER
      ||
      "mock"
    ) as
      "mock"
      |
      "nextauth"
      |
      "clerk",

  // ==========================================================
  // STRIPE
  // ==========================================================

  stripeEnabled:
    process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true",

  stripePublishableKey:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ||
    "",

  stripeSecretConfigured:
    !!process.env.STRIPE_SECRET_KEY,

  // ==========================================================
  // MONITORING
  // ==========================================================

  productionMonitoringEnabled:
    process.env.NEXT_PUBLIC_MONITORING_ENABLED === "true",

  analyticsEnabled:
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",

  rateLimitingEnabled:
    process.env.NEXT_PUBLIC_RATE_LIMITING === "true",

  // ==========================================================
  // SECURITY
  // ==========================================================

  secureCookies:
    environment === "production",

  debugMode:
    environment !== "production"
}

// ============================================================
// VALIDATION
// ============================================================

export interface ProductionValidationResult {

  valid: boolean

  warnings: string[]

  errors: string[]
}

// ============================================================
// VALIDATE
// ============================================================

export function validateProductionConfiguration():

  ProductionValidationResult{

  const warnings: string[] = []

  const errors: string[] = []

  // ==========================================================
  // DATABASE
  // ==========================================================

  if (

    productionConfig.environment === "production"
    &&
    !productionConfig.databaseUrl

  ){

    errors.push(
      "DATABASE_URL missing"
    )
  }

  // ==========================================================
  // AUTH
  // ==========================================================

  if (

    productionConfig.environment === "production"
    &&
    productionConfig.authenticationProvider === "mock"

  ){

    warnings.push(
      "Mock authentication enabled in production"
    )
  }

  // ==========================================================
  // STRIPE
  // ==========================================================

  if (

    productionConfig.stripeEnabled
    &&
    !productionConfig.stripeSecretConfigured

  ){

    warnings.push(
      "Stripe enabled without STRIPE_SECRET_KEY"
    )
  }

  // ==========================================================
  // TELEMETRY
  // ==========================================================

  if (

    productionConfig.environment === "production"
    &&
    !productionConfig.telemetryEnabled

  ){

    warnings.push(
      "Operational telemetry disabled"
    )
  }

  // ==========================================================
  // MONITORING
  // ==========================================================

  if (

    productionConfig.environment === "production"
    &&
    !productionConfig.productionMonitoringEnabled

  ){

    warnings.push(
      "Production monitoring disabled"
    )
  }

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    valid:
      errors.length === 0,

    warnings,

    errors
  }
}

// ============================================================
// LOG
// ============================================================

export function logProductionConfiguration(){

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validation =
    validateProductionConfiguration()

  // ==========================================================
  // HEADER
  // ==========================================================

  console.log(
    "=================================================="
  )

  console.log(
    "JustDefenders Production Infrastructure"
  )

  console.log(
    "=================================================="
  )

  // ==========================================================
  // CORE
  // ==========================================================

  console.log(

    "[ENVIRONMENT]",

    productionConfig.environment
  )

  console.log(

    "[AUTH_PROVIDER]",

    productionConfig.authenticationProvider
  )

  console.log(

    "[TELEMETRY]",

    productionConfig.telemetryEnabled
  )

  console.log(

    "[STRIPE]",

    productionConfig.stripeEnabled
  )

  console.log(

    "[MONITORING]",

    productionConfig.productionMonitoringEnabled
  )

  // ==========================================================
  // WARNINGS
  // ==========================================================

  validation.warnings.forEach(

    warning => {

      console.warn(

        "[CONFIG_WARNING]",

        warning
      )
    }
  )

  // ==========================================================
  // ERRORS
  // ==========================================================

  validation.errors.forEach(

    error => {

      console.error(

        "[CONFIG_ERROR]",

        error
      )
    }
  )

  // ==========================================================
  // STATUS
  // ==========================================================

  console.log(

    "[CONFIG_VALID]",

    validation.valid
  )

  console.log(
    "=================================================="
  )
}