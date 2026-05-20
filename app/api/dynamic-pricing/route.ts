import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const { part_number, base_price } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("part_demand")
    .select("*")
    .eq("part_number", part_number)
    .single()

  let multiplier = 1

  if(data){
    multiplier += Math.min(data.demand_score / 100, 0.3)
  }

  return NextResponse.json({
    price: base_price * multiplier
  })
}