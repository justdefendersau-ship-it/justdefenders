// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\validation\vehicleSchemas.ts
// Timestamp: 14 May 2026 22:25 Sydney
// ====================================================================

import {
  z
} from "zod"

export const vinSchema =
  z.string()
    .min(
      11,
      "VIN too short"
    )
    .max(
      17,
      "VIN too long"
    )

export const mileageSchema =
  z.number()
    .min(
      0,
      "Mileage cannot be negative"
    )

export const vehicleLookupSchema =
  z.object({

    vin:
      vinSchema,

    mileage:
      mileageSchema.optional()
  })

export const vehicleTelemetrySchema =
  z.object({

    vin:
      vinSchema,

    latitude:
      z.number(),

    longitude:
      z.number(),

    speed:
      z.number(),

    heading:
      z.number(),

    recordedAt:
      z.string()
  })