import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const procurementPath =
  path.join(

    process.cwd(),
    "data",
    "ai-orchestration",
    "procurement",
    "procurement-orchestration.json"
  )

  const procurement =
  JSON.parse(

    fs.readFileSync(
      procurementPath,
      "utf8"
    )
  )

  return NextResponse.json({

    procurement:
    procurement[0],

    timestamp:
    new Date().toISOString()
  })
}