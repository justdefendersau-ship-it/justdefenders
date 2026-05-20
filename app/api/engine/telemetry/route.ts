import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const telemetryPath =
  path.join(

    process.cwd(),
    "data",
    "operational-engine",
    "telemetry",
    "operational-telemetry.json"
  )

  const telemetry =
  JSON.parse(

    fs.readFileSync(
      telemetryPath,
      "utf8"
    )
  )

  return NextResponse.json({

    telemetry,

    timestamp:
    new Date().toISOString()
  })
}