import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const statusPath =
  path.join(

    process.cwd(),
    "data",
    "external-alpha",
    "field-reports",
    "field-status.json"
  )

  const status =
  JSON.parse(

    fs.readFileSync(
      statusPath,
      "utf8"
    )
  )

  return NextResponse.json({

    fieldStatus:
    status,

    timestamp:
    new Date().toISOString()
  })
}