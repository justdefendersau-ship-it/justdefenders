import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const analyticsPath =
  path.join(

    process.cwd(),
    "data",
    "commercial-rollout",
    "analytics",
    "commercial-analytics.json"
  )

  const analytics =
  JSON.parse(

    fs.readFileSync(
      analyticsPath,
      "utf8"
    )
  )

  return NextResponse.json({

    analytics,

    timestamp:
    new Date().toISOString()
  })
}