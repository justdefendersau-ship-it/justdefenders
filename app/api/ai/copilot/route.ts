import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    status:"ONLINE",

    capabilities:[

      "AI Investigation Summaries",

      "Autonomous Alert Triage",

      "Behavioural Correlation",

      "Natural Language Hunting",

      "Risk Prioritisation"
    ]
  })
}