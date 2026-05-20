import { NextResponse }
from "next/server"

export async function GET(){

  return NextResponse.json({

    status:"healthy",

    runtime:"active",

    timestamp:new Date()
  })
}
