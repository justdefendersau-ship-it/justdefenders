// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\garage\list\route.ts
// Timestamp: 15 May 2026 02:45 Sydney

import {
  NextResponse
} from "next/server"

export async function GET() {

  return NextResponse.json({

    success: true,

    vehicles: [

      {
        vin:
          "SALLDHMF8BA123456",

        model:
          "Defender Puma"
      }

    ]
  })
}