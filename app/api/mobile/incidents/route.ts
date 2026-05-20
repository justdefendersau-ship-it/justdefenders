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

        status:"ACTIVE",

        owner:"SOC Tier 2"
      },

      {

        id:"INC-1002",

        severity:"HIGH",

        status:"INVESTIGATING",

        owner:"AI Analyst"
      }
    ]
  })
}