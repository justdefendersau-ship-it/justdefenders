import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const expeditionPath =
  path.join(

    process.cwd(),
    "data",
    "ai-orchestration",
    "expedition",
    "expedition-advisory.json"
  )

  const expedition =
  JSON.parse(

    fs.readFileSync(
      expeditionPath,
      "utf8"
    )
  )

  return NextResponse.json({

    expedition:
    expedition[0],

    timestamp:
    new Date().toISOString()
  })
}