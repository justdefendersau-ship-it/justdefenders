import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    pricing:[

      {

        part:
        "Oil Filter",

        bestPrice:
        12.40,

        supplier:
        "Allmakes 4x4"
      },

      {

        part:
        "Brake Pad Kit",

        bestPrice:
        88.20,

        supplier:
        "Bearmach"
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}