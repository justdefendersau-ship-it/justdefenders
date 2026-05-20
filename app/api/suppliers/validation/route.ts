import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    suppliers:[

      {

        name:"Allmakes 4x4",

        rating:4.7,

        products:8421,

        leadTime:"2.1 days",

        validation:"VALID"
      },

      {

        name:"Bearmach",

        rating:4.8,

        products:12412,

        leadTime:"1.8 days",

        validation:"VALID"
      },

      {

        name:"Northridge 4x4",

        rating:4.6,

        products:6211,

        leadTime:"2.4 days",

        validation:"VALID"
      }
    ]
  })
}