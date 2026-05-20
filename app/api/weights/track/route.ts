import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req:Request){

  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: weight } = await supabase
    .from("scoring_weight_variants")
    .select("*")
    .eq("id", body.variant_id)
    .single()

  if(!weight){
    return NextResponse.json({ success:true })
  }

  const updates:any = {}

  if(body.type === "click"){
    updates.clicks = (weight.clicks || 0) + 1
  }

  if(body.type === "conversion"){
    updates.conversions = (weight.conversions || 0) + 1
    updates.revenue = (weight.revenue || 0) + (body.revenue || 0)
  }

  await supabase
    .from("scoring_weight_variants")
    .update(updates)
    .eq("id", body.variant_id)

  return NextResponse.json({ success:true })
}
