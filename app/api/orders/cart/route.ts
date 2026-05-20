import {
  NextResponse
}
from "next/server"

import fs from "fs"

import path from "path"

export async function GET(){

  const cartPath =
  path.join(

    process.cwd(),
    "data",
    "orders",
    "carts",
    "active-carts.json"
  )

  const carts =
  JSON.parse(

    fs.readFileSync(
      cartPath,
      "utf8"
    )
  )

  return NextResponse.json({

    carts,

    timestamp:
    new Date().toISOString()
  })
}