import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    pricing:[

      {

        supplier:
        "Bearmach",

        part:
        "STC50529",

        price:
        188.20
      },

      {

        supplier:
        "Allmakes 4x4",

        part:
        "ERR3340",

        price:
        18.40
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}