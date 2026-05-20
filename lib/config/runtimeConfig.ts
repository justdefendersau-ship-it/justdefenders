// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\config\runtimeConfig.ts
// Timestamp: 14 May 2026 21:50 Sydney
// ====================================================================

export interface RuntimeConfiguration {

  nodeEnv:
    | "development"
    | "production"
    | "test"

  supabaseUrl: string

  supabaseAnonKey: string

  supabaseServiceRoleKey: string

  jwtSecret: string

  vapidPublicKey: string

  vapidPrivateKey: string

  openAiApiKey: string

  buildSafeMode: boolean

  applicationName: string

  applicationVersion: string
}

function readEnvironmentVariable(
  key: string,
  fallback = ""
): string {

  return (
    process.env[key] ??
    fallback
  ).trim()
}

export const runtimeConfig:
RuntimeConfiguration = {

  nodeEnv:
    (
      process.env.NODE_ENV ??
      "development"
    ) as RuntimeConfiguration["nodeEnv"],

  supabaseUrl:
    readEnvironmentVariable(
      "NEXT_PUBLIC_SUPABASE_URL"
    ),

  supabaseAnonKey:
    readEnvironmentVariable(
      "NEXT_PUBLIC_SUPABASE_KEY"
    ),

  supabaseServiceRoleKey:
    readEnvironmentVariable(
      "SUPABASE_SERVICE_ROLE_KEY"
    ),

  jwtSecret:
    readEnvironmentVariable(
      "JWT_SECRET"
    ),

  vapidPublicKey:
    readEnvironmentVariable(
      "NEXT_PUBLIC_VAPID_PUBLIC_KEY"
    ),

  vapidPrivateKey:
    readEnvironmentVariable(
      "VAPID_PRIVATE_KEY"
    ),

  openAiApiKey:
    readEnvironmentVariable(
      "OPENAI_API_KEY"
    ),

  buildSafeMode:
    process.env.BUILD_SAFE_MODE === "true",

  applicationName:
    "JustDefenders",

  applicationVersion:
    "2.0.0"
}

export interface RuntimeValidationResult {

  valid: boolean

  missing: string[]

  warnings: string[]
}

export function validateRuntimeConfiguration():
RuntimeValidationResult {

  const missing: string[] =
    []

  const warnings: string[] =
    []

  const requiredVariables = [

    {
      key:
        "NEXT_PUBLIC_SUPABASE_URL",

      value:
        runtimeConfig.supabaseUrl
    },

    {
      key:
        "NEXT_PUBLIC_SUPABASE_KEY",

      value:
        runtimeConfig.supabaseAnonKey
    },

    {
      key:
        "JWT_SECRET",

      value:
        runtimeConfig.jwtSecret
    }

  ]

  requiredVariables.forEach(
    item => {

      if (!item.value) {

        missing.push(
          item.key
        )
      }
    }
  )

  if (
    runtimeConfig.buildSafeMode
  ) {

    warnings.push(
      "BUILD_SAFE_MODE enabled"
    )
  }

  if (
    !runtimeConfig.vapidPublicKey
  ) {

    warnings.push(
      "VAPID public key missing"
    )
  }

  if (
    !runtimeConfig.openAiApiKey
  ) {

    warnings.push(
      "OpenAI API key missing"
    )
  }

  return {

    valid:
      missing.length === 0,

    missing,

    warnings
  }
}

export function isProductionEnvironment():
boolean {

  return (
    runtimeConfig.nodeEnv ===
    "production"
  )
}

export function isDevelopmentEnvironment():
boolean {

  return (
    runtimeConfig.nodeEnv ===
    "development"
  )
}