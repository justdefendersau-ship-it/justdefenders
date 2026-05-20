import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    results:[

      {

        part:"Oil Filter",

        supplier:"Northridge 4x4",

        price:12.40,

        delivery:"1-2 days",

        stock:"IN STOCK"
      },

      {

        part:"Oil Filter",

        supplier:"Allmakes 4x4",

        price:12.80,

        delivery:"1-3 days",

        stock:"IN STOCK"
      }
    ]
  })
}