import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const vinPath =
  path.join(

    process.cwd(),
    "data",
    "fitment",
    "vin",
    "vin-database.json"
  )

  const vins =
  JSON.parse(

    fs.readFileSync(
      vinPath,
      "utf8"
    )
  )

  return NextResponse.json({

    vehicle:
    vins[0],

    timestamp:
    new Date().toISOString()
  })
}