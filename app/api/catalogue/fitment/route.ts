import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    fitment:[

      {

        vehicle:
        "Defender 300Tdi",

        compatibleParts:
        8421,

        confidence:
        96
      },

      {

        vehicle:
        "Defender Puma",

        compatibleParts:
        6220,

        confidence:
        94
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}