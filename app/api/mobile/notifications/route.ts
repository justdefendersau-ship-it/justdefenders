import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    notifications:[

      {

        type:
        "ORDER_UPDATE",

        message:
        "Brake Pad Kit shipped",

        supplier:
        "Bearmach"
      },

      {

        type:
        "LOW_STOCK",

        message:
        "Oil Filter stock below threshold",

        supplier:
        "Allmakes 4x4"
      }
    ],

    timestamp:
    new Date().toISOString()
  })
}