import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    critical:3,

    high:8,

    medium:14,

    low:24,

    timestamp:
    new Date().toISOString()
  })
}