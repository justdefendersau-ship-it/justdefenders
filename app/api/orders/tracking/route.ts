import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const trackingPath =
  path.join(

    process.cwd(),
    "data",
    "orders",
    "tracking",
    "order-tracking.json"
  )

  const tracking =
  JSON.parse(

    fs.readFileSync(
      trackingPath,
      "utf8"
    )
  )

  return NextResponse.json({

    tracking,

    timestamp:
    new Date().toISOString()
  })
}