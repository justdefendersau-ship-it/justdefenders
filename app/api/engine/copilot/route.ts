import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const copilotPath =
  path.join(

    process.cwd(),
    "data",
    "operational-engine",
    "copilot",
    "copilot-context.json"
  )

  const copilot =
  JSON.parse(

    fs.readFileSync(
      copilotPath,
      "utf8"
    )
  )

  return NextResponse.json({

    copilot:
    copilot[0],

    timestamp:
    new Date().toISOString()
  })
}