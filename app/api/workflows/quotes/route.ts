import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    quotes:[

      {

        supplier:
        "Bearmach",

        leadTime:
        "2-4 days",

        total:
        306.60
      },

      {

        supplier:
        "Allmakes 4x4",

        leadTime:
        "3-5 days",

        total:
        322.40
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}