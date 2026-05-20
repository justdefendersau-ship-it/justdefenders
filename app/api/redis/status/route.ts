import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    redis:
    "ACTIVE",

    distributedCache:
    true,

    distributedEvents:
    true,

    aiContext:
    true,

    timestamp:
    new Date().toISOString()
  })
}