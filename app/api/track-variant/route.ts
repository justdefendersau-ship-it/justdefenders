import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const { variant, type } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("ranking_performance")
    .select("*")
    .eq("variant", variant)
    .single()

  if(data){

    const update:any = {}

    if(type === "impression") update.impressions = data.impressions + 1
    if(type === "click") update.clicks = data.clicks + 1
    if(type === "conversion") update.conversions = data.conversions + 1

    await supabase
      .from("ranking_performance")
      .update(update)
      .eq("id", data.id)

  } else {

    await supabase.from("ranking_performance").insert([{
      variant,
      impressions: type === "impression" ? 1 : 0,
      clicks: type === "click" ? 1 : 0,
      conversions: type === "conversion" ? 1 : 0
    }])
  }

  return NextResponse.json({ success:true })
}