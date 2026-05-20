import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    vin:"SALLDHMF8BA123456",

    vehicle:
    "Land Rover Defender 110 Puma",

    engine:
    "2.4 TDCi",

    year:
    2011,

    compatibleCategories:[

      "Engine",
      "Brakes",
      "Suspension",
      "Cooling"
    ],

    timestamp:
    new Date().toISOString()
  })
}