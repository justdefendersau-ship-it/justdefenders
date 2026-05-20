// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\config\environmentGovernance.ts
// Timestamp: 15 May 2026 00:10 Sydney
// ====================================================================

import {
  runtimeConfig
} from "./runtimeConfig"

export interface EnvironmentAuditResult {

  valid: boolean

  critical: string[]

  warnings: string[]

  summary: {

    totalChecks: number

    passedChecks: number

    failedChecks: number
  }
}

export function auditEnvironment():
EnvironmentAuditResult {

  const critical: string[] =
    []

  const warnings: string[] =
    []

  const checks = [

    {
      name:
        "NODE_ENV",

      valid:
        Boolean(
          runtimeConfig.nodeEnv
        ),

      critical: true
    },

    {
      name:
        "JWT_SECRET",

      valid:
        Boolean(
          runtimeConfig.jwtSecret
        ),

      critical: true
    },

    {
      name:
        "SUPABASE_URL",

      valid:
        Boolean(
          runtimeConfig.supabaseUrl
        ),

      critical: false
    },

    {
      name:
        "SUPABASE_KEY",

      valid:
        Boolean(
          runtimeConfig.supabaseAnonKey
        ),

      critical: false
    },

    {
      name:
        "OPENAI_API_KEY",

      valid:
        Boolean(
          runtimeConfig.openAiApiKey
        ),

      critical: false
    }
  ]

  checks.forEach(
    check => {

      if (!check.valid) {

        if (check.critical) {

          critical.push(
            check.name
          )

        } else {

          warnings.push(
            check.name
          )
        }
      }
    }
  )

  const passedChecks =
    checks.filter(
      check =>
        check.valid
    ).length

  return {

    valid:
      critical.length === 0,

    critical,

    warnings,

    summary: {

      totalChecks:
        checks.length,

      passedChecks,

      failedChecks:
        checks.length -
        passedChecks
    }
  }
}