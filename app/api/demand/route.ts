import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Demand tracking (search + click + conversion)
// =====================================================

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("demand_signals")
    .select("*")
    .eq("part_number", body.part)
    .single()

  if(data){

    await supabase
      .from("demand_signals")
      .update({
        searches: (data.searches || 0) + (body.type === "search" ? 1 : 0),
        clicks: (data.clicks || 0) + (body.type === "click" ? 1 : 0),
        conversions: (data.conversions || 0) + (body.type === "conversion" ? 1 : 0),
        last_updated: new Date().toISOString()
      })
      .eq("id", data.id)

  } else {

    await supabase
      .from("demand_signals")
      .insert({
        part_number: body.part,
        searches: body.type === "search" ? 1 : 0,
        clicks: body.type === "click" ? 1 : 0,
        conversions: body.type === "conversion" ? 1 : 0
      })
  }

  return NextResponse.json({ success:true })
}
