import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function POST(){

  const crossPath =
  path.join(

    process.cwd(),
    "data",
    "fitment",
    "cross-reference",
    "oem-cross-reference.json"
  )

  const references =
  JSON.parse(

    fs.readFileSync(
      crossPath,
      "utf8"
    )
  )

  return NextResponse.json({

    crossReference:
    references[0],

    timestamp:
    new Date().toISOString()
  })
}