import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    kits:[

      {

        name:
        "Remote Touring Recovery Kit",

        vehicle:
        "Defender 110",

        recommendedItems:
        28,

        expeditionScore:
        96
      },

      {

        name:
        "Cape York Expedition Kit",

        vehicle:
        "Defender Puma",

        recommendedItems:
        42,

        expeditionScore:
        98
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}