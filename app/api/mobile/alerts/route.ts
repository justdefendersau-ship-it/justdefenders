import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    alerts:[

      {

        severity:"CRITICAL",

        source:"Microsoft Defender",

        title:"Privilege Escalation Attempt",

        timestamp:
        new Date().toISOString()
      },

      {

        severity:"HIGH",

        source:"UEBA",

        title:"Impossible Travel Detection",

        timestamp:
        new Date().toISOString()
      },

      {

        severity:"MEDIUM",

        source:"Threat Intel",

        title:"Malicious IOC Match",

        timestamp:
        new Date().toISOString()
      }
    ]
  })
}