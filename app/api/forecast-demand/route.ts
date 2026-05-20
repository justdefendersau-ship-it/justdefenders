import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: analytics } = await supabase
    .from("supplier_analytics")
    .select("*")

  if(!analytics) return NextResponse.json({ success:false })

  const demandMap:any = {}

  analytics.forEach(a=>{
    demandMap[a.part_number] = (demandMap[a.part_number] || 0) + a.clicks
  })

  for(const part in demandMap){

    await supabase
      .from("demand_forecast")
      .upsert({
        part_number: part,
        predicted_demand: demandMap[part],
        confidence: 0.7
      })
  }

  return NextResponse.json({ success:true })
}