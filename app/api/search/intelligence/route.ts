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
    "search-index.json"
  )

  const results =
  JSON.parse(

    fs.readFileSync(
      searchPath,
      "utf8"
    )
  )

  return NextResponse.json({

    results,

    total:
    results.length,

    timestamp:
    new Date().toISOString()
  })
}