import {
  NextResponse
}
from "next/server"

export async function POST(){

  return NextResponse.json({

    vin:
    "SALLDHMF8BA123456",

    vehicle:
    "Defender 110 Puma",

    engine:
    "2.4 TDCi",

    year:
    2011,

    compatibleCategories:[

      "Engine",
      "Cooling",
      "Brakes",
      "Suspension"
    ],

    timestamp:
    new Date().toISOString()
  })
}