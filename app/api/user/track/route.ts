import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Track user funnel (search ? click ? conversion)
// =====================================================

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("user_sessions")
    .select("*")
    .eq("vin", body.vin)
    .single()

  if(data){

    await supabase
      .from("user_sessions")
      .update({
        searches: data.searches + (body.type === "search" ? 1 : 0),
        clicks: data.clicks + (body.type === "click" ? 1 : 0),
        conversions: data.conversions + (body.type === "conversion" ? 1 : 0)
      })
      .eq("id", data.id)

  } else {

    await supabase
      .from("user_sessions")
      .insert({
        vin: body.vin,
        searches: body.type === "search" ? 1 : 0,
        clicks: body.type === "click" ? 1 : 0,
        conversions: body.type === "conversion" ? 1 : 0
      })
  }

  return NextResponse.json({ success:true })
}
