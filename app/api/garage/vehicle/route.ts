import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: Request){

  const { searchParams } = new URL(req.url)
  const vehicleId = searchParams.get("id")

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // vehicle
  const { data: vehicle } = await supabase
    .from("user_vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single()

  // latest km
  const { data: kmRow } = await supabase
    .from("vehicle_odometer")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .order("recorded_at", { ascending:false })
    .limit(1)
    .single()

  return NextResponse.json({
    success:true,
    vehicle,
    km: kmRow?.km || null
  })
}