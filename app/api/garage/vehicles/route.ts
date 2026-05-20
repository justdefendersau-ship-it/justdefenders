import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    vehicles:[

      {

        name:
        "Defender 110 Puma",

        vin:
        "SALLDHMF8BA123456",

        engine:
        "2.4 TDCi",

        year:
        2011,

        savedParts:
        44
      },

      {

        name:
        "Defender 300Tdi",

        vin:
        "SALLDVAF7MA654321",

        engine:
        "300Tdi",

        year:
        1996,

        savedParts:
        21
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}