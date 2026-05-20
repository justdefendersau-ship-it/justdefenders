import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const fitmentPath =
  path.join(

    process.cwd(),
    "data",
    "fitment",
    "fitment-validation.json"
  )

  const fitment =
  JSON.parse(

    fs.readFileSync(
      fitmentPath,
      "utf8"
    )
  )

  return NextResponse.json({

    fitment:
    fitment[0],

    timestamp:
    new Date().toISOString()
  })
}