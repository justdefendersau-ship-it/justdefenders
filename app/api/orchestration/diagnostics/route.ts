import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const diagPath =
  path.join(

    process.cwd(),
    "data",
    "ai-orchestration",
    "diagnostics",
    "reasoning-chains.json"
  )

  const diagnostics =
  JSON.parse(

    fs.readFileSync(
      diagPath,
      "utf8"
    )
  )

  return NextResponse.json({

    diagnostics:
    diagnostics[0],

    timestamp:
    new Date().toISOString()
  })
}