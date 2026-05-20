import { NextResponse }
from "next/server"

export async function GET(){

  return NextResponse.json({

    sentinel:
    "CONNECTED",

    splunk:
    "CONNECTED",

    syslog:
    "ACTIVE",

    windowsCollector:
    "ACTIVE"
  })
}
