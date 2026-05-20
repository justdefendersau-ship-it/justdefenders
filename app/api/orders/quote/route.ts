import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const quotePath =
  path.join(

    process.cwd(),
    "data",
    "orders",
    "quotes",
    "supplier-quotes.json"
  )

  const quotes =
  JSON.parse(

    fs.readFileSync(
      quotePath,
      "utf8"
    )
  )

  return NextResponse.json({

    quotes,

    timestamp:
    new Date().toISOString()
  })
}