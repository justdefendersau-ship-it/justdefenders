import {
  NextResponse
}
from "next/server"

export async function POST(){

  return NextResponse.json({

    transcript:
    "My Defender has black smoke and loss of power",

    likelyFault:
    "P2263",

    severity:
    "CRITICAL",

    recommendedAction:
    "Inspect turbo hoses and MAP sensor",

    expeditionRisk:
    "HIGH",

    timestamp:
    new Date().toISOString()
  })
}