import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from("vehicle_odometer")
    .insert([body])

  if(error){
    return NextResponse.json({ success:false, error:error.message })
  }

  return NextResponse.json({ success:true })
}