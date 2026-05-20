import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const maintenancePath =
  path.join(

    process.cwd(),
    "data",
    "ai",
    "maintenance",
    "maintenance-intelligence.json"
  )

  const maintenance =
  JSON.parse(

    fs.readFileSync(
      maintenancePath,
      "utf8"
    )
  )

  return NextResponse.json({

    maintenance,

    timestamp:
    new Date().toISOString()
  })
}