// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\auth\runtimeAuth.ts
// Timestamp: 14 May 2026 22:00 Sydney
// ====================================================================

import {
  runtimeConfig
} from "../config/runtimeConfig"

import {
  RuntimeAuthResult,
  RuntimeAuthToken,
  RuntimeUserRole
} from "./authTypes"

function parseToken(
  rawToken: string
): RuntimeAuthToken | null {

  try {

    const decoded =
      Buffer
        .from(
          rawToken,
          "base64"
        )
        .toString(
          "utf8"
        )

    const parsed =
      JSON.parse(
        decoded
      ) as RuntimeAuthToken

    return parsed

  } catch {

    return null
  }
}

export function validateRuntimeToken(
  rawToken?: string | null
): RuntimeAuthResult {

  if (!rawToken) {

    return {

      authenticated: false,

      token: null,

      error:
        "Missing token"
    }
  }

  const token =
    parseToken(
      rawToken
    )

  if (!token) {

    return {

      authenticated: false,

      token: null,

      error:
        "Invalid token"
    }
  }

  const now =
    Date.now()

  if (
    token.expiresAt < now
  ) {

    return {

      authenticated: false,

      token: null,

      error:
        "Token expired"
    }
  }

  return {

    authenticated: true,

    token
  }
}

export function hasRequiredRole(
  role:
    RuntimeUserRole,
  required:
    RuntimeUserRole[]
): boolean {

  return required.includes(
    role
  )
}

export function createDevelopmentToken():
RuntimeAuthToken {

  const now =
    Date.now()

  return {

    userId:
      "development-user",

    email:
      "dev@justdefenders.local",

    role:
      "admin",

    issuedAt:
      now,

    expiresAt:
      now + (
        1000 * 60 * 60 * 24
      )
  }
}

export function runtimeAuthEnabled():
boolean {

  return Boolean(
    runtimeConfig.jwtSecret
  )
}