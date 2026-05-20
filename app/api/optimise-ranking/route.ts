import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// =====================================================
// JustDefenders ©
// Auto optimisation engine
// =====================================================

export async function POST(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: perf } = await supabase
    .from("ranking_performance")
    .select("*")

  if(!perf || perf.length === 0){
    return NextResponse.json({ success:false })
  }

  // -------------------------------
  // CALCULATE SCORES
  // -------------------------------
  const scored = perf.map(p=>{

    const ctr = p.impressions ? p.clicks / p.impressions : 0
    const conv = p.clicks ? p.conversions / p.clicks : 0

    const score = (ctr * 0.5) + (conv * 0.5)

    return {
      ...p,
      score
    }
  })

  // -------------------------------
  // FIND BEST VARIANT
  // -------------------------------
  const best = scored.sort((a,b)=>b.score - a.score)[0]

  // -------------------------------
  // UPDATE WEIGHTS
  // -------------------------------
  for(const v of scored){

    const weight = v.variant === best.variant ? 0.7 : 0.3

    await supabase
      .from("ranking_experiments")
      .update({
        dynamic_weight: weight,
        last_promoted: v.variant === best.variant ? new Date().toISOString() : null
      })
      .eq("variant", v.variant)
  }

  return NextResponse.json({
    success:true,
    best_variant: best.variant,
    score: best.score
  })
}