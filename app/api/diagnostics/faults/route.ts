import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const dbPath =
  path.join(

    process.cwd(),
    "data",
    "diagnostics",
    "fault-database.json"
  )

  const faults =
  JSON.parse(

    fs.readFileSync(
      dbPath,
      "utf8"
    )
  )

  return NextResponse.json({

    faults,

    total:
    faults.length,

    timestamp:
    new Date().toISOString()
  })
}