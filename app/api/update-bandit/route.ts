import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Bandit updater (reward learning)
// =====================================================

export async function POST(req: Request){

  const { variant, reward } = await req.json()
  // reward: 1 = success (conversion), 0 = failure

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("ranking_bandit")
    .select("*")
    .eq("variant", variant)
    .single()

  if(!data){
    return NextResponse.json({ success:false })
  }

  const alpha = data.alpha + (reward === 1 ? 1 : 0)
  const beta  = data.beta  + (reward === 0 ? 1 : 0)

  await supabase
    .from("ranking_bandit")
    .update({
      alpha,
      beta,
      updated_at: new Date().toISOString()
    })
    .eq("variant", variant)

  return NextResponse.json({ success:true })
}