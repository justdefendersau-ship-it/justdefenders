import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    workflows:[

      {

        workflow:
        "Diagnostic → Parts",

        status:
        "HEALTHY"
      },

      {

        workflow:
        "Voice Diagnostics",

        status:
        "OPTIMISING"
      },

      {

        workflow:
        "Barcode Scan → Search",

        status:
        "HEALTHY"
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}