import { NextResponse } from "next/server"

export async function GET(req: Request){

  const { searchParams } = new URL(req.url)
  const vin = searchParams.get("vin")

  if(!vin){
    return NextResponse.json({ error:"Missing VIN" })
  }

  // TEMP: static decode (stable)
  return NextResponse.json({
    model: "Defender 110",
    engine: "300Tdi",
    year: 1996
  })
}