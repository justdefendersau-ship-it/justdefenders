import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    telemetry:{

      defender:1884,

      sentinel:441,

      sysmon:902,

      windowsEvents:1288,

      redisStreams:1842,

      aiCorrelations:74
    },

    timestamp:
    new Date().toISOString()
  })
}