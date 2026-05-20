import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request){

  const { user_id, base_score, price, brand } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user_id)
    .single()

  if(!data){
    return NextResponse.json({ score: base_score })
  }

  let score = base_score

  // Price sensitivity
  score *= (1 - data.price_sensitivity * (price / 1000))

  // Brand preference
  if(data.brand_preference && brand === data.brand_preference){
    score *= 1.2
  }

  // Performance bias
  score *= (1 + data.performance_bias * 0.2)

  return NextResponse.json({ score })
}