import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    expeditions:[

      {

        kit:
        "Cape York Expedition Kit",

        recommendedParts:
        42,

        recoveryScore:
        97
      },

      {

        kit:
        "Simpson Desert Recovery Kit",

        recommendedParts:
        36,

        recoveryScore:
        99
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}