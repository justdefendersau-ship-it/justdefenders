import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    equivalence:[

      {

        oem:"ERR3340",

        equivalents:[

          "RTC3184",
          "LPX100590"
        ]
      },

      {

        oem:"STC50529",

        equivalents:[

          "SFP500160",
          "DA4148"
        ]
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}