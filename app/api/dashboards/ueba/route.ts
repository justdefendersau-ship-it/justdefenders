import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    anomalies:[

      {

        entity:"host-finance-01",

        risk:92,

        anomaly:"Privilege Escalation"
      },

      {

        entity:"user-admin",

        risk:88,

        anomaly:"Impossible Travel"
      },

      {

        entity:"vpn-gateway",

        risk:79,

        anomaly:"Credential Abuse"
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}