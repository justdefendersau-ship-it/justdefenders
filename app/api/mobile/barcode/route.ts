import {
  NextResponse
}
from "next/server"

export async function POST(){

  return NextResponse.json({

    barcode:
    "ERR3340",

    matchedPart:
    "Oil Filter",

    supplier:
    "Allmakes 4x4",

    fitment:
    "Defender 300Tdi",

    stock:
    44,

    confidence:
    97,

    timestamp:
    new Date().toISOString()
  })
}