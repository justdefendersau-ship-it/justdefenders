import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const { workshop_id, vehicle_id, service, date } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.from("bookings").insert([{
    workshop_id,
    vehicle_id,
    service,
    date
  }])

  return NextResponse.json({ success:true })
}