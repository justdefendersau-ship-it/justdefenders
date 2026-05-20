import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    migration:
    "POSTGRESQL_PILOT",

    sqlite:
    "ACTIVE",

    postgres:
    "PREPARED",

    cutover:
    false,

    rollbackReady:
    true,

    timestamp:
    new Date().toISOString()
  })
}