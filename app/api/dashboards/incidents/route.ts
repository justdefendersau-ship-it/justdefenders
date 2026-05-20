import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    incidents:[

      {

        id:"INC-1001",

        severity:"CRITICAL",

        title:
        "Privilege Escalation Attempt",

        source:
        "Microsoft Defender",

        status:
        "INVESTIGATING",

        timeline:[
          "Initial detection",
          "UEBA correlation",
          "AI triage initiated"
        ]
      },

      {

        id:"INC-1002",

        severity:"HIGH",

        title:
        "Impossible Travel Detected",

        source:
        "Microsoft 365",

        status:
        "OPEN",

        timeline:[
          "Authentication anomaly",
          "Geo-correlation",
          "AI investigation queued"
        ]
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}