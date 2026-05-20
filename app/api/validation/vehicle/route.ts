// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\validation\vehicle\route.ts
// Timestamp: 14 May 2026 22:35 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  validateRequestBody
} from "../../../../lib/validation/validationFramework"

import {
  vehicleLookupSchema
} from "../../../../lib/validation/vehicleSchemas"

export async function POST(
  request: NextRequest
) {

  const validation =
    await validateRequestBody(
      request,
      vehicleLookupSchema
    )

  if (
    !validation.valid
  ) {

    return NextResponse.json(
      {

        success: false,

        errors:
          validation.errors
      },

      {
        status: 400
      }
    )
  }

  return NextResponse.json({

    success: true,

    validated:
      validation.data
  })
}