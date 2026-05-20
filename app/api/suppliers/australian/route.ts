// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\suppliers\australian\route.ts
// Timestamp: 15 May 2026 15:10 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getAustralianSuppliers
} from "../../../../lib/supplier/supplierPriorityEngine"

export async function GET() {

  try {

    const suppliers =
      await getAustralianSuppliers()

    return NextResponse.json({

      success: true,

      suppliers,

      operationalRegion:
        "AU",

      timestamp:
        new Date()
          .toISOString()
    })

  } catch (error) {

    return NextResponse.json(

      {

        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown supplier error"
      },

      {
        status: 500
      }
    )
  }
}