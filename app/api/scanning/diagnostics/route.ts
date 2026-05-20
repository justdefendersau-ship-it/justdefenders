import {
  NextResponse
}
from "next/server"

export async function POST(){

  return NextResponse.json({

    fault:
    "P2263",

    description:
    "Turbocharger Boost System Performance",

    severity:
    "CRITICAL",

    recommendedParts:[

      "Turbo Hose Kit",
      "MAP Sensor"
    ],

    expeditionRisk:
    "HIGH",

    timestamp:
    new Date().toISOString()
  })
}