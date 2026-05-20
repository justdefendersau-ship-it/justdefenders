import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const diagPath =
  path.join(

    process.cwd(),
    "data",
    "workflows",
    "diagnostic-workflows.json"
  )

  const diagnostics =
  JSON.parse(

    fs.readFileSync(
      diagPath,
      "utf8"
    )
  )

  return NextResponse.json({

    diagnostics,

    timestamp:
    new Date().toISOString()
  })
}