import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    expeditionDiagnostics:[

      {

        issue:
        "Turbo boost failure",

        severity:
        "CRITICAL",

        remoteRisk:
        "HIGH",

        continueDriving:
        false
      },

      {

        issue:
        "EGR performance issue",

        severity:
        "MEDIUM",

        remoteRisk:
        "MEDIUM",

        continueDriving:
        true
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}