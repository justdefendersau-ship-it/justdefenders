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
    "workflows",
    "cart-workflows.json"
  )

  const cart =
  JSON.parse(

    fs.readFileSync(
      cartPath,
      "utf8"
    )
  )

  return NextResponse.json({

    cart,

    subtotal:282.60,

    freight:24.00,

    total:306.60,

    timestamp:
    new Date().toISOString()
  })
}