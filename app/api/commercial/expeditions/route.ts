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
    "commercial-rollout",
    "expeditions",
    "expedition-pilots.json"
  )

  const expeditions =
  JSON.parse(

    fs.readFileSync(
      expeditionPath,
      "utf8"
    )
  )

  return NextResponse.json({

    expeditions,

    timestamp:
    new Date().toISOString()
  })
}