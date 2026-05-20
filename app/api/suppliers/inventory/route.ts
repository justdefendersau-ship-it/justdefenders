import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const inventoryPath =
  path.join(

    process.cwd(),
    "data",
    "suppliers",
    "feeds",
    "inventory-live.json"
  )

  const inventory =
  JSON.parse(

    fs.readFileSync(
      inventoryPath,
      "utf8"
    )
  )

  return NextResponse.json({

    inventory,

    timestamp:
    new Date().toISOString()
  })
}