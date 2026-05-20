import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const searchPath =
  path.join(

    process.cwd(),
    "data",
    "search",
    "diagnostic-search-index.json"
  )

  const searches =
  JSON.parse(

    fs.readFileSync(
      searchPath,
      "utf8"
    )
  )

  return NextResponse.json({

    searches,

    timestamp:
    new Date().toISOString()
  })
}