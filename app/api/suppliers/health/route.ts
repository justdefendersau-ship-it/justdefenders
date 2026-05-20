import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const healthPath =
  path.join(

    process.cwd(),
    "data",
    "suppliers",
    "live-sync",
    "supplier-health.json"
  )

  const suppliers =
  JSON.parse(

    fs.readFileSync(
      healthPath,
      "utf8"
    )
  )

  return NextResponse.json({

    suppliers,

    timestamp:
    new Date().toISOString()
  })
}