// =====================================================
// JustDefenders Â©
// Learn driving habits from odometer history
// =====================================================

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const { vehicle_id } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // -------------------------------
  // LOAD ODOMETER HISTORY
  // -------------------------------
  const { data } = await supabase
    .from("vehicle_odometer")
    .select("*")
    .eq("vehicle_id", vehicle_id)
    .order("recorded_at", { ascending:true })

  if(!data || data.length < 2){
    return NextResponse.json({ success:false, message:"Not enough data" })
  }

  // -------------------------------
  // CALCULATE DAILY KM
  // -------------------------------
  let totalKm = 0
  let totalDays = 0

  for(let i=1;i<data.length;i++){

    const prev = data[i-1]
    const curr = data[i]

    const kmDiff = curr.km - prev.km
    const daysDiff =
      (new Date(curr.recorded_at).getTime() - new Date(prev.recorded_at).getTime()) / (1000*60*60*24)

    if(daysDiff > 0 && kmDiff >= 0){
      totalKm += kmDiff
      totalDays += daysDiff
    }
  }

  const dailyKm = totalKm / totalDays
  const yearlyKm = Math.round(dailyKm * 365)

  // -------------------------------
  // SAVE PROFILE
  // -------------------------------
  await supabase
    .from("vehicle_driving_profile")
    .upsert([{
      vehicle_id,
      avg_km_per_year: yearlyKm,
      updated_at: new Date()
    }])

  return NextResponse.json({
    success:true,
    dailyKm,
    yearlyKm
  })
}