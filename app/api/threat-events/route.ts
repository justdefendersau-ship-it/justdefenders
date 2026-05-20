/* =====================================================
   JustDefenders ©
   File:
   /app/api/threat-events/route.ts

   Timestamp:
   14 May 2026 04:15 (Sydney)

   PURPOSE:
   Threat event persistence endpoint
===================================================== */

import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    threats:[

      {

        id:"THREAT-001",

        severity:"HIGH",

        region:"PACIFIC",

        timestamp:Date.now()
      },

      {

        id:"THREAT-002",

        severity:"MODERATE",

        region:"ATLANTIC",

        timestamp:Date.now()
      }
    ]
  })
}
