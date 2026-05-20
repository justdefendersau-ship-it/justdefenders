import { NextResponse } from "next/server"
import { recordConversion } from "../../../lib/revenue"

export async function POST(req: Request){

  const body = await req.json()

  recordConversion(body.supplier)

  return NextResponse.json({ success:true })
}