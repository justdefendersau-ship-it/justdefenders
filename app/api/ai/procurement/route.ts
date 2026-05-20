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
    "ai",
    "procurement",
    "procurement-intelligence.json"
  )

  const procurement =
  JSON.parse(

    fs.readFileSync(
      procurementPath,
      "utf8"
    )
  )

  return NextResponse.json({

    procurement,

    timestamp:
    new Date().toISOString()
  })
}