// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\runtime\status\route.ts
// Timestamp: 14 May 2026 21:45 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  runtimeConfig,
  validateRuntimeConfiguration,
  isProductionEnvironment,
  isDevelopmentEnvironment
} from "../../../../lib/config/runtimeConfig"

export async function GET() {

  const validation =
    validateRuntimeConfiguration()

  return NextResponse.json({

    success: true,

    runtime: {

      application:
        runtimeConfig.applicationName,

      version:
        runtimeConfig.applicationVersion,

      environment:
        runtimeConfig.nodeEnv,

      production:
        isProductionEnvironment(),

      development:
        isDevelopmentEnvironment(),

      buildSafeMode:
        runtimeConfig.buildSafeMode
    },

    configuration: {

      valid:
        validation.valid,

      missing:
        validation.missing,

      warnings:
        validation.warnings
    },

    services: {

      supabaseConfigured:
        Boolean(
          runtimeConfig.supabaseUrl &&
          runtimeConfig.supabaseAnonKey
        ),

      jwtConfigured:
        Boolean(
          runtimeConfig.jwtSecret
        ),

      vapidConfigured:
        Boolean(
          runtimeConfig.vapidPublicKey &&
          runtimeConfig.vapidPrivateKey
        ),

      openAiConfigured:
        Boolean(
          runtimeConfig.openAiApiKey
        )
    },

    timestamp:
      new Date()
        .toISOString()
  })
}