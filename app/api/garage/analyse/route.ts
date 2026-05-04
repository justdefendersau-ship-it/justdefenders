import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: Request){

  const { searchParams } = new URL(req.url)
  const vehicleId = searchParams.get("id")

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // -------------------------------
  // LOAD VEHICLE
  // -------------------------------
  const { data: vehicle } = await supabase
    .from("user_vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single()

  // -------------------------------
  // LOAD KM
  // -------------------------------
  const { data: kmRow } = await supabase
    .from("vehicle_odometer")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .order("recorded_at", { ascending:false })
    .limit(1)
    .single()

  const km = kmRow?.km || 0

  // -------------------------------
  // CALL EXISTING ENGINE
  // -------------------------------
  const res = await fetch(process.env.BASE_URL + "/api/suppliers", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      model: vehicle.model,
      engine: vehicle.engine,
      year: vehicle.year,
      km
    })
  })

  const data = await res.json()

  return NextResponse.json({
    success:true,
    vehicle,
    km,
    results:data.results
  })
}