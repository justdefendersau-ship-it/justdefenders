import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    products:188422,

    fitmentRecords:542221,

    suppliers:32,

    ingestion:"ACTIVE",

    timestamp:
    new Date().toISOString()
  })
}