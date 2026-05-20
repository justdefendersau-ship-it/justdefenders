import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    insights:[

      {

        priority:"CRITICAL",

        summary:
        "AI correlation identified privilege escalation behaviour across multiple endpoints.",

        confidence:96
      },

      {

        priority:"HIGH",

        summary:
        "Identity telemetry indicates abnormal authentication movement patterns.",

        confidence:92
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}