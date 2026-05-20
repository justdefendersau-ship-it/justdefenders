import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const diagnosticPath =
  path.join(

    process.cwd(),
    "data",
    "ai",
    "diagnostics",
    "diagnostic-intelligence.json"
  )

  const diagnostics =
  JSON.parse(

    fs.readFileSync(
      diagnosticPath,
      "utf8"
    )
  )

  return NextResponse.json({

    aiDiagnostics:
    diagnostics[0],

    timestamp:
    new Date().toISOString()
  })
}