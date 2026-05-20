// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\auth\requireAuth.ts
// Timestamp: 14 May 2026 22:00 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  RuntimeUserRole
} from "./authTypes"

import {
  validateRuntimeToken,
  hasRequiredRole
} from "./runtimeAuth"

export function requireAuthentication(
  request: NextRequest,
  requiredRoles:
    RuntimeUserRole[] = []
) {

  const authHeader =
    request.headers.get(
      "authorization"
    )

  const token =
    authHeader?.replace(
      "Bearer ",
      ""
    )

  const validation =
    validateRuntimeToken(
      token
    )

  if (
    !validation.authenticated ||
    !validation.token
  ) {

    return NextResponse.json(
      {

        success: false,

        error:
          validation.error ??
          "Unauthorised"
      },

      {
        status: 401
      }
    )
  }

  if (
    requiredRoles.length > 0 &&
    !hasRequiredRole(
      validation.token.role,
      requiredRoles
    )
  ) {

    return NextResponse.json(
      {

        success: false,

        error:
          "Forbidden"
      },

      {
        status: 403
      }
    )
  }

  return null
}