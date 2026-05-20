// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\validation\validationFramework.ts
// Timestamp: 14 May 2026 22:45 Sydney
// ====================================================================

import {
  ZodError,
  ZodSchema
} from "zod"

export interface ValidationResult<T> {

  valid: boolean

  data?: T

  errors?: string[]
}

export function validateSchema<T>(
  schema: ZodSchema<T>,
  payload: unknown
): ValidationResult<T> {

  try {

    const data =
      schema.parse(
        payload
      )

    return {

      valid: true,

      data
    }

  } catch (error) {

    if (
      error instanceof ZodError
    ) {

      return {

        valid: false,

        errors:
          error.issues.map(
            issue =>
              issue.message
          )
      }
    }

    return {

      valid: false,

      errors: [
        "Unknown validation error"
      ]
    }
  }
}

export async function validateRequestBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {

  try {

    const body =
      await request.json()

    return validateSchema(
      schema,
      body
    )

  } catch {

    return {

      valid: false,

      errors: [
        "Invalid JSON body"
      ]
    }
  }
}