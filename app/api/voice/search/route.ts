import {
  NextResponse
}
from "next/server"

export async function POST(){

  return NextResponse.json({

    transcript:
    "Find parts for P2263",

    interpretedIntent:
    "DIAGNOSTIC_SEARCH",

    recommendedParts:[

      "Turbo Hose Kit",
      "MAP Sensor"
    ],

    confidence:
    96,

    timestamp:
    new Date().toISOString()
  })
}