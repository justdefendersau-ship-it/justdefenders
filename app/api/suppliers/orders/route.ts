import {
  NextResponse
}
from "next/server"

export async function POST(){

  return NextResponse.json({

    orderId:
    "JD-ORDER-1001",

    supplier:
    "Bearmach",

    status:
    "PROCESSING",

    estimatedDispatch:
    "24 hours",

    timestamp:
    new Date().toISOString()
  })
}