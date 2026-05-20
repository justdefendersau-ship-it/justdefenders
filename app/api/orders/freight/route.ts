import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    freight:[

      {

        region:
        "Sydney",

        estimate:
        18.00
      },

      {

        region:
        "Remote WA",

        estimate:
        48.00
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}